import { Descriptions } from "@douyinfe/semi-ui";
import { IconArrowUp } from '@douyinfe/semi-icons';
import { useContext } from "react";
import { AppContext } from "@/app/store";
import BlockUtils from "@/utils/BlockUtils";
export function TronScanBlockStatus(){
    const {enableScanBlock,scanBlockHeight,historicalBlockData} = useContext(AppContext)
    const blockHeightDifference = BlockUtils.calculateCurrentBlockHeightDifference(historicalBlockData.t1,historicalBlockData.t2,scanBlockHeight)
    const data = [
        { key: '扫块开启', value: enableScanBlock ? "开启" : "关闭" },
        { key: '最新高度', value: BlockUtils.getBlockHeightByTimestamp(historicalBlockData.t1,historicalBlockData.t2,new Date().getTime()).toFixed(0) },

        { key: '当前扫描高度', value: scanBlockHeight },
        { key: '高度差', value: <span style={blockHeightDifference > 15 ? {color:"red" } : undefined}>{blockHeightDifference.toFixed(0)}</span> }
       
    ];
    return (
        <Descriptions data={data} row size="small"  />
    )
}