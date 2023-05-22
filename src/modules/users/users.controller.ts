import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return {
      users: await this.usersService.findAll(),
    };
  }

  @Post(':userId/update')
  async update(@Param() userId: string, @Body() updateUserDto: UpdateUserDto) {
    return {
      user: await this.usersService.update(+userId, updateUserDto),
    };
  }
}
