import { ResourceConverter } from "@/types/app/ResourceConverter";
import { Currency, formatAmountAsFloat } from "@/types/enums/Currency";
import { ResourceDisplayType } from "@/types/enums/ResourceDisplayType";

export class Tools{

    static formatTimestampToLocalTime(timestamp: number): string {
        const date = new Date(timestamp);
        return date.toLocaleString(undefined, { hour12: false });
      }
      static delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      static energyRander(amount:number,type:ResourceDisplayType,resourceConverter: ResourceConverter){
        if (type == ResourceDisplayType.TRX){
          return formatAmountAsFloat(
            amount,
            Currency.TRX
          ).toLocaleString();
        }else{
          return resourceConverter
          .trxToEnergy(amount)
          .toLocaleString();
        }
      }
      static bandwidthRander(amount:number,type:ResourceDisplayType,resourceConverter: ResourceConverter){
        if (type == ResourceDisplayType.TRX){
          return formatAmountAsFloat(
            amount,
            Currency.TRX
          ).toLocaleString();
        }else{
          return resourceConverter
          .trxToBandwidth(amount)
          .toLocaleString();
        }
      }
}