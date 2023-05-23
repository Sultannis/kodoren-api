import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users-query.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: FindAllUsersQueryDto) {
    const { page, perPage } = query;

    const [users, total] = await this.usersService.findAll(page, perPage);

    return {
      users,
      meta: {
        total,
        page,
      },
    };
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(userId);

    return {
      user: 'await this.usersService.update(userId, updateUserDto)',
      //user: await this.usersService.update(userId, updateUserDto),
    };
  }

  @Delete(':userId')
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    return {
      user: await this.usersService.softDelete(userId),
    };
  }
}
