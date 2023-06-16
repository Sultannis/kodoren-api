import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRefreshToken } from 'src/common/entities/user-refresh-token.entity';
import { AdminRefreshToken } from 'src/common/entities/admin-refresh-token.entity';
import { AdminsModule } from '../admins/admins.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRefreshToken, AdminRefreshToken]), UsersModule, AdminsModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
