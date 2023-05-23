import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users-query.dto';

@UseInterceptors(ClassSerializerInterceptor)
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

  @Get(':userId')
  async findOne(@Param('userId') userId: number) {
    return {
      user: await this.usersService.findOneById(userId),
    };
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return {
      user: await this.usersService.update(userId, updateUserDto),
    };
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: number) {
    return {
      user: await this.usersService.softDelete(userId),
    };
  }
}
