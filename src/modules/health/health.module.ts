import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRefreshToken } from 'src/common/entities/user-refresh-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRefreshToken])],
  controllers: [HealthController],
})
export class HealthModule {}
