import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { TabsHTMLElement } from "./ko/runtime/tabs-runtime";

export class TabsRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        const tabsComponentName = "tabs-runtime";
        customElements.define(tabsComponentName, TabsHTMLElement);
    }
}

