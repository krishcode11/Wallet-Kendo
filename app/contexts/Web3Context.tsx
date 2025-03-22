'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';

// Add window.ethereum type
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  address: string | null;
  balance: string;
  isInitialized: boolean;
  createNewWallet: () => Promise<void>;
  importWallet: (seedPhrase: string) => Promise<void>;
  sendTransaction: (to: string, amount: string) => Promise<{ hash: string }>;
  formatAddress: (address: string) => string;
  humanReadableAddress: string;
  disconnectWallet: () => Promise<void>;
  isWalletLocked: boolean;
  unlockWallet: (password: string) => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isWalletLocked, setIsWalletLocked] = useState(true);
  const [provider] = useState(new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL));

  // Format address to be display-friendly
  const formatAddress = (addr: string): string => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const humanReadableAddress = address ? formatAddress(address) : '';

  // Create a new wallet
  const createNewWallet = async () => {
    try {
      // Generate a new random wallet
      const newWallet = ethers.Wallet.createRandom();
      
      // Get the mnemonic (seed phrase)
      const seedPhrase = newWallet.mnemonic.phrase;
      
      // Store the encrypted wallet in local storage
      const password = prompt("Create a password to secure your wallet:");
      if (!password) throw new Error("Password is required");
      
      const encryptedWallet = await newWallet.encrypt(password);
      localStorage.setItem('encryptedWallet', encryptedWallet);
      
      // Store the address
      setAddress(newWallet.address);
      setWallet(newWallet);
      setIsWalletLocked(false);
      
      // Show the seed phrase to the user (in a real app, handle this more securely)
      alert(`Please save your seed phrase securely:\n${seedPhrase}`);
      
      router.push('/wallet');
    } catch (error) {
      console.error('Failed to create wallet:', error);
      throw error;
    }
  };

  // Import existing wallet using seed phrase
  const importWallet = async (seedPhrase: string) => {
    try {
      // Create wallet from mnemonic
      const newWallet = ethers.Wallet.fromMnemonic(seedPhrase);
      
      // Store the encrypted wallet
      const password = prompt("Create a password to secure your wallet:");
      if (!password) throw new Error("Password is required");
      
      const encryptedWallet = await newWallet.encrypt(password);
      localStorage.setItem('encryptedWallet', encryptedWallet);
      
      // Store the address
      setAddress(newWallet.address);
      setWallet(newWallet);
      setIsWalletLocked(false);
      
      router.push('/wallet');
    } catch (error) {
      console.error('Failed to import wallet:', error);
      throw error;
    }
  };

  // Unlock wallet with password
  const unlockWallet = async (password: string) => {
    try {
      const encryptedWallet = localStorage.getItem('encryptedWallet');
      if (!encryptedWallet) throw new Error("No wallet found");
      
      const decryptedWallet = await ethers.Wallet.fromEncryptedJson(encryptedWallet, password);
      setWallet(decryptedWallet);
      setAddress(decryptedWallet.address);
      setIsWalletLocked(false);
      
      // Get and set balance
      const balance = await provider.getBalance(decryptedWallet.address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Failed to unlock wallet:', error);
      throw error;
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    setWallet(null);
    setAddress(null);
    setBalance("0");
    setIsWalletLocked(true);
    localStorage.removeItem('encryptedWallet');
    router.push('/login');
  };

  // Send transaction function
  const sendTransaction = async (to: string, amount: string): Promise<{ hash: string }> => {
    try {
      if (!wallet) {
        throw new Error("Wallet is not initialized");
      }

      const walletWithProvider = wallet.connect(provider);
      
      // Create transaction
      const tx = await walletWithProvider.sendTransaction({
        to: to,
        value: ethers.utils.parseEther(amount)
      });

      // Wait for transaction to be mined
      await tx.wait();

      // Update balance after transaction
      const newBalance = await provider.getBalance(wallet.address);
      setBalance(ethers.utils.formatEther(newBalance));

      return { hash: tx.hash };

    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };

  // Initialize wallet from local storage
  useEffect(() => {
    const initWallet = async () => {
      try {
        const encryptedWallet = localStorage.getItem('encryptedWallet');
        if (encryptedWallet) {
          setIsWalletLocked(true);
        }
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initWallet();
  }, []);

  const value = {
    address,
    balance,
    isInitialized,
    createNewWallet,
    importWallet,
    sendTransaction,
    formatAddress,
    humanReadableAddress,
    disconnectWallet,
    isWalletLocked,
    unlockWallet,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export default Web3Context; 