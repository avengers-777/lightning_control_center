export enum BlockchainPlatform {
    ETHEREUM = 'ETHEREUM',
    BINANCE_SMART_CHAIN = 'BINANCE_SMART_CHAIN',
    TRON = 'TRON',
    POLKADOT = 'POLKADOT',
    CARDANO = 'CARDANO',
    SOLANA = 'SOLANA',
    AVALANCHE = 'AVALANCHE',
    ALGORAND = 'ALGORAND',
    TEZOS = 'TEZOS',
    COSMOS = 'COSMOS',
  }
 export const BlockchainPlatformInfo: { [key in BlockchainPlatform]: { name: string; zeros: number } } = {
    [BlockchainPlatform.ETHEREUM]: { name: 'Ethereum', zeros: 16 },
    [BlockchainPlatform.BINANCE_SMART_CHAIN]: { name: 'Binance Smart Chain', zeros: 16 },
    [BlockchainPlatform.TRON]: { name: 'Tron', zeros: 4 },
    [BlockchainPlatform.POLKADOT]: { name: 'Polkadot', zeros: 4 },
    [BlockchainPlatform.CARDANO]: { name: 'Cardano', zeros: 4 },
    [BlockchainPlatform.SOLANA]: { name: 'Solana', zeros: 4 },
    [BlockchainPlatform.AVALANCHE]: { name: 'Avalanche', zeros: 4 },
    [BlockchainPlatform.ALGORAND]: { name: 'Algorand', zeros: 4 },
    [BlockchainPlatform.TEZOS]: { name: 'Tezos', zeros: 4 },
    [BlockchainPlatform.COSMOS]: { name: 'Cosmos', zeros: 4 },
  };
  
  // 访问额外信息的函数
 export function getBlockchainPlatformInfo(platform: BlockchainPlatform) {
    return BlockchainPlatformInfo[platform];
  }
  