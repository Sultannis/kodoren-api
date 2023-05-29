import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'lesson_id',
    type: 'bigint',
  })
  lessonId: number;

  @JoinColumn({ name: 'lesson_id' })
  @ManyToOne(() => Lesson, (lesson) => lesson.tasks)
  lesson: Lesson;

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string;

  @Column({
    name: 'code_to_include',
    type: 'jsonb',
  })
  codeToInclude: string[];

  @Column({
    name: 'code_to_exclude',
    type: 'jsonb',
  })
  codeToExclude: string[];
}
