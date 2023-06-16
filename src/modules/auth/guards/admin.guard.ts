import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { UserRefreshToken } from 'src/common/entities/user-refresh-token.entity';
import { appConfig } from 'src/config/app.config';
import { Repository } from 'typeorm';
import { generateAndSaveRefreshToken } from '../helpers/generate-and-save-refresh-token';
import { generateAccessToken } from '../helpers/generate-access-token';
import { RequestUser } from '../entities/request-user.entity';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @InjectRepository(UserRefreshToken)
    private refreshTokenRepository: Repository<UserRefreshToken>,
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
      const requestUser: RequestUser = await this.jwtService.verifyAsync(accessToken, {
        secret: appConfig.jwtSecret,
      });

      if (!requestUser.isAdmin) {
        throw new ForbiddenException();
      }

      request.user = requestUser;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        const requestUser = await this.jwtService.verifyAsync(accessToken, {
          secret: appConfig.jwtSecret,
          ignoreExpiration: true,
        });

        await this.checkRefreshTokenAndReturnNewAccessToken(requestUser.id, refreshToken, response);

        request.user = requestUser;
      } else if (err instanceof ForbiddenException) {
        throw err;
      } else {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }
    }

    return true;
  }

  private async checkRefreshTokenAndReturnNewAccessToken(userId: number, refreshToken: string, response: Response) {
    try {
      const userRefreshToken = await this.refreshTokenRepository.findOneBy({
        userId,
      });
      if (!userRefreshToken) {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }

      await this.deleteUserRefreshToken(userId);

      await this.jwtService.verifyAsync(refreshToken, {
        secret: appConfig.jwtSecret,
      });

      if (userRefreshToken.token !== refreshToken) {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }

      const newRefreshToken = await generateAndSaveRefreshToken(userId, this.jwtService, this.refreshTokenRepository);

      const newAccessToken = await generateAccessToken(userId, this.jwtService);

      response.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: appConfig.tokenCookieMaxAge,
      });

      response.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: appConfig.tokenCookieMaxAge,
      });
    } catch (err) {
      this.clearCookiesAndThrowUnauthorizedException(response);
    }
  }

  private clearCookiesAndThrowUnauthorizedException(response: Response) {
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');

    throw new UnauthorizedException();
  }

  private deleteUserRefreshToken(userId: number) {
    return this.refreshTokenRepository.delete({ userId });
  }
}
