import { ResourceCode } from "./TronResourceRentalOrder";

export interface UnstakingResource {
    txid: string;
    resourceType: ResourceCode; // 假设 ResourceCode 已定义
    unfreezeAmount: number;
    withdrawalAvailableAt: number;
    unlockBlockHeight: number;
  }