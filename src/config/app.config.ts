import { config } from 'dotenv';
config();

export const appConfig = {
  appEnv: process.env.APP_ENV,
  jwtSecret: process.env.JWT_SECRET,

  dbHost: process.env.DB_HOST,
  dbPort: +process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,

  caCert: process.env.CACERT,

  clientDomain: process.env.CLIENT_DOMAIN,

  tokenCookieMaxAge: 1000 * 60 * 60 * 12 * 365,

  refreshTokenExpirationTime: '30d',
  accessTokenExpirationTime: '20s',
};
