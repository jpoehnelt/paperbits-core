import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { CarouselHTMLElement } from "./ko/runtime/carousel-runtime";

export class CarouselRuntimelModule implements IInjectorModule {
    public register(injector: IInjector): void {
        const carouselComponentName = "carousel-runtime";

        if (!customElements.get(carouselComponentName)) {
            customElements.define(carouselComponentName, CarouselHTMLElement);
        }
    }
}

