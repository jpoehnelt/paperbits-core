import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
import { CarouselEditor } from "./carouselEditor";
import { CarouselHandlers } from "../carouselHandlers";


export class CarouselEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("carouselEditor", CarouselEditor);
        injector.bindToCollection<IWidgetHandler>("widgetHandlers", CarouselHandlers, "carouselHandler");
    }
}