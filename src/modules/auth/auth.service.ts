import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/common/entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { appConfig } from 'src/config/app.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokensRepository: Repository<RefreshToken>,
    private usersService: UsersService,
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

    const accessToken = await this.jwtService.signAsync({ id: user.id });

    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
        isRefreshToken: true,
      },
      {
        expiresIn: appConfig.refreshTokenExpirationTime,
      },
    );

    const refreshTokenRecord = this.refreshTokensRepository.create({
      userId: user.id,
      token: refreshToken,
    });

    await this.refreshTokensRepository.save(refreshTokenRecord);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async register(email: string, password: string) {
    let user = await this.usersService.findByEmail(email, true);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await this.hashPassword(password);

    user = await this.usersService.register({ email, password: passwordHash });

    const accessToken = await this.jwtService.signAsync({ id: user.id });

    const refreshToken = await this.jwtService.signAsync({
      id: user.id,
      isRefreshToken: true,
    });

    const savedRefreshRecord = this.refreshTokensRepository.create({
      userId: user.id,
      token: refreshToken,
    });

    await this.refreshTokensRepository.save(savedRefreshRecord);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, storedPasswordHash: string) {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
