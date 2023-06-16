import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { appConfig } from 'src/config/app.config';
import { AdminsService } from '../admins/admins.service';
import { AdminRefreshToken } from 'src/common/entities/admin-refresh-token.entity';
import { UserRefreshToken } from 'src/common/entities/user-refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRefreshToken)
    private adminRefreshTokensRepository: Repository<AdminRefreshToken>,
    @InjectRepository(UserRefreshToken)
    private userRefreshTokensRepository: Repository<UserRefreshToken>,
    private usersService: UsersService,
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
        isRefreshToken: true,
      },
      {
        expiresIn: appConfig.refreshTokenExpirationTime,
      },
    );

    const refreshTokenRecord = this.userRefreshTokensRepository.create({
      userId: user.id,
      token: refreshToken,
    });

    await this.userRefreshTokensRepository.save(refreshTokenRecord);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async adminLogin(email: string, password: string) {
    const admin = await this.adminsService.findOneByEmail(email);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const isPasswordValid = await this.comparePassword(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }

    const accessToken = await this.jwtService.signAsync({
      id: admin.id,
      isAdmin: true,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        id: admin.id,
        isAdmin: true,
        isRefreshToken: true,
      },
      {
        expiresIn: appConfig.refreshTokenExpirationTime,
      },
    );

    const refreshTokenRecord = this.adminRefreshTokensRepository.create({
      adminId: admin.id,
      token: refreshToken,
    });

    await this.adminRefreshTokensRepository.save(refreshTokenRecord);

    return {
      accessToken,
      refreshToken,
      admin,
    };
  }

  async register(email: string, password: string) {
    let user = await this.usersService.findByEmail(email, true);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await this.hashPassword(password);

    user = await this.usersService.create({ email, password: passwordHash });

    const accessToken = await this.jwtService.signAsync({ id: user.id });

    const refreshToken = await this.jwtService.signAsync({
      id: user.id,
      isRefreshToken: true,
    });

    const savedRefreshRecord = this.userRefreshTokensRepository.create({
      userId: user.id,
      token: refreshToken,
    });

    await this.userRefreshTokensRepository.save(savedRefreshRecord);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async userLogout(userId: number) {
    if (!userId) return;

    const userRefreshToken = await this.userRefreshTokensRepository.findOneBy({
      userId,
    });
    if (userRefreshToken) {
      await this.userRefreshTokensRepository.delete(userRefreshToken.id);
    }
  }

  async adminLogout(adminId: number) {
    if (!adminId) return;

    const adminRefreshToken = await this.adminRefreshTokensRepository.findOneBy({
      adminId,
    });
    if (adminRefreshToken) {
      await this.adminRefreshTokensRepository.delete(adminRefreshToken.id);
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, storedPasswordHash: string) {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
