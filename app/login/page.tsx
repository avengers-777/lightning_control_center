'use client'
// Import everything
import { ethers } from "ethers";

// Import just a few select items
import { BrowserProvider, parseUnits } from "ethers";

// Import from a specific export
import { HDNodeWallet } from "ethers/wallet";
import { Notification, Button, ButtonGroup } from '@douyinfe/semi-ui';
import { NoticeReactProps } from "@douyinfe/semi-ui/lib/es/notification";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store";

export default function Login() {
  const {
    logged,
    profile,
    getSigner,
    signatureLogin,
    nonce
  } = useContext(AppContext);
  function onPress(){
    if (nonce){
      signatureLogin()
    }else{
      getSigner()
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative flex items-center justify-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
      <button
      onClick={onPress}
       className="bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-8 rounded-full cursor-pointer transform transition duration-300 hover:scale-110">
        {nonce ? "登录" : "链接MetaMask"}
      </button>
    </main>
  );
}
