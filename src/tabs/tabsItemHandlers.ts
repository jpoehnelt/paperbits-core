import { IContextCommandSet, ViewManager } from "@paperbits/common/ui";
import { WidgetContext } from "@paperbits/common/editing";
import { EventManager } from "@paperbits/common/events";
import { SectionModel } from "../section";


export class TabsItemHandlers {
    constructor(
        private readonly viewManager: ViewManager,
        private readonly eventManager: EventManager
    ) { }

    public getContextualEditor(context: WidgetContext): IContextCommandSet {
        const contextualEditor: IContextCommandSet = {
            color: "#2b87da",
            hoverCommands: [],
            deleteCommand: null,
            selectCommands: [{
                tooltip: "Edit tabs tab",
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
                callback: () => {
                    context.switchToParent();
                }
            }]
        };

        if (context.parentModel["tabsItems"].length > 1) {
            contextualEditor.deleteCommand = {
                tooltip: "Delete tab",
                color: "#607d8b",
                callback: () => {
                    context.parentModel["tabsItems"].remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            };
        }

        if (context.model.widgets.length === 0) {
            contextualEditor.hoverCommands.push({
                color: "#607d8b",
                position: "center",
                tooltip: "Set tab layout",
                component: {
                    name: "grid-layout-selector",
                    params: {
                        heading: "Set tab layout",
                        onSelect: (section: SectionModel) => { // TODO: Here should come Grid model
                            context.model.widgets = section.widgets;
                            context.binding.applyChanges();

                            this.viewManager.clearContextualEditors();
                            this.eventManager.dispatchEvent("onContentUpdate");
                        }
                    }
                }
            });
        }

        return contextualEditor;
    }
}