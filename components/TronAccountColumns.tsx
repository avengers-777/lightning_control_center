
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

export function createTronAccountColumns(
  resourceConverter: ResourceConverter,
  displayType:ResourceDisplayType
): ColumnProps<TronAccount>[] {
  
 
  return [
    {
      title: "ID",
      dataIndex: "id",
      width: 250,
      ellipsis: true,
    },
    {
      title: "标签",
      dataIndex: "label",
    },
    {
      title: "地址",
      dataIndex: "base58CheckAddress",
    },
    {
      title: "余额",
      dataIndex: "balance.amount",
      render: (text, record, index) => {
        return record.balance.getRanderAmount()
      },
    },
    {
      title: "总质押能量",
      dataIndex: "balance.energy",
      render: (text, record, index) => {
        return record.balance.getRanderEnergy(displayType,resourceConverter)
      },
    },
    {
      title: "获得的能量",
      dataIndex: "balance.acquiredDelegatedForEnergy",
      render: (text, record, index) => {
        return record.balance.getRanderAcquiredDelegatedForEnergy(displayType,resourceConverter)
      },
    },
    {
      title: "已委托能量",
      dataIndex: "balance.delegatedForEnergy",
      render: (text, record, index) => {
        return record.balance.getRanderDelegatedForEnergy(displayType,resourceConverter)
      },
    },
    {
      title: "可委托能量",
      dataIndex: "balance.canDelegatedForEnergy",
      render: (text, record, index) => {
        return record.balance.getRanderCanDelegatedForEnergy(displayType,resourceConverter)
      },
    },
    {
      title: "能量状态",
      width: 150,
      dataIndex: "balance",
      render: (text, record, index) => {
        const percent =
          (record.balance.canDelegatedForEnergy / record.balance.energy) * 100;
        if (percent) {
          return (
            <Progress
              percent={percent}
              stroke={percent < 25 ? "var(--semi-color-warning)" : undefined}
              size="small"
              style={{ margin: 5 }}
              aria-label="energy usage"
            />
          );
        } else {
          return null;
        }
      },
    },

    {
      title: "账号类型",
      dataIndex: "accountType",
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
      render: (text, record, index) => {
        return record.randerCreateDate();
      },
    },
    {
      title: "更新日期",
      dataIndex: "updateDate",
      render: (text, record, index) => {
        return record.randerUpdateDate();
      },
    },

    {
      title: "状态",
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "operate",
      render: (text, record, index)=><TronAccountOperate record={record} />
    },
  ];
}
