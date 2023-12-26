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
import { endOfDay, startOfDay } from "@/types/common/Constants";
export function TronAccountManager() {
  const { selectItems, accountResourceMessage } = useContext(AppContext);
  const {
    search,
    tronAccountList,
    currentPage,
    setCurrentPage,
    total,
    accountType,
    setAccountType,
    loading,
    generateAccount,
    size,
    queryId,
    setQueryid,
    address,
    setAddress,
    amountGTE,
    setAmountGTE,
    energyGTE,
    setEnergyGTE,
    canDelegatedForEnergyGTE,
    setCanDelegatedForEnergyGTE,
    statusArray,
    setStatusArray,
    dateArray,
    setDateArray,
    resetQuery,
    displayType,
    setDisplayType,
  } = useContext(TronAccountContext);

  const resourceConverter = new ResourceConverter(accountResourceMessage);
  const currentDate = new Date();

  const handlePageChange = (page: number | undefined) => {
    if (page) {
      setCurrentPage(page);
    }
  };

  const columns: ColumnProps<TronAccount>[] = createTronAccountColumns(
    resourceConverter,
    displayType
  );
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
  function handleEnergyGTEChange(
    value: string | number,
    e?: ChangeEvent<Element> | undefined
  ) {
    if (typeof value !== "string") {
      setEnergyGTE(value); // 如果是数字，则更新状态
    } else {
      setEnergyGTE(undefined);
    }
  }
  function handleCanDelegatedForEnergy(
    value: string | number,
    e?: ChangeEvent<Element> | undefined
  ) {
    if (typeof value !== "string") {
      setCanDelegatedForEnergyGTE(value); // 如果是数字，则更新状态
    } else {
      setCanDelegatedForEnergyGTE(undefined);
    }
  }
  function handlerStatusSelect(
    value: string | number | any[] | Record<string, any> | undefined
  ) {
    if (Array.isArray(value)) {
      setStatusArray(value);
    } else {
      setStatusArray([]);
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
          style={{ width: 320 }}
          placeholder="地址"
          onChange={setAddress}
          value={address}
        />
        <InputNumber
          style={{ width: 150 }}
          placeholder="余额大于"
          hideButtons
          onChange={handleAmountChange}
          value={amountGTE}
        />
        <InputNumber
          style={{ width: 150 }}
          placeholder="总质押能量大于"
          hideButtons
          onChange={handleEnergyGTEChange}
          value={energyGTE}
        />
        <InputNumber
          style={{ width: 150 }}
          placeholder="可委托能量大于"
          hideButtons
          onChange={handleCanDelegatedForEnergy}
          value={canDelegatedForEnergyGTE}
        />
        <DatePicker
          type="dateTimeRange"
          defaultPickerValue={[startOfDay, endOfDay]}
          value={dateArray}
          onChange={handlerDateTimeRange}
        />
        <Select
          placeholder="状态"
          multiple
          onChange={handlerStatusSelect}
          value={statusArray}
        >
          {Object.keys(Status).map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
        <Space className="w-full">
        <Space align="start" className="flex-grow">
          <RadioGroup
            type="button"
            value={accountType}
            aria-label="账号类型"
            name="account type"
            onChange={(event) => {
              setAccountType(event.target.value);
              setCurrentPage(1);
            }}
          >
            {Object.keys(AccountType).map((type) => (
              <Radio value={type} key={type}>
                {type}
              </Radio>
            ))}
          </RadioGroup>
          <RadioGroup
            type="button"
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
        </Space>
        <Space>
          <Button type="secondary" onClick={generateAccount}>
            生成账号
          </Button>
          <Button type="secondary" onClick={resetQuery}>
            重置
          </Button>
          <Button onClick={search}>查询</Button>
        </Space>
      </Space>
      </Space>
     

      <Table
        resizable
        columns={columns}
        dataSource={tronAccountList}
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
