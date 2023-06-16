import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtDecodeInterceptor } from '../auth/interceptors/jwt-decode.interceptor';
import { Request } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards()
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return {
      course: await this.coursesService.create(createCourseDto),
    };
  }

  @UseInterceptors(JwtDecodeInterceptor)
  @Get()
  async findAll(@Req() req: Request) {
    return {
      courses: await this.coursesService.findAll(req.user?.id),
    };
  }

  @Get(':courseId')
  async findOne(@Param('courseId') courseId: number) {
    return {
      course: await this.coursesService.findOne(courseId),
    };
  }

  @Patch(':courseId')
  update(
    @Param('courseId') courseId: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(courseId, updateCourseDto);
  }

  @Delete(':courseId')
  delete(@Param('courseId') courseId: number) {
    return this.coursesService.softDelete(courseId);
  }
}
