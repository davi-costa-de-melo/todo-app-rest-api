import { env } from './env/index'
import { knex as knexSetup, Knex } from 'knex'

const { DATABASE_CLIENT, DATABASE_URL } = env

export const config: Knex.Config = {
  client: DATABASE_CLIENT,
  connection:
    DATABASE_CLIENT === 'sqlite3'
      ? {
          filename: DATABASE_URL,
        }
      : DATABASE_URL,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
  useNullAsDefault: true,
}

export const knex = knexSetup(config)
