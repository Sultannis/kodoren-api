import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { RegisterDto } from './dto/register.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() logInDto: LogInDto) {
    const { authToken, user } = await this.authService.logIn(
      logInDto.email,
      logInDto.password,
    );

    return {
      authToken,
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
