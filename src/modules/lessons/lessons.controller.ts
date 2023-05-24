import { Body, Controller, Post, Get, Query, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { FindAllLessonsDto } from './dto/find-all-lessons.dto';

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

  @Get(':lessonId')
  async findOne(@Param('lessonId') lessonId: number) {
    return this.lessonsService.findOneById(lessonId);
  }
}
