import { createConnection, getConnectionOptions } from "typeorm";

export const initializeDbConnection = async () => {
    if (process.env.CLOUDSQL) {
        const connectionOptions = await getConnectionOptions();
        Object.assign(connectionOptions, {
            extra: { socketPath: process.env.CLOUDSQL },
        });
        return createConnection(connectionOptions);
    } else {
        return createConnection();
    }
};
