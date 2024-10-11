import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const postgreConnect = pgPromise();

const settings = {
    host: 'localhost',
    port: 5432,
    database: 'stayfit_database',
    user: 'postgres',
    password: 'Admin'
};

export const database = postgreConnect(settings);
