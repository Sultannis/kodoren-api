import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { PaginationDto } from 'src/shared/common-dto/pagination.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post()
  async create(@Body() createLessonsDto: CreateLessonsDto) {
    return this.lessonsService.create(createLessonsDto);
  }

  @Get()
  async findAll(@Query() query: PaginationDto) {
    return this.lessonsService.findAll(query.page, query.perPage);
  }
}
