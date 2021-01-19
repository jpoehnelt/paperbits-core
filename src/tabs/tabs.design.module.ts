import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { TabsViewModel } from "./ko/tabs";
import { TabsModelBinder } from "./tabsModelBinder";
import { TabsViewModelBinder } from "./ko/tabsViewModelBinder";
import { IWidgetHandler } from "@paperbits/common/editing";
import { TabsHandlers } from "./tabsHandlers";
import { TabsItemHandlers } from "./tabsItemHandlers";
import { TabsEditor } from "./ko";
import { TabsItemEditor } from "./ko/tabsItemEditor";
import { TabPanelStyleHandler } from "./tabsStyleHandler";

export class TabsDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("tabs", TabsViewModel);
        injector.bind("tabsEditor", TabsEditor);
        injector.bind("tabsItemEditor", TabsItemEditor);
        injector.bindToCollection("modelBinders", TabsModelBinder, "tabsModelBinder");
        injector.bindToCollection("viewModelBinders", TabsViewModelBinder);
        injector.bindToCollection<IWidgetHandler>("widgetHandlers", TabsHandlers, "tabsHandler");
        injector.bindToCollection<IWidgetHandler>("widgetHandlers", TabsItemHandlers, "tabsItemHandler");
        injector.bindToCollection("styleHandlers", TabPanelStyleHandler);
    }
}