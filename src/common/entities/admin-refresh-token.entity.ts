import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from './admin.entity';

@Entity('admin_refresh_tokens')
export class AdminRefreshToken {
  @PrimaryColumn({
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
