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
// 定义 AppContext 的类型
export interface TronAccountViewModelType {

  search:()=> void,
  updateBalance:(id:string)=>void;
  updateStatus:(id:string,status:Status)=>void;
  generateAccount:()=>void;
  currentPage:number;
  setCurrentPage:Dispatch<SetStateAction<number>>;
  total:number;
  tronAccountList:TronAccount[];
  size:number;
  accountType:AccountType;
  setAccountType:Dispatch<SetStateAction<AccountType>>;
  loading:boolean;
  queryId:string | undefined;
  setQueryid: Dispatch<SetStateAction<string | undefined>>;
  address:string | undefined
  setAddress: Dispatch<SetStateAction<string | undefined>>;
  amountGTE:number | undefined;
  setAmountGTE: Dispatch<SetStateAction<number | undefined>>;
  setEnergyGTE: Dispatch<SetStateAction<number | undefined>>;
  energyGTE:number | undefined;
  setCanDelegatedForEnergyGTE: Dispatch<SetStateAction<number | undefined>>;
  canDelegatedForEnergyGTE:number | undefined;
  setStatusArray: Dispatch<SetStateAction<Status[]>>;
  statusArray:Status[];
  setDateArray: Dispatch<SetStateAction<Date[] | string[]>>;
  dateArray:Date[] | string [];
  resetQuery:()=>void;
  setDisplayType: Dispatch<SetStateAction<ResourceDisplayType>>;
  displayType: ResourceDisplayType;
  resourceConverter:ResourceConverter;
  transfer:(transferRequest: TransferRequest)=> Promise<void>;
}

export const TronAccountContext = createContext<TronAccountViewModelType>({
  search: function (): void {
    throw new Error("Function not implemented.");
  },
  updateBalance: function (id: string): void {
    throw new Error("Function not implemented.");
  },
  updateStatus: function (id: string, status: Status): void {
    throw new Error("Function not implemented.");
  },
  generateAccount: function (): void {
    throw new Error("Function not implemented.");
  },
  currentPage: 0,
  setCurrentPage: function (value: SetStateAction<number>): void {
    throw new Error("Function not implemented.");
  },
  total: 0,
  tronAccountList: [],
  size: 0,
  accountType: AccountType.AUTHORIZED,
  setAccountType: function (value: SetStateAction<AccountType>): void {
    throw new Error("Function not implemented.");
  },
  loading: false,
  queryId: undefined,
  setQueryid: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setAddress: function (value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.");
  },
  address: undefined,
  amountGTE: undefined,
  setAmountGTE: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  setEnergyGTE: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  energyGTE: undefined,
  setCanDelegatedForEnergyGTE: function (value: SetStateAction<number | undefined>): void {
    throw new Error("Function not implemented.");
  },
  canDelegatedForEnergyGTE: undefined,
  setStatusArray: function (value: SetStateAction<Status[]>): void {
    throw new Error("Function not implemented.");
  },
  statusArray: [],

  dateArray: [],
  setDateArray: function (value: SetStateAction<Date[] | string[]>): void {
    throw new Error("Function not implemented.");
  },
  resetQuery: function (): void {
    throw new Error("Function not implemented.");
  },
  setDisplayType: function (value: SetStateAction<ResourceDisplayType>): void {
    throw new Error("Function not implemented.");
  },
  displayType: ResourceDisplayType.TRX,
  resourceConverter: new ResourceConverter({
    totalEnergyWeight: 0,
    totalEnergyLimit: 0,
    totalNetWeight: 0,
    totalNetLimit: 0,
  }),
  transfer: function (transferRequest: TransferRequest): Promise<void> {
    throw new Error("Function not implemented.");
  }
});



function TronAccountViewModelProvider({ children }: StoreProviderProps) {
  const { selectItems, accountResourceMessage } = useContext(AppContext);
  const router = useRouter();
  const api = new Api(router);
  const {logged} = useContext(AppContext)
  const [currentPage,setCurrentPage] = useState<number>(1)
  const [total,setTotal] = useState<number>(0)
  const [tronAccountList,setTronAccountList] = useState<TronAccount[]>([])
  const [size,setSize] = useState<number>(10)
  const [accountType,setAccountType] = useState<AccountType>(AccountType.AUTHORIZED)
  const [loading, setLoading] = useState(false);
  const [queryId,setQueryid] = useState<string | undefined>()
  const [address,setAddress] = useState<string | undefined>()
  const [amountGTE,setAmountGTE] = useState<number | undefined>()
  const [energyGTE,setEnergyGTE] = useState<number | undefined>()
  const [canDelegatedForEnergyGTE,setCanDelegatedForEnergyGTE] = useState<number | undefined>()
  const [statusArray,setStatusArray] = useState<Status[]>([])
  const [dateArray,setDateArray] = useState<Date[] | string []>([])
  const [displayType,setDisplayType] = useState<ResourceDisplayType>(ResourceDisplayType.TRX)
  const resourceConverter = new ResourceConverter(accountResourceMessage);
  
  async function search() {
    setLoading(true)
    const queryTool = new QueryTool([])
    const accountTypeParame:QueryParameters = {
      type: QueryType.IN,
      where: "accountType",
      args: [accountType]
    }
    queryTool.addQueryId(queryId)
 
    if (address){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "base58CheckAddress",
        args: [address]
      })
    }
    if (amountGTE){
      queryTool.addQueryParameter({
        type: QueryType.GTE,
        where: "balance.amount",
        args: [convertFloatToSmallestUnit(amountGTE,Currency.TRX)]
      })
    }
    if (energyGTE){
      queryTool.addQueryParameter({
        type: QueryType.GTE,
        where: "balance.energy",
        args: [displayType == ResourceDisplayType.TRX ? convertFloatToSmallestUnit(energyGTE,Currency.TRX) : resourceConverter.energyToTrx(energyGTE)]
      })
    }
    if (canDelegatedForEnergyGTE){
      queryTool.addQueryParameter({
        type: QueryType.GTE,
        where: "balance.canDelegatedForEnergy",
        args: [displayType == ResourceDisplayType.TRX ? convertFloatToSmallestUnit(canDelegatedForEnergyGTE,Currency.TRX) : resourceConverter.energyToTrx(canDelegatedForEnergyGTE)]
      })
    }
    if (statusArray.length > 0){
      queryTool.addQueryParameter({
        type: QueryType.IN,
        where: "status",
        args: statusArray
      })
    }
    queryTool.addCreateDateRange(dateArray)
    queryTool.addQueryParameter(accountTypeParame)
    const param:Params ={
      size:size,
      page:currentPage-1,
      direction:"DESC",
      properties:"id"
    }
    const result = await api.post<TronAccount[]>("/a/v1/pri/tron/account/search",param,queryTool)
    if (result.code == 0 ){
      setTronAccountList(result?.data?.map(item => new TronAccount(item)) ?? [])
      setTotal(result.count ?? 0)
      if (result?.count  && (result?.count / size) < currentPage - 1){
        setCurrentPage(1)
    }
    }
    setLoading(false)
    
  }
  async function updateBalance(id:string) {
    const result = await api.patch(`/a/v1/pri/tron/account/${id}/balance`)
    if (result.code ==0){
      Toast.success("更新成功")
    }
  }
  async function updateStatus(id:string,status:Status) {
    const param:Params = {
      status:status
    }
    const result = await api.patch(`/a/v1/pri/tron/account/${id}/status`,param)
    if (result.code ==0){
      Toast.success("更新成功")
    }
  }
  async function generateAccount() {
    const result = await api.post<TronAccount>(`/a/v1/pri/tron/account`)
    if (result.code ==0){
      Toast.success("生成账号成功")
    }
    search()
  }
  async function transfer(transferRequest:TransferRequest) {
    const result = await api.post<TransferRecord>("/a/v1/pri/tron/transfer",undefined,transferRequest)
    if (result.code == 0 && result.data){
      Toast.success("提交成功")
    }
  }
  function resetQuery(){
    setQueryid(undefined)
    setAddress(undefined)
    setAmountGTE(undefined)
    setEnergyGTE(undefined)
    setCanDelegatedForEnergyGTE(undefined)
    setStatusArray([])
    setDateArray([])
  }
  useEffect(()=>{
    if (logged){
      search()
    }
  },[currentPage,logged,accountType])

  const contextValue: TronAccountViewModelType = {
    search,
    updateBalance,
    updateStatus,
    generateAccount,
    currentPage,
    setCurrentPage,
    total,
    tronAccountList,
    size,
    accountType,
    setAccountType,
    loading,
    queryId,
    setQueryid,
    address,
    setAddress,
    amountGTE,
    setAmountGTE,
    energyGTE: energyGTE,
    setEnergyGTE: setEnergyGTE,
    canDelegatedForEnergyGTE,
    setCanDelegatedForEnergyGTE,
    statusArray,
    setStatusArray,
    dateArray,
    setDateArray,
    resetQuery,
    displayType,
    setDisplayType,
    resourceConverter,
    transfer
  };

  return (
    <TronAccountContext.Provider value={contextValue}>{children}</TronAccountContext.Provider>
  );
}

export default TronAccountViewModelProvider;
