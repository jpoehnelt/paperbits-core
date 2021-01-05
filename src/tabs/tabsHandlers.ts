import { IContextCommandSet, View, ViewManager } from "@paperbits/common/ui";
import { IWidgetOrder, WidgetContext } from "@paperbits/common/editing";
import { TabsItemModel, TabsModel } from "./tabsModel";
import { EventManager } from "@paperbits/common/events";


export class TabsHandlers {
    constructor(
        private readonly viewManager: ViewManager,
        private readonly eventManager: EventManager
    ) { }

    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "tabs",
            displayName: "Tabs",
            iconClass: "paperbits-tabr",
            requires: [],
            createModel: async () => {
                const model = new TabsModel();
                model.tabsItems.push(new TabsItemModel());
                model.tabsItems.push(new TabsItemModel());
                model.tabsItems.push(new TabsItemModel());

                model.styles.instance = {
                    size: {
                        xl: {
                            minHeight: 300
                        },
                        lg: {
                            minHeight: 300
                        },
                        md: {
                            minHeight: 300
                        },
                        sm: {
                            minHeight: 300
                        },
                        xs: {
                            minHeight: 300
                        }
                    }
                };

                return model;
            }
        };

        return widgetOrder;
    }

    public getContextualEditor(context: WidgetContext): IContextCommandSet {
        const tabsContextualEditor: IContextCommandSet = {
            color: "#2b87da",
            hoverCommands: null,
            deleteCommand: {
                tooltip: "Delete tabs",
                color: "#607d8b",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            },
            selectCommands: [{
                tooltip: "Add tab",
                iconClass: "paperbits-circle-add",
                position: "top right",
                color: "#607d8b",
                callback: () => {
                    context.model["tabsItems"].push(new TabsItemModel());
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            },
            {
                tooltip: "Edit tabs",
                iconClass: "paperbits-edit-72",
                position: "top right",
                color: "#607d8b",
                callback: () => this.viewManager.openWidgetEditor(context.binding)
            },
            {
                tooltip: "Switch to parent",
                iconClass: "paperbits-enlarge-vertical",
                position: "top right",
                color: "#607d8b",
                callback: () => context.switchToParent()
            }]
        };

        return tabsContextualEditor;
    }
}