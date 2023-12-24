import { Currency } from "../enums/Currency";
import { TransactionType } from "../enums/TransactionType";

export interface TransferRequest {
    type: TransactionType;
    currency: Currency;
    amount: number;
    to: string;
    from: string;
  }