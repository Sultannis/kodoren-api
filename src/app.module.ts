import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { datasource } from './database/data-source';

import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { Course } from './modules/courses/entities/course.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      ...datasource,
      entities: [User, Course],
      ssl:
        process.env.APP_ENV === process.env.Local
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
