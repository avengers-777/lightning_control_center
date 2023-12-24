import { AccountType } from "../enums/AccountType";
import { Currency } from "../enums/Currency";

export interface TronTransactionRecord {
    id: string;
    accountId: string;
    accountType: AccountType; // 假设 AccountType 已定义
    address: string;
    toAddress: string;
    contractType: ContractType; // 假设 ContractType 已定义
    currency: Currency; // 假设 Currency 已定义
    income: number;
    expense: number;
    fee: number;
    energyFee: number;
    energyUsage: number;
    netFee: number;
    netUsage: number;
    txid: string;
    blockHeight: number;
    blockTimeStamp: number;
    createDate: number;
    error?: string;
    status: Status;
  }
 export enum Status {
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    ERROR = 'ERROR',
  }