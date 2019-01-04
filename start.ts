import { generateExpressRoutes } from "./dev/steps/gen-routes";
import { startApi } from "./dev/steps/start-api";

(async () => {
    await Promise.all([generateExpressRoutes().then(() => startApi())]);
})();
