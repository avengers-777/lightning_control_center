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
import { Status, TronAccount } from "@/types/data/TronAccount";
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

export function DepositOrderOperate({ record }: { record: DepositOrder }) {
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
    {key:"设备ID",value:record.deviceId},
    {key:"平台",value:record.platform},
    {key:"接收账户",value:record.receivingAccountId},
    {key:"发送地址",value:record.fromAddress},
    {key:"货币",value:record.currency},
    {key:"数量",value:formatAmountAsFloat(record.amount, record.currency).toLocaleString()},
    {key:"TXID",value:<div style={{ width: 250 }}>{record.txid}</div>},
    {key:"区块高度",value:record.blockHeight},
    {key:"创建时间",value:Tools.formatTimestampToLocalTime(record.createDate)},
    {key:"接收时间",value:record.status == DepositStatus.RECEIVED && Tools.formatTimestampToLocalTime(record.receivingDate)},
    {
      key: "执行订单",
      value: record.actions.map((item, index) => (
        <Row key={index}>
          <Tag style={{ padding: 8, margin: 8 }} key={index} >
            {item}
          </Tag>
        </Row>
      )),
    },
    {key:"过期时间",value:Tools.formatTimestampToLocalTime(record.expirationDate)},
    {key:"状态",value:record.status},
  ]


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
