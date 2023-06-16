import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../common/entities/course.entity';
import { UserRefreshToken } from 'src/common/entities/user-refresh-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, UserRefreshToken])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
