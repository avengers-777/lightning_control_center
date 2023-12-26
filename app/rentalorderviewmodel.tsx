"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Api, Params } from "@/networking/Api";
import { useRouter } from "next/navigation";
import { Notification, Button, ButtonGroup, Toast } from "@douyinfe/semi-ui";
import { NoticeReactProps } from "@douyinfe/semi-ui/lib/es/notification";
import { ethers } from "ethers";
import { ResModel } from "@/types/common/ResModel";
import { Signature, SignatureType, SignatureTypeMessages } from "@/types/dto/Signature";
import { TokenInfo } from "@/types/dto/TokenInfo";
import { Admin } from "@/types/data/Admin";
import { NavItemProps, SubNavProps } from "@douyinfe/semi-ui/lib/es/navigation";
import { AppContext, StoreProviderProps } from "./store";
import { QueryParameters, QueryTool, QueryType } from "@/types/data/QueryTool";
import useConfig from "antd/lib/config-provider/hooks/useConfig";
import { AccountType } from "@/types/enums/AccountType";
import { Tools } from "@/utils/Tools";
import { Currency, convertFloatToSmallestUnit } from "@/types/enums/Currency";
import { ResourceConverter } from "@/types/app/ResourceConverter";
import { ResourceDisplayType } from "@/types/enums/ResourceDisplayType";
import { TransferRequest } from "@/types/dto/TransferRequest";
import { TransferRecord } from "@/types/data/TransferRecord";
import { TransactionType } from "@/types/enums/TransactionType";
import { TransferStatus } from "@/types/enums/TransferStatus";
import { DepositOrder } from "@/types/data/DepositOrder";
import { BlockchainPlatform } from "@/types/enums/BlockchainPlatform";
import { ResourceCode, Status, TronResourceRentalOrder } from "@/types/data/TronResourceRentalOrder";
// 定义 AppContext 的类型
export interface RentalOrderViewModelType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  total: number;
  size: number;
  loading: boolean;
  resourceRentalOrders: TronResourceRentalOrder[];
  queryId: string | undefined;
  setQueryid: Dispatch<SetStateAction<string | undefined>>;
  queryDepositOrderId: string | undefined;
  setQueryDepositOrderId: Dispatch<SetStateAction<string | undefined>>;
  queryReceivingAccountId: string | undefined;
  setQueryReceivingAccountId: Dispatch<SetStateAction<string | undefined>>;
  queryLessorId: string | undefined;
  setQueryLessorId: Dispatch<SetStateAction<string | undefined>>;
  queryDeviceId: string | undefined;
  setQueryDeviceId: Dispatch<SetStateAction<string | undefined>>;
  queryIp: string | undefined;
  setQueryIp: Dispatch<SetStateAction<string | undefined>>;
  queryResourceCode: ResourceCode | undefined;
  setQueryResourceCode: Dispatch<SetStateAction<ResourceCode | undefined>>;
  queryValueInTrxLeft: number | undefined;
  setQueryValueInTrxLeft: Dispatch<SetStateAction<number | undefined>>;
  queryValueInTrxRight: number | undefined;
  setQueryValueInTrxRight: Dispatch<SetStateAction<number | undefined>>;
  queryAmountLeft: number | undefined;
  setQueryAmountLeft: Dispatch<SetStateAction<number | undefined>>;
  queryAmountRight: number | undefined;
  setQueryAmountRight: Dispatch<SetStateAction<number | undefined>>;
  queryLockup: boolean | undefined;
  setQueryLockup: Dispatch<SetStateAction<boolean | undefined>>;
  queryDurationLeft: number | undefined;
  setQueryDurationLeft: Dispatch<SetStateAction<number | undefined>>;
  queryDurationRight: number | undefined;
  setQueryDurationRight: Dispatch<SetStateAction<number | undefined>>;
  queryExpectedReclaimDateArray: Date[] | string[];
  setQueryExpectedReclaimDateArray: Dispatch<SetStateAction<Date[] | string[]>>;
  queryExpectedReclaimBlockHeightLeft: number | undefined;
  setQueryExpectedReclaimBlockHeightLeft: Dispatch<SetStateAction<number | undefined>>;
  queryExpectedReclaimBlockHeightRight: number | undefined;
  setQeryExpectedReclaimBlockHeightRight: Dispatch<SetStateAction<number | undefined>>;
  queryTXID: string | undefined;
  setQueryTXID: Dispatch<SetStateAction<string | undefined>>;
  queryReclaimTxid: string | undefined;
  setQueryReclaimTxid: Dispatch<SetStateAction<string | undefined>>;
  queryCreateDateArray: Date[] | string[];
  setQueryCreateDateArray: Dispatch<SetStateAction<Date[] | string[]>>;
  queryTransactionTimeArray: Date[] | string[];
  setQueryTransactionTimeArray: Dispatch<SetStateAction<Date[] | string[]>>;
  queryCompleteTimeArray: Date[] | string[];
  setQueryCompleteTimeArray: Dispatch<SetStateAction<Date[] | string[]>>;
  queryStatus: Status | undefined;
  setQueryStatus: Dispatch<SetStateAction<Status | undefined>>;
  search(): Promise<void>;
  resetQuery(): void;
}

export const RentalOrderContext = createContext<RentalOrderViewModelType>({
  currentPage: 0,
  setCurrentPage: function (value: SetStateAction<number>): void {
    throw new Error("Function not implemented.");
  },
  total: 0,
  size: 0,
  loading: false,
  resourceRentalOrders: [],
  queryId: undefined,
  setQueryid: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryReceivingAccountId: undefined,
  setQueryReceivingAccountId: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryLessorId: undefined,
  setQueryLessorId: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryDeviceId: undefined,
  setQueryDeviceId: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryIp: undefined,
  setQueryIp: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryResourceCode: undefined,
  setQueryResourceCode: function (value: SetStateAction<ResourceCode | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryValueInTrxLeft: undefined,
  setQueryValueInTrxLeft: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryValueInTrxRight: undefined,
  setQueryValueInTrxRight: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryAmountLeft: undefined,
  setQueryAmountLeft: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryAmountRight: undefined,
  setQueryAmountRight: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryLockup: undefined,
  setQueryLockup: function (value: SetStateAction<boolean | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryDurationLeft: undefined,
  setQueryDurationLeft: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryDurationRight: undefined,
  setQueryDurationRight: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryExpectedReclaimDateArray: [],
  setQueryExpectedReclaimDateArray: function (value: SetStateAction<Date[] | string[]>): void {
    throw new Error("Function not implemented.");
  },
  queryExpectedReclaimBlockHeightLeft: undefined,
  setQueryExpectedReclaimBlockHeightLeft: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryExpectedReclaimBlockHeightRight: undefined,
  setQeryExpectedReclaimBlockHeightRight: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryTXID: undefined,
  setQueryTXID: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryReclaimTxid: undefined,
  setQueryReclaimTxid: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  queryCreateDateArray: [],
  setQueryCreateDateArray: function (value: SetStateAction<Date[] | string[]>): void {
    throw new Error("Function not implemented.");
  },
  queryTransactionTimeArray: [],
  setQueryTransactionTimeArray: function (value: SetStateAction<Date[] | string[]>): void {
    throw new Error("Function not implemented.");
  },
  queryCompleteTimeArray: [],
  setQueryCompleteTimeArray: function (value: SetStateAction<Date[] | string[]>): void {
    throw new Error("Function not implemented.");
  },
  queryStatus: undefined,
  setQueryStatus: function (value: SetStateAction<Status | undefined>): void {
    throw new Error("Function not implemented.");
  },
  search: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  resetQuery: function (): void {
    throw new Error("Function not implemented.");
  },
  queryDepositOrderId: undefined,
  setQueryDepositOrderId: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  }
});



function RentalOrderViewModelProvider({ children }: StoreProviderProps) {
  const { selectItems, accountResourceMessage } = useContext(AppContext);
  const router = useRouter();
  const api = new Api(router);
  const {logged} = useContext(AppContext)
  const [currentPage,setCurrentPage] = useState<number>(1)
  const [total,setTotal] = useState<number>(0)
  const [size,setSize] = useState<number>(10)
  const [loading, setLoading] = useState(false);

  const [resourceRentalOrders,setResourceRentalOrders] = useState<TronResourceRentalOrder[]>([])
  const [queryId,setQueryid] = useState<string | undefined>()
  const [queryDepositOrderId,setQueryDepositOrderId] = useState<string | undefined>()
  const [queryReceivingAccountId,setQueryReceivingAccountId] = useState<string | undefined>()
  const [queryLessorId,setQueryLessorId] = useState<string | undefined>()
  const [queryDeviceId,setQueryDeviceId] = useState<string | undefined>()
  const [queryIp,setQueryIp] = useState<string | undefined>()
  const [queryResourceCode,setQueryResourceCode] = useState<ResourceCode | undefined>()
  const [queryValueInTrxLeft,setQueryValueInTrxLeft] = useState<number | undefined>()
  const [queryValueInTrxRight,setQueryValueInTrxRight] = useState<number | undefined>()
  const [queryAmountLeft,setQueryAmountLeft] = useState<number | undefined>()
  const [queryAmountRight,setQueryAmountRight] = useState<number | undefined>()
  const [queryLockup,setQueryLockup] = useState<boolean | undefined>()
  const [queryDurationLeft,setQueryDurationLeft] = useState<number | undefined>()
  const [queryDurationRight,setQueryDurationRight] = useState<number | undefined>()

  const [queryExpectedReclaimDateArray,setQueryExpectedReclaimDateArray] = useState<Date[] | string []>([])
  const [queryExpectedReclaimBlockHeightLeft,setQueryExpectedReclaimBlockHeightLeft] = useState<number | undefined>()
  const [queryExpectedReclaimBlockHeightRight,setQeryExpectedReclaimBlockHeightRight] = useState<number | undefined>()
  const [queryTXID,setQueryTXID] = useState<string | undefined>()
  const [queryReclaimTxid,setQueryReclaimTxid] = useState<string | undefined>()
  const [queryCreateDateArray,setQueryCreateDateArray] = useState<Date[] | string []>([])
  const [queryTransactionTimeArray,setQueryTransactionTimeArray] = useState<Date[] | string []>([])
  const [queryCompleteTimeArray,setQueryCompleteTimeArray] = useState<Date[] | string []>([])
  const [queryStatus,setQueryStatus] = useState<Status | undefined>()

  const resourceConverter = new ResourceConverter(accountResourceMessage);
  function buildQueryTool():QueryTool{
    const queryTool = new QueryTool([])
    if (queryId){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "id",
        args: [queryId]
      })
    }
    if (queryDepositOrderId){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "depositOrderId",
        args: [queryDepositOrderId]
      })
    }
    if (queryReceivingAccountId){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "receivingAccountId",
        args: [queryReceivingAccountId]
      })
    }
    if (queryLessorId){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "lessorId",
        args: [queryLessorId]
      })
    }
    if (queryDeviceId){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "deviceId",
        args: [queryDeviceId]
      })
    }
    if (queryIp){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "ip",
        args: [queryIp]
      })
    }
    if (queryResourceCode){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "resourceCode",
        args: [queryResourceCode]
      })
    }
    if (queryValueInTrxLeft && queryValueInTrxRight){
      queryTool.addQueryParameter({
        type: QueryType.GTE_AND_LTE,
        where: "valueInTrx",
        args:  [convertFloatToSmallestUnit(queryValueInTrxLeft,Currency.TRX),convertFloatToSmallestUnit(queryValueInTrxRight,Currency.TRX)]
      })
    }else if(queryValueInTrxLeft){
      queryTool.addQueryParameter({
        type: QueryType.GTE,
        where: "valueInTrx",
        args: [convertFloatToSmallestUnit(queryValueInTrxLeft,Currency.TRX)]
      })
    }
    else if(queryValueInTrxRight){
      queryTool.addQueryParameter({
        type: QueryType.LTE,
        where: "valueInTrx",
        args: [convertFloatToSmallestUnit(queryValueInTrxRight,Currency.TRX)]
      })
    }
    if (queryAmountLeft && queryAmountRight){
      queryTool.addQueryParameter({
        type: QueryType.GTE_AND_LTE,
        where: "amount",
        args: [queryAmountLeft,queryAmountRight]
      })
    }else if(queryAmountLeft){
      queryTool.addQueryParameter({
        type: QueryType.GTE,
        where: "amount",
        args: [queryAmountLeft]
      })
    }
    else if(queryAmountRight){
      queryTool.addQueryParameter({
        type: QueryType.LTE,
        where: "amount",
        args: [queryAmountRight]
      })
    }
    if (queryLockup != undefined){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "lockup",
        args: [queryLockup]
      })
    }
    if (queryDurationLeft && queryDurationRight){
      queryTool.addQueryParameter({
        type: QueryType.GTE_AND_LTE,
        where: "duration",
        args: [queryDurationLeft,queryDurationRight]
      })
    }else if(queryDurationLeft){
      queryTool.addQueryParameter({
        type: QueryType.GTE,
        where: "duration",
        args: [queryDurationLeft]
      })
    }
    else if(queryDurationRight){
      queryTool.addQueryParameter({
        type: QueryType.LTE,
        where: "duration",
        args: [queryDurationRight]
      })
    }
    queryTool.addDateRange(queryExpectedReclaimDateArray,"expectedReclaimTime")
    if (queryExpectedReclaimBlockHeightLeft && queryExpectedReclaimBlockHeightRight){
      queryTool.addQueryParameter({
        type: QueryType.GTE_AND_LTE,
        where: "expectedReclaimBlockHeight",
        args: [queryExpectedReclaimBlockHeightLeft,queryExpectedReclaimBlockHeightRight]
      })
    }else if(queryExpectedReclaimBlockHeightLeft){
      queryTool.addQueryParameter({
        type: QueryType.GTE,
        where: "expectedReclaimBlockHeight",
        args: [queryExpectedReclaimBlockHeightLeft]
      })
    }
    else if(queryExpectedReclaimBlockHeightRight){
      queryTool.addQueryParameter({
        type: QueryType.LTE,
        where: "expectedReclaimBlockHeight",
        args: [queryExpectedReclaimBlockHeightRight]
      })
    }
    if (queryTXID){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "txid",
        args: [queryTXID]
      })
    }
    if (queryReclaimTxid){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "reclaimTxid",
        args: [queryReclaimTxid]
      })
    }
    queryTool.addCreateDateRange(queryCreateDateArray)
    queryTool.addDateRange(queryTransactionTimeArray,"transactionTime")
    queryTool.addDateRange(queryCompleteTimeArray,"completeTime")
    if (queryStatus){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "status",
        args: [queryStatus]
      })
    }
    return queryTool
  }
  async function search() {
    setLoading(true)
    const queryTool = buildQueryTool()
    const param:Params ={
      size:size,
      page:currentPage-1,
      direction:"DESC",
      properties:"id"
    }
    const result = await api.post<TronResourceRentalOrder[]>("/a/v1/pri/tron/resource/order/search",param,queryTool)
    if (result.code == 0 ){
      setResourceRentalOrders(result?.data ?? [])
      setTotal(result?.count ?? 0)
      if (result?.count  && (result?.count / size) < currentPage - 1){
        setCurrentPage(1)
    }
    }
    setLoading(false)
    
  }
  function resetQuery(){
    setQueryid(undefined)
    setQueryDepositOrderId(undefined)
    setQueryReceivingAccountId(undefined)
    setQueryLessorId(undefined)
    setQueryDeviceId(undefined)
    setQueryIp(undefined)
    setQueryResourceCode(undefined)
    setQueryValueInTrxLeft(undefined)
    setQueryValueInTrxRight(undefined)
    setQueryAmountLeft(undefined)
    setQueryAmountRight(undefined)
    setQueryLockup(undefined)
    setQueryDurationLeft(undefined)
    setQueryDurationRight(undefined)
    setQueryExpectedReclaimDateArray([])
    setQueryExpectedReclaimBlockHeightLeft(undefined)
    setQeryExpectedReclaimBlockHeightRight(undefined)
    setQueryTXID(undefined)
    setQueryReclaimTxid(undefined)
    setQueryCreateDateArray([])
    setQueryTransactionTimeArray([])
    setQueryCompleteTimeArray([])
    setQueryStatus(undefined)
  }
  useEffect(()=>{
    if (logged){
      search()
    }

  },[logged,currentPage])

  const contextValue: RentalOrderViewModelType = {
    currentPage,
    setCurrentPage,
    total,
    size,
    loading,
    resourceRentalOrders,queryId,
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
    setQueryDepositOrderId

  };

  return (
    <RentalOrderContext.Provider value={contextValue}>{children}</RentalOrderContext.Provider>
  );
}

export default RentalOrderViewModelProvider;
