/* eslint-disable no-console */
import { AppDataSource } from '../data-source';
import { seedCourses } from './seeders/courses.seeder';
import { seedUsers } from './seeders/users.seeder';

const main = async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log('Fatal error: Failed to initialize Data Source');
  }

  try {
    await seedUsers();

    await seedCourses();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  process.exit();
};

main();
