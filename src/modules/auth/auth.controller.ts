import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { RegisterDto } from './dto/register.dto';
import { appConfig } from 'src/config/app.config';
import { Response, Request } from 'express';
import { JwtDecodeInterceptor } from './interceptors/jwt-decode.interceptor';

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

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: appConfig.tokenCookieMaxAge,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: appConfig.tokenCookieMaxAge,
    });

    return {
      user,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('admin/login')
  async adminLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() logInDto: LogInDto,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.adminLogin(
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
      sameSite: 'none',
      maxAge: appConfig.tokenCookieMaxAge,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: appConfig.tokenCookieMaxAge,
    });

    return {
      user,
    };
  }

  @UseInterceptors(JwtDecodeInterceptor)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.user?.id)

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
  }
}
