import { StyleModel } from "@paperbits/common/styles";
import * as ko from "knockout";
import { WidgetViewModel } from "../../ko/widgetViewModel";


export class CarouselItemViewModel {
    public styles: ko.Observable<StyleModel>;
    public widgets: ko.ObservableArray<WidgetViewModel>;


    constructor() {
        this.widgets = ko.observableArray();
        this.styles = ko.observable<StyleModel>();
    }
}
