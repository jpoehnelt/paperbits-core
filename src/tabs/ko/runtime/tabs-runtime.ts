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
        return ["data-tab"];
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
        const activeTab = this.querySelector(".tab-content-active");

        if (activeTab) {
            activeTab.classList.remove("tab-content-active");
        }
        
        const activeLink = this.querySelector(".nav-tabs .nav-link.nav-link-active");

        if (activeLink) {
            activeLink.classList.remove("nav-link-active");
        }

        setImmediate(() => {
            const tabs = coerce<HTMLDListElement>(this.querySelectorAll(".tab-content"));
            tabs[index].classList.add("tab-content-active");

            const navLinks = coerce<HTMLDListElement>(this.querySelectorAll(".nav-tabs .nav-link"));
            navLinks[index].classList.add("nav-link-active");
        });
    };

    private onClick(event: MouseEvent): void {
        const element = <HTMLElement>event.target;
        const tabIndexIndex = element.getAttribute("data-tab");

        if (!tabIndexIndex) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        
        this.setActiveItem(parseInt(tabIndexIndex));
    }

    public connectedCallback(): void {
        this.addEventListener("click", this.onClick, true);

        setTimeout(() => {
            this.setActiveItem(0);
        }, 10);
    }

    public disconnectedCallback(): void {
        this.removeEventListener("click", this.onClick, true);
    }
}
