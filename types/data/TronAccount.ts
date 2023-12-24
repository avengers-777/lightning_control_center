import { Tools } from "@/utils/Tools";
import { AccountType } from "../enums/AccountType";
import { Balance } from "./Balance";
import { Permission } from "./Permission";

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVATED = "INACTIVATED",
    DELETED = "DELETED",
    DISABLED = "DISABLED", // 禁用

}

// export interface TronAccount {
//     id: string;
//     label: string;
//     base58CheckAddress: string;
//     permissionSet: Set<Permission>;
//     privateKey: string;
//     balance: Balance;
//     createDate: number;
//     updateDate: number;
//     accountType: AccountType;
//     status: Status;
//   }

export class TronAccount {
    id: string;
    label: string;
    base58CheckAddress: string;
    permissionSet: Permission[];
    privateKey: string;
    balance: Balance;
    createDate: number;
    updateDate: number;
    accountType: AccountType;
    status: Status;
    constructor(obj: any) {
        this.id = obj.id;
        this.label = obj.label;
        this.base58CheckAddress = obj.base58CheckAddress;
        this.permissionSet = obj.permissionSet;
        this.privateKey = obj.privateKey;
        this.balance = new Balance(obj.balance);
        this.createDate = obj.createDate;
        this.updateDate = obj.updateDate;
        this.accountType = obj.accountType;
        this.status = obj.status;
    }
    randerCreateDate(){
        return Tools.formatTimestampToLocalTime(this.createDate)
    }
    randerUpdateDate(){
        return Tools.formatTimestampToLocalTime(this.updateDate)
    }
    
}