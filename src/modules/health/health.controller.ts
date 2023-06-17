import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('health')
export class HealthController {
  @UseGuards(JwtGuard)
  @Get()
  healthCheck(): string {
    return 'OK';
  }
}
