import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'lesson_id',
    type: 'bigint',
  })
  lessonId: number;

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string;

  @Column({
    name: 'code_to_include',
    type: 'text',
  })
  codeToInclude: string;
}
