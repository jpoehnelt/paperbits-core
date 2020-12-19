import { coerce } from "@paperbits/common";

export class CarouselHTMLElement extends HTMLElement {
    private currentSlideIndex: number;

    constructor() {
        super();
        this.currentSlideIndex = 0;
    }

    static get observedAttributes(): string[] {
        return ["params"];  // Check auto sliding!
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        // const element = <HTMLElement>this;
    }

    public connectedCallback(): void {
        const element = <HTMLElement>this;

        const setActiveItem = (index: number) => {
            const carouselIndicators = coerce<HTMLDListElement>(element.querySelectorAll(".carousel-indicator"));
            const activeIndicator = element.querySelector(".carousel-indicator.active");
            activeIndicator.classList.remove("active");
            carouselIndicators[index].classList.add("active");
            this.style.setProperty("--slide", index.toString());
        };

        const prev = (): void => {
            const carouselItems = coerce<Element>(element.querySelectorAll(".carousel-item"));
            this.currentSlideIndex--;

            if (this.currentSlideIndex < 0) {
                this.currentSlideIndex = carouselItems.length - 1;
            }

            setActiveItem(this.currentSlideIndex);
        };

        const next = (): void => {
            const carouselItems = coerce<Element>(element.querySelectorAll(".carousel-item"));
            this.currentSlideIndex++;

            if (this.currentSlideIndex >= carouselItems.length) {
                this.currentSlideIndex = 0;
            }

            setActiveItem(this.currentSlideIndex);
        };

        const prevButton = element.querySelector<HTMLButtonElement>(".carousel-control-prev");
        prevButton.onclick = prev;

        const nextButton = element.querySelector<HTMLButtonElement>(".carousel-control-next");
        nextButton.onclick = next;
    }

    public disconnectedCallback(): void {
        //
    }
}
