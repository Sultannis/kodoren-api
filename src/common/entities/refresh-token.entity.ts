import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @Column({
    name: 'token',
    type: 'varchar',
  })
  token: string;
}
