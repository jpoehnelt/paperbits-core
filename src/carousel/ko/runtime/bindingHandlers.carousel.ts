import { coerce } from "@paperbits/common";
import * as ko from "knockout";

ko.bindingHandlers["carousel"] = {
    init(element: HTMLElement, valueAccessor: () => any): void {
        const carouselItems = coerce<Element>(element.querySelectorAll(".carousel-item"));
        const carouselIndicators = coerce<HTMLDListElement>(element.querySelectorAll(".carousel-indicator"));

        if (carouselItems.length === 0) {
            return;
        }

        carouselIndicators.forEach((indicator, index) => {
            indicator.onclick = () => {
                setActiveItem(index);
            };
        });

        let activeItem = carouselItems[0];
        activeItem.classList.add("active");

        let activeIndicator = carouselIndicators[0];
        activeIndicator.classList.add("active");

        const setActiveItem = (index: number) => {
            activeItem.classList.remove("active");
            activeIndicator.classList.remove("active");
            activeItem = carouselItems[index];
            activeIndicator = carouselIndicators[index];
            activeItem.classList.add("active");
            activeIndicator.classList.add("active");
        };

        const prev = (): void => {
            let index = carouselItems.indexOf(activeItem);

            index--;

            if (index < 0) {
                index = carouselItems.length - 1;
            }

            setActiveItem(index);
        };

        const next = (): void => {
            let index = carouselItems.indexOf(activeItem);

            index++;

            if (index >= carouselItems.length) {
                index = 0;
            }

            setActiveItem(index);
        };

        const prevButton = element.querySelector<HTMLButtonElement>(".carousel-control-prev");
        prevButton.onclick = prev;

        const nextButton = element.querySelector<HTMLButtonElement>(".carousel-control-next");
        nextButton.onclick = next;
    }
};

if (!location.href.includes("designtime=true")) {
    setTimeout(() => {
        const elements = document.querySelectorAll(".carousel");

        for (const element of coerce<Element>(elements)) {
            ko.applyBindingsToNode(element, { carousel: {} }, null);
        }
    }, 500);
}