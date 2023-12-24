import { TransactionType } from "../enums/TransactionType";
import { TransferStatus } from "../enums/TransferStatus";

export interface TronActivationRecord {
    id: string;
    type: TransactionType;
    userId: string;
    ip: string;
    from: string;
    to: string;
    txid: string;
    createDate: number;
    updateDate: number;
    error?: string;
    status: TransferStatus;
  }