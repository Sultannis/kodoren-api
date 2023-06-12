import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from '../../common/entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(createCourseDto);

    return this.coursesRepository.save(course);
  }

  findAll(userId: number): Promise<Course[]> {
    const coursesQuery = this.coursesRepository
      .createQueryBuilder('course')
      .loadRelationCountAndMap('course.totalLessons', 'course.lessons')
      .loadRelationCountAndMap(
        'course.freeLessons',
        'course.lessons',
        'lesson',
        (qb) => qb.where('lesson.free = :isFree', { isFree: true }),
      );

    if (userId) {
      coursesQuery.loadRelationCountAndMap(
        'course.completedLessons',
        'course.lessons',
        'lesson',
        (qb) =>
          qb
            .leftJoin('lesson.users', 'userLesson')
            .andWhere('userLesson.userId = :userId', { userId }),
      );
    }

    return coursesQuery.getMany();
  }

  async findOne(courseId: number): Promise<Course> {
    const course = await this.coursesRepository
      .createQueryBuilder('course')
      .leftJoin('course.lessons', 'lesson')
      .select(['course', 'lesson.id', 'lesson.title'])
      .where('course.id = :id', { id: courseId })
      .getOne();

    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    return course;
  }

  async update(courseId: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    await this.coursesRepository.update(courseId, updateCourseDto);
    return this.coursesRepository.findOneBy({ id: courseId });
  }

  async softDelete(courseId: number) {
    const course = await this.coursesRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    await this.coursesRepository.softDelete(courseId);

    return this.coursesRepository.findOne({
      where: { id: courseId },
      withDeleted: true,
    });
  }
}
