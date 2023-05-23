import { UserCourse } from 'src/join-entities/user-courses.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
  })
  description: string;

  @Column({
    name: 'total_lessons',
    type: 'int',
  })
  totalLessons: number;

  @OneToMany(() => UserCourse, (userCourse) => userCourse.course)
  users: UserCourse[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  })
  createdAt: string;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()',
  })
  updatedAt: string;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: string;
}
