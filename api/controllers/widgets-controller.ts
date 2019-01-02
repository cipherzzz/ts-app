import { Get, Post, Put, Delete, Body, Route, Tags } from "tsoa";
import { ServerError } from "../utils/server-error";
import { Widget } from "../database/entities/widget"

export interface IWidget {
  id?: number;
  label: string;
  color: string;
}

@Route("widget")
export class WidgetsController {
  @Get()
  @Tags("Widget")
  public async GetWidgets(): Promise<IWidget[]> {
    return Widget.find();
  } 

  @Get("{widgetId}")
  @Tags("Widget")
  public async GetWidget(widgetId: number): Promise<IWidget | undefined> {
    const widget = await Widget.findOne(widgetId);
    if (!widget) {
      throw new ServerError(`no widget found with id ${widgetId}`);
    }

    return widget;
  }

    @Post()
    public async CreateWidget(@Body() widgetRequest: IWidget): Promise<IWidget | undefined> {
      let widget: Widget = new Widget();
      widget.color = widgetRequest.color;
      widget.label = widgetRequest.label;
      await widget.save();
      return widget;
    }

    @Put()
    public async UpdateWidget(@Body() widgetRequest: IWidget): Promise<IWidget | undefined> {
      let widget = await Widget.findOne(widgetRequest.id);
      if (!widget) {
        throw new ServerError(`no widget found with id ${widgetRequest.id}`);
      }

      widget.label = widgetRequest.label
      widget.color = widgetRequest.color
      await widget.save();
      return widget;
    }
    
    @Delete("{widgetId}")
    public async DeleteWidget(widgetId: number): Promise<IWidget | undefined> {
      let widget = await Widget.findOne(widgetId);
      if (!widget) {
        throw new ServerError(`no widget found with id ${widgetId}`);
      }

      await widget.remove();
      return widget;
    } 
}
