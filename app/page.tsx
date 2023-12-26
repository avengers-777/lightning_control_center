"use client";
import Image from "next/image";
import {
  Layout,
  Nav,
  Button,
  Breadcrumb,
  Skeleton,
  Avatar,
  Popover,
} from "@douyinfe/semi-ui";
import {
  IconBell,
  IconHelpCircle,
  IconBytedanceLogo,
  IconHome,
  IconHistogram,
  IconLive,
  IconSetting,
  IconSemiLogo,
  IconTopbuzzLogo,
  IconBolt,
  IconLink,
  IconSend,
  IconCreditCard,
  IconQingyan
} from "@douyinfe/semi-icons";
import Link from "@douyinfe/semi-ui/lib/es/anchor/link";
import { ReactNode, useContext, useState } from "react";
import { NavItemProps, SubNavProps } from "@douyinfe/semi-ui/lib/es/navigation";
import { AppContext } from "./store";
import { TronAccountManager } from "@/components/TronAccountManager";
import { RouteProps } from "@douyinfe/semi-ui/lib/es/breadcrumb";
import { NavigationTarget } from "@/types/enums/NavigationTarget";
import { TransferRecordManager } from "@/components/TransferRecordManager";
import { DepositOrderManager } from "@/components/DepositOrderManager";
import { ProfileAvatarButton } from "@/components/ProfileAvatarButton";
import { RentalOrderManager } from "@/components/RentalOrderManager";
import { Settings } from "@/components/Settings";
import { TronScanBlockStatus } from "@/components/TronScanBlockStatus";

const routerItems = [
  // {
  //   itemKey: "Histogram",
  //   text: "基础数据",
  //   icon: <IconHistogram size="large" />,
  // },
  {
    itemKey: NavigationTarget.RENTAL_ORDER_MANARGER,
    text: "租赁订单",
    icon: <IconQingyan    size="large" />,
  },
  {
    itemKey: NavigationTarget.DEPOSIT_ORDER_MANARGER,
    text: "收款订单",
    icon: <IconCreditCard  size="large"/>,
  },
  {
    itemKey: NavigationTarget.TRON_ACCOUNT_MANARGER,
    text: "账号管理",
    icon: <IconTopbuzzLogo size="large"/>,
  },
  {
    itemKey: NavigationTarget.TRANSFER_RECORDS_MANARGER,
    text: "转账记录",
    icon: <IconSend   size="large" />,
  },
  {
    itemKey: NavigationTarget.SETTING,
    text: "系统设置",
    icon: <IconSetting size="large" />,
  },
]

const routerMap: { [key: string]: ReactNode } = {
  TRON_ACCOUNT_MANARGER: <TronAccountManager/>,
  TRANSFER_RECORDS_MANARGER:<TransferRecordManager/>,
  DEPOSIT_ORDER_MANARGER:<DepositOrderManager/>,
  RENTAL_ORDER_MANARGER:<RentalOrderManager/>,
  SETTING:<Settings/>
};

export default function Home() {
  const {setSelectKey,setSelectItems,selectKey,selectItems,profile,logout} = useContext(AppContext)
  const routes = selectItems.map(item => item.text).filter(text => text !== undefined) as (string | RouteProps)[];
  const { Header, Footer, Sider, Content } = Layout;
  return (
    <main className="flex  w-screen h-screen m-0 overflow-hidden">
      <Layout style={{ border: "1px solid var(--semi-color-border)" }}>
        <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
          <Nav
            defaultSelectedKeys={[selectKey]}
            style={{ maxWidth: 220, height: "100%" }}
            onSelect={(onSelectProps)=>{
              setSelectItems(onSelectProps.selectedItems)
              setSelectKey(onSelectProps.itemKey)
            }}
            items={routerItems}
            header={{
              logo: <IconBolt  style={{ fontSize: 36 }} />,
              text: "Lightning Energy",
            }}
            footer={{
              collapseButton: true,
            }}
          />
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
            <Nav
              mode="horizontal"
              footer={
                <>
                <TronScanBlockStatus></TronScanBlockStatus>
                  <Button
                    theme="borderless"
                    icon={<IconBell size="large" />}
                    style={{
                      color: "var(--semi-color-text-2)",
                      marginRight: "12px",
                    }}
                  />
                  <Button
                    theme="borderless"
                    icon={<IconHelpCircle size="large" />}
                    style={{
                      color: "var(--semi-color-text-2)",
                      marginRight: "12px",
                    }}
                  />
                  <ProfileAvatarButton name={profile?.name} logout={logout}></ProfileAvatarButton>
                </>
              }
            ></Nav>
          </Header>
          <Content
            style={{
              padding: "24px",
              backgroundColor: "var(--semi-color-bg-0)",
            }}
          >
              <Breadcrumb
        style={{
          marginBottom: "24px",
        }}
        routes={routes}
      />
          {routerMap[selectKey]}
          
          </Content>
          
          <Footer
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              color: "var(--semi-color-text-2)",
              backgroundColor: "rgba(var(--semi-grey-0), 1)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconBytedanceLogo size="large" style={{ marginRight: "8px" }} />
              <span>Copyright © 2019 ByteDance. All Rights Reserved. </span>
            </span>
            <span>
              <span style={{ marginRight: "24px" }}>平台客服</span>
              <span>反馈建议</span>
            </span>
          </Footer>
        </Layout>
      </Layout>
    </main>
  );
}
