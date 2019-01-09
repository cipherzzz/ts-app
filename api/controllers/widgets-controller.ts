import { Body, Delete, Get, Post, Put, Route, Tags } from "tsoa";
import { getRedisClient } from "../config/redis";
import { getDB } from "../config/postgres";

export interface IWidget {
    id?: number;
    label: string;
    color: string;
}

let redis: any = null;
let db: any = null;

@Route("widget")
export class WidgetsController {
    constructor() {
        redis = getRedisClient();
        db = getDB();
    }

    @Get()
    @Tags("Widget")
    public async GetWidgets(): Promise<IWidget[]> {
        /* A Redis usage example */
        const result = await redis.get("GetWidgets_Count");
        await redis.set("GetWidgets_Count", result ? Number(result) + 1 : 1);
        return db("widget");
    }

    @Get("{widgetId}")
    @Tags("Widget")
    public async GetWidget(widgetId: number): Promise<IWidget | undefined> {
        return db("widget").where({ id: widgetId });
    }

    @Post()
    public async CreateWidget(
        @Body() widgetRequest: IWidget,
    ): Promise<IWidget | undefined> {
        return db("widget")
            .insert(widgetRequest)
            .returning("id")
            .into("widget")
            .then(function(ids: number[]) {
                return db("widget").where({ id: ids[0] });
            });
    }

    @Put()
    public async UpdateWidget(
        @Body() widgetRequest: IWidget,
    ): Promise<IWidget | undefined> {
        return db("widget")
            .where({ id: widgetRequest.id })
            .update(widgetRequest)
            .then(function(id: number) {
                return db("widget").where({ id });
            });
    }

    @Delete("{widgetId}")
    public async DeleteWidget(widgetId: number): Promise<IWidget | undefined> {
        const deleted = await db("widget").where({ id: widgetId });
        return db("widget")
            .where({ id: widgetId })
            .delete()
            .then(function() {
                return deleted;
            });
    }
}
