import { coerce } from "@paperbits/common";

export class TabsHTMLElement extends HTMLElement {
    private currentTabIndex: number;

    constructor() {
        super();
        const activeTabAttr = this.getAttribute("data-active-tab");

        this.currentTabIndex = !!activeTabAttr
            ? parseInt(activeTabAttr)
            : 0;
    }

    static get observedAttributes(): string[] {
        return ["data-tab"];  // Check auto sliding!
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name !== "data-active-tab") {
            return;
        }

        if (!newValue || oldValue === newValue) {
            return;
        }

        this.currentTabIndex = parseInt(newValue);
        this.setActiveItem(this.currentTabIndex);
    }

    private setActiveItem = (index: number) => {
        this.style.setProperty("--tab", index.toString());
        const activeTab = this.querySelector(".tabs-items .tab-content.active");

        if (activeTab) {
            activeTab.classList.remove("active");
        }


        setImmediate(() => {
            const tabs = coerce<HTMLDListElement>(this.querySelectorAll(".tabs-items .tab-content"));
            tabs[index].classList.add("active");
        });
    };

    public connectedCallback(): void {
        const element = <HTMLElement>this;

        setTimeout(() => {
            const tabs = coerce<HTMLAnchorElement>(element.querySelectorAll("[data-tab]"));

            tabs.forEach((tab, index) => {
                tab.onclick = (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    this.setActiveItem(index);
                };
            });

            this.setActiveItem(0);
        }, 10);

        

        // const prev = (): void => {
        //     const tabsItems = coerce<Element>(element.querySelectorAll(".tabs-item"));
        //     this.currentTabIndex--;

        //     if (this.currentTabIndex < 0) {
        //         this.currentTabIndex = tabsItems.length - 1;
        //     }

        //     this.setActiveItem(this.currentTabIndex);
        // };

        // const next = (): void => {
        //     const tabsItems = coerce<Element>(element.querySelectorAll(".tabs-item"));
        //     this.currentTabIndex++;

        //     if (this.currentTabIndex >= tabsItems.length) {
        //         this.currentTabIndex = 0;
        //     }

        //     this.setActiveItem(this.currentTabIndex);
        // };

        // const prevButton = element.querySelector<HTMLButtonElement>(".tabs-control-prev");
        // prevButton.onclick = prev;

        // const nextButton = element.querySelector<HTMLButtonElement>(".tabs-control-next");
        // nextButton.onclick = next;
    }
}
