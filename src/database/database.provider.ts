import { DataSource } from 'typeorm';

export const databaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 81,
      username: 'postgres',
      password: '',
      database: 'kodoren',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    });

    return dataSource.initialize();
  },
};
