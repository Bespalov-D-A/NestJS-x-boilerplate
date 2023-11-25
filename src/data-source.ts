import { DataSource  } from 'typeorm';
import { SeederOptions} from 'typeorm-extension';
import 'dotenv/config';
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
export const DBoptions: PostgresConnectionOptions & SeederOptions = {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: String(process.env.POSTGRES_PASSWORD),
        database: process.env.POSTGRES_DB,
        entities: ['src/**/*.entity{.js,.ts}'],
        seeds: ['src/database/seeds/*.seed{.ts,.js}']
    }

export const dataSource = new DataSource(DBoptions);