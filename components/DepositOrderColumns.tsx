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
import { ProgressStatus } from "./RentalOrderStatus";

export function createDepositOrderColumns(): ColumnProps<DepositOrder>[] {
  return  [
    {
      title: "ID",
      dataIndex: "id",
      width: 250,
      ellipsis: true,
    },
    {
      title: "设备ID",
      dataIndex: "deviceId",
    },
    {
      title: "区块链",
      dataIndex: "platform",
    },
    {
      title: "接收账号",
      dataIndex: "receivingAccountId",
    },
    {
      title: "发送地址",
      dataIndex: "fromAddress",
    },
    {
      title: "货币",
      dataIndex: "currency",
    },
    {
      title: "数量",
      dataIndex: "amount",
      render: (text, record, index) => {
        return formatAmountAsFloat(
          record.amount,
          record.currency
        ).toLocaleString();
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
      title: "接收日期",
      dataIndex: "receivingDate",
      render: (text, record, index) => {
        if (record.status == DepositStatus.RECEIVED){
          return Tools.formatTimestampToLocalTime(record.receivingDate);
        }
        
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text, record, index) => {
        const duration = record.expirationDate - record.createDate;
        const timeLeft = record.expirationDate - new Date().getTime();
        if (record.status == DepositStatus.PENDING && timeLeft > 0 ){
          return <ProgressStatus expiration={record.expirationDate} duration={duration}/>
        }else{
          return record.status
        }
        
      },
    },
    {
      title: "",
      dataIndex: "operate",
      render: (text, record, index) =>< DepositOrderOperate record={record}/>,
    },
  ];
}
