import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { LessonsService } from './lessons.service';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { FindAllLessonsDto } from './dto/find-all-lessons.dto';
import { JwtGuard } from '../auth/guards/jwt-guard';
import { JwtDecodeInterceptor } from '../auth/interceptors/jwt-decode.interceptor';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  async create(@Body() createLessonsDto: CreateLessonsDto) {
    return this.lessonsService.create(createLessonsDto);
  }

  @Get()
  async findAll(@Query() query: FindAllLessonsDto) {
    const { page } = query;

    const [lessons, total] = await this.lessonsService.findAll(query);

    return {
      lessons,
      meta: {
        total,
        page,
      },
    };
  }

  @UseInterceptors(JwtDecodeInterceptor)
  @Get(':lessonId')
  async findOne(@Req() req: Request, @Param('lessonId') lessonId: number) {
    const userId = req.user?.id;

    return {
      lesson: await this.lessonsService.findOneById(lessonId, userId),
    };
  }

  @UseGuards(JwtGuard)
  @Post(':lessonId/complete')
  async setAsCompleted(@Param('lesson') lessonId: number, @Req() req: Request) {
    return {
      lesson: await this.lessonsService.setAsCompleted(lessonId, req.user.id),
    };
  }
}
