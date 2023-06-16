import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserCourse } from './user-course.entity';
import { UserLesson } from './user-lesson.entity';
import { UserRefreshToken } from './user-refresh-token.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
  })
  lastName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;

  @OneToMany(() => UserCourse, (userCourse) => userCourse.user)
  courses: UserCourse[];

  @OneToMany(() => UserLesson, (userLesson) => userLesson.user)
  lessons: UserLesson[];

  @OneToOne(() => UserRefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: UserRefreshToken[];

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
