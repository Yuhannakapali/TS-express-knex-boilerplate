// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import  { Knex } from "knex";

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    }
  },
};


