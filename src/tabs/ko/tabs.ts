import * as ko from "knockout";
import template from "./tabs.html";
import { Component, OnMounted } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";
import { TabsItemViewModel } from "./tabsItemViewModel";

@Component({
    selector: "tabs",
    template: template
})
export class TabsViewModel {
    public styles: ko.Observable<StyleModel>;
    public tabsItems: ko.ObservableArray<TabsItemViewModel>;
    public tabLinks: ko.Computed<string[]>;
    public activeItemIndex: ko.Observable<number>;

    constructor() {
        this.tabsItems = ko.observableArray<TabsItemViewModel>();
        this.styles = ko.observable<StyleModel>();
        this.activeItemIndex = ko.observable(0);
        this.tabLinks = ko.computed(() => this.tabsItems().map(x => x.label()));
    }
}