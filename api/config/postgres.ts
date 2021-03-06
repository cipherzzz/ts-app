import Knex = require("knex");
let knex: any;
export function getDB() {
    if (knex && knex("widget")) {
        return knex;
    }

    const config = {
        database: process.env.PG_DB,
        password: process.env.PG_PASSWORD,
        user: process.env.PG_USER,
    };

    if (process.env.INSTANCE_CONNECTION_NAME) {
        Object.assign(config, {
            host: process.env.INSTANCE_CONNECTION_NAME,
        });
    }

    knex = Knex({
        client: "pg",
        connection: config,
    });

    return knex;
}

export async function dropTables() {
    const db = getDB();
    const tables = await db
        .select("table_name")
        .from("information_schema.tables")
        .where({
            table_schema: "public",
        });

    // drop each table in the database
    for (const table of tables) {
        await db.raw(`DROP TABLE IF EXISTS ${table.table_name} CASCADE`);
    }

    process.exit();
}
