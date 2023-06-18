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
import { RequestUser } from './entities/request-user.entity';

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

    const accessToken = await this.generateAccessToken({ id: user.id });
    const refreshToken = await this.generateAndSaveUserRefreshToken(user.id);

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

    const accessToken = await this.generateAccessToken({
      id: admin.id,
      isAdmin: true,
    });

    const refreshToken = await this.generateAndSaveAdminRefreshToken(admin.id);

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

    const accessToken = await this.generateAccessToken({ id: user.id });
    const refreshToken = await this.generateAndSaveUserRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async userLogout(userId: number) {
    if (!userId) return;

    await this.deleteUserRefreshToken(userId);
  }

  async adminLogout(adminId: number) {
    if (!adminId) return;

    await this.deleteAdminRefreshToken(adminId);
  }

  async findUserRefreshToken(userId: number) {
    return this.userRefreshTokensRepository.findOneBy({ userId });
  }

  async findAdminRefreshToken(adminId: number) {
    return this.adminRefreshTokensRepository.findOneBy({ adminId });
  }

  async deleteUserRefreshToken(userId: number) {
    return this.userRefreshTokensRepository.delete(userId);
  }

  async deleteAdminRefreshToken(adminId: number) {
    return this.adminRefreshTokensRepository.delete(adminId);
  }

  async generateAndSaveUserRefreshToken(userId: number) {
    const refreshToken = await this.jwtService.signAsync(
      { id: userId, isRefreshToken: true },
      { expiresIn: appConfig.refreshTokenExpirationTime },
    );

    const userRefreshTokenRecord = this.userRefreshTokensRepository.create({
      userId,
      token: refreshToken,
    });

    await this.userRefreshTokensRepository.save(userRefreshTokenRecord);

    return refreshToken;
  }

  async generateAndSaveAdminRefreshToken(adminId: number) {
    const refreshToken = await this.jwtService.signAsync(
      { id: adminId, isAdmin: true, isRefreshToken: true },
      { expiresIn: appConfig.refreshTokenExpirationTime },
    );

    const adminRefreshTokenRecord = this.adminRefreshTokensRepository.create({
      adminId,
      token: refreshToken,
    });

    await this.adminRefreshTokensRepository.save(adminRefreshTokenRecord);

    return refreshToken;
  }

  async generateAccessToken(payload: RequestUser) {
    return this.jwtService.signAsync(payload);
  }

  verifyToken({ token, ignoreExpiration = false }) {
    return this.jwtService.verifyAsync(token, { secret: appConfig.jwtSecret, ignoreExpiration });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, storedPasswordHash: string) {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
