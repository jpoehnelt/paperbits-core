import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { CarouselRuntimelModule } from "./carousel/carousel.runtime.module";


export class CoreRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new CarouselRuntimelModule());
    }
}
