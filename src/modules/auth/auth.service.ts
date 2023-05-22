import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }

    return {
      authToken: await this.jwtService.signAsync({ id: user.id }),
      user,
    };
  }

  async register(email: string, password: string) {
    let user = await this.usersService.findByEmail(email);
    if (user) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await this.hashPassword(password);

    user = await this.usersService.register({ email, password: passwordHash });

    return {
      authToken: await this.jwtService.signAsync({ id: user.id }),
      user,
    };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, storedPasswordHash: string) {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
