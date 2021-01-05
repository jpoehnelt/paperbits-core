import { TabsContract, TabsItemContract } from "./tabsContract";
import { TabsItemModel, TabsModel } from "./tabsModel";
import { IModelBinder } from "@paperbits/common/editing";
import { ModelBinderSelector } from "@paperbits/common/widgets";
import { Contract, Bag } from "@paperbits/common";


export class TabsModelBinder implements IModelBinder<TabsModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "tabs";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof TabsModel;
    }

    constructor(
        private readonly modelBinderSelector: ModelBinderSelector
    ) { }

    public async contractItemToModel(contract: TabsItemContract, bindingContext?: Bag<any>): Promise<TabsItemModel> {
        const model = new TabsItemModel();

        contract.nodes = contract.nodes || [];
        model.styles = contract.styles || {};

        const modelPromises = contract.nodes.map(async (contract: Contract) => {
            const modelBinder = this.modelBinderSelector.getModelBinderByContract<any>(contract);
            return await modelBinder.contractToModel(contract, bindingContext);
        });

        model.widgets = await Promise.all<any>(modelPromises);

        return model;
    }

    public async contractToModel(contract: TabsContract, bindingContext?: Bag<any>): Promise<TabsModel> {
        const model = new TabsModel();

        contract.tabsItems = contract.tabsItems || [];
        model.styles = contract.styles || {};

        const modelPromises = contract.tabsItems.map(async (contract: Contract) => {
            return await this.contractItemToModel(contract, bindingContext);
        });

        model.tabsItems = await Promise.all<any>(modelPromises);

        return model;
    }

    public itemModelToContract(tabsItemModel: TabsItemModel): TabsItemContract {
        const tabsContract: TabsItemContract = {
            type: "tabs-item",
            styles: tabsItemModel.styles,
            nodes: []
        };

        tabsItemModel.widgets.forEach(tabsItemModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(tabsItemModel);
            tabsContract.nodes.push(modelBinder.modelToContract(tabsItemModel));
        });

        return tabsContract;
    }

    public modelToContract(tabsModel: TabsModel): TabsContract {
        const tabsContract: TabsContract = {
            type: "tabs",
            styles: tabsModel.styles,
            tabsItems: []
        };

        tabsModel.tabsItems.forEach(tabsItemModel => {
            tabsContract.tabsItems.push(this.itemModelToContract(tabsItemModel));
        });

        return tabsContract;
    }
}
