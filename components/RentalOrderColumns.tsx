import { ResourceConverter } from "@/types/app/ResourceConverter";
import { TronAccount } from "@/types/data/TronAccount";
import { Currency, formatAmountAsFloat } from "@/types/enums/Currency";
import { Tools } from "@/utils/Tools";
import {
  Button,
  Dropdown,
  Modal,
  Progress,
  Row,
  Typography,
} from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { useState } from "react";
import { TronAccountOperate } from "./TronAccountOperate";
import { ResourceDisplayType } from "@/types/enums/ResourceDisplayType";
import { TransferRecord } from "@/types/data/TransferRecord";
import { TransferRecordOperate } from "./TransferRecordOperate";
import { DepositOrder, DepositStatus } from "@/types/data/DepositOrder";
import { DepositOrderOperate } from "./DepositOrderOperate";
import { Status, TronResourceRentalOrder } from "@/types/data/TronResourceRentalOrder";
import { RentalOrderOperate } from "./RentalOrderOperate";
import { ProgressStatus } from "./RentalOrderStatus";

export function createRentalOrderColumns(): ColumnProps<TronResourceRentalOrder>[] {
  return  [
    {
      title: "ID",
      dataIndex: "id",
      width: 250,
      ellipsis: true,
    },
    {
      title: "收款订单ID",
      dataIndex: "depositOrderId",
    },
    {
      title: "接收账号",
      dataIndex: "receivingAccountId",
    },
    {
      title: "出租账号",
      dataIndex: "lessorId",
    },
    {
      title: "设备ID",
      dataIndex: "deviceId",
    },
    {
      title: "IP",
      dataIndex: "ip",
    },

    {
      title: "资源类型",
      dataIndex: "resourceCode",
    },
    {
      title: "委托TRX",
      dataIndex: "valueInTrx",
      render: (text, record, index) => {
        return formatAmountAsFloat(
          record.valueInTrx,
          Currency.TRX
        ).toLocaleString();
      },
    },
    {
      title: "资源数量",
      dataIndex: "amount",
      render: (text, record, index) => {
        return record.amount.toLocaleString();
      },
    },
    {
      title: "锁定",
      dataIndex: "lockup",
    
      render: (text, record, index) => {
        return record.lockup ? "锁定" : "未锁定"
      },
    },
    {
      title: "租用时长",
      dataIndex: "duration",
      render: (text, record, index) => {
        return Tools.formatDuration(record.duration)
      },
    },

    {
      title: "创建日期",
      dataIndex: "updateDate",
      render: (text, record, index) => {
        return Tools.formatTimestampToLocalTime(record.createDate);
      },
    },
    {
      title: "交易日期",
      dataIndex: "transactionTime",
      render: (text, record, index) => {
        if (record.status != Status.PROGRESS && record.status != Status.ERROR){
          return Tools.formatTimestampToLocalTime(record.transactionTime);
        }
       
      },
    },
    {
      title: "预计回收时间",
      dataIndex: "expectedReclaimTime",
      render: (text, record, index) => {
        if (record.status != Status.PROGRESS && record.status != Status.ERROR){
          return Tools.formatTimestampToLocalTime(record.expectedReclaimTime);
        }
       
      },
    },
    {
      title: "完成日期",
      dataIndex: "completeTime",
      render: (text, record, index) => {
        if (record.status == Status.COMPLETED){
          return Tools.formatTimestampToLocalTime(record.completeTime);
        }
       
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text, record, index) => {
        const timeLeft = record.expectedReclaimTime - new Date().getTime();
        
        if (record.status == Status.PENDING_RECLAIM && timeLeft > 0 ){
          return <ProgressStatus expiration={record.expectedReclaimTime} duration={record.duration}/>
        }else{
          return record.status
        }
        
      },
    },
    {
      title: "",
      dataIndex: "operate",
      render: (text, record, index) =><RentalOrderOperate record={record}/>,
    },
  ];
}
