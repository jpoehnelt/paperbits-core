import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { TabsViewModel } from "./ko/tabs";
import { TabsModelBinder } from "./tabsModelBinder";
import { TabsViewModelBinder } from "./ko/tabsViewModelBinder";
import { TabPanelStyleHandler } from "./tabsStyleHandler";

export class TabsPublishModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("tabs", TabsViewModel);
        injector.bindToCollection("modelBinders", TabsModelBinder, "tabsModelBinder");
        injector.bindToCollection("viewModelBinders", TabsViewModelBinder);
        injector.bindToCollection("styleHandlers", TabPanelStyleHandler);
    }
}