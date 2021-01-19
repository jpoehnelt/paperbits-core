import { WidgetModel } from "@paperbits/common/widgets";
import { LocalStyles } from "@paperbits/common/styles";

export class TabsModel {
    public tabsItems: TabsItemModel[];
    public styles: LocalStyles;

    constructor() {
        this.styles = {};
        this.tabsItems = [];
    }
}

export class TabsItemModel {
    public widgets: WidgetModel[];
    public styles: LocalStyles;
    public label: string;

    constructor(label: string = "Tab") {
        this.styles = {};
        this.widgets = [];
        this.label = label;
    }
}