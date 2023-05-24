import { Module } from '@nestjs/common';
import { LessonService } from './lessons.service';

@Module({
  providers: [LessonService],
})
export class LessonsModule {}
