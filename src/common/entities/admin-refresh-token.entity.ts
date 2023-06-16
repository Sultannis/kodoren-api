import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from './admin.entity';

@Entity('admin_refresh_tokens')
export class AdminRefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'admin_id',
    type: 'bigint',
  })
  adminId: number;

  @JoinColumn({ name: 'admin_id' })
  @OneToOne(() => Admin, (admin) => admin.refreshToken)
  admin: Admin;

  @Column({
    name: 'token',
    type: 'varchar',
  })
  token: string;
}
