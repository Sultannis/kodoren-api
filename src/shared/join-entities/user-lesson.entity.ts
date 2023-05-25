import { Lesson } from '../../modules/lessons/entities/lesson.entity';
import { User } from '../../modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_lessons')
export class UserLesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.lessons)
  user: User;

  @Column({
    name: 'lesson_id',
    type: 'bigint',
  })
  lessonId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.users)
  lesson: Lesson;

  @Column({
    name: 'completed_at',
    type: 'timestamp',
  })
  completedAt: Date;
}
