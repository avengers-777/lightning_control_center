
import { ResourceConverter } from "@/types/app/ResourceConverter";
import { TronAccount } from "@/types/data/TronAccount";
import { Currency, formatAmountAsFloat } from "@/types/enums/Currency";
import { Tools } from "@/utils/Tools";
import { Button, Dropdown, Modal, Progress, Row, Typography } from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { useState } from "react";
import { TronAccountOperate } from "./TronAccountOperate";
import { ResourceDisplayType } from "@/types/enums/ResourceDisplayType";
import { TransferRecord } from "@/types/data/TransferRecord";
import { TransferRecordOperate } from "./TransferRecordOperate";

export function createTransferRecordColumns(
  resourceConverter: ResourceConverter
): ColumnProps<TransferRecord>[] {
  
 
  return [
    {
      title: "ID",
      dataIndex: "id",
      width: 250,
      ellipsis: true,
    },

    {
      title: "类型",
      dataIndex: "type",
    },
    {
      title: "用户ID",
      dataIndex: "userId",
    },
    {
      title: "IP",
      dataIndex: "ip",
    },
    {
      title: "货币",
      dataIndex: "currency",
    },
    {
      title: "数量",
      dataIndex: "amount",
      render: (text, record, index) => {
        return formatAmountAsFloat(record.amount, record.currency).toLocaleString()
      },
    },
    {
      title: "发送账户",
      dataIndex: "from",
    },
    {
      title: "接收账户",
      dataIndex: "to",
    },

    {
      title: "更新日期",
      dataIndex: "updateDate",
      render: (text, record, index) => {
        return Tools.formatTimestampToLocalTime(record.updateDate)
      },
    },
    {
      title: "状态",
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "operate",
      render:(text,record,index) => <TransferRecordOperate record={record}/>
    },
  ];
}
