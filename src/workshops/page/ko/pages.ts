﻿import * as ko from "knockout";
import template from "./pages.html";
import { IPageService } from "@paperbits/common/pages";
import { Router } from "@paperbits/common/routing";
import { ViewManager, View } from "@paperbits/common/ui";
import { Keys } from "@paperbits/common/keyboard";
import { Component, OnMounted } from "@paperbits/common/ko/decorators";
import { PageItem } from "./pageItem";


@Component({
    selector: "pages",
    template: template,
    injectable: "pagesWorkshop"
})
export class PagesWorkshop {
    private searchTimeout: any;

    public readonly searchPattern: ko.Observable<string>;
    public readonly pages: ko.ObservableArray<PageItem>;
    public readonly working: ko.Observable<boolean>;
    public readonly selectedPage: ko.Observable<PageItem>;

    constructor(
        private readonly pageService: IPageService,
        private readonly router: Router,
        private readonly viewManager: ViewManager
    ) {
        this.pages = ko.observableArray<PageItem>();
        this.selectedPage = ko.observable<PageItem>();
        this.searchPattern = ko.observable<string>("");
        this.working = ko.observable(true);
    }

    @OnMounted()
    public async initialize(): Promise<void> {
        this.searchPattern.subscribe(this.searchPages);
        this.searchPages();
    }

    private async launchSearch(searchPattern: string = ""): Promise<void> {
        this.working(true);
        this.pages([]);

        const pages = await this.pageService.search(searchPattern);
        const pageItems = pages.map(page => new PageItem(page));

        this.pages(pageItems);
        this.working(false);
    }

    public async searchPages(searchPattern: string = ""): Promise<void> {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => this.launchSearch(searchPattern), 600);
    }

    public selectPage(pageItem: PageItem): void {
        this.selectedPage(pageItem);

        const view: View = {
            heading: "Page",
            component: {
                name: "page-details-workshop",
                params: {
                    pageItem: pageItem,
                    onDeleteCallback: () => {
                        this.searchPages();
                    }
                }
            }
        };

        this.viewManager.openViewAsWorkshop(view);
    }

    public async addPage(): Promise<void> {
        this.working(true);

        const pageUrl = "/new";
        const pageContract = await this.pageService.createPage(pageUrl, "New page", "", "");
        const pageItem = new PageItem(pageContract);

        this.pages.push(pageItem);
        this.selectPage(pageItem);

        this.working(false);
    }

    public async deleteSelectedPage(): Promise<void> {
        // TODO: Show confirmation dialog according to mockup
        this.viewManager.closeWorkshop("page-details-workshop");

        await this.pageService.deletePage(this.selectedPage().toContract());
        await this.searchPages();

        this.router.navigateTo("/");
    }

    public onKeyDown(item: PageItem, event: KeyboardEvent): boolean {
        switch (event.keyCode) {
            case Keys.Delete:
                this.deleteSelectedPage();
                break;

            case Keys.Enter:
            case Keys.Space:
                this.selectPage(item);
        }

        return true;
    }
}