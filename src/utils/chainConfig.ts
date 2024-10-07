export interface ChainConfig {
    id: number;
    name: string;
    rpcUrl: string;
    currencySymbol: string;
    blockExplorerUrl: string;
  }
  
  export const chainConfigs: ChainConfig[] = [
    {
      id: 1,
      name: 'Ethereum',
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      currencySymbol: 'ETH',
      blockExplorerUrl: 'https://etherscan.io',
    },
    {
      id: 137,
      name: 'Polygon',
      rpcUrl: 'https://polygon-rpc.com',
      currencySymbol: 'MATIC',
      blockExplorerUrl: 'https://polygonscan.com',
    },
    {
      id: 56,
      name: 'Binance Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org',
      currencySymbol: 'BNB',
      blockExplorerUrl: 'https://bscscan.com',
    },
  ];
  
  export function getChainConfig(chainId: number): ChainConfig | undefined {
    return chainConfigs.find(config => config.id === chainId);
  }