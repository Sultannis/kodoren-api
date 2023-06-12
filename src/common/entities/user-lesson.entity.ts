import { Lesson } from './lesson.entity';
import { User } from './user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_lessons')
export class UserLesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.lessons)
  user: User;

  @Column({
    name: 'lesson_id',
    type: 'bigint',
  })
  lessonId: number;

  @JoinColumn({ name: 'lesson_id' })
  @ManyToOne(() => Lesson, (lesson) => lesson.users)
  lesson: Lesson;

  @Column({
    name: 'completed_at',
    type: 'timestamp',
  })
  completedAt: Date;
}
