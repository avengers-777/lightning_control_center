"use client";

import {
  Button,
  Descriptions,
  Dropdown,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioGroup,
  Row,
  Select,
  Space,
  Spin,
  TabPane,
  Tabs,
  Tag,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import { useContext, useState } from "react";
import { IconMore } from "@douyinfe/semi-icons";
import { TronAccountContext } from "@/app/tronaccountviewmodel";
import { Tools } from "@/utils/Tools";
import { ResourceDisplayType } from "@/types/enums/ResourceDisplayType";
import { ResourceConverter } from "@/types/app/ResourceConverter";
import { Permission } from "@/types/data/Permission";
import { AccountType } from "@/types/enums/AccountType";
import {
  getBasicData,
  getPermissionData,
  getResourceDate,
} from "./TronAccountOperateDate";
import { TransactionType } from "@/types/enums/TransactionType";
import {
  Currency,
  convertFloatToSmallestUnit,
  formatAmountAsFloat,
} from "@/types/enums/Currency";
import { isString } from "antd/es/button";
import { TransferRequest } from "@/types/dto/TransferRequest";
import Label from "@douyinfe/semi-ui/lib/es/form/label";
import { TransferRecord } from "@/types/data/TransferRecord";
import { DepositOrder, DepositStatus } from "@/types/data/DepositOrder";
import { Status, TronResourceRentalOrder } from "@/types/data/TronResourceRentalOrder";

export function RentalOrderOperate({ record }: { record: TronResourceRentalOrder }) {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  let data = [
    {key:"ID",value:record.id},
    {key:"收款订单ID",value:record.depositOrderId},
    {key:"接收账户ID",value:record.receivingAccountId},
    {key:"出租账户ID",value:record.lessorId},
    {key:"设备ID",value:record.deviceId},
    {key:"IP",value:record.ip},
    {key:"TRX价值",value:formatAmountAsFloat(record.valueInTrx, Currency.TRX).toLocaleString()},
    {key:"数量",value:record.amount.toLocaleString()},
    {key:"锁定",value:record.lockup ? "锁定" : "未锁定"},
    {key:"租用时长",value:Tools.formatDuration(record.duration)},
    {key:"预计回收时间",value:Tools.formatTimestampToLocalTime(record.expectedReclaimTime)},
    {key:"预计区块高度",value:record.expectedReclaimBlockHeight},
    {key:"TXID",value:<div style={{ width: 250 }}>{record.txid}</div>},
    {key:"回收TXID",value:<div style={{ width: 250 }}>{record.reclaimTxid}</div>},
    {key:"创建时间",value:Tools.formatTimestampToLocalTime(record.createDate)},
    {key:"交易时间",value:Tools.formatTimestampToLocalTime(record.transactionTime)},
    {key:"完成时间",value:Tools.formatTimestampToLocalTime(record.completeTime)},
    {key:"状态",value:record.status},
  ]
  if (record.status == Status.ERROR || record.status == Status.RECLAIM_FAILED){
    data.push({key:"错误",value:record.error ?? ""})
  }


  return (
    <Row type="flex" justify="center" align="middle">
      <Button
        theme="borderless"
        type="primary"
        size="small"
        style={{ marginRight: 8 }}
        onClick={showDialog}
      >
        查看
      </Button>
      <Modal
        title="详情"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeOnEsc={true}
      >
        <Descriptions className="break-words" data={data}></Descriptions>
      </Modal>
    </Row>
  );
}
