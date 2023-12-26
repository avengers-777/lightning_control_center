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
import { Currency, convertFloatToSmallestUnit, formatAmountAsFloat } from "@/types/enums/Currency";
import { isString } from "antd/es/button";
import { TransferRequest } from "@/types/dto/TransferRequest";
import Label from "@douyinfe/semi-ui/lib/es/form/label";

export function TronAccountOperate({ record }: { record: TronAccount }) {
  const { Text } = Typography;
  const {
    updateBalance,
    updateStatus,
    search,
    displayType,
    setDisplayType,
    resourceConverter,
    transfer
  } = useContext(TronAccountContext);
  const [visible, setVisible] = useState(false);
  const [changeStatusVisible, setChangeStatusVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(record.status);
  const [loading, setLoading] = useState(false);
  const [updateBalanceLoading, setUpdateBalanceLoading] = useState(false);
  const [transferVisible, setTransferVisible] = useState(false);
  const [transferType, setTransferType] = useState(TransactionType.INTERNAL);
  const [currency, setCurrency] = useState(Currency.TRX);
  const [amount, setAmount] = useState<number>(0);
  const [transferLoading,setTransferLoading] = useState(false)
  const [to, setTo] = useState("");
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    console.log("Ok button clicked");
  };
  const handleCancel = () => {
    setVisible(false);
    console.log("Cancel button clicked");
  };
  const changeStatusHandleOk = async () => {
    setLoading(true);
    await updateStatus(record.id, selectedStatus);
    setChangeStatusVisible(false);
    await search();
    setLoading(false);
  };
  const changeStatusHandleCancel = () => {
    setChangeStatusVisible(false);
  };
  function onClickChangeStatusDropdown() {
    setSelectedStatus(record.status);
    setChangeStatusVisible(true);
  }
  async function onClickUpdateBalance() {
    if (!updateBalanceLoading) {
      setUpdateBalanceLoading(true);
      await updateBalance(record.id);
      await search();
      setUpdateBalanceLoading(false);
    }
  }
  async function onClickTransfer() {
    setTransferVisible(true);
  }
  const handleTransferOk = async () => {
    if (to != "" && amount != 0){
      setTransferLoading(true)
      const body:TransferRequest = {
        type: transferType,
        currency: currency,
        amount: convertFloatToSmallestUnit(amount, currency),
        to: to,
        from: record.id
      }
      await transfer(body)
      setTo("")
      setTransferVisible(false);
      setTransferLoading(false)
      
    }else{
      Toast.warning("参数不正确")
    }

  };
  const handleTransferCancel = () => {
    setTransferVisible(false);
  };
  function handleCurrencyChange(value: any) {
    if (value) {
      setCurrency(value);
    } else {
      setCurrency(Currency.TRX);
    }
  }
  function handlerAmountChange(value: string | number) {
    if (typeof value === 'number' && !isNaN(value)) {
      setAmount(value);
    } else {
      setAmount(0);
    }
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
        header={null}
      >
        <Tabs type="line">
          <TabPane tab="基本信息" itemKey="1">
            <Descriptions data={getBasicData(record)}></Descriptions>
          </TabPane>
          <TabPane tab="资源信息" itemKey="2">
            <RadioGroup
              style={{ marginBottom: 8 }}
              type="button"
              buttonSize="middle"
              aria-label="显示类型"
              name="desplay type"
              value={displayType}
              onChange={(event) => setDisplayType(event.target.value)}
            >
              {Object.keys(ResourceDisplayType).map((item) => (
                <Radio key={item} value={item}>
                  {item}
                </Radio>
              ))}
            </RadioGroup>
            <Descriptions
              data={getResourceDate(record, resourceConverter, displayType)}
            ></Descriptions>
          </TabPane>
          <TabPane tab="授权信息" itemKey="3">
            {record.permissionSet.map((item) => {
              return (
                <Descriptions
                  className="break-words"
                  key={item.permissionId}
                  data={getPermissionData(item)}
                ></Descriptions>
              );
            })}
          </TabPane>
        </Tabs>
      </Modal>
      <Modal
        title={"更改状态"}
        visible={changeStatusVisible}
        onOk={changeStatusHandleOk}
        onCancel={changeStatusHandleCancel}
        closeOnEsc={true}
        okButtonProps={{ loading: loading }}
      >

        <RadioGroup
          type="button"
          buttonSize="middle"
          aria-label="选择状态"
          value={selectedStatus}
          name="selected status"
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          {Object.keys(Status).map((item) => (
            <Radio key={item} value={item}>
              {item}
            </Radio>
          ))}
        </RadioGroup>
      </Modal>
      <Modal
        title={"TRX转账"}
        visible={transferVisible}
        onOk={handleTransferOk}
        onCancel={handleTransferCancel}
        closeOnEsc={true}
        okButtonProps={{ loading: transferLoading }}
      >
          
        <Space vertical align="start">
        <Label>账号类型</Label>
            <RadioGroup
              type="button"
              buttonSize="middle"
              aria-label="选择转账类型"
              
              value={transferType}
              name="transfer type"
              onChange={(event) => setTransferType(event.target.value)}
            >
              {Object.keys(TransactionType).map((item) => (
                <Radio key={item} value={item}>
                  {item}
                </Radio>
              ))}
            </RadioGroup>
            <Label>货币</Label>
            <Select
              value={currency}
              onChange={handleCurrencyChange}
              style={{ width: 120 }}
            >
              {Object.keys(Currency).map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
            <Label>账户</Label>
            <Input style={{width:250}} placeholder={transferType == TransactionType.INTERNAL ? "ID" : "地址"} value={to} onChange={value => setTo(value)}></Input>
            <Label>数量</Label>
            <InputNumber
            min={0}
              value={amount}
              onChange={handlerAmountChange}
              max={formatAmountAsFloat(record.balance.amount, Currency.TRX)}
            />
        </Space>
      </Modal>
      <Dropdown
        render={
          <Dropdown.Menu>
            {record.accountType == AccountType.INTERNAL && (
              <Dropdown.Item onClick={onClickTransfer}>转账</Dropdown.Item>
            )}
            <Dropdown.Item onClick={onClickChangeStatusDropdown}>
              更改状态
            </Dropdown.Item>

            <Dropdown.Item onClick={onClickUpdateBalance}>
              {updateBalanceLoading ? <Spin /> : "更新余额"}
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <IconMore />
      </Dropdown>
    </Row>
  );
}
