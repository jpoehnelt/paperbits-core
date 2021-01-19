import { TabsViewModel } from "./tabs";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { IWidgetBinding } from "@paperbits/common/editing";
import { TabsItemModel, TabsModel } from "../tabsModel";
import { PlaceholderViewModel } from "../../placeholder/ko/placeholderViewModel";
import { ViewModelBinderSelector } from "../../ko/viewModelBinderSelector";
import { TabsHandlers } from "../tabsHandlers";
import { EventManager } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";
import { TabsItemViewModel } from "./tabsItemViewModel";
import { TabsItemHandlers } from "../tabsItemHandlers";


export class TabsViewModelBinder implements ViewModelBinder<TabsModel, TabsViewModel> {
    constructor(
        private readonly viewModelBinderSelector: ViewModelBinderSelector,
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async itemModelToViewModel(model: TabsItemModel, index: number, viewModel?: TabsItemViewModel, bindingContext?: Bag<any>): Promise<TabsItemViewModel> {
        if (!viewModel) {
            viewModel = new TabsItemViewModel();
        }

        const viewModels = [];

        for (const widgetModel of model.widgets) {
            const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
            const widgetViewModel = await widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);

            viewModels.push(widgetViewModel);
        }

        const defaultLabel = `Tab ${index + 1}`;

        if (viewModels.length === 0) {
            viewModels.push(<any>new PlaceholderViewModel(defaultLabel));
        }

        viewModel.widgets(viewModels);
        viewModel.label(model.label || defaultLabel);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        const binding: IWidgetBinding<TabsItemModel> = {
            name: "tabs-item",
            displayName: defaultLabel,
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            flow: "flex",
            editor: "tabs-item-editor",
            handler: TabsItemHandlers,
            applyChanges: async (changes) => {
                await this.itemModelToViewModel(model, index, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public async modelToViewModel(model: TabsModel, viewModel?: TabsViewModel, bindingContext?: Bag<any>): Promise<TabsViewModel> {
        if (!viewModel) {
            viewModel = new TabsViewModel();
        }

        const tabsItemViewModels = [];

        for (const [index, tabsItemModel] of model.tabsItems.entries()) {
            const tabsItemViewModel = await this.itemModelToViewModel(tabsItemModel, index, null, bindingContext);
            tabsItemViewModels.push(tabsItemViewModel);
        }

        if (tabsItemViewModels.length === 0) {
            tabsItemViewModels.push(<any>new PlaceholderViewModel("Tab panel"));
        }

        viewModel.tabsItems(tabsItemViewModels);
        viewModel.activeItemIndex(null);
        viewModel.activeItemIndex(0);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        const binding: IWidgetBinding<TabsModel> = {
            name: "tab-panel",
            displayName: "Tab panel",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            flow: "block",
            handler: TabsHandlers,
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: TabsModel): boolean {
        return model instanceof TabsModel;
    }
}