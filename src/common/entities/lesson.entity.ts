import { UserLesson } from './user-lesson.entity';
import { Course } from './course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'course_id',
    type: 'bigint',
  })
  courseId: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({
    name: 'free',
    type: 'boolean',
    default: false,
  })
  free: boolean;

  @Column({
    name: 'theory_content_url',
    type: 'varchar',
  })
  theoryContentUrl: string;

  @Column({
    name: 'code_content_url',
    type: 'varchar',
  })
  codeContentUrl: string;

  @Column({
    name: 'code_file_extension',
    type: 'varchar',
  })
  codeFileExtension: string;

  @OneToMany(() => UserLesson, (userLesson) => userLesson.lesson)
  users: UserLesson[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()',
  })
  updatedAt: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: string;
}
