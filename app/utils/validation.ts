import { utils } from 'ethers';
import { NetworkConfig } from '../config/networks';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  severity?: 'error' | 'warning' | 'info';
}

export interface TransactionValidation {
  address: ValidationResult;
  amount: ValidationResult;
  network: ValidationResult;
  gas?: ValidationResult;
}

export const validateAddress = (address: string, chainId: number): ValidationResult => {
  if (!address) {
    return { isValid: false, message: 'Address is required', severity: 'error' };
  }

  try {
    const checksumAddress = utils.getAddress(address);
    
    // ENS name validation
    if (address.toLowerCase().endsWith('.eth')) {
      if (chainId !== 1) {
        return {
          isValid: true,
          message: 'ENS names are only resolvable on Ethereum mainnet',
          severity: 'warning'
        };
      }
      return { isValid: true, message: '' };
    }

    // Contract address validation
    if (address === checksumAddress) {
      return { isValid: true, message: '' };
    }

    return {
      isValid: true,
      message: 'Address is valid but not checksummed',
      severity: 'warning'
    };
  } catch {
    return {
      isValid: false,
      message: 'Invalid Ethereum address format',
      severity: 'error'
    };
  }
};

export const validateAmount = (
  amount: string,
  balance: string,
  network: NetworkConfig
): ValidationResult => {
  if (!amount) {
    return { isValid: false, message: 'Amount is required', severity: 'error' };
  }

  const numAmount = parseFloat(amount);
  const numBalance = parseFloat(balance);

  if (isNaN(numAmount) || numAmount <= 0) {
    return {
      isValid: false,
      message: 'Amount must be greater than 0',
      severity: 'error'
    };
  }

  if (numAmount > numBalance) {
    return {
      isValid: false,
      message: 'Insufficient balance',
      severity: 'error'
    };
  }

  // Check for dust amounts
  const minAmount = 0.000001; // Adjust based on network
  if (numAmount < minAmount) {
    return {
      isValid: false,
      message: `Amount too small. Minimum is ${minAmount} ${network.symbol}`,
      severity: 'error'
    };
  }

  // Warning for large transfers
  if (numAmount > numBalance * 0.9) {
    return {
      isValid: true,
      message: 'This will transfer most of your balance',
      severity: 'warning'
    };
  }

  return { isValid: true, message: '' };
};

export const validateGas = (
  gasPrice: string,
  gasLimit: string,
  network: NetworkConfig
): ValidationResult => {
  const numGasPrice = parseFloat(gasPrice);
  const numGasLimit = parseInt(gasLimit);

  if (isNaN(numGasPrice) || numGasPrice <= 0) {
    return {
      isValid: false,
      message: 'Invalid gas price',
      severity: 'error'
    };
  }

  if (isNaN(numGasLimit) || numGasLimit < network.gasLimits.default) {
    return {
      isValid: false,
      message: `Gas limit must be at least ${network.gasLimits.default}`,
      severity: 'error'
    };
  }

  // Warning for high gas prices
  const avgGasPrice = 50; // Get this from gas station API
  if (numGasPrice > avgGasPrice * 1.5) {
    return {
      isValid: true,
      message: 'Gas price is higher than average',
      severity: 'warning'
    };
  }

  return { isValid: true, message: '' };
};

export const validateNFTTransfer = (
  tokenId: string,
  contractAddress: string,
  network: NetworkConfig
): ValidationResult => {
  if (!tokenId) {
    return {
      isValid: false,
      message: 'Token ID is required',
      severity: 'error'
    };
  }

  if (!contractAddress) {
    return {
      isValid: false,
      message: 'Contract address is required',
      severity: 'error'
    };
  }

  try {
    utils.getAddress(contractAddress);
  } catch {
    return {
      isValid: false,
      message: 'Invalid contract address',
      severity: 'error'
    };
  }

  // Check if gas limit is sufficient for NFT transfer
  if (network.gasLimits.nft > network.gasLimits.default) {
    return {
      isValid: true,
      message: 'NFT transfers require higher gas limits',
      severity: 'info'
    };
  }

  return { isValid: true, message: '' };
};

export const validateTransaction = (
  address: string,
  amount: string,
  balance: string,
  chainId: number,
  network: NetworkConfig,
  gasPrice?: string,
  gasLimit?: string
): TransactionValidation => {
  const validation: TransactionValidation = {
    address: validateAddress(address, chainId),
    amount: validateAmount(amount, balance, network),
    network: { isValid: true, message: '' }
  };

  if (gasPrice && gasLimit) {
    validation.gas = validateGas(gasPrice, gasLimit, network);
  }

  return validation;
};

export const validateNetwork = (chainId: number): ValidationResult => {
  if (!chainId) {
    return {
      isValid: false,
      message: 'Network not connected',
      severity: 'error'
    };
  }

  const supportedChainIds = [1, 137, 42161, 10, 56, 8453]; // Ethereum, Polygon, Arbitrum, Optimism, BSC, Base
  if (!supportedChainIds.includes(chainId)) {
    return {
      isValid: false,
      message: 'Unsupported network. Please switch to a supported network.',
      severity: 'error'
    };
  }

  return { isValid: true, message: '' };
}; 