import { CarouselContract } from "./carouselContract";
import { CarouselModel } from "./carouselModel";
import { IModelBinder } from "@paperbits/common/editing";
import { ModelBinderSelector } from "@paperbits/common/widgets";
import { Contract, Bag } from "@paperbits/common";


export class CarouselModelBinder implements IModelBinder<CarouselModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "carousel";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof CarouselModel;
    }

    constructor(
        private readonly modelBinderSelector: ModelBinderSelector
    ) { }

    public async contractToModel(contract: CarouselContract, bindingContext?: Bag<any>): Promise<CarouselModel> {
        const model = new CarouselModel();

        contract.nodes = contract.nodes || [];
        model.styles = contract.styles || {};

        const modelPromises = contract.nodes.map(async (contract: Contract) => {
            const modelBinder = this.modelBinderSelector.getModelBinderByContract<any>(contract);
            return await modelBinder.contractToModel(contract, bindingContext);
        });

        model.widgets = await Promise.all<any>(modelPromises);

        return model;
    }

    public modelToContract(carouselModel: CarouselModel): CarouselContract {
        const carouselContract: CarouselContract = {
            type: "carousel",
            styles: carouselModel.styles,
            nodes: []
        };

        carouselModel.widgets.forEach(widgetModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(widgetModel);
            carouselContract.nodes.push(modelBinder.modelToContract(widgetModel));
        });

        return carouselContract;
    }
}
