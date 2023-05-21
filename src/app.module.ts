import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { datasource } from './database/data-source';

import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      ...datasource,
      entities: [User],
    }),
    AuthModule,
    CoursesModule,
  ],
})
export class AppModule {}
