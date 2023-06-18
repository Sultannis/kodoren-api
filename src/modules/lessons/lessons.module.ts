import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from '../../common/entities/lesson.entity';
import { CoursesModule } from '../courses/courses.module';
import { UserLesson } from 'src/common/entities/user-lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, UserLesson]), CoursesModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
