import { Injectable } from '@nestjs/common';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonsDto } from './dto/create-lessons.dto';

@Injectable()
export class LessonService {
  constructor(private lessonsRespository: Repository<Lesson>) {}

  async create(payload: CreateLessonsDto): Promise<Lesson> {
    const lesson = this.lessonsRespository.create(payload);

    return this.lessonsRespository.save(lesson);
  }
}
