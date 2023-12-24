"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
  Dispatch,
  SetStateAction,
} from "react";
import { Api } from "@/networking/Api";
import { useRouter } from "next/navigation";
import { Notification, Button, ButtonGroup } from "@douyinfe/semi-ui";
import { NoticeReactProps } from "@douyinfe/semi-ui/lib/es/notification";
import { ethers } from "ethers";
import { ResModel } from "@/types/common/ResModel";
import { Signature, SignatureType, SignatureTypeMessages } from "@/types/dto/Signature";
import { TokenInfo } from "@/types/dto/TokenInfo";
import { Admin } from "@/types/data/Admin";
import { NavItemProps, SubNavProps } from "@douyinfe/semi-ui/lib/es/navigation";
import { AccountResourceMessage, initAccountResourceMessage } from "@/types/app/ResourceConverter";
// 定义 AppContext 的类型
export interface AppContextType {
  logged: boolean;
  profile:Admin | undefined;
  getSigner:()=>Promise<ethers.JsonRpcSigner| undefined> ;
  signatureLogin:()=>void;
  nonce:string | undefined;
  logout:()=>void;
  setSelectItems: Dispatch<SetStateAction<(NavItemProps | SubNavProps)[]>>;
  setSelectKey: Dispatch<SetStateAction<string | number>>;
  selectKey: string | number;
  selectItems:(NavItemProps | SubNavProps)[];
  accountResourceMessage:AccountResourceMessage;

  
}

export const AppContext = createContext<AppContextType>({
  logged: false,
  profile: undefined,
  getSigner: function (): Promise<ethers.JsonRpcSigner> {
    throw new Error("Function not implemented.");
  },
  signatureLogin: function (): void {
    throw new Error("Function not implemented.");
  },
  nonce: undefined,
  logout: function (): void {
    throw new Error("Function not implemented.");
  },
  setSelectItems: function (value: SetStateAction<(NavItemProps | SubNavProps)[]>): void {
    throw new Error("Function not implemented.");
  },
  setSelectKey: function (value: SetStateAction<string | number>): void {
    throw new Error("Function not implemented.");
  },
  selectKey: "Home",
  selectItems: [],
  accountResourceMessage: initAccountResourceMessage
});

export type StoreProviderProps = {
  children: ReactNode;
};

function StoreProvider({ children }: StoreProviderProps) {
  const router = useRouter();
  const api = new Api(router);
  const [logged, setLogged] = useState<boolean>(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [profile,setProfile] = useState<Admin | undefined>()
  const [address, setAddress] = useState<string | undefined>();
  const [nonce,setNonce] = useState<string | undefined>()
  const [selectItems,setSelectItems] = useState<(NavItemProps | SubNavProps)[]>([])
  const [selectKey,setSelectKey] = useState<string | number>("Home")
  const [accountResourceMessage,setAccountResourceMessage] = useState<AccountResourceMessage>(initAccountResourceMessage)
  async function getNonce(address:string) {
    const result = await api.get<string>(`/a/v1/pub/admin/nonce/ethereum/${address}`)
    if (result.data && result.code == 0){
      setNonce(result.data)
    }
  }
  async function logout() {
    const result = await api.del("/a/v1/pri/admin/logout");
    setLogged(false);
    router.push("/login");
    if (typeof window !== "undefined") {
      localStorage.removeItem("t");
    }
  }
  
  async function getSigner() {
    if (!isMetaMaskInstalled) {
      let opts: NoticeReactProps = {
        duration: 3,
        position: "top",
        content: "MetaMask is not installed!",
        title: "Error",
      };
      Notification.error(opts);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address)
      return signer;
    } catch (error) {
      let opts: NoticeReactProps = {
        duration: 3,
        position: "top",
        content: "Error connecting to MetaMask" + error,
        title: "Error",
      };
      Notification.error(opts);
    }
  }

  async function signatureLogin() {
    const signer = await getSigner()
    if (signer){
      const message = SignatureTypeMessages[SignatureType.LOG_IN]+"_"+address+"_"+nonce
      const signature = await signer.signMessage(message);
      const body:Signature = new Signature(SignatureType.LOG_IN,signature,message)
      const result = await api.post<TokenInfo>("/a/v1/pub/admin/login",undefined,body)
      if (result.code == 0 && result.data){
        localStorage.setItem("t", result.data.tokenValue);
        setLogged(true);
        router.push("/");
        let opts: NoticeReactProps = {
          duration: 3,
          position: "top",
          content: "登录成功",
          title: "Success",
        };
        Notification.success(opts);
      }
    }
  }
  async function getMyPrifile() {
    const result = await api.get<Admin>("/a/v1/pri/admin/profile")
    if (result.code ==0 && result.data){
      setProfile(result.data)
    }
  }
  async function getAccountResourceMessage() {
    const result = await api.get<AccountResourceMessage>("/g/v1/tron/resource/resource-message")
    if (result.code ==0 && result.data){
      setAccountResourceMessage(result.data)
    }
    
  }

  useEffect(() => {
    const token = localStorage.getItem("t");
    if (token) {
      setLogged(true);
    } 
    getAccountResourceMessage()
  }, []);
  useEffect(() => {
    if (logged) {
      getMyPrifile();
    }
  }, [logged]);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);
    }
  }, []);
  useEffect(()=>{
    if (address){
      getNonce(address)
    }
  },[address])

  const contextValue: AppContextType = {
    logged,
    profile,
    getSigner,
    signatureLogin,
    nonce,
    logout,
    setSelectItems,
    setSelectKey,
    selectKey,
    selectItems,
    accountResourceMessage
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export default StoreProvider;
