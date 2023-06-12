import { Course } from './course.entity';
import { User } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_courses')
export class UserCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @ManyToOne(() => User, (User) => User.courses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'course_id',
    type: 'bigint',
  })
  courseId: number;

  @ManyToOne(() => Course, (Course) => Course.users)
  @JoinColumn({ name: 'user_id' })
  course: Course;

  @Column({
    name: 'completed_at',
    type: 'timestamp',
  })
  completedAt: string;
}
