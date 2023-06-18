import { AppDataSource } from '../../data-source';
import { Admin } from '../../../common/entities/admin.entity';

const ADMINS = [
  {
    email: 'admin1@gmail.com',
    password: '$2b$10$B6n1UJP9Q4G4oGa6KamIXOibx09O50aVdXEosqk4xYor1WiOf90bW',
    firstName: 'Admin',
    lastName: 'Adminovich',
  },
];

export const seedAdmins = async () => {
  const repository = AppDataSource.getRepository(Admin);

  await repository.insert(ADMINS);

  console.log('Seeded: Admins');
};
