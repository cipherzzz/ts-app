import Redis from "ioredis";

const createClient = () => {
    const host = process.env.REDIS_HOST;
    const port = process.env.REDIS_PORT;
    const pw = process.env.REDIS_PASSWORD;
    const db = process.env.REDIS_DB_INDEX;
    const url = "redis://:" + pw + "@" + host + ":" + port + "/" + db;
    return new Redis(url);
};

const clients: { [key: string]: Redis.Redis | undefined } = {};

export const getRedisClient = (key = "default") => {
    let client = clients[key];
    if (!client) {
        client = clients[key] = createClient();
    }

    client.setMaxListeners(100);

    return client;
};
