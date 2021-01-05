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

    constructor() {
        this.styles = {};
        this.widgets = [];
    }
}