'use client';

import { Wallet } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { formatEther, parseEther } from '@ethersproject/units';
import { encrypt, decrypt } from './crypto';

// Default RPC URLs for fallback
const FALLBACK_RPC_URLS: Record<number, string> = {
  1: 'https://eth-mainnet.g.alchemy.com/v2/K9BRM_5UEb8-JLt_xNSOMr21xiruII7N', // Replace with your Alchemy/Infura key
  5: 'https://eth-goerli.g.alchemy.com/v2/K9BRM_5UEb8-JLt_xNSOMr21xiruII7N',  // Replace with your Alchemy/Infura key
  11155111: 'https://eth-sepolia.g.alchemy.com/v2/K9BRM_5UEb8-JLt_xNSOMr21xiruII7N' // Replace with your Alchemy/Infura key
};

export interface WalletData {
  address: string;
  encryptedPrivateKey: string;
}

export interface Transaction {
  to: string;
  value: string; // In wei
  data?: string;
  nonce?: number;
  gasLimit?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  chainId?: number;
  hash?: string;
}

// Singleton instance of RadhaSphereWallet
let walletInstance: RadhaSphereWallet | null = null;

export class RadhaSphereWallet {
  private wallet: Wallet | null = null;
  private provider: JsonRpcProvider | null = null;
  private chainId: number;

  private constructor() {
    this.chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 1;
    this.initializeProvider();
  }

  private async initializeProvider() {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || FALLBACK_RPC_URLS[this.chainId];
    if (!rpcUrl) {
      console.error('No RPC URL available');
      return;
    }

    try {
      this.provider = new JsonRpcProvider(rpcUrl);
      await this.provider.getNetwork(); // Test the connection
    } catch (error) {
      console.error('Failed to connect to primary RPC:', error);
      // Try fallback RPC if primary fails
      try {
        const fallbackUrl = FALLBACK_RPC_URLS[this.chainId];
        if (fallbackUrl && fallbackUrl !== rpcUrl) {
          this.provider = new JsonRpcProvider(fallbackUrl);
          await this.provider.getNetwork();
        }
      } catch (fallbackError) {
        console.error('Failed to connect to fallback RPC:', fallbackError);
        this.provider = null;
      }
    }
  }

  // Get singleton instance
  static getInstance(): RadhaSphereWallet {
    if (!walletInstance) {
      walletInstance = new RadhaSphereWallet();
    }
    return walletInstance;
  }

  // Create a new wallet
  async createWallet(password: string): Promise<WalletData> {
    if (!this.provider) {
      await this.initializeProvider();
      if (!this.provider) throw new Error('No provider available');
    }

    // Generate a new random wallet
    const randomWallet = Wallet.createRandom();
    this.wallet = randomWallet.connect(this.provider as JsonRpcProvider);
    
    // Encrypt the private key
    const encryptedPrivateKey = await encrypt(randomWallet.privateKey, password);
    
    return {
      address: await this.wallet.getAddress(),
      encryptedPrivateKey
    };
  }

  // Import existing wallet using private key
  async importWallet(privateKey: string, password: string): Promise<WalletData> {
    if (!this.provider) {
      await this.initializeProvider();
      if (!this.provider) throw new Error('No provider available');
    }

    const wallet = new Wallet(privateKey).connect(this.provider as JsonRpcProvider);
    this.wallet = wallet;
    
    // Encrypt the private key
    const encryptedPrivateKey = await encrypt(privateKey, password);
    
    return {
      address: await wallet.getAddress(),
      encryptedPrivateKey
    };
  }

  // Unlock wallet using encrypted private key and password
  async unlockWallet(encryptedPrivateKey: string, password: string): Promise<string> {
    try {
      const privateKey = await decrypt(encryptedPrivateKey, password);
      this.wallet = new Wallet(privateKey).connect(this.provider as JsonRpcProvider);
      return await this.wallet.getAddress();
    } catch (error) {
      throw new Error('Invalid password or corrupted wallet data');
    }
  }

  // Get wallet balance
  async getBalance(): Promise<string> {
    if (!this.wallet || !this.provider) throw new Error('Wallet not initialized');
    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      return formatEther(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw new Error('Failed to fetch balance');
    }
  }

  // Send transaction
  async sendTransaction(to: string, amount: string): Promise<string> {
    if (!this.wallet || !this.provider) throw new Error('Wallet not initialized');
    
    try {
      const tx = await this.wallet.sendTransaction({
        to,
        value: parseEther(amount)
      });
      
      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw new Error('Failed to send transaction');
    }
  }

  // Sign transaction
  async signTransaction(transaction: Transaction): Promise<string> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    
    // Prepare transaction with proper unit conversion
    const tx = {
      to: transaction.to,
      value: parseEther(transaction.value),
      data: transaction.data || '0x',
      nonce: transaction.nonce,
      gasLimit: transaction.gasLimit ? parseEther(transaction.gasLimit) : undefined,
      maxFeePerGas: transaction.maxFeePerGas ? parseEther(transaction.maxFeePerGas) : undefined,
      maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? parseEther(transaction.maxPriorityFeePerGas) : undefined,
      chainId: transaction.chainId
    };

    const signedTx = await this.wallet.signTransaction(tx);
    return signedTx;
  }

  // Sign message
  async signMessage(message: string): Promise<string> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return await this.wallet.signMessage(message);
  }

  // Get current address
  async getAddress(): Promise<string> {
    if (!this.wallet) throw new Error('Wallet not initialized');
    return await this.wallet.getAddress();
  }

  // Check if wallet is unlocked
  isUnlocked(): boolean {
    return this.wallet !== null;
  }

  // Lock wallet
  lock(): void {
    this.wallet = null;
  }
}

// Export singleton functions that match the original interface
export const generateWallet = async (password: string): Promise<WalletData> => {
  return await RadhaSphereWallet.getInstance().createWallet(password);
};

export const importWallet = async (privateKey: string, password: string): Promise<WalletData> => {
  return await RadhaSphereWallet.getInstance().importWallet(privateKey, password);
};

export const decryptWallet = async (encryptedPrivateKey: string, password: string): Promise<string> => {
  return await RadhaSphereWallet.getInstance().unlockWallet(encryptedPrivateKey, password);
};

export const signTransaction = async (transaction: Transaction): Promise<string> => {
  return await RadhaSphereWallet.getInstance().signTransaction(transaction);
};

export const signMessage = async (message: string): Promise<string> => {
  return await RadhaSphereWallet.getInstance().signMessage(message);
}; 