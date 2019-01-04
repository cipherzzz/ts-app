import bodyParser from "body-parser";
import chalk from "chalk";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import methodOverride from "method-override";
import "reflect-metadata";
import { getConnection } from "typeorm";

import { initializeDbConnection } from "./config/postgres";
import "./controllers/widgets-controller";
import { RegisterRoutes } from "./routes";
import { log } from "./utils/log";

dotenv.config();

export async function server() {
    let connection;
    try {
        connection = getConnection();
        if (connection.isConnected) {
            await connection.close();
        } else {
            initializeDbConnection().catch((error) => {
                log(
                  chalk.redBright(
                      `Error connecting to Database:${error}`,
                  ),
              );
            });
        }
    } catch (error) {
        initializeDbConnection().catch((error) => {
          log(
            chalk.redBright(
              `Error connecting to Database:${error}`,
            ),
        );
        });
    }

    const app = express()
        .use(bodyParser.urlencoded({ extended: true }))
        .use(bodyParser.json())
        .use(methodOverride())
        .use((_req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                `Origin, X-Requested-With, Content-Type, Accept, Authorization`,
            );
            next();
        });

    RegisterRoutes(app);

    interface IError {
        status?: number;
        fields?: string[];
        message?: string;
        name?: string;
    }

    app.use(
        (
            err: IError,
            _req: express.Request,
            res: express.Response,
            next: express.NextFunction,
        ) => {
            const status = err.status || 500;
            const body = {
                fields: err.fields || undefined,
                message: err.message || "An error occurred during the request.",
                name: err.name,
                status,
            };
            res.status(status).json(body);
            next();
        },
    );

    const port = 3000;

    return new Promise<http.Server>((resolve) => {
        const s = app.listen(port, () => {
            log(
                chalk.blueBright(
                    `✓ Started API server at http://localhost:${port}`,
                ),
            );
            resolve(s);
        });
    });
}
