import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { appConfig } from 'src/config/app.config';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthService } from '../auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { accessToken, refreshToken } = request.cookies;
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.authService.verifyToken({ token: accessToken });

      request.user = user;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        const user = await this.authService.verifyToken({ token: accessToken, ignoreExpiration: true });

        await this.checkRefreshTokenAndSetNewAccessToken(refreshToken, user.id, response);

        request['user'] = user;
      } else {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }
    }

    return true;
  }

  private async checkRefreshTokenAndSetNewAccessToken(refreshToken: string, userId: number, response: Response) {
    try {
      const userRefreshToken = await this.authService.findUserRefreshToken(userId);

      if (!userRefreshToken) {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }

      await this.authService.deleteUserRefreshToken(userId);

      await this.authService.verifyToken({ token: refreshToken });

      if (userRefreshToken.token !== refreshToken) {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }

      const newRefreshToken = await this.authService.generateAndSaveUserRefreshToken(userId);

      const newAccessToken = await this.authService.generateAccessToken({ id: userId });

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
}
