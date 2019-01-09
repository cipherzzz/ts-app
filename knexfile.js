const dotenv = require("dotenv");
dotenv.config();

module.exports = {

  integration: {
    client: 'postgresql',
    connection: {
      database: process.env.PG_DB,
      user:     process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }
  }

};
