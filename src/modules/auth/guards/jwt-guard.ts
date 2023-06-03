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
import { generateAndSaveRefreshToken } from '../helpers/generate-and-save-refresh-token';
import { generateAccessToken } from '../helpers/generate-access-token';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

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
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');

        throw new UnauthorizedException();
      }
    }

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
        this.refreshTokenRepository,
      );

      const newAccessToken = await generateAccessToken(userId, this.jwtService);

      response.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: appConfig.tokenCookieMaxAge,
      });

      response.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: appConfig.tokenCookieMaxAge,
      });
    } catch (err) {
      response.clearCookie('accessToken');
      response.clearCookie('refreshToken');

      throw new UnauthorizedException();
    }
  }

  private deleteUserRefreshToken(userId: number) {
    return this.refreshTokenRepository.delete({ userId });
  }
}
