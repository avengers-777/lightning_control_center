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
import { Status, TronAccount } from "@/types/data/TronAccount";
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
export function DepositOrderManager() {
  const { selectItems, accountResourceMessage } = useContext(AppContext);
  const {
    currentPage,
    total,
    size,
    loading,
    depositOrders,
    queryId,
    queryDeviceId,
    queryPlatform,
    queryReceivingAccountId,
    queryFrom,
    queryCurrency,
    amountGTE,
    queryTXID,
    dateArray,
    queryRentalOrderId,
    queryStatus,
    setQueryid,
    setQueryDeviceId,
    setQueryPlatform,
    setQueryReceivingAccountId,
    setQueryFrom,
    setQueryCurrency,
    setAmountGTE,
    setQueryTXID,
    setDateArray,
    setQueryRentalOrderId,
    setQueryStatus,
    search,
    setCurrentPage,
    resetQuery
  } = useContext(DepositOrderContext);

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
      setAmountGTE(value); // 如果是数字，则更新状态
    } else {
      setAmountGTE(undefined);
    }
  }
  function handlerDateTimeRange(
    date?: Date | Date[] | string | string[],
    dateStr?: string | string[] | Date | Date[]
  ) {
    const isDateArray =
      Array.isArray(date) && date.every((element) => element instanceof Date);
    if (isDateArray) {
      setDateArray(date);
    } else {
      setDateArray([]);
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
          placeholder="设备ID"
          onChange={setQueryDeviceId}
          value={queryDeviceId}
        />

        <Select
          value={queryPlatform}
          placeholder="平台类型"
          onChange={(value: any) => setQueryPlatform(value)}
          style={{ width: 200 }}
        >
          {Object.keys(BlockchainPlatform).map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <Select
          value={queryCurrency}
          placeholder="货币"
          onChange={(value: any) => setQueryCurrency(value)}
          style={{ width: 200 }}
        >
          {Object.keys(Currency).map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <InputNumber
          placeholder="数量大于"
          hideButtons
          onChange={handleAmountChange}
          value={amountGTE}
        />
        <Input
          style={{ width: 300 }}
          placeholder="接收账号ID"
          onChange={setQueryReceivingAccountId}
          value={queryReceivingAccountId}
        />
        <Input
          style={{ width: 300 }}
          placeholder="发送账户"
          onChange={setQueryFrom}
          value={queryFrom}
        />
        
        <Input
          style={{ width: 350 }}
          placeholder="TXID"
          onChange={setQueryTXID}
          value={queryTXID}
        />
        <Input
          style={{ width: 350 }}
          placeholder="出租订单ID"
          onChange={setQueryRentalOrderId}
          value={queryRentalOrderId}
        />
        <DatePicker
          type="dateTimeRange"
          defaultPickerValue={[startOfDay, endOfDay]}
          value={dateArray}
          onChange={handlerDateTimeRange}
        />
        <Select
          value={queryStatus}
          placeholder="状态"
          onChange={(value: any) => {
            setQueryStatus(value);
          }}
          style={{ width: 200 }}
        >
          {Object.keys(DepositStatus).map((item) => (
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
        columns={createDepositOrderColumns()}
        dataSource={depositOrders}
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
