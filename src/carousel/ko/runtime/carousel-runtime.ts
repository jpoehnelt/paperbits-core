import { coerce } from "@paperbits/common";

export class CarouselHTMLElement extends HTMLElement {
    private currentSlideIndex: number;

    constructor() {
        super();
        this.currentSlideIndex = 0;
    }

    static get observedAttributes(): string[] {
        return ["params"];
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        // const element = <HTMLElement>this;
        // const isBound = !!ko.contextFor(element);

        // if (!isBound) {
        //     return;
        // }

        // /*
        //  * TODO: Update paramsObservable using name instead of re-connecting:
        //  * paramsObservable[name](newValue);
        //  */

        // // Reinitialize bindings.
        // this.disconnectedCallback();
        // this.connectedCallback();
    }

    public connectedCallback(): void {
        const element = <HTMLElement>this;
        // const carouselIndicators = coerce<HTMLDListElement>(element.querySelectorAll(".carousel-indicator"));

        // carouselIndicators.forEach((indicator, index) => {
        //     indicator.onclick = () => {
        //         setActiveItem(index);
        //     };
        // });


        // let activeIndicator = carouselIndicators[0];
        // activeIndicator.classList.add("active");

        const setActiveItem = (index: number) => {
            // const carouselIndicators = coerce<HTMLDListElement>(element.querySelectorAll(".carousel-indicator"));
            // let activeIndicator = carouselIndicators[0];
            // activeIndicator.classList.remove("active");
            // activeIndicator = carouselIndicators[index];
            // activeIndicator.classList.add("active");

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
