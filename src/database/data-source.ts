import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const datasource: {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
} = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: 'postgres',
  password: '',
  database: 'kodoren',
};

export const AppDataSource = new DataSource({
  ...datasource,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  entities: ['src/modules/**/**.entity{.ts,.js}'],
});
