import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ShardNames } from '../common/constants/shard.enum';

import {  config as dotenvConfig, } from 'dotenv';
dotenvConfig();

const entitiesPath = [__dirname + '/../**/*.entity.{js,ts}'];
const migrationsPathShard1 = [__dirname + '/../migrations/shard1/**/*.{ts,js}'];
const migrationsPathShard2 = [__dirname + '/../migrations/shard2/**/*.{ts,js}'];

export const Shard_1: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST_1,
  port: parseInt(process.env.DB_PORT_1 ?? '5433'),
  username: process.env.DB_USER_1,
  password: process.env.DB_PASSWORD_1,
  database: process.env.DB_NAME_1,
  entities: entitiesPath,
  migrations: migrationsPathShard1,
  migrationsRun: false,
  synchronize: false,
  logging: true,
};

export const Shard_2: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST_2,
  port: parseInt(process.env.DB_PORT_2 ?? '5434'),
  username: process.env.DB_USER_2,
  password: process.env.DB_PASSWORD_2,
  database: process.env.DB_NAME_2,
  entities: entitiesPath,
  migrations: migrationsPathShard2,
  migrationsRun: false,
  synchronize: false,
  logging: true,
};

export default registerAs('typeorm', () => ({
  [ShardNames.SHARD1]: Shard_1,
  [ShardNames.SHARD2]: Shard_2,
}));

export const datasource__shard1 = new DataSource(Shard_1);
export const datasource__shard2 = new DataSource(Shard_2);