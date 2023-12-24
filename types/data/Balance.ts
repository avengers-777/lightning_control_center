import { Tools } from "@/utils/Tools";
import { ResourceConverter } from "../app/ResourceConverter";
import { Currency, formatAmountAsFloat } from "../enums/Currency";
import { ResourceDisplayType } from "../enums/ResourceDisplayType";
import { UnstakingResource } from "./UnstakingResource";

// export interface Balance {
//     amount: number;
//     energy: number;
//     bandwidth: number;
//     delegatedForEnergy: number;
//     acquiredDelegatedForEnergy: number;
//     delegatedForBandwidth: number;
//     acquiredDelegatedForBandwidth: number;
//     canDelegatedForEnergy: number;
//     canDelegatedForBandwidth: number;
//     canDelegatedForTronPower: number;
//     tronPower: number;
//     unstakingResources: UnstakingResource[]; // 假设 UnstakingResource 已定义
//   }

export class Balance {
  amount: number;
  energy: number;
  bandwidth: number;
  delegatedForEnergy: number;
  acquiredDelegatedForEnergy: number;
  delegatedForBandwidth: number;
  acquiredDelegatedForBandwidth: number;
  canDelegatedForEnergy: number;
  canDelegatedForBandwidth: number;
  canDelegatedForTronPower: number;
  tronPower: number;
  unstakingResources: UnstakingResource[]; // 假设 UnstakingResource 已定义

  constructor(obj: any) {
    this.amount = obj.amount;
    this.energy = obj.energy;
    this.bandwidth = obj.bandwidth;
    this.delegatedForEnergy = obj.delegatedForEnergy;
    this.acquiredDelegatedForEnergy = obj.acquiredDelegatedForEnergy;
    this.delegatedForBandwidth = obj.delegatedForBandwidth;
    this.acquiredDelegatedForBandwidth = obj.acquiredDelegatedForBandwidth;
    this.canDelegatedForEnergy = obj.canDelegatedForEnergy;
    this.canDelegatedForBandwidth = obj.canDelegatedForBandwidth;
    this.canDelegatedForTronPower = obj.canDelegatedForTronPower;
    this.tronPower = obj.tronPower;
    this.unstakingResources = obj.unstakingResources;
  }
  getRanderAmount() {
    return formatAmountAsFloat(this.amount, Currency.TRX).toLocaleString();
  }
  getRanderEnergy(
    type: ResourceDisplayType,
    resourceConverter: ResourceConverter
  ) {
    return  Tools.energyRander(this.energy, type, resourceConverter);
  }
  getRanderBandwidth(
    type: ResourceDisplayType,
    resourceConverter: ResourceConverter
  ) {
    return Tools.bandwidthRander(this.bandwidth, type, resourceConverter);
  }
  getRanderDelegatedForEnergy(
    type: ResourceDisplayType,
    resourceConverter: ResourceConverter
  ) {
    return Tools.energyRander(this.delegatedForEnergy, type, resourceConverter);
  }
  getRanderDelegatedForBandwidth(
    type: ResourceDisplayType,
    resourceConverter: ResourceConverter
  ) {
    return Tools.bandwidthRander(this.delegatedForBandwidth, type, resourceConverter);
  }
  getRanderAcquiredDelegatedForEnergy(
    type: ResourceDisplayType,
    resourceConverter: ResourceConverter
  ) {
    return Tools.energyRander(
      this.acquiredDelegatedForEnergy,
      type,
      resourceConverter
    );
  }
  getRanderAcquiredDelegatedForBandwidth(
    type: ResourceDisplayType,
    resourceConverter: ResourceConverter
  ) {
    return Tools.bandwidthRander(
      this.acquiredDelegatedForBandwidth,
      type,
      resourceConverter
    );
  }
  getRanderCanDelegatedForEnergy(
    type: ResourceDisplayType,
    resourceConverter: ResourceConverter
  ) {
    return Tools.energyRander(this.canDelegatedForEnergy, type, resourceConverter);
  }
  getRanderCanDelegatedForBandwidth(
    type: ResourceDisplayType,
    resourceConverter: ResourceConverter
  ) {
    return  Tools.bandwidthRander(
      this.canDelegatedForBandwidth,
      type,
      resourceConverter
    );
  }
}
