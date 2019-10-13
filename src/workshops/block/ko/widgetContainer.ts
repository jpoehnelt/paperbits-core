import * as ko from "knockout";
import template from "./widgetContainer.html";
import { Component, Param, OnMounted } from "@paperbits/common/ko/decorators";

@Component({
    selector: "widget-container",
    template: template,
    injectable: "widgetContainer",
    encapsulation: "shadowDom"
})
export class WidgetContainer {
    public widgetViewModel: ko.Observable<any>;

    constructor() {
        this.widgetViewModel = ko.observable<string>();
    }

    @Param()
    public widgetData: any;

    @OnMounted()
    public initialize(): void {
        if (this.widgetData) {
            this.widgetViewModel(this.widgetData);
        } else {
            console.warn("empty widget container");
        }
    }
}