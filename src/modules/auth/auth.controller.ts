import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { RegisterDto } from './dto/register.dto';

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

    const { password, ...userWithoutPassword } = user;

    return {
      authToken,
      user: {
        ...userWithoutPassword,
      },
    };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { authToken, user } = await this.authService.register(
      registerDto.email,
      registerDto.password,
    );

    const { password, ...userWithoutPassword } = user;

    return {
      authToken,
      user: {
        ...userWithoutPassword,
      },
    };
  }
}
