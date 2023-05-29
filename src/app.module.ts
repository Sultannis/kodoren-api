import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { datasource } from './database/data-source';

import { User } from './common/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { Course } from './common/entities/course.entity';
import { HealthModule } from './modules/health/health.module';
import { UserCourse } from './common/entities/user-course.entity';
import { Lesson } from './common/entities/lesson.entity';
import { LessonsModule } from './modules/lessons/lessons.module';
import { UserLesson } from './common/entities/user-lesson.entity';

@Module({
  imports: [
    UsersModule,
    LessonsModule,
    HealthModule,
    TypeOrmModule.forRoot({
      ...datasource,
      entities: [User, Course, Lesson, UserCourse, UserLesson],
      ssl:
        process.env.APP_ENV === 'local'
          ? false
          : {
              ca: process.env.CACERT,
            },
    }),
    AuthModule,
    CoursesModule,
  ],
})
export class AppModule {}
