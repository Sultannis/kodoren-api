import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Lesson } from '../../common/entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { CoursesService } from '../courses/courses.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllLessonsDto } from './dto/find-all-lessons.dto';
import { UserLesson } from 'src/common/entities/user-lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(UserLesson)
    private userLessonsRepository: Repository<UserLesson>,
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

  async findOneById(lessonId: number, userId: number): Promise<Lesson> {
    const lesson = await this.lessonsRepository
      .createQueryBuilder('lesson')
      .where('lesson.id = :lessonId', { lessonId })
      .getOne();

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (userId) {
      const completed = await this.userLessonsRepository.findOneBy({
        lessonId,
        userId,
      });

      if (completed) {
        lesson['completedAt'] = completed.completedAt;
      } else {
        lesson['completedAt'] = null;
      }
    }

    return lesson;
  }

  async setAsCompleted(lessonId: number, userId: number) {
    const lesson = await this.lessonsRepository.findOneBy({
      id: lessonId,
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const completed = await this.userLessonsRepository.findOneBy({
      lessonId,
      userId,
    });
    if (completed) {
      throw new ConflictException('Lesson already completed');
    }

    const userLesson = this.userLessonsRepository.create({
      lessonId,
      userId,
    });

    await this.userLessonsRepository.save(userLesson);

    return lesson;
  }
}
