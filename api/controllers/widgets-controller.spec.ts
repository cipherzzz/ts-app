import * as dotenv from "dotenv";
import { expect } from "chai";
import { WidgetsController } from "./widgets-controller";

dotenv.config();

describe("WidgetsController", () => {
    const controller = new WidgetsController();

    it("should return something", async () => {
        const widgets = await controller.GetWidgets();
        expect(widgets.length).to.be.greaterThan(0);
    });
});
