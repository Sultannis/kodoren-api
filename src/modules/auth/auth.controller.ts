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
import { UserDecodeInterceptor } from './interceptors/user-decode.interceptor';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login/user')
  async loginUser(@Res({ passthrough: true }) res: Response, @Body() logInDto: LogInDto) {
    const { accessToken, refreshToken, user } = await this.authService.loginUser(logInDto.email, logInDto.password);

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
  @Post('login/admin')
  async loginAdmin(@Res({ passthrough: true }) res: Response, @Body() logInDto: LogInDto) {
    const { accessToken, refreshToken, admin } = await this.authService.loginAdmin(logInDto.email, logInDto.password);

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
      admin,
    };
  }

  @Post('register/user')
  async registerUser(@Res({ passthrough: true }) res: Response, @Body() registerDto: RegisterDto) {
    const { accessToken, refreshToken, user } = await this.authService.registerUser(
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

  @UseInterceptors(UserDecodeInterceptor)
  @Post('logout/user')
  async logoutUser(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logoutUser(req.user?.id);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
  }

  @UseInterceptors(UserDecodeInterceptor)
  @Post('logout/admin')
  async logoutAdmin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logoutAdmin(req.user?.id);

    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
  }
}
