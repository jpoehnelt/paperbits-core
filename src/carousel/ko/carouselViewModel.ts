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
    public currentSlideIndex: ko.Observable<number>;

    constructor() {
        this.carouselItems = ko.observableArray<CarouselItemViewModel>();
        this.activeItem = ko.observable();
        this.styles = ko.observable<StyleModel>();
        this.currentSlideIndex = ko.observable(0);
    }

    public prev(): void {
        const items = this.carouselItems();
        const activeItem = this.activeItem();
        let index = items.indexOf(activeItem);

        index--;

        if (index < 0) {
            index = items.length - 1;
        }

        this.activeItem(items[index]);
    }

    public next(): void {
        const items = this.carouselItems();
        const activeItem = this.activeItem();
        let index = items.indexOf(activeItem);

        index++;

        if (index >= items.length) {
            index = 0;
        }

        this.activeItem(items[index]);
    }
}