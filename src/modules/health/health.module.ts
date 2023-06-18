import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRefreshToken } from 'src/common/entities/user-refresh-token.entity';
import { AdminRefreshToken } from 'src/common/entities/admin-refresh-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRefreshToken, AdminRefreshToken])],
  controllers: [HealthController],
})
export class HealthModule {}
