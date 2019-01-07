import { createConnection, getConnectionOptions } from "typeorm";

export const initializeDbConnection = async () => {
    // Set defaults
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
        connection: "postgres",
        entities: ["api/database/entities/*.ts"],
        logging: "false",
        synchronize: "true",
    });

    // Add Cloudsql required param
    if (process.env.CLOUDSQL) {
        Object.assign(connectionOptions, {
            extra: { socketPath: process.env.CLOUDSQL },
        });
    }

    return createConnection(connectionOptions);
};
