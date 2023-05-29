import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from 'src/common/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(payload: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(payload);

    return this.tasksRepository.save(task);
  }
}
