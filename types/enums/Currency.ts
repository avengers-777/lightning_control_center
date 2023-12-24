export enum Currency {
    TRX = 'TRX',
    TRC10 = 'TRC10',
  }

  // 映射枚举值到其对应的小数位数
  export const CurrencyDecimalPlaces: { [key in Currency]: number } = {
    [Currency.TRX]: 6,
    [Currency.TRC10]: 6,
  };
  
  // 获取枚举的小数位数
  export function getCurrencyDecimalPlaces(currency: Currency): number {
    return CurrencyDecimalPlaces[currency];
  }
  
  export function formatAmountAsFloat(amount: number, currency: Currency): number {
    const decimalPlaces = CurrencyDecimalPlaces[currency];
    const divisor = Math.pow(10, decimalPlaces);
    return parseFloat((amount / divisor).toFixed(2));
  }
  export function convertFloatToSmallestUnit(amount: number, currency: Currency): number {
    const decimalPlaces = CurrencyDecimalPlaces[currency];
    return Math.round(amount * Math.pow(10, decimalPlaces));
  }