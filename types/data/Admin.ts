import { AdminPermission } from "../enums/AdminPermission";

export interface Admin {
    id: string;
    name: string;
    ethereumAddress: string;
    permissions: Set<AdminPermission>;
    updateDate: number;
    createDate: number;
    nonce: string;
    status: Status;
  }
  

  export enum Status {
    ACTIVE = "ACTIVE", // 活跃
    DELETED = "DELETED",
    DISABLED = "DISABLED", // 禁用
    PENDING = "PENDING" // 待审核
  }
  