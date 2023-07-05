import { Body, Controller, Post, Get, Query, Param, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { LessonsService } from './lessons.service';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { FindAllLessonsDto } from './dto/find-all-lessons.dto';
import { UserGuard } from '../auth/guards/user.guard';
import { UserDecodeInterceptor } from '../auth/interceptors/user-decode.interceptor';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createLessonsDto: CreateLessonsDto) {
    return this.lessonsService.create(createLessonsDto);
  }

  @UseInterceptors(UserDecodeInterceptor)
  @Get()
  async findAll(@Req() req: Request, @Query() query: FindAllLessonsDto) {
    const { page } = query;

    const [lessons, total] = await this.lessonsService.findAll({
      ...query,
      userId: req.user?.id,
    });

    return {
      lessons,
      meta: {
        total,
        page,
      },
    };
  }

  @UseInterceptors(UserDecodeInterceptor)
  @Get(':lessonId')
  async findOne(@Req() req: Request, @Param('lessonId') lessonId: number) {
    const userId = req.user?.id;

    return {
      lesson: await this.lessonsService.findOneById(lessonId, userId),
    };
  }

  @UseGuards(UserGuard)
  @Post(':lessonId/complete')
  async setAsCompleted(@Param('lessonId') lessonId: number, @Req() req: Request) {
    return {
      lesson: await this.lessonsService.setAsCompleted(lessonId, req.user?.id),
    };
  }
}
