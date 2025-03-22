export interface NetworkConfig {
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  rpcUrl: string;
  blockExplorer: string;
  iconUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  gasLimits: {
    default: number;
    token: number;
    nft: number;
  };
}

export const SUPPORTED_NETWORKS: { [key: string]: NetworkConfig } = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    decimals: 18,
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/K9BRM_5UEb8-JLt_xNSOMr21xiruII7N',
    blockExplorer: 'https://etherscan.io',
    iconUrl: '/images/networks/ethereum.svg',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    gasLimits: {
      default: 21000,
      token: 65000,
      nft: 85000,
    },
  },
  polygon: {
    chainId: 137,
    name: 'Polygon Mainnet',
    symbol: 'MATIC',
    decimals: 18,
    rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/K9BRM_5UEb8-JLt_xNSOMr21xiruII7N',
    blockExplorer: 'https://polygonscan.com',
    iconUrl: '/images/networks/polygon.svg',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    gasLimits: {
      default: 21000,
      token: 65000,
      nft: 85000,
    },
  },
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum One',
    symbol: 'ETH',
    decimals: 18,
    rpcUrl: 'https://arb-mainnet.g.alchemy.com/v2/K9BRM_5UEb8-JLt_xNSOMr21xiruII7N',
    blockExplorer: 'https://arbiscan.io',
    iconUrl: '/images/networks/arbitrum.svg',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    gasLimits: {
      default: 21000,
      token: 65000,
      nft: 85000,
    },
  },
  optimism: {
    chainId: 10,
    name: 'Optimism',
    symbol: 'ETH',
    decimals: 18,
    rpcUrl: 'https://opt-mainnet.g.alchemy.com/v2/K9BRM_5UEb8-JLt_xNSOMr21xiruII7N',
    blockExplorer: 'https://optimistic.etherscan.io',
    iconUrl: '/images/networks/optimism.svg',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    gasLimits: {
      default: 21000,
      token: 65000,
      nft: 85000,
    },
  },
  base: {
    chainId: 8453,
    name: 'Base',
    symbol: 'ETH',
    decimals: 18,
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    iconUrl: '/images/networks/base.svg',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    gasLimits: {
      default: 21000,
      token: 65000,
      nft: 85000,
    },
  },
};

export const getNetworkByChainId = (chainId: number): NetworkConfig | undefined => {
  return Object.values(SUPPORTED_NETWORKS).find(network => network.chainId === chainId);
};

export const validateNetwork = (chainId: number): boolean => {
  return Object.values(SUPPORTED_NETWORKS).some(network => network.chainId === chainId);
}; 