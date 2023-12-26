class BlockUtils {
    static ONE_DAY_IN_MILLIS: number = 24 * 60 * 60 * 1000;
    static THIRTY_DAYS_IN_MILLIS: number = 30 * 24 * 60 * 60 * 1000;
    static BLOCK_TIME_MILLIS: number = 3000;
    static UNLOCK_BLOCK_COUNT: number = 403200;
  
    static getBlockHeightByTimestamp(blockHeightRecord: number, updateTimeRecord: number, timestamp: number): number {
      const timeDifferenceInSeconds = (timestamp - updateTimeRecord) / 1000;
      const currentBlockHeight = blockHeightRecord + (timeDifferenceInSeconds / 3);
      return currentBlockHeight;
    }
  
    static calculateCurrentBlockHeightDifference(blockHeight: number, updateTime: number, scanBlockHeight: number): number {
      return this.getBlockHeightByTimestamp(blockHeight, updateTime, Date.now()) - scanBlockHeight;
    }
  }
  
  export default BlockUtils;
  