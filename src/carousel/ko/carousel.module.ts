import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { CarouselViewModel } from "./carouselViewModel";
import { CarouselModelBinder } from "../carouselModelBinder";
import { CarouselViewModelBinder } from "./carouselViewModelBinder";

export class CarouselModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("carousel", CarouselViewModel);
        injector.bindToCollection("modelBinders", CarouselModelBinder, "carouselModelBinder");
        injector.bindToCollection("viewModelBinders", CarouselViewModelBinder);
    }
}