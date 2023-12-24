import { ResourceCode } from "../data/TronResourceRentalOrder";

export interface TronResourceRentalRequest {
    deviceId: string;
    resourceCode: ResourceCode;
    amount: number;
    lockup: boolean;
    duration: number;
    receivingAddress: string;
  }
  
  // TypeScript 常量
export  const resourceCodeSet: Set<ResourceCode> = new Set([ResourceCode.ENERGY, ResourceCode.BANDWIDTH]);