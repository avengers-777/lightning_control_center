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

export function TransferRecordOperate({ record }: { record: TransferRecord }) {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    console.log("Ok button clicked");
  };
  const handleCancel = () => {
    setVisible(false);
  };
  let data = [
    {key:"ID",value:record.id},
    {key:"类型",value:record.type},
    {key:"用户ID",value:record.userId},
    {key:"IP",value:record.ip},
    {key:"货币",value:record.currency},
    {key:"发送账户",value:record.from},
    {key:"接收账户",value:record.to},
    {key:"数量",value:formatAmountAsFloat(record.amount, record.currency).toLocaleString()},
    {key:"TXID",value:<div style={{ width: 250 }}>{record.txid}</div>},
    {key:"创建时间",value:Tools.formatTimestampToLocalTime(record.createDate)},
    {key:"更新时间",value:Tools.formatTimestampToLocalTime(record.updateDate)},
    {key:"状态",value:record.status},
  ]
  if (record.error){
    const error = {key:"错误",value:<div style={{ width: 250 }}>{record.error}</div>}
    data.push(error)
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
