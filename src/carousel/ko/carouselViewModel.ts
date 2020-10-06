import * as ko from "knockout";
import template from "./carousel.html";
import { Component } from "@paperbits/common/ko/decorators";
import { WidgetViewModel } from "../../ko/widgetViewModel";
import { StyleModel } from "@paperbits/common/styles";

@Component({
    selector: "carousel",
    template: template
})
export class CarouselViewModel implements WidgetViewModel {
    public widgets: ko.ObservableArray<WidgetViewModel>;
    public styles: ko.Observable<StyleModel>;

    constructor() {
        this.widgets = ko.observableArray<WidgetViewModel>();
        this.styles = ko.observable<StyleModel>();
    }
}