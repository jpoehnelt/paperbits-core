import * as ko from "knockout";
import template from "./carousel.html";
import { Component } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";
import { CarouselItemViewModel } from "./carouselItemViewModel";

@Component({
    selector: "carousel",
    template: template
})
export class CarouselViewModel {
    public styles: ko.Observable<StyleModel>;
    public carouselItems: ko.ObservableArray<CarouselItemViewModel>;
    public activeItem: ko.Observable<CarouselItemViewModel>;

    constructor() {
        this.carouselItems = ko.observableArray<CarouselItemViewModel>();
        this.activeItem = ko.observable();
        this.styles = ko.observable<StyleModel>();
    }
}