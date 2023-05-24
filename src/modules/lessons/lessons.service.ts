import { Injectable } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { CoursesService } from '../courses/courses.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    private coursesService: CoursesService,
  ) {}

  async create(payload: CreateLessonsDto): Promise<Lesson> {
    await this.coursesService.findOne(payload.courseId);

    const lesson = this.lessonsRepository.create(payload);

    return this.lessonsRepository.save(lesson);
  }

  async findAll(
    page: number,
    perPage: number,
  ): Promise<[lessons: Lesson[], total: number]> {
    return this.lessonsRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }
}
