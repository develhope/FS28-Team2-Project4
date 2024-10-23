import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const postgreConnect = pgPromise();

const settings = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'stayfit_database',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Admin',
};

export const database = postgreConnect(settings);
