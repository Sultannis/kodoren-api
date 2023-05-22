import { appConfig } from '../config/app.config';
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
  host: appConfig.dbHost,
  port: appConfig.dbPort,
  username: appConfig.dbUser,
  password: appConfig.dbPassword,
  database: appConfig.dbName,
};

export const AppDataSource = new DataSource({
  ...datasource,
  migrations: ['src/database/migrations/*{.ts,.js}'],
  entities: ['src/modules/**/**.entity{.ts,.js}'],
  ssl:
    appConfig.appEnv === 'local'
      ? false
      : {
          ca: appConfig.caCert,
        },
});
