import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('health')
export class HealthController {
  @UseGuards(AdminGuard)
  @Get()
  healthCheck(): string {
    return 'OK';
  }
}
