import * as ko from "knockout";

ko.bindingHandlers["carousel"] = {
    init(element: HTMLElement, valueAccessor: () => any): void {
        const carouselItems = element.querySelectorAll(".carousel-item");
        console.log(carouselItems);

        if (carouselItems.length === 0) {
            return;
        }

        carouselItems[0].classList.add("active");
    }
};