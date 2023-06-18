import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { datasourceOptions } from './database/data-source';

import { AuthModule } from './modules/auth/auth.module';
import { User } from './common/entities/user.entity';
import { CoursesModule } from './modules/courses/courses.module';
import { Course } from './common/entities/course.entity';
import { HealthModule } from './modules/health/health.module';
import { UserCourse } from './common/entities/user-course.entity';
import { Lesson } from './common/entities/lesson.entity';
import { LessonsModule } from './modules/lessons/lessons.module';
import { UserLesson } from './common/entities/user-lesson.entity';
import { TasksModule } from './modules/tasks/tasks.module';
import { Task } from './common/entities/task.entity';
import { UserRefreshToken } from './common/entities/user-refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from './config/app.config';
import { AdminRefreshToken } from './common/entities/admin-refresh-token.entity';
import { Admin } from './common/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...datasourceOptions,
      entities: [User, Course, Lesson, UserCourse, UserLesson, Task, UserRefreshToken, Admin, AdminRefreshToken],
      ssl:
        process.env.APP_ENV === 'local'
          ? false
          : {
              ca: process.env.CACERT,
            },
    }),
    JwtModule.register({
      global: true,
      secret: appConfig.jwtSecret,
      signOptions: { expiresIn: appConfig.accessTokenExpirationTime },
    }),
    HealthModule,
    UsersModule,
    LessonsModule,
    AuthModule,
    CoursesModule,
    TasksModule,
  ],
})
export class AppModule {}
