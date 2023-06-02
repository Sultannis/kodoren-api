import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { RefreshToken } from 'src/common/entities/refresh-token.entity';
import { appConfig } from 'src/config/app.config';
import { Repository } from 'typeorm';
import { generateAndSaveRefreshToken } from '../helpers/generate-refresh-token';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  private tokenCookieMaxAge = 1000 * 60 * 60 * 12 * 365;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { accessToken, refreshToken } = request.cookies;
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: appConfig.jwtSecret,
      });

      request['user'] = payload;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const user = await this.jwtService.verifyAsync(accessToken, {
          secret: appConfig.jwtSecret,
          ignoreExpiration: true,
        });

        await this.checkRefreshTokenAndReturnNewAccessToken(
          refreshToken,
          user.id,
          response,
        );
      } else {
        throw new UnauthorizedException();
      }
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: appConfig.jwtSecret,
      });

      request['user'] = payload;
    } catch {}
    return true;
  }

  private async checkRefreshTokenAndReturnNewAccessToken(
    refreshToken: string,
    userId: number,
    response: Response,
  ) {
    try {
      const userRefreshToken = await this.refreshTokenRepository.findOneBy({
        userId,
      });

      if (!userRefreshToken) {
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');

        throw new UnauthorizedException();
      }

      await this.deleteUserRefreshToken(userId);

      await this.jwtService.verifyAsync(refreshToken, {
        secret: appConfig.jwtSecret,
      });

      if (userRefreshToken.token !== refreshToken) {
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');
        throw new UnauthorizedException();
      }

      const newRefreshToken = await generateAndSaveRefreshToken(
        userId,
        this.jwtService,
        this.refreshTokenRepository
      );

      const newAccessToken = await this.genearateAccessToken(userId);

      response.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: this.tokenCookieMaxAge,
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private genearateAccessToken(userId: number): Promise<string> {
    return this.jwtService.signAsync({ id: userId });
  }

  private deleteUserRefreshToken(userId: number) {
    return this.refreshTokenRepository.delete({ userId });
  }
}
