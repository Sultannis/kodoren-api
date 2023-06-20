import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users-query.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UserGuard } from '../auth/guards/user.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AdminGuard)
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

  @UseGuards(UserGuard)
  @Get(':userId')
  async findOne(@Param('userId') userId: number) {
    return {
      user: await this.usersService.findOneById(userId),
    };
  }

  @UseGuards(UserGuard)
  @Patch(':userId')
  async update(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return {
      user: await this.usersService.update(userId, updateUserDto),
    };
  }

  @UseGuards(UserGuard)
  @Delete(':userId')
  async delete(@Param('userId') userId: number) {
    return {
      user: await this.usersService.softDelete(userId),
    };
  }
}
