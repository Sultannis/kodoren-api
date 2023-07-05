import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { TokenExpiredError } from 'jsonwebtoken';
import { appConfig } from 'src/config/app.config';
import { AuthService } from '../auth.service';

@Injectable()
export class UserDecodeInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { accessToken, refreshToken } = request.cookies;

    if (!accessToken || !refreshToken) {
      return next.handle();
    }

    try {
      const payload = await this.authService.verifyToken({ token: accessToken });

      request.user = payload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        const user = await this.authService.verifyToken({ token: accessToken, ignoreExpiration: true });

        await this.checkRefreshTokenAndReturnNewAccessToken(refreshToken, user.id, response);

        request.user = user;
      } else {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }
    }

    return next.handle();
  }

  private async checkRefreshTokenAndReturnNewAccessToken(refreshToken: string, userId: number, response: Response) {
    try {
      const userRefreshToken = await this.authService.findUserRefreshToken(userId);
      if (!userRefreshToken) {
        userRefreshToken;
        this.clearCookiesAndThrowUnauthorizedException(response);
      }

      await this.authService.deleteUserRefreshToken(userId);

      await this.authService.verifyToken({
        token: refreshToken,
      });

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

  private clearCookiesAndThrowUnauthorizedException(response: Response): never {
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');

    throw new UnauthorizedException();
  }
}
