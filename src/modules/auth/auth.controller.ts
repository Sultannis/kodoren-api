import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { RegisterDto } from './dto/register.dto';
import { appConfig } from 'src/config/app.config';
import { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() logInDto: LogInDto,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.login(
      logInDto.email,
      logInDto.password,
    );

    console.log('login');
    console.log(refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: appConfig.tokenCookieMaxAge,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: appConfig.tokenCookieMaxAge,
    });

    return {
      user,
    };
  }

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() registerDto: RegisterDto,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.register(
      registerDto.email,
      registerDto.password,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: appConfig.tokenCookieMaxAge,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: appConfig.tokenCookieMaxAge,
    });

    return {
      user,
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
  }
}
