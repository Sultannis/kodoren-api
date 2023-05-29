import { Injectable, NotFoundException } from '@nestjs/common';
import { Lesson } from '../../common/entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { CoursesService } from '../courses/courses.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllLessonsDto } from './dto/find-all-lessons.dto';

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

  async findAll({
    page,
    perPage,
    courseId,
  }: FindAllLessonsDto): Promise<[lessons: Lesson[], total: number]> {
    return this.lessonsRepository.findAndCount({
      where: {
        courseId: courseId ?? null,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  async findOneById(lessonId: number): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findOne({
      where: { id: lessonId },
      relations: ['tasks'],
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }
}
