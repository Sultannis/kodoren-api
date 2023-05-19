import { config } from 'dotenv';
config();

export const appConfig = {
  jwtSecret: process.env.JWT_SECRET,
};
