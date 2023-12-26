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
// 定义 AppContext 的类型
export interface TransferViewModelType {
  currentPage: number;
  total: number;
  size: number;
  loading: boolean;
  transferRecords: TransferRecord[];
  search:()=> Promise<void>;
  setCurrentPage:Dispatch<SetStateAction<number>>;
  queryId: string | undefined;
  queryType: TransactionType | undefined;
  queryUserId: string | undefined;
  queryIp: string | undefined;
  queryCurrency: Currency | undefined;
  queryFrom: string | undefined;
  queryTo: string | undefined;
  amountGTE: number | undefined;
  queryTXID: string | undefined;
  dateArray: Date[] | string[];
  queryStatus: TransferStatus | undefined;
  setQueryid: Dispatch<SetStateAction<string | undefined>>;
  setQueryType: Dispatch<SetStateAction<TransactionType | undefined>>;
  setQueryUserId: Dispatch<SetStateAction<string | undefined>>;
  setQueryIp: Dispatch<SetStateAction<string | undefined>>;
  setQueryCurrency: Dispatch<SetStateAction<Currency | undefined>>;
  setQueryFrom: Dispatch<SetStateAction<string | undefined>>;
  setQueryTo: Dispatch<SetStateAction<string | undefined>>;
  setAmountGTE: Dispatch<SetStateAction<number | undefined>>;
  setQueryTXID: Dispatch<SetStateAction<string | undefined>>;
  setDateArray: Dispatch<SetStateAction<Date[] | string[]>>;
  setQueryStatus: Dispatch<SetStateAction<TransferStatus | undefined>>;
  resetQuery:()=>void;

}

export const TransferContext = createContext<TransferViewModelType>({
  currentPage: 0,
  total: 0,
  size: 0,
  loading: false,
  transferRecords: [],
  search: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  setCurrentPage: function (value: SetStateAction<number>): void {
    throw new Error("Function not implemented.");
  },
  queryId: undefined,
  queryType: undefined,
  queryUserId: undefined,
  queryIp: undefined,
  queryCurrency: undefined,
  queryFrom: undefined,
  queryTo: undefined,
  amountGTE: undefined,
  queryTXID: undefined,
  dateArray: [],
  queryStatus: undefined,
  setQueryid: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryType: function (value: SetStateAction<TransactionType | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryUserId: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryIp: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryCurrency: function (value: SetStateAction<Currency | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryFrom: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setQueryTo: function (value: SetStateAction<string | undefined>): void {
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
  setQueryStatus: function (value: SetStateAction<TransferStatus | undefined>): void {
    throw new Error("Function not implemented.");
  },
  resetQuery: function (): void {
    throw new Error("Function not implemented.");
  }
});



function TransferViewModelProvider({ children }: StoreProviderProps) {
  const { selectItems, accountResourceMessage } = useContext(AppContext);
  const router = useRouter();
  const api = new Api(router);
  const {logged} = useContext(AppContext)
  const [currentPage,setCurrentPage] = useState<number>(1)
  const [total,setTotal] = useState<number>(0)
  const [size,setSize] = useState<number>(10)
  const [loading, setLoading] = useState(false);
  const [transferRecords,setTransferRecords] = useState<TransferRecord[]>([])
  const [queryId,setQueryid] = useState<string | undefined>()
  const [queryType,setQueryType] = useState<TransactionType | undefined>()
  const [queryUserId,setQueryUserId] = useState<string | undefined>()
  const [queryIp,setQueryIp] = useState<string | undefined>()
  const [queryCurrency,setQueryCurrency] = useState<Currency | undefined>()
  const [queryFrom,setQueryFrom] = useState<string | undefined>()
  const [queryTo,setQueryTo] = useState<string | undefined>()
  const [amountGTE,setAmountGTE] = useState<number | undefined>()
  const [queryTXID,setQueryTXID] = useState<string | undefined>()
  const [dateArray,setDateArray] = useState<Date[] | string []>([])
  const [queryStatus,setQueryStatus] = useState<TransferStatus | undefined>()
  const resourceConverter = new ResourceConverter(accountResourceMessage);
  async function search() {
    setLoading(true)
    const queryTool = new QueryTool([])
    queryTool.addQueryId(queryId)
    if (queryType){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "type",
        args: [queryType]
      })
    }
    if (queryUserId){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "userId",
        args: [queryUserId]
      })
    }
    if (queryIp){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "ip",
        args: [queryIp]
      })
    }
    if (queryCurrency){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "currency",
        args: [queryCurrency]
      })
    }
    if (queryFrom){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "from",
        args: [queryFrom]
      })
    }
    if (queryTo){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "to",
        args: [queryTo]
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
    queryTool.addCreateDateRange(dateArray)
    const param:Params ={
      size:size,
      page:currentPage-1,
      direction:"DESC",
      properties:"id"
    }
    const result = await api.post<TransferRecord[]>("/a/v1/pri/tron/transfer/search",param,queryTool)
    if (result.code == 0 ){
      setTransferRecords(result?.data ?? [])
      setTotal(result?.count ?? 0)
      if (result?.count  && (result?.count / size) < currentPage - 1){
          setCurrentPage(1)
      }
    }
    setLoading(false)

    
  }
  function resetQuery(){
    setQueryid(undefined)
    setQueryType(undefined)
    setQueryUserId(undefined)
    setQueryIp(undefined)
    setQueryCurrency(undefined)
    setQueryFrom(undefined)
    setQueryTo(undefined)
    setAmountGTE(undefined)
    setQueryTXID(undefined)
    setDateArray([])
    setQueryStatus(undefined)
  }
  
  useEffect(()=>{
    if (logged){
      search()
    }
  },[currentPage,logged])

  const contextValue: TransferViewModelType = {
    currentPage,
    total,
    size,
    loading,
    transferRecords,
    search,
    setCurrentPage,
    queryId,
    queryType,
    queryUserId,
    queryIp,
    queryCurrency,
    queryFrom,
    queryTo,
    amountGTE,
    queryTXID,
    dateArray,
    queryStatus,
    setQueryid,
    setQueryType,
    setQueryUserId,
    setQueryIp,
    setQueryCurrency,
    setQueryFrom,
    setQueryTo,
    setAmountGTE,
    setQueryTXID,
    setDateArray,
    setQueryStatus,
    resetQuery
  };

  return (
    <TransferContext.Provider value={contextValue}>{children}</TransferContext.Provider>
  );
}

export default TransferViewModelProvider;
