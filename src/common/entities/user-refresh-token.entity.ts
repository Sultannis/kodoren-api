import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_refresh_tokens')
export class UserRefreshToken {
  @PrimaryColumn({
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
