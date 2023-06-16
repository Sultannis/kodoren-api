import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_refresh_tokens')
export class UserRefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User, (user) => user.refreshToken)
  user: User;

  @Column({
    name: 'token',
    type: 'varchar',
  })
  token: string;
}
