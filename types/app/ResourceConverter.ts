import { ResourceCode } from "../data/TronResourceRentalOrder";

export interface AccountResourceMessage {
    totalEnergyWeight: number;
    totalEnergyLimit: number;
    totalNetWeight: number;
    totalNetLimit: number;
  }
  
  export const initAccountResourceMessage: AccountResourceMessage ={
      totalEnergyWeight: 0,
      totalEnergyLimit: 0,
      totalNetWeight: 0,
      totalNetLimit: 0
  }
export  class ResourceConverter {
    private accountResourceMessage: AccountResourceMessage;
  
    constructor(accountResourceMessage: AccountResourceMessage) {
      this.accountResourceMessage = accountResourceMessage;
    }
  
    resourceToTrx(resourceCode: ResourceCode, amount: number): number {
      return resourceCode === ResourceCode.ENERGY
        ? this.energyToTrx(amount)
        : this.bandwidthToTrx(amount);
    }
  
    trxToResource(resourceCode: ResourceCode, amount: number): number {
      return resourceCode === ResourceCode.ENERGY
        ? this.trxToEnergy(amount)
        : this.trxToBandwidth(amount);
    }
  
    trxToEnergy(sunAmount: number): number {
      const amount = sunAmount / 1000000;
      const result = (amount / this.accountResourceMessage.totalEnergyWeight) * this.accountResourceMessage.totalEnergyLimit;
      return Math.round(result);
    }
  
    trxToBandwidth(sunAmount: number): number {
      const amount = sunAmount / 1000000;
      const result = (amount / this.accountResourceMessage.totalNetWeight) * this.accountResourceMessage.totalNetLimit;
      return Math.round(result);
    }
  
    bandwidthToTrx(amount: number): number {
      const result = (amount / this.accountResourceMessage.totalNetLimit) * this.accountResourceMessage.totalNetWeight * 1000000;
      return Math.round(result);
    }
  
    energyToTrx(amount: number): number {
      const result = (amount / this.accountResourceMessage.totalEnergyLimit) * this.accountResourceMessage.totalEnergyWeight * 1000000;
      return Math.round(result);
    }
  }