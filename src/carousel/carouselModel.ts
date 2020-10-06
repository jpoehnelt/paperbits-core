import { WidgetModel } from "@paperbits/common/widgets";
import { LocalStyles } from "@paperbits/common/styles";

export class CarouselModel {
    public widgets: WidgetModel[];
    public styles: LocalStyles;

    constructor() {
        this.styles = {};
        this.widgets = [];
    }
}