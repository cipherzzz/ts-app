import chokidar from "chokidar";
import { checkRedis } from "./steps/check-redis";
import { generateExpressRoutes } from "./steps/gen-routes";
import { registerQuitKey } from "./steps/register-quit-key";
import { startApi } from "./steps/start-api";
import { startDocker } from "./steps/start-docker";
import { debounce } from "./utils/debounce";

(async () => {
    await startDocker();

    try {
        await Promise.all([checkRedis()]);
    } catch (err) {
        process.exit(1);
    }

    await Promise.all([generateExpressRoutes().then(() => startApi())]);

    const regenerateRoutes = debounce(async (args) => {
        const routesChanged =
            args.indexOf("server.ts") !== -1 ||
            args.indexOf("api/controllers") !== -1;

        if (routesChanged) {
            await Promise.all([generateExpressRoutes()]);
        } else {
            await startApi();
        }
    }, 100);

    chokidar.watch("./api/**/*.ts").on("change", regenerateRoutes);

    registerQuitKey();
})();
