import { AppDataSource } from '../../data-source';
import { User } from '../../../common/entities/user.entity';

const USERS = [
  {
    email: 'test1@gmail.com',
    password: '$2b$10$B6n1UJP9Q4G4oGa6KamIXOibx09O50aVdXEosqk4xYor1WiOf90bW',
    firstName: 'Test',
    lastName: 'Testovich',
  },
  {
    email: 'test2@gmail.com',
    password: '$2b$10$B6n1UJP9Q4G4oGa6KamIXOibx09O50aVdXEosqk4xYor1WiOf90bW',
    firstName: 'Test',
    lastName: 'Testovich',
  },
  {
    email: 'test3@gmail.com',
    password: '$2b$10$B6n1UJP9Q4G4oGa6KamIXOibx09O50aVdXEosqk4xYor1WiOf90bW',
    firstName: 'Test',
    lastName: 'Testovich',
  },
  {
    email: 'test4@gmail.com',
    password: '$2b$10$B6n1UJP9Q4G4oGa6KamIXOibx09O50aVdXEosqk4xYor1WiOf90bW',
    firstName: 'Test',
    lastName: 'Testovich',
  },
  {
    email: 'test5@gmail.com',
    password: '$2b$10$B6n1UJP9Q4G4oGa6KamIXOibx09O50aVdXEosqk4xYor1WiOf90bW',
    firstName: 'Test',
    lastName: 'Testovich',
  },
  {
    email: 'test6@gmail.com',
    password: '$2b$10$B6n1UJP9Q4G4oGa6KamIXOibx09O50aVdXEosqk4xYor1WiOf90bW',
    firstName: 'Test',
    lastName: 'Testovich',
  },
  {
    email: 'test7@gmail.com',
    password: '$2b$10$B6n1UJP9Q4G4oGa6KamIXOibx09O50aVdXEosqk4xYor1WiOf90bW',
    firstName: 'Test',
    lastName: 'Testovich',
  },
];

export const seedUsers = async () => {
  const repository = AppDataSource.getRepository(User);

  await repository.insert(USERS);

  console.log('Seeded: Users');
};
