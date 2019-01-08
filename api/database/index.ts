import knex from "knex";

const config = {
    client: "postgresql",
    connection: {
        database: process.env.PG_DB,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
    },
};

const db = knex(config);
export default db;
