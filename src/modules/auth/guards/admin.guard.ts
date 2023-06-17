import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { appConfig } from 'src/config/app.config';
import { Repository } from 'typeorm';
import { generateAndSaveAdminRefreshToken } from '../helpers/generate-and-save-refresh-token';
import { generateAccessToken } from '../helpers/generate-access-token';
import { RequestUser } from '../entities/request-user.entity';
import { TokenExpiredError } from 'jsonwebtoken';
import { AdminRefreshToken } from 'src/common/entities/admin-refresh-token.entity';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @InjectRepository(AdminRefreshToken)
    private refreshTokenRepository: Repository<AdminRefreshToken>,
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

  private async checkRefreshTokenAndReturnNewAccessToken(adminId: number, refreshToken: string, response: Response) {
    try {
      const userRefreshToken = await this.refreshTokenRepository.findOneBy({
        adminId: adminId,
      });
      if (!userRefreshToken) {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }

      await this.deleteAdminRefreshToken(adminId);

      await this.jwtService.verifyAsync(refreshToken, {
        secret: appConfig.jwtSecret,
      });

      if (userRefreshToken.token !== refreshToken) {
        this.clearCookiesAndThrowUnauthorizedException(response);
      }

      const newRefreshToken = await generateAndSaveAdminRefreshToken(adminId, this.jwtService, this.refreshTokenRepository);

      const newAccessToken = await this.jwtService.signAsync({ id: adminId, isAdmin: true }, { expiresIn: appConfig.accessTokenExpirationTime });

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

  private deleteAdminRefreshToken(adminId: number) {
    return this.refreshTokenRepository.delete({ adminId });
  }
}
