import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return {
      task: await this.tasksService.create(createTaskDto),
    };
  }
}
