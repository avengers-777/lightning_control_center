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
import { Status, TronAccount } from "@/types/data/TronAccount";
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
// 定义 AppContext 的类型
export interface DepositOrderViewModelType {
  currentPage: number;
  total: number;
  size: number;
  loading: boolean;
  depositOrders: DepositOrder[];
  queryId: string | undefined;
  queryDeviceId: string | undefined;
  queryPlatform: BlockchainPlatform | undefined;
  queryReceivingAccountId: string | undefined;
  queryFrom: string | undefined;
  queryCurrency: Currency | undefined;
  amountGTE: number | undefined;
  queryTXID: string | undefined;
  dateArray: Date[] | string[];
  queryRentalOrderId: string | undefined;
  queryStatus: TransferStatus | undefined;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  search(): Promise<void>;
  setQueryid: Dispatch<SetStateAction<string | undefined>>;
  setQueryDeviceId: Dispatch<SetStateAction<string | undefined>>;
  setQueryPlatform: Dispatch<SetStateAction<BlockchainPlatform | undefined>>;
  setQueryReceivingAccountId: Dispatch<SetStateAction<string | undefined>>;
  setQueryFrom: Dispatch<SetStateAction<string | undefined>>;
  setQueryCurrency: Dispatch<SetStateAction<Currency | undefined>>;
  setAmountGTE: Dispatch<SetStateAction<number | undefined>>;
  setQueryTXID: Dispatch<SetStateAction<string | undefined>>;
  setDateArray: Dispatch<SetStateAction<Date[] | string[]>>;
  setQueryRentalOrderId: Dispatch<SetStateAction<string | undefined>>;
  setQueryStatus: Dispatch<SetStateAction<TransferStatus | undefined>>;
  resetQuery(): void;


}

export const DepositOrderContext = createContext<DepositOrderViewModelType>({
  currentPage: 0,
  total: 0,
  size: 0,
  loading: false,
  depositOrders: [],
  queryId: undefined,
  queryDeviceId: undefined,
  queryPlatform: undefined,
  queryReceivingAccountId: undefined,
  queryFrom: undefined,
  queryCurrency: undefined,
  amountGTE: undefined,
  queryTXID: undefined,
  dateArray: [],
  queryRentalOrderId: undefined,
  queryStatus: undefined,
  search: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  setQueryid: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryDeviceId: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryPlatform: function (value: SetStateAction<BlockchainPlatform | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryReceivingAccountId: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryFrom: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryCurrency: function (value: SetStateAction<Currency | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setAmountGTE: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryTXID: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setDateArray: function (value: SetStateAction<Date[] | string[]>): void {
    throw new Error("Function not implemented.");
  },
  setQueryRentalOrderId: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryStatus: function (value: SetStateAction<TransferStatus | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setCurrentPage: function (value: SetStateAction<number>): void {
    throw new Error("Function not implemented.");
  },
  resetQuery: function (): void {
    throw new Error("Function not implemented.");
  }
});



function DepositOrderViewModelProvider({ children }: StoreProviderProps) {
  const { selectItems, accountResourceMessage } = useContext(AppContext);
  const router = useRouter();
  const api = new Api(router);
  const {logged} = useContext(AppContext)
  const [currentPage,setCurrentPage] = useState<number>(1)
  const [total,setTotal] = useState<number>(0)
  const [size,setSize] = useState<number>(10)
  const [loading, setLoading] = useState(false);

  const [depositOrders,setDepositOrders] = useState<DepositOrder[]>([])
  const [queryId,setQueryid] = useState<string | undefined>()
  const [queryDeviceId,setQueryDeviceId] = useState<string | undefined>()
  const [queryPlatform,setQueryPlatform] = useState<BlockchainPlatform | undefined>()
  const [queryReceivingAccountId,setQueryReceivingAccountId] = useState<string | undefined>()
  const [queryFrom,setQueryFrom] = useState<string | undefined>()
  const [queryCurrency,setQueryCurrency] = useState<Currency | undefined>()
  const [amountGTE,setAmountGTE] = useState<number | undefined>()
  const [queryTXID,setQueryTXID] = useState<string | undefined>()
  const [dateArray,setDateArray] = useState<Date[] | string []>([])
  const [queryRentalOrderId,setQueryRentalOrderId] = useState<string | undefined>()
  const [queryStatus,setQueryStatus] = useState<TransferStatus | undefined>()
  const resourceConverter = new ResourceConverter(accountResourceMessage);
  async function search() {
    setLoading(true)
    const queryTool = new QueryTool([])
    queryTool.addQueryId(queryId)
    if (queryDeviceId){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "deviceId",
        args: [queryDeviceId]
      })
    }
    if (queryPlatform){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "platform",
        args: [queryPlatform]
      })
    }
    if (queryReceivingAccountId){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "receivingAccountId",
        args: [queryReceivingAccountId]
      })
    }
    if (queryFrom){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "fromAddress",
        args: [queryFrom]
      })
    }
    if (queryCurrency){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "currency",
        args: [queryCurrency]
      })
    }
    
    if (amountGTE ){
      if (queryCurrency){
        queryTool.addQueryParameter({
          type: QueryType.GTE,
          where: "amount",
          args: [convertFloatToSmallestUnit(amountGTE,queryCurrency)]
        })
      }else{
        Toast.warning("货币不能为空")
      }
  
    }
    if (queryTXID){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "txid",
        args: [queryTXID]
      })
    }
    if (queryStatus){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "status",
        args: [queryStatus]
      })
    }
    if (queryRentalOrderId){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "actions",
        args: [queryRentalOrderId]
      })
    }
    queryTool.addCreateDateRange(dateArray)
    const param:Params ={
      size:size,
      page:currentPage-1,
      direction:"DESC",
      properties:"id"
    }
    const result = await api.post<DepositOrder[]>("/a/v1/pri/tron/deposit/order/search",param,queryTool)
    if (result.code == 0 ){
      setDepositOrders(result?.data ?? [])
      setTotal(result?.count ?? 0)
      if (result?.count  && (result?.count / size) < currentPage - 1){
        setCurrentPage(1)
    }
    }
    setLoading(false)
    
  }
  function resetQuery(){
    setQueryid(undefined)
    setQueryDeviceId(undefined)
    setQueryPlatform(undefined)
    setQueryReceivingAccountId(undefined)
    setQueryFrom(undefined)
    setQueryCurrency(undefined)
    setAmountGTE(undefined)
    setQueryTXID(undefined)
    setDateArray([])
    setQueryRentalOrderId(undefined)
    setQueryStatus(undefined)
  }
  useEffect(()=>{
    if (logged){
      search()
    }

  },[logged,currentPage])

  const contextValue: DepositOrderViewModelType = {
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
  };

  return (
    <DepositOrderContext.Provider value={contextValue}>{children}</DepositOrderContext.Provider>
  );
}

export default DepositOrderViewModelProvider;
