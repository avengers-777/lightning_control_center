import { Currency } from "../enums/Currency";
import { TransactionType } from "../enums/TransactionType";
import { TransferStatus } from "../enums/TransferStatus";

export interface TransferRecord {
  id: string;
  type: TransactionType;
  userId: string;
  ip: string;
  currency: Currency;
  from: string;
  to: string;
  amount: number;
  txid: string;
  createDate: number;
  updateDate: number;
  error?: string;
  status: TransferStatus;
}