import { AppDataSource } from '../../data-source';
import { Task } from '../../../common/entities/task.entity';

const TASKS = [
  {
    description: 'Remove the comment from the link tag',
    lessonId: 1,
    codeToInclude: [],
    codeToExclude: ['<!--', '-->'],
  },
];

export const seedTasks = async () => {
  const repository = AppDataSource.getRepository(Task);

  await repository.insert(TASKS);

  console.log('Seeded: Tasks');
};
