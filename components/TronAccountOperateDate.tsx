import { ResourceConverter } from "@/types/app/ResourceConverter";
import { Permission } from "@/types/data/Permission";
import { TronAccount } from "@/types/data/TronAccount";
import { ResourceDisplayType } from "@/types/enums/ResourceDisplayType";
import { Tools } from "@/utils/Tools";
import { Row, Tag } from "@douyinfe/semi-ui";

export function getBasicData(record: TronAccount) {
  const basicData = [
    { key: "ID", value: record.id },
    { key: "标签", value: record.label },
    { key: "地址", value: record.base58CheckAddress },
    { key: "创建时间", value: record.randerCreateDate() },
    { key: "更新时间", value: record.randerUpdateDate() },
    { key: "账号类型", value: record.accountType },
    { key: "状态", value: record.status },
  ];
  return basicData;
}

export function getResourceDate(
  record: TronAccount,
  resourceConverter: ResourceConverter,
  displayType: ResourceDisplayType
) {
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
  return resourceDate;
}

export   function getPermissionData(permission: Permission) {
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
