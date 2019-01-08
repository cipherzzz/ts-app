import {
    ConnectionOptions,
    createConnection,
    getConnectionOptions,
} from "typeorm";

export const initializeDbConnection = async () => {
    // Set defaults
    const connectionOptions: ConnectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
        connection: "postgres",
        logging: "true",
        synchronize: "true",
    });

    // Add Cloudsql required param
    if (process.env.CLOUDSQL) {
        Object.assign(connectionOptions, {
            extra: { socketPath: process.env.CLOUDSQL },
        });
        return createConnection(connectionOptions);
    }

    return createConnection(connectionOptions);
};
