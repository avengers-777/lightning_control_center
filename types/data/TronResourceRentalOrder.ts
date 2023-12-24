export interface TronResourceRentalOrder {
    id: string;
    receivingAccountId: string;
    lessorId: string;
    deviceId: string;
    ip: string;
    resourceCode: ResourceCode; // 假设 ResourceCode 已定义
    valueInTrx: number;
    amount: number;
    lockup: boolean;
    duration: number;
    expectedReclaimTime: number;
    expectedReclaimBlockHeight: number;
    error?: string;
    txid: string;
    reclaimTxid: string;
    createDate: number;
    transactionTime: number;
    completeTime: number;
    status: Status;
  }
  export enum Status {
    PROGRESS = 'PROGRESS',
    PENDING_RECLAIM = 'PENDING_RECLAIM',
    COMPLETED = 'COMPLETED',
    ERROR = 'ERROR',
    RECLAIM_FAILED = 'RECLAIM_FAILED',
  }
  
  // 假设 Common.ResourceCode 已定义，例如：
  export  enum ResourceCode {
    BANDWIDTH = 'BANDWIDTH',
    ENERGY = 'ENERGY',
    TRON_POWER = 'TRON_POWER',
    UNRECOGNIZED = 'UNRECOGNIZED',
  }
  
  export const ResourceCodeValue: { [key in ResourceCode]: number } = {
    [ResourceCode.BANDWIDTH]: 0,
    [ResourceCode.ENERGY]: 1,
    [ResourceCode.TRON_POWER]: 2,
    [ResourceCode.UNRECOGNIZED]: -1,
  };
  
  // 获取枚举的数值
  export  function getResourceCodeValue(code: ResourceCode): number {
    return ResourceCodeValue[code];
  }
  