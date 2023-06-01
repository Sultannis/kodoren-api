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
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { RegisterDto } from './dto/register.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private refreshCookieMaxAge = 1000 * 60 * 60 * 12 * 365;

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Res({ passthrough: true }) res: Response,
    @Body() logInDto: LogInDto,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.logIn(
      logInDto.email,
      logInDto.password,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: this.refreshCookieMaxAge,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 30,
    });

    return {
      user,
    };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { authToken, user } = await this.authService.register(
      registerDto.email,
      registerDto.password,
    );

    return {
      authToken,
      user,
    };
  }
}
