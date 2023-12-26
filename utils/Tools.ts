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
      static formatDuration(timestamp: number): string {
        const millisecondsInSecond = 1000;
        const secondsInMinute = 60;
        const minutesInHour = 60;
        const hoursInDay = 24;
      
        const totalSeconds = Math.floor(timestamp / millisecondsInSecond);
        const days = Math.floor(totalSeconds / (hoursInDay * minutesInHour * secondsInMinute));
        const hours = Math.floor((totalSeconds % (hoursInDay * minutesInHour * secondsInMinute)) / (minutesInHour * secondsInMinute));
        const minutes = Math.floor((totalSeconds % (minutesInHour * secondsInMinute)) / secondsInMinute);
        const seconds = totalSeconds % secondsInMinute;
      
        let duration = '';
        if (days > 0) {
          duration += `${days} days `;
        }
        if (hours > 0 || days > 0) { // Include hours if there are any days
          duration += `${hours} hours `;
        }
        if (minutes > 0 || hours > 0 || days > 0) { // Include minutes if there are any hours or days
          duration += `${minutes} minutes `;
        }
        duration += `${seconds} seconds`;
      
        return duration.trim();
      }
}