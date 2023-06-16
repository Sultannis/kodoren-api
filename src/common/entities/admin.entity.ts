import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdminRefreshToken } from './admin-refresh-token.entity';
import { Exclude } from 'class-transformer';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => AdminRefreshToken, (token) => token.admin)
  refreshToken: AdminRefreshToken;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()',
  })
  updatedAt: Date;
}
