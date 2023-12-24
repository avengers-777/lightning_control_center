import { Status } from "../data/Admin";
import { AdminPermission } from "../enums/AdminPermission";

interface AdminRequest {
    name: string;
    ethereumAddress: string;
    permissions: Set<AdminPermission>;
    status: Status;
  }