import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(createCourseDto);

    return this.coursesRepository.save(course);
  }

  findAll(): Promise<Course[]> {
    return this.coursesRepository
      .createQueryBuilder()
      .loadRelationCountAndMap('Course.totalLessons', 'Course.lessons')
      .getMany();
  }

  async findOne(courseId: number): Promise<Course> {
    const course = await this.coursesRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    return course;
  }

  async update(courseId: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesRepository.findOneBy({ id: courseId });

    return course;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
