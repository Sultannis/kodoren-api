/* eslint-disable no-console */
import { AppDataSource } from '../data-source';
import { seedAdmins } from './seeders/admin.seeder';
import { seedCourses } from './seeders/courses.seeder';
import { seedLessons } from './seeders/lessons.seeder';
import { seedTasks } from './seeders/tasks.seeder';
import { seedUsers } from './seeders/users.seeder';

const main = async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log('Fatal error: Failed to initialize database connection');
  }

  try {
    await seedUsers();
    await seedCourses();
    await seedLessons();
    await seedTasks();
    await seedAdmins();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  process.exit();
};

main();
