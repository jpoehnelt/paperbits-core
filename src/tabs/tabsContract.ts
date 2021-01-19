import { Contract } from "@paperbits/common";

export interface TabsContract {
    type: string;
    styles?: any;
    tabsItems: TabsItemContract[];
}

export interface TabsItemContract extends Contract {
    label: string;
    styles?: any;
}