"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ParticleBackground from '../components/ParticleBackground';
import StarryBackground from '../components/StarryBackground';
import GradientButton from '../components/GradientButton';
import LoadingScreen from '../components/LoadingScreen';
import { useWeb3 } from '../contexts/Web3Context';

// Add window.ethereum type
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Sample data for tokens
const tokens = [
  { text: "Ethereum (ETH)", symbol: "ETH", logo: "/icons/ethereum.svg", balance: 8.5, price: 2500 },
  { text: "Solana (SOL)", symbol: "SOL", logo: "/icons/solana.svg", balance: 30, price: 25 },
  { text: "Polygon (MATIC)", symbol: "MATIC", logo: "/icons/polygon.svg", balance: 450, price: 0.8 },
  { text: "Polkadot (DOT)", symbol: "DOT", logo: "/icons/polkadot.svg", balance: 15, price: 6.5 },
  { text: "Arbitrum (ARB)", symbol: "ARB", logo: "/icons/arbitrum.svg", balance: 100, price: 1.2 },
];

// Sample contacts
const contacts = [
  { name: "Alice", address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t", humanAddress: "alice.radha" },
  { name: "Bob", address: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a0", humanAddress: "bob.stellar" },
  { name: "Charlie", address: "0x0t1s2r3q4p5o6n7m8l9k0j1i2h3g4f5e6d7c8b9a", humanAddress: "charlie.nebula" },
];

// Define token type
interface Token {
  text: string;
  symbol: string;
  logo: string;
  balance: number;
  price: number;
}

interface Contact {
  name: string;
  address: string;
  humanAddress: string;
}

interface TabSelectEvent {
  selected: number;
}

export default function SendReceive() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("send");
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [amount, setAmount] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState("");
  const [showContacts, setShowContacts] = useState(false);
  const [transactionSpeed, setTransactionSpeed] = useState("standard");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  
  // Get Web3 context
  const { address, humanReadableAddress, sendTransaction, formatAddress } = useWeb3();
  
  // Init component
  useEffect(() => {
    // Check for initial mode from URL params
    const actionParam = searchParams.get('action');
    if (actionParam === 'deposit' || actionParam === 'receive') {
      setMode('receive');
    } else if (actionParam === 'withdraw' || actionParam === 'send') {
      setMode('send');
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [searchParams]);
  
  // Show loading screen initially
  if (loading) {
    return <LoadingScreen />;
  }
  
  const handleTabChange = (e: TabSelectEvent) => {
    setMode(e.selected === 0 ? "send" : "receive");
  };
  
  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const setMaxAmount = () => {
    setAmount(selectedToken.balance.toString());
  };
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value);
  };
  
  const calculateUsdValue = () => {
    if (!amount) return 0;
    return parseFloat(amount) * selectedToken.price;
  };

  const handleSelectContact = (contact: Contact) => {
    setRecipientAddress(contact.address);
    setShowContacts(false);
  };
  
  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      // Could add a toast notification here
    }
  };
  
  const handleSendTransaction = async () => {
    if (!amount || !recipientAddress) return;
    
    setSendStatus('sending');
    try {
      const result = await sendTransaction(recipientAddress, amount);
      setTransactionHash(result.hash);
      setSendStatus('success');
    } catch (error) {
      console.error('Transaction failed:', error);
      setSendStatus('error');
    }
  };
  
  return (
    <main className="min-h-screen relative bg-[#06071B]">
      <StarryBackground />
      <ParticleBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Send & Receive
            </h1>
            <p className="text-blue-300">Transfer assets between wallets</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => router.push('/wallet')}
              className="flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Wallet
            </button>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Mode Toggle */}
          <div className="glass bg-white/5 backdrop-blur-sm rounded-2xl p-1 mb-8 inline-flex w-full max-w-sm">
            <button
              onClick={() => handleTabChange({ selected: 0 })}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-colors ${
                mode === 'send'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
          >
            Send
            </button>
            <button
              onClick={() => handleTabChange({ selected: 1 })}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-colors ${
                mode === 'receive'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
          >
            Receive
            </button>
          </div>
          
          {/* Send Form */}
          {mode === 'send' && (
            <div className="glass bg-white/5 backdrop-blur-xl rounded-3xl p-8">
              {sendStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Transaction Sent!</h3>
                  <p className="text-white/70 mb-6">Your transaction has been submitted to the network.</p>
                  {transactionHash && (
                    <div className="p-3 bg-white/5 rounded-lg text-white/70 text-sm break-all mb-6">
                      Transaction hash: {transactionHash}
                    </div>
                  )}
                  <GradientButton
                    variant="nebula"
                    onClick={() => router.push('/wallet')}
                  >
                    Back to Wallet
                  </GradientButton>
                </div>
              ) : sendStatus === 'error' ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Transaction Failed</h3>
                  <p className="text-white/70 mb-6">There was an error processing your transaction. Please try again.</p>
                  <GradientButton
                    variant="nebula"
                    onClick={() => setSendStatus('idle')}
                  >
                    Try Again
                  </GradientButton>
                </div>
              ) : (
                <>
                  {/* Select Token */}
                  <div className="mb-8">
                    <label className="block text-white/70 text-sm mb-2">Select Token</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {tokens.map((token, index) => (
                        <button
                          key={index}
                          onClick={() => handleTokenSelect(token)}
                          className={`p-4 rounded-xl text-center transition-colors ${
                            selectedToken.symbol === token.symbol
                              ? 'bg-white/10 border border-purple-500/50'
                              : 'bg-white/5 hover:bg-white/10 border border-transparent'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-white/10 p-2 mx-auto mb-2">
                            <Image
                              src={token.logo}
                              alt={token.symbol}
                              width={32}
                              height={32}
                            />
                          </div>
                          <span className="text-white font-medium">{token.symbol}</span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="text-white/70">Balance:</span>
                      <span className="text-white">{selectedToken.balance} {selectedToken.symbol} (${selectedToken.balance * selectedToken.price})</span>
                </div>
              </div>
              
                  {/* Amount */}
                  <div className="mb-8">
                    <label className="block text-white/70 text-sm mb-2">Amount</label>
                    <div className="relative">
                      <input
                        type="text"
                value={amount}
                onChange={handleAmountChange}
                        placeholder="0.0"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <button
                          onClick={setMaxAmount}
                          className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        >
                          MAX
                        </button>
                      </div>
                </div>
                    
                    <div className="text-right mt-2 text-sm text-white/70">
                      ≈ ${calculateUsdValue().toFixed(2)} USD
                </div>
              </div>
              
                  {/* Recipient */}
                  <div className="mb-8">
                    <label className="block text-white/70 text-sm mb-2">Recipient Address</label>
                    <div className="relative">
                      <input
                        type="text"
                value={recipientAddress}
                onChange={handleAddressChange}
                        placeholder="Enter address (0x...) or human-readable name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <button
                          onClick={() => setShowContacts(!showContacts)}
                          className="px-3 py-1 text-sm rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        >
                          Contacts
                        </button>
                      </div>
                    </div>
                    
                    {/* Contacts Dropdown */}
                    {showContacts && (
                      <div className="mt-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 absolute z-10 w-full max-w-xl">
                        <h4 className="text-white mb-3 px-2">Select Contact</h4>
                        <div className="max-h-48 overflow-y-auto">
                    {contacts.map((contact, index) => (
                            <button
                              key={index}
                              onClick={() => handleSelectContact(contact)}
                              className="flex items-center justify-between w-full p-2 hover:bg-white/5 rounded-lg text-left"
                            >
                        <div>
                                <div className="text-white font-medium">{contact.name}</div>
                                <div className="text-white/70 text-sm">{contact.humanAddress}</div>
                              </div>
                              <div className="text-white/50 text-xs">{formatAddress(contact.address)}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Advanced Settings */}
                  <div className="mb-8">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center text-white/70 hover:text-white text-sm mb-2 bg-transparent"
                    >
                      <span className="mr-2">{showAdvanced ? 'Hide' : 'Show'} Advanced Settings</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {showAdvanced && (
                      <div className="bg-white/5 rounded-xl p-4 mt-2">
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm mb-2">Transaction Speed</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['standard', 'fast', 'instant'].map((speed) => (
                              <button
                                key={speed}
                                onClick={() => setTransactionSpeed(speed)}
                                className={`py-2 px-3 rounded-lg text-sm capitalize transition-colors ${
                                  transactionSpeed === speed
                                    ? 'bg-purple-500/30 text-purple-200'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                {speed}
                              </button>
                            ))}
                          </div>
                          <div className="mt-2 text-xs text-white/50">
                            {transactionSpeed === 'standard' && 'Estimated time: 5-10 minutes. Lower fee.'}
                            {transactionSpeed === 'fast' && 'Estimated time: 1-3 minutes. Medium fee.'}
                            {transactionSpeed === 'instant' && 'Estimated time: <1 minute. Higher fee.'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Send Button */}
                  <GradientButton
                    variant="plasma"
                    size="lg"
                    onClick={handleSendTransaction}
                    fullWidth={true}
                    disabled={!amount || parseFloat(amount) <= 0 || !recipientAddress || sendStatus === 'sending'}
                    glowEffect={true}
                  >
                    {sendStatus === 'sending' ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Transaction...
                      </div>
                    ) : (
                      `Send ${amount || '0'} ${selectedToken.symbol}`
                    )}
                  </GradientButton>
                  
                  <div className="mt-4 text-sm text-white/50 text-center">
                    Please verify all details before sending. Transactions cannot be reversed.
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Receive Form */}
          {mode === 'receive' && (
            <div className="glass bg-white/5 backdrop-blur-xl rounded-3xl p-8">
              {/* Select Token */}
              <div className="mb-8">
                <label className="block text-white/70 text-sm mb-2">Select Token to Receive</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {tokens.map((token, index) => (
                    <button
                      key={index}
                      onClick={() => handleTokenSelect(token)}
                      className={`p-4 rounded-xl text-center transition-colors ${
                        selectedToken.symbol === token.symbol
                          ? 'bg-white/10 border border-purple-500/50'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/10 p-2 mx-auto mb-2">
                        <Image
                          src={token.logo}
                          alt={token.symbol}
                          width={32}
                          height={32}
                        />
                      </div>
                      <span className="text-white font-medium">{token.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Your Address */}
              <div className="mb-8">
                <label className="block text-white/70 text-sm mb-2">Your Wallet Address</label>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  {humanReadableAddress && (
                    <div className="mb-3">
                      <div className="text-sm text-white/70 mb-1">Human-Readable Address:</div>
                      <div className="bg-white/10 px-4 py-3 rounded-lg text-white flex justify-between items-center">
                        <span className="font-medium">{humanReadableAddress}</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(humanReadableAddress)}
                          className="text-white/50 hover:text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {address && (
                    <div>
                      <div className="text-sm text-white/70 mb-1">Wallet Address:</div>
                      <div className="bg-white/10 px-4 py-3 rounded-lg text-white flex justify-between items-center">
                        <span className="font-mono text-sm overflow-x-auto">{address}</span>
                        <button
                          onClick={handleCopyAddress}
                          className="text-white/50 hover:text-white flex-shrink-0 ml-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
            </div>
            </div>
            
              {/* QR Code */}
              <div className="text-center mb-6">
                <div className="w-64 h-64 bg-white p-4 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  {/* Here you would render an actual QR code with the address */}
                  <div className="text-black">
                    <Image src="/qr-code-dynamic.svg" alt="QR Code" width={900} height={900} />
                    
                  </div>
              </div>
                <p className="text-white/70">
                  Scan this QR code to receive {selectedToken.symbol}
                </p>
            </div>
            
              <div className="flex justify-center">
                <GradientButton
                  variant="nebula"
                  onClick={handleCopyAddress}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy Address
                </GradientButton>
              </div>
            </div>
        )}
      </div>
    </div>
    </main>
  );
} 