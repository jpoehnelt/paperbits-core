import { Bag } from "@paperbits/common";

export class TheBinding {
    public framework: string;
    public viewModelClass: any;
    public viewModelInstance: any;
    public model: any;


    // /**
    //  * "click-counter"
    //  */
    // public name: string;
    // displayName: "Click counter",
    // readonly: bindingContext ? bindingContext.readonly : false,
    // model: model,
    // draggable: true,
    // editor: "click-counter-editor",
    public applyChanges: (model: any, viewModel?: any, bindingContext?: Bag<any>) => Promise<void>;
}