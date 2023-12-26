import { AppContext } from "@/app/store";
import {
  Breadcrumb,
  Button,
  DatePicker,
  Input,
  InputGroup,
  InputNumber,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Space,
  Switch,
  Table,
  TimePicker,
} from "@douyinfe/semi-ui";
import { RouteProps } from "@douyinfe/semi-ui/lib/es/breadcrumb";
import {
  ChangeEvent,
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Avatar } from "@douyinfe/semi-ui";
import * as dateFns from "date-fns";
import { TronAccountContext } from "@/app/tronaccountviewmodel";
import { QueryTool } from "@/types/data/QueryTool";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import {  TronAccount } from "@/types/data/TronAccount";
import { Tools } from "@/utils/Tools";
import { IconMore } from "@douyinfe/semi-icons";
import { Currency, formatAmountAsFloat } from "@/types/enums/Currency";
import { ResourceConverter } from "@/types/app/ResourceConverter";
import { AccountType } from "@/types/enums/AccountType";
import { Col, Row } from "@douyinfe/semi-ui";
import { createTronAccountColumns } from "./TronAccountColumns";
import { ResourceDisplayType } from "@/types/enums/ResourceDisplayType";
import { TransferContext } from "@/app/transferviewmodel";
import { createTransferRecordColumns } from "./TransferRecordColumns";
import { TransactionType } from "@/types/enums/TransactionType";
import { TransferStatus } from "@/types/enums/TransferStatus";
import { endOfDay, startOfDay } from "@/types/common/Constants";
import { SP } from "next/dist/shared/lib/utils";
import { DepositOrderContext } from "@/app/depositorderviewmodel";
import { createDepositOrderColumns } from "./DepositOrderColumns";
import { BlockchainPlatform } from "@/types/enums/BlockchainPlatform";
import { DepositStatus } from "@/types/data/DepositOrder";
import { createRentalOrderColumns } from "./RentalOrderColumns";
import { RentalOrderContext } from "@/app/rentalorderviewmodel";
import { ResourceCode, Status } from "@/types/data/TronResourceRentalOrder";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
export function RentalOrderManager() {
  const { selectItems, accountResourceMessage } = useContext(AppContext);
  const {
    currentPage,
    setCurrentPage,
    total,
    size,
    loading,
    resourceRentalOrders,
    queryId,
    setQueryid,
    queryReceivingAccountId,
    setQueryReceivingAccountId,
    queryLessorId,
    setQueryLessorId,
    queryDeviceId,
    setQueryDeviceId,
    queryIp,
    setQueryIp,
    queryResourceCode,
    setQueryResourceCode,
    queryValueInTrxLeft,
    setQueryValueInTrxLeft,
    queryValueInTrxRight,
    setQueryValueInTrxRight,
    queryAmountLeft,
    setQueryAmountLeft,
    queryAmountRight,
    setQueryAmountRight,
    queryLockup,
    setQueryLockup,
    queryDurationLeft,
    setQueryDurationLeft,
    queryDurationRight,
    setQueryDurationRight,
    queryExpectedReclaimDateArray,
    setQueryExpectedReclaimDateArray,
    queryExpectedReclaimBlockHeightLeft,
    setQueryExpectedReclaimBlockHeightLeft,
    queryExpectedReclaimBlockHeightRight,
    setQeryExpectedReclaimBlockHeightRight,
    queryTXID,
    setQueryTXID,
    queryReclaimTxid,
    setQueryReclaimTxid,
    queryCreateDateArray,
    setQueryCreateDateArray,
    queryTransactionTimeArray,
    setQueryTransactionTimeArray,
    queryCompleteTimeArray,
    setQueryCompleteTimeArray,
    queryStatus,
    setQueryStatus,
    search,
    resetQuery,
    queryDepositOrderId,
    setQueryDepositOrderId,
  } = useContext(RentalOrderContext);

  const handlePageChange = (page: number | undefined) => {
    if (page) {
      setCurrentPage(page);
    }
  };
  function handleAmountChange(
    value: string | number,
    e?: ChangeEvent<Element> | undefined
  ) {
    if (typeof value !== "string") {
    } else {
    }
  }
  function handlerExpectedReclaimDateTimeRange(
    date?: Date | Date[] | string | string[],
    dateStr?: string | string[] | Date | Date[]
  ) {
    const isDateArray =
      Array.isArray(date) && date.every((element) => element instanceof Date);
    if (isDateArray) {
      setQueryExpectedReclaimDateArray(date)
    } else {
      setQueryExpectedReclaimDateArray([])
    }
  }
  function handlerCreateDateTimeRange(
    date?: Date | Date[] | string | string[],
    dateStr?: string | string[] | Date | Date[]
  ) {
    const isDateArray =
      Array.isArray(date) && date.every((element) => element instanceof Date);
    if (isDateArray) {
      setQueryCreateDateArray(date)
    } else {
      setQueryCreateDateArray([])
    }
  }
  function handlerTransactionTimeRange(
    date?: Date | Date[] | string | string[],
    dateStr?: string | string[] | Date | Date[]
  ) {
    const isDateArray =
      Array.isArray(date) && date.every((element) => element instanceof Date);
    if (isDateArray) {
      setQueryTransactionTimeArray(date)
    } else {
      setQueryTransactionTimeArray([])
    }
  }
  function handlerCompleteTimeRange(
    date?: Date | Date[] | string | string[],
    dateStr?: string | string[] | Date | Date[]
  ) {
    const isDateArray =
      Array.isArray(date) && date.every((element) => element instanceof Date);
    if (isDateArray) {
      setQueryCompleteTimeArray(date)
    } else {
      setQueryCompleteTimeArray([])
    }
  }

  return (
    <Space vertical spacing="medium" align="center">
      <Space align="center" className="w-full" wrap>
        <Input
          style={{ width: 300 }}
          placeholder="ID"
          onChange={setQueryid}
          value={queryId}
        />
        <Input
          style={{ width: 300 }}
          placeholder="收款订单ID"
          onChange={setQueryDepositOrderId}
          value={queryDepositOrderId}
        />
        <Input
          style={{ width: 350 }}
          placeholder="接收账号ID"
          onChange={setQueryReceivingAccountId}
          value={queryReceivingAccountId}
        />
        <Input
          style={{ width: 350 }}
          placeholder="出租账号ID"
          onChange={setQueryLessorId}
          value={queryLessorId}
        />
        <Input
          style={{ width: 350 }}
          placeholder="设备ID"
          onChange={setQueryDeviceId}
          value={queryDeviceId}
        />
        <Input
          style={{ width: 350 }}
          placeholder="IP"
          onChange={setQueryIp}
          value={queryIp}
        />
        <Select
          value={queryResourceCode}
          placeholder="资源类型"
          onChange={(value: any) => setQueryResourceCode(value)}
          style={{ width: 200 }}
        >
          {Object.keys(ResourceCode).map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <InputGroup>
          <InputNumber
            placeholder="TRX大于"
            hideButtons
            onChange={(value) => {
              if (typeof value !== "string") {
                setQueryValueInTrxLeft(value); // 如果是数字，则更新状态
              } else {
                setQueryValueInTrxLeft(undefined);
              }
            }}
            value={queryValueInTrxLeft}
          />
          <InputNumber
            placeholder="TRX小于"
            hideButtons
            onChange={(value) => {
              if (typeof value !== "string") {
                setQueryValueInTrxRight(value); // 如果是数字，则更新状态
              } else {
                setQueryValueInTrxRight(undefined);
              }
            }}
            value={queryValueInTrxRight}
          />
        </InputGroup>
        <InputGroup>
          <InputNumber
            placeholder="资源数量大于"
            hideButtons
            onChange={(value) => {
              if (typeof value !== "string") {
                setQueryAmountLeft(value); // 如果是数字，则更新状态
              } else {
                setQueryAmountLeft(undefined);
              }
            }}
            value={queryAmountLeft}
          />
          <InputNumber
            placeholder="资源数量小于"
            hideButtons
            onChange={(value) => {
              if (typeof value !== "string") {
                setQueryAmountRight(value); // 如果是数字，则更新状态
              } else {
                setQueryAmountRight(undefined);
              }
            }}
            value={queryAmountRight}
          />
        </InputGroup>
        <Title heading={6} >
        锁定
        </Title>
        <Switch
          checked={queryLockup}
          onChange={setQueryLockup}
          aria-label="a switch for demo"
        />
        <InputGroup>
          <InputNumber
            placeholder="时长大于(毫秒)"
            hideButtons
            onChange={(value) => {
              if (typeof value !== "string") {
                setQueryDurationLeft(value); // 如果是数字，则更新状态
              } else {
                setQueryDurationLeft(undefined);
              }
            }}
            value={queryDurationLeft}
          />
          <InputNumber
            placeholder="时长小于(毫秒)"
            hideButtons
            onChange={(value) => {
              if (typeof value !== "string") {
                setQueryDurationRight(value); // 如果是数字，则更新状态
              } else {
                setQueryDurationRight(undefined);
              }
            }}
            value={queryDurationRight}
          />
        </InputGroup>
        <DatePicker
        placeholder={["预计回收时间范围开始","预计回收时间范围结束"]}
          type="dateTimeRange"
          defaultPickerValue={[startOfDay, endOfDay]}
          value={queryExpectedReclaimDateArray}
          onChange={handlerExpectedReclaimDateTimeRange}
        />
        <InputGroup>
          <InputNumber
            placeholder="预计回收区块高度大于"
            hideButtons
            onChange={(value) => {
              if (typeof value !== "string") {
                setQueryExpectedReclaimBlockHeightLeft(value); // 如果是数字，则更新状态
              } else {
                setQueryExpectedReclaimBlockHeightLeft(undefined);
              }
            }}
            value={queryExpectedReclaimBlockHeightLeft}
          />
          <InputNumber
            placeholder="预计回收区块高度小于"
            hideButtons
            onChange={(value) => {
              if (typeof value !== "string") {
                setQeryExpectedReclaimBlockHeightRight(value); // 如果是数字，则更新状态
              } else {
                setQeryExpectedReclaimBlockHeightRight(undefined);
              }
            }}
            value={queryExpectedReclaimBlockHeightRight}
          />
        </InputGroup>
        <Input
          style={{ width: 300 }}
          placeholder="委托TXID"
          onChange={setQueryTXID}
          value={queryTXID}
        />
        <Input
          style={{ width: 300 }}
          placeholder="回收TXID"
          onChange={setQueryReclaimTxid}
          value={queryReclaimTxid}
        />
        <DatePicker
        placeholder={["创建时间范围开始","创建时间范围结束"]}
          type="dateTimeRange"
          defaultPickerValue={[startOfDay, endOfDay]}
          value={queryCreateDateArray}
          onChange={handlerCreateDateTimeRange}
        />
        <DatePicker
        placeholder={["交易时间范围开始","交易时间范围结束"]}
          type="dateTimeRange"
          defaultPickerValue={[startOfDay, endOfDay]}
          value={queryTransactionTimeArray}
          onChange={handlerTransactionTimeRange}
        />
        <DatePicker
        placeholder={["完成时间范围开始","完成时间范围结束"]}
          type="dateTimeRange"
          defaultPickerValue={[startOfDay, endOfDay]}
          value={queryCompleteTimeArray}
          onChange={handlerCompleteTimeRange}
        />
        <Select
          value={queryStatus}
          placeholder="状态"
          onChange={(value: any) => setQueryStatus(value)}
          style={{ width: 200 }}
        >
          {Object.keys(Status).map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <Space vertical align="end" className="flex-grow">
          <Space>
            <Button type="secondary" onClick={resetQuery} >
              重置
            </Button>
            <Button onClick={search}>查询</Button>
          </Space>
        </Space>
      </Space>
      <Table
        resizable
        columns={createRentalOrderColumns()}
        dataSource={resourceRentalOrders}
        pagination={{
          currentPage,
          pageSize: size,
          total: total,
          onPageChange: handlePageChange,
        }}
        loading={loading}
      />
    </Space>
  );
}
