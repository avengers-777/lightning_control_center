export enum AuthorizedType {
    OWNER,
    ACTIVES,
  }
  
  // TypeScript 接口
 export interface Permission {
    authorizedTo: string;
    authType: AuthorizedType;
    threshold: number;
    weight: number;
    operations: ContractType[]; // 假设 ContractType 已定义为枚举或接口
    permissionId: number;
    txid: string;
    blockHeight: number;
    blockTimeStamp: number;
    updateDate: number;
  }