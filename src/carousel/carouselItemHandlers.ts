import { IContextCommandSet, View, ViewManager } from "@paperbits/common/ui";
import { DragSession } from "@paperbits/common/ui/draggables";
import { WidgetContext } from "@paperbits/common/editing";
import { CarouselModel } from "./carouselModel";
import { RowModel } from "../row/rowModel";
import { EventManager } from "@paperbits/common/events";
import { BlockType } from "@paperbits/common/blocks";
import { WidgetModel } from "@paperbits/common/widgets";
import { SectionModel } from "../section";


export class CarouselItemHandlers {
    constructor(
        private readonly viewManager: ViewManager,
        private readonly eventManager: EventManager
    ) { }

    public getContextualEditor(context: WidgetContext): IContextCommandSet {
        const contextualEditor: IContextCommandSet = {
            color: "#2b87da",
            hoverCommands: [{
                position: context.half,
                tooltip: "Add carousel",
                color: "#607d8b",
                component: {
                    name: "grid-layout-selector",
                    params: {
                        onSelect: (carousel: CarouselModel) => {
                            const carouselHalf = context.half;

                            let index = context.parentModel.widgets.indexOf(context.model);

                            if (carouselHalf === "bottom") {
                                index++;
                            }

                            context.parentModel.widgets.splice(index, 0, carousel);
                            context.parentBinding.applyChanges();

                            this.viewManager.clearContextualEditors();
                            this.eventManager.dispatchEvent("onContentUpdate");
                        }
                    }
                }
            }],
            deleteCommand: {
                tooltip: "Delete slide",
                color: "#607d8b",
                callback: () => {
                    context.parentModel["carouselItems"].remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            },
            selectCommands: [{
                tooltip: "Edit carousel slide",
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
                    context.switchToParent(CarouselModel);
                }
            }]
        };

        contextualEditor.hoverCommands.push({
            color: "#607d8b",
            position: "center",
            tooltip: "Add slide layout",
            component: {
                name: "grid-layout-selector",
                params: {
                    onSelect: (section: SectionModel) => {
                        context.model.widgets = section.widgets;
                        context.binding.applyChanges();

                        this.viewManager.clearContextualEditors();
                        this.eventManager.dispatchEvent("onContentUpdate");
                    }
                }
            }
        });

        return contextualEditor;
    }
}