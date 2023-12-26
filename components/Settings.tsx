import { AppContext } from "@/app/store";
import { Space, Switch } from "@douyinfe/semi-ui";
import Title from "@douyinfe/semi-ui/lib/es/typography/title";
import { useContext, useState } from "react";

export function Settings() {
    const {enableScanBlock,changeScanBlockEnabledStatus} = useContext(AppContext)
    const [loading,setLoading] = useState(false)
    async function onClick(checked:boolean){
        setLoading(true)
        await changeScanBlockEnabledStatus(checked)
        setLoading(false)
    }
  return (
    <Space vertical align="center">
        <Space>
      <Title heading={6}>开启扫块</Title>
      <Switch
      loading={loading}
          checked={enableScanBlock}
          onChange={onClick}
          aria-label=""
        />
        </Space>
    </Space>
  );
}
