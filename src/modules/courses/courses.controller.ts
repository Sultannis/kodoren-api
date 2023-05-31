import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return {
      course: await this.coursesService.create(createCourseDto),
    };
  }

  @Get()
  async findAll() {
    return {
      courses: await this.coursesService.findAll(),
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
