import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UserDecodeInterceptor } from '../auth/interceptors/user-decode.interceptor';
import { Request } from 'express';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return {
      course: await this.coursesService.create(createCourseDto),
    };
  }

  @UseInterceptors(UserDecodeInterceptor)
  @Get()
  async findAll(@Req() req: Request) {
    return {
      courses: await this.coursesService.findAll(req.user?.id),
    };
  }

  @UseInterceptors(UserDecodeInterceptor)
  @Get(':courseId')
  async findOne(@Param('courseId') courseId: number) {
    return {
      course: await this.coursesService.findOne(courseId),
    };
  }

  @UseGuards(AdminGuard)
  @Patch(':courseId')
  update(@Param('courseId') courseId: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(courseId, updateCourseDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':courseId')
  delete(@Param('courseId') courseId: number) {
    return this.coursesService.softDelete(courseId);
  }
}
