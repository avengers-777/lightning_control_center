"use client";

import {
  Button,
  Descriptions,
  Dropdown,
  Modal,
  Radio,
  RadioGroup,
  Row,
  Spin,
  TabPane,
  Tabs,
  Tag,
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

export function TronAccountOperate({ record }: { record: TronAccount }) {
  const { Text } = Typography;
  const {
    updateBalance,
    updateStatus,
    search,
    displayType,
    setDisplayType,
    resourceConverter,
  } = useContext(TronAccountContext);
  const [visible, setVisible] = useState(false);
  const [changeStatusVisible, setChangeStatusVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(record.status);
  const [loading, setLoading] = useState(false);
  const [updateBalanceLoading, setUpdateBalanceLoading] = useState(false);
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
  const basicData = [
    { key: "ID", value: record.id },
    { key: "标签", value: record.label },
    { key: "地址", value: record.base58CheckAddress },
    { key: "创建时间", value: record.randerCreateDate() },
    { key: "更新时间", value: record.randerUpdateDate() },
    { key: "账号类型", value: record.accountType },
    { key: "状态", value: record.status },
  ];
  const resourceDate = [
    { key: "余额", value: record.balance.getRanderAmount() },
    {
      key: "已质押能量",
      value: record.balance.getRanderEnergy(displayType, resourceConverter),
    },
    {
      key: "已质押带宽",
      value: record.balance.getRanderBandwidth(displayType, resourceConverter),
    },
    {
      key: "已委托能量",
      value: record.balance.getRanderDelegatedForEnergy(
        displayType,
        resourceConverter
      ),
    },
    {
      key: "已委托带宽",
      value: record.balance.getRanderBandwidth(displayType, resourceConverter),
    },
    {
      key: "获得的能量",
      value: record.balance.getRanderAcquiredDelegatedForEnergy(
        displayType,
        resourceConverter
      ),
    },
    {
      key: "获得的带宽",
      value: record.balance.getRanderAcquiredDelegatedForBandwidth(
        displayType,
        resourceConverter
      ),
    },
    {
      key: "可委托能量",
      value: record.balance.getRanderCanDelegatedForEnergy(
        displayType,
        resourceConverter
      ),
    },
    {
      key: "可委托带宽",
      value: record.balance.getRanderCanDelegatedForBandwidth(
        displayType,
        resourceConverter
      ),
    },
  ];
  function getPermissionData(permission: Permission) {
    const permissionData = [
      { key: "授权给", value: permission.authorizedTo },
      { key: "授权类型", value: permission.authType },
      { key: "临界点", value: permission.threshold },
      { key: "权重", value: permission.weight },
      {
        key: "权限",
        value: permission.operations.map((item, index) => (
          <Row key={index}>
            <Tag style={{ padding: 8, margin: 8 }} key={index}>
              {item}
            </Tag>
          </Row>
        )),
      },
      { key: "权限ID", value: permission.permissionId },
      {
        key: "TXID",
        value: <div style={{ width: 250 }}>{permission.txid}</div>,
      },
      { key: "区块高度", value: permission.blockHeight },
      {
        key: "区块时间",
        value: Tools.formatTimestampToLocalTime(permission.blockTimeStamp),
      },
      {
        key: "更新时间",
        value: Tools.formatTimestampToLocalTime(permission.updateDate),
      },
    ];
    return permissionData;
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
        title="账号详情"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closeOnEsc={true}
        header={null}
      >
        <Tabs type="line">
          <TabPane tab="基本信息" itemKey="1">
            <Descriptions data={basicData}></Descriptions>
          </TabPane>
          <TabPane tab="资源信息" itemKey="2">
            <RadioGroup
              style={{ marginBottom: 8 }}
              type="button"
              buttonSize="middle"
              defaultValue={displayType}
              aria-label="显示类型"
              name="desplay type"
              onChange={(event) => setDisplayType(event.target.value)}
            >
              {Object.keys(ResourceDisplayType).map((item) => (
                <Radio key={item} value={item}>
                  {item}
                </Radio>
              ))}
            </RadioGroup>
            <Descriptions data={resourceDate}></Descriptions>
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
          defaultValue={selectedStatus}
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
      <Dropdown
        render={
          <Dropdown.Menu>
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
