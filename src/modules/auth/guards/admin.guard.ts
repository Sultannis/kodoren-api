import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { appConfig } from 'src/config/app.config';
import { RequestUser } from '../entities/request-user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { accessToken, refreshToken } = request.cookies;
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const admin: RequestUser = await this.authService.verifyToken({ token: accessToken });

      if (!admin.isAdmin) {
        throw new ForbiddenException();
      }

      request.user = admin;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        const admin = await this.authService.verifyToken({ token: accessToken, ignoreExpiration: true });

        await this.checkRefreshTokenAndSetNewTokenPair(admin.id, refreshToken, response);

        request.user = admin;
      } else if (err instanceof ForbiddenException) {
        throw err;
      } else {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }
    }

    return true;
  }

  private async checkRefreshTokenAndSetNewTokenPair(adminId: number, refreshToken: string, response: Response) {
    try {
      const adminRefreshToken = await this.authService.findAdminRefreshToken(adminId);
      if (!adminRefreshToken) {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }

      await this.authService.deleteAdminRefreshToken(adminId);

      await this.authService.verifyToken({ token: refreshToken });

      if (adminRefreshToken.token !== refreshToken) {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }

      const newRefreshToken = await this.authService.generateAndSaveAdminRefreshToken(adminId);
      const newAccessToken = await this.authService.generateAccessToken({ id: adminId, isAdmin: true });

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
