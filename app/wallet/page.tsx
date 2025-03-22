"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import StarryBackground from '../components/StarryBackground';
import ParticleBackground from '../components/ParticleBackground';
import GradientButton from '../components/GradientButton';
import LoadingScreen from '../components/LoadingScreen';
import { useAuth } from '../contexts/AuthContext';
import { AIInsights } from '../components/AIInsights';

// Import Kendo React components
import { Button } from '@progress/kendo-react-buttons';
import { 
  Chart, 
  ChartSeries, 
  ChartSeriesItem, 
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartArea,
  ChartLegend,
  ChartTooltip,
  TooltipContext
} from "@progress/kendo-react-charts";
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Dialog } from '@progress/kendo-react-dialogs';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Upload, UploadOnProgressEvent } from '@progress/kendo-react-upload';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input, Switch } from '@progress/kendo-react-inputs';
import { Animation } from '@progress/kendo-react-animation';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { useHotkeys } from 'react-hotkeys-hook';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from '@progress/kendo-react-indicators';

// Import Kendo themes and hammerjs (required for charts)
import '@progress/kendo-theme-material/dist/all.css';
import 'hammerjs';

// Define types
interface BalanceItem {
  date: string;
  balance: number;
}

interface PortfolioItem {
  category: string;
  value: number;
  color: string;
}

interface Transaction {
  id: number;
  date: Date;
  type: string;
  amount: number;
  status: string;
  address: string;
}

interface TabChangeEvent {
  selected: number;
}

interface FormValues {
  asset: string;
  address: string;
  amount: string;
}

interface ShortcutInfo {
  key: string;
  description: string;
  action: () => void;
}

interface NFT {
  id: number;
  name: string;
  floor: number;
  image: string;
}

interface TransactionState {
  status: 'idle' | 'signing' | 'confirming' | 'completed' | 'failed';
  message: string;
}

// Sample data
const balanceHistory = [
  { date: 'Jan 1', balance: 3245.67 },
  { date: 'Jan 8', balance: 3502.89 },
  { date: 'Jan 15', balance: 3199.21 },
  { date: 'Jan 22', balance: 3428.53 },
  { date: 'Jan 29', balance: 3756.12 },
  { date: 'Feb 5', balance: 4089.34 },
  { date: 'Feb 12', balance: 3867.98 },
  { date: 'Feb 19', balance: 4256.78 },
  { date: 'Feb 26', balance: 4512.45 },
  { date: 'Mar 5', balance: 4389.23 },
  { date: 'Mar 12', balance: 4687.56 },
  { date: 'Mar 19', balance: 4578.90 },
  { date: 'Mar 26', balance: 4893.67 },
];

const portfolioData = [
  { category: "Ethereum", value: 42.5, color: "#627EEA" },
  { category: "Solana", value: 15.8, color: "#00FFA3" },
  { category: "Polygon", value: 19.7, color: "#8247E5" },
  { category: "Arbitrum", value: 12.3, color: "#28A0F0" },
  { category: "Other", value: 9.7, color: "#F6F6F6" }
];

const transactions = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  date: new Date(2023, 9 - Math.floor(i / 3), 10 + i),
  type: i % 2 === 0 ? 'Sent' : 'Received',
  amount: (Math.random() * 2 + 0.1) * (i % 2 === 0 ? -1 : 1),
  status: ['Completed', 'Pending', 'Completed', 'Failed'][Math.floor(Math.random() * 3)],
  address: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
}));

const nftCollection: NFT[] = [
  {
    id: 1,
    name: "Astral Nebula #1",
    floor: 0.55,
    image: "/astral.jpg"
  },
  {
    id: 2,
    name: "Cosmic Void #7",
    floor: 0.65,
    image: "/cosmic.jpg"
  },
  {
    id: 3,
    name: "Galactic Core #3",
    floor: 0.75,
    image: "/galactic.jpg"
  },
  {
    id: 4,
    name: "Quantum Stellar #5",
    floor: 0.85,
    image: "/quantum.jpg"
  },
  {
    id: 5,
    name: "Space Nexus #2",
    floor: 0.95,
    image: "/space.jpg"
  },
  {
    id: 6,
    name: "Void Walker #4",
    floor: 1.05,
    image: "/void.jpg"
  }
];

// Add validation functions
const addressValidator = (value: string) => {
  if (!value) {
    return "Address is required";
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
    return "Invalid Ethereum address";
  }
  return "";
};

const createAmountValidator = (balance: string) => (value: number) => {
  if (!value) {
    return "Amount is required";
  }
  if (value <= 0) {
    return "Amount must be greater than 0";
  }
  if (value > parseFloat(balance || "0")) {
    return "Insufficient funds";
  }
  return "";
};

// Enhanced tooltip renderer for charts
const renderTooltip = (context: TooltipContext) => {
  if (!context.point) return null;
  const { category, value } = context.point;
  const cryptoIcons: { [key: string]: string } = {
    Ethereum: '⟠',
    Solana: '◎',
    Polygon: '⬡',
    Arbitrum: '⬢',
    Other: '○'
  };
  
  return (
    <div className="glass bg-[#0a1525]/90 backdrop-blur-xl p-4 rounded-xl border border-purple-500/20">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{cryptoIcons[String(category)] || '○'}</span>
        <div>
          <div className="text-white font-medium">{String(category)}</div>
          <div className="text-purple-400">{Number(value).toFixed(2)} ETH</div>
        </div>
      </div>
    </div>
  );
};

// Move keyboard shortcuts outside component
const SHORTCUTS: Record<string, ShortcutInfo> = {
  send: {
    key: 'ctrl+s',
    description: 'Send Transaction',
    action: () => {}
  },
  export: {
    key: 'ctrl+e',
    description: 'Export Wallet Data',
    action: () => {}
  },
  import: {
    key: 'ctrl+i',
    description: 'Import Wallet Data',
    action: () => {}
  }
} as const;

// Currency options
const currencyOptions = ['ETH', 'SOL', 'MATIC', 'ARB'] as const;

const WalletDashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showReceiveDialog, setShowReceiveDialog] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { currentUser, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showShortcutsDialog, setShowShortcutsDialog] = useState(false);
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [priceAlertValue, setPriceAlertValue] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [transactionState, setTransactionState] = useState<TransactionState>({
    status: 'idle',
    message: ''
  });
  
  // Move these outside useEffect to prevent unnecessary updates
  const [balanceHistoryData, setBalanceHistoryData] = useState<BalanceItem[]>(balanceHistory);
  const [portfolioDistribution, setPortfolioDistribution] = useState<PortfolioItem[]>(portfolioData);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(transactions);
  
  // Add wallet state
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0.00");
  
  // Helper function to format address
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const humanReadableAddress = address ? formatAddress(address) : '';
  
  // Check if user is logged in
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    // Load wallet data from localStorage
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
      setAddress(storedAddress);
      // In a real app, you would fetch the actual balance here
      setBalance("4,893.67");
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentUser, router]);

  // Update transaction history when address changes
  useEffect(() => {
    if (address) {
      // Update transaction history with the current address
      const updatedHistory = transactions.map(tx => ({
        ...tx,
        address: tx.type === 'Received' ? address : tx.address
      }));
      setTransactionHistory(updatedHistory);
    }
  }, [address]);

  // Separate useEffect for date filtering
  useEffect(() => {
    if (selectedDate) {
      const filteredTransactions = transactions.filter(t => 
        t.date.toDateString() === selectedDate.toDateString()
      );
      setTransactionHistory(filteredTransactions);
    }
  }, [selectedDate]);
  
  // Update balance history and portfolio distribution when balance changes
  useEffect(() => {
    if (address && balance) {
      // Update balance history
      const updatedBalanceHistory = [...balanceHistory];
      updatedBalanceHistory[updatedBalanceHistory.length - 1].balance = parseFloat(balance);
      setBalanceHistoryData(updatedBalanceHistory);

      // Update portfolio distribution
      const totalValue = parseFloat(balance);
      const updatedPortfolio = portfolioData.map(item => ({
        ...item,
        value: (item.value / 100) * totalValue
      }));
      setPortfolioDistribution(updatedPortfolio);
    }
  }, [address, balance]); // Remove balanceHistoryData and portfolioDistribution from dependencies
  
  const handleTabChange = (e: TabChangeEvent) => {
    setActiveTab(e.selected);
  };
  
  // Update handleLogout to clear wallet data
  const handleLogout = async () => {
    try {
      localStorage.removeItem('walletAddress');
      setAddress(null);
      setBalance("0.00");
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  // Error handling with proper types
  const handleError = useCallback((error: Error) => {
    setNotificationText(error.message);
    setNotificationType('error');
    setShowNotification(true);
  }, [setNotificationText, setNotificationType, setShowNotification]);

  // Enhanced send handler with animations
  const handleSend = useCallback(async () => {
    try {
      // Signing animation
      setTransactionState({
        status: 'signing',
        message: 'Please sign the transaction in your wallet...'
      });
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Confirming animation
      setTransactionState({
        status: 'confirming',
        message: 'Transaction submitted, waiting for confirmation...'
      });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success
      setTransactionState({
        status: 'completed',
        message: 'Transaction completed successfully!'
      });
      
      setShowSendDialog(false);
      setNotificationText('Transaction sent successfully!');
      setNotificationType('success');
      setShowNotification(true);
      
      // Reset state after notification
      setTimeout(() => {
        setShowNotification(false);
        setTransactionState({
          status: 'idle',
          message: ''
        });
      }, 3000);
    } catch (err) {
      handleError(err instanceof Error ? err : new Error('Transaction failed'));
    }
  }, [setTransactionState, setShowSendDialog, setNotificationText, setNotificationType, setShowNotification, handleError]);

  // Form submission with proper types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = useCallback((values: { [name: string]: any }) => {
    try {
      // Cast the form values to our FormValues type for type safety
      const formData: FormValues = {
        asset: String(values.asset),
        address: String(values.address),
        amount: String(values.amount)
      };
      handleSend();
      console.log('Form data:', formData);
    } catch (err) {
      handleError(err instanceof Error ? err : new Error('Unknown error occurred'));
    }
  }, [handleSend, handleError]);

  // Export functionality
  const handleExport = useCallback(() => {
    console.log('Exporting wallet data...');
    setShowNotification(true);
    setNotificationText('Export started');
    setNotificationType('info');
  }, [setShowNotification, setNotificationText, setNotificationType]);

  // Keyboard shortcuts
  useHotkeys('ctrl+s', (event) => {
    event.preventDefault();
    setShowSendDialog(true);
  }, [setShowSendDialog]);

  useHotkeys('ctrl+e', (event) => {
    event.preventDefault();
    handleExport();
  }, [handleExport]);

  useHotkeys('ctrl+i', (event) => {
    event.preventDefault();
    setShowUploadDialog(true);
  }, [setShowUploadDialog]);

  // File upload handler with proper types
  const handleFileUpload = useCallback((event: UploadOnProgressEvent) => {
    const progress = typeof event === 'number' ? event : 0;
    setUploadProgress(progress);
    if (progress >= 100) {
      setShowUploadDialog(false);
      setNotificationText('File uploaded successfully!');
      setNotificationType('success');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setUploadProgress(0);
      }, 3000);
    }
  }, [setUploadProgress, setShowUploadDialog, setNotificationText, setNotificationType, setShowNotification]);

  // Date change handler with proper types
  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, [setSelectedDate]);
  
  // Theme toggle handler with proper types
  const handleThemeToggle = useCallback(() => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('light-mode');
  }, []);

  // Price alert handler
  const handlePriceAlert = useCallback(() => {
    setShowPriceAlert(true);
    setNotificationText('Price alert set successfully!');
    setNotificationType('info');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);
  
  // Transaction status component
  const TransactionStatus = () => {
    const statusColors = {
      signing: 'text-yellow-400',
      confirming: 'text-blue-400',
      completed: 'text-green-400',
      failed: 'text-red-400'
    };

    if (transactionState.status === 'idle') return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-4 p-4 rounded-lg bg-[#0a1525] border border-purple-500/20"
      >
        <div className="flex items-center gap-3">
          {transactionState.status !== 'completed' && transactionState.status !== 'failed' && (
            <Loader size="medium" type="pulsing" themeColor="info" />
          )}
          {transactionState.status === 'completed' && (
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {transactionState.status === 'failed' && (
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <span className={statusColors[transactionState.status] || ''}>
            {transactionState.message}
          </span>
        </div>
      </motion.div>
    );
  };
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  // Fix unescaped entities in the onboarding section
  const createWalletMessage = "Don&apos;t have a wallet? Create one now!";

  return (
    <main className={`min-h-screen relative ${isDarkMode ? 'bg-[#0a1525]' : 'bg-gray-100'}`}>
      <StarryBackground />
      <ParticleBackground />
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between mb-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" role="heading" aria-level={1}>RadhaSphere Wallet</h1>
            <p className="text-purple-300 opacity-80" role="status" aria-label="User email">{currentUser?.email}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-4 items-center" role="toolbar" aria-label="Wallet actions">
            <div className="flex items-center gap-2">
              <span className="text-white">🌙</span>
              <Switch
                checked={isDarkMode}
                onChange={handleThemeToggle}
                aria-label="Toggle theme"
              />
              <span className="text-white">☀️</span>
            </div>
            
            <Tooltip openDelay={100} position="top">
              <div data-tooltip="Set price alerts" className="inline-block">
                <GradientButton onClick={() => setShowPriceAlert(true)} aria-label="Set price alerts">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    Alerts
                  </span>
                </GradientButton>
              </div>
            </Tooltip>

            <Tooltip openDelay={100} position="top">
              <div data-tooltip="View keyboard shortcuts" className="inline-block">
                <GradientButton onClick={() => setShowShortcutsDialog(true)} aria-label="View keyboard shortcuts">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v1H5V6zm0 3h10v1H5V9zm0 3h10v1H5v-1z" clipRule="evenodd" />
                    </svg>
                    Shortcuts
                  </span>
                </GradientButton>
              </div>
            </Tooltip>

            <Tooltip openDelay={100} position="top">
              <div data-tooltip="Send cryptocurrency to another wallet" className="inline-block">
                <GradientButton onClick={() => setShowSendDialog(true)} aria-label="Send cryptocurrency">Send</GradientButton>
              </div>
            </Tooltip>
            <Tooltip openDelay={100} position="top">
              <div data-tooltip="Receive cryptocurrency to your wallet" className="inline-block">
                <GradientButton onClick={() => setShowReceiveDialog(true)} aria-label="Receive cryptocurrency">Receive</GradientButton>
              </div>
            </Tooltip>
            <Tooltip openDelay={100} position="top">
              <div data-tooltip="Upload and manage your files securely" className="inline-block">
                <GradientButton onClick={() => setShowUploadDialog(true)} aria-label="Upload files">Upload Files</GradientButton>
              </div>
            </Tooltip>
            <GradientButton onClick={handleLogout} aria-label="Log out">Logout</GradientButton>
          </div>
        </div>
        
        {/* Add date picker for transaction filtering */}
        <div className="glass bg-[#0a1525]/60 backdrop-blur-xl rounded-3xl p-4 mb-4">
          <div className="flex items-center gap-4">
            <span className="text-white">Filter by date:</span>
            <DatePicker
              value={selectedDate}
              onChange={(e) => handleDateChange(e.value as Date)}
              format="MMMM dd, yyyy"
              className="bg-transparent text-white"
            />
          </div>
        </div>
        
        <div className="glass bg-[#0a1525]/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-gray-400 mb-1">Total Balance</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">${balance}</h2>
              <div className="flex items-center mt-2">
                <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded mr-2">+5.27%</div>
                <span className="text-gray-400">+$237.45 (24h)</span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <p className="text-gray-400 mb-2">Wallet Address</p>
              <div className="flex items-center bg-[#0a1525] rounded-lg p-2">
                <span className="text-white mr-2">{humanReadableAddress || "04559.sphere"}</span>
                <button className="text-purple-400 hover:text-purple-300 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <TabStrip selected={activeTab} onSelect={handleTabChange} className="glass bg-[#0a1525]/60 backdrop-blur-xl rounded-3xl mb-8">
          <TabStripTab title="Overview">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="glass bg-[#0d1f35] rounded-2xl p-6 min-h-[400px] flex flex-col">
                  <h3 className="text-xl font-medium text-white mb-4">Balance History</h3>
                  <div className="flex-1 min-h-0">
                    <Chart style={{ height: '100%', minHeight: '300px' }}>
                      <ChartArea background="transparent" />
                      <ChartValueAxis>
                        <ChartValueAxisItem 
                          labels={{ 
                            color: "#a0aec0",
                            format: "${0}",
                            step: 1000
                          }} 
                          line={{ color: "#2d3748" }} 
                        />
                      </ChartValueAxis>
                      <ChartCategoryAxis>
                        <ChartCategoryAxisItem 
                          categories={balanceHistoryData.map(item => item.date)} 
                          labels={{ 
                            color: "#a0aec0",
                            rotation: -45,
                            step: 2
                          }} 
                          line={{ color: "#2d3748" }} 
                        />
                      </ChartCategoryAxis>
                      <ChartSeries>
                        <ChartSeriesItem
                          type="line"
                          data={balanceHistoryData.map(item => item.balance)}
                          color="#9f7aea"
                          style="smooth"
                          markers={{ visible: false }}
                          line={{
                            style: "smooth",
                            width: 2
                          }}
                        />
                      </ChartSeries>
                    </Chart>
                  </div>
                </div>
                
                <div className="glass bg-[#0d1f35] rounded-2xl p-6 min-h-[400px] flex flex-col">
                  <h3 className="text-xl font-medium text-white mb-4">Portfolio Distribution</h3>
                  <div className="flex-1 min-h-0">
                    <Chart style={{ height: '100%', minHeight: '300px' }}>
                      <ChartArea background="transparent" />
                      <ChartLegend 
                        position="bottom" 
                        labels={{ 
                          color: "#a0aec0",
                          font: "12px sans-serif"
                        }}
                        margin={{ top: 20 }}
                      />
                      <ChartTooltip render={renderTooltip} />
                      <ChartSeries>
                        <ChartSeriesItem
                          type="donut"
                          data={portfolioDistribution}
                          categoryField="category"
                          field="value"
                          colorField="color"
                          holeSize={50}
                        />
                      </ChartSeries>
                    </Chart>
                  </div>
                </div>
              </div>
              
              <div className="glass bg-[#1fc6e1] rounded-2xl p-6">
                <h3 className="text-xl font-medium text-white mb-4">Recent Transactions</h3>
                <Grid
                  data={transactionHistory}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: 'transparent',
                    color: 'black',
                    border: 'none',
                    height: '400px',
                    width: '1200px'
                  }}  
                  scrollable="scrollable"
                  pageable={{
                    buttonCount: 5,
                    pageSizes: [5, 10, 15],
                    info: true
                  }}
                >
                  <GridColumn 
                    field="date" 
                    title="Date" 
                    format="{0:MMM dd, yyyy}"
                    width="150px"
                  />
                  <GridColumn 
                    field="type" 
                    title="Type"
                    width="120px"
                  />
                  <GridColumn 
                    field="amount" 
                    title="Amount" 
                    format="{0:n2} ETH"
                    width="150px"
                  />
                  <GridColumn 
                    field="status" 
                    title="Status"
                    width="120px"
                  />
                  <GridColumn 
                    field="address" 
                    title="Address"
                    width="200px"
                  />
                </Grid>
              </div>
            </div>
          </TabStripTab>
          
          <TabStripTab title="Assets">
            <div className="p-6 md:p-8">
              <div className="glass bg-[#0d1f35] rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-medium text-white mb-4">Your Crypto Assets</h3>
                <div className="space-y-4">
                  {portfolioDistribution.map((asset, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-[#0a1525] rounded-xl">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full mr-3" style={{ backgroundColor: asset.color }}></div>
                        <div>
                          <h4 className="text-white font-medium">{asset.category}</h4>
                          <p className="text-gray-400 text-sm">{asset.value}% of portfolio</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">${(asset.value * 48.9367).toFixed(2)}</p>
                        <p className="text-green-400 text-sm">+{(Math.random() * 10).toFixed(2)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabStripTab>
          
          <TabStripTab title="NFTs">
            <div className="p-6 md:p-8">
              <div className="glass bg-[#0d1f35] rounded-2xl p-6">
                <h3 className="text-xl font-medium text-white mb-4">Your NFT Collection</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {nftCollection.map((nft) => (
                    <motion.div
                      key={nft.id}
                      className="glass bg-[#0a1525] rounded-xl overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 relative overflow-hidden"
                        animate={{ rotateY: [0, 180, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      >
                        <div 
                          className="absolute inset-0 bg-cover bg-center transform transition-transform"
                          style={{ 
                            backgroundImage: `url(${nft.image})`,
                            backfaceVisibility: 'hidden'
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50">
                          <div className="transform preserve-3d text-center p-4">
                            <div className="text-white font-bold text-xl mb-2">
                              {nft.name}
                            </div>
                            <div className="text-purple-400 text-sm">
                              RadhaSphere&apos;s Collection
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      <div className="p-4">
                        <h4 className="text-white font-medium">{nft.name}</h4>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-gray-400 text-sm">Floor: {nft.floor} ETH</p>
                          <button className="text-purple-400 hover:text-purple-300 transition">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TabStripTab>
          
          <TabStripTab title="Activity">
            <div className="p-6 md:p-8">
              <div className="glass bg-[#0d1f35] rounded-2xl p-6">
                <h3 className="text-xl font-medium text-white mb-4">Transaction History</h3>
                <Grid
                  data={[...transactionHistory, ...transactionHistory.slice(0, 5)]}
                  style={{ backgroundColor: 'transparent', color: 'white', border: 'none' }}
                  scrollable="scrollable"
                  pageable={{
                    buttonCount: 5,
                    pageSizes: [5, 10, 15]
                  }}
                >
                  <GridColumn field="date" title="Date" format="{0:MMM dd, yyyy}" />
                  <GridColumn field="type" title="Type" />
                  <GridColumn field="amount" title="Amount" format="{0:n2} ETH" />
                  <GridColumn field="status" title="Status" />
                  <GridColumn field="address" title="Address" />
                </Grid>
              </div>
            </div>
          </TabStripTab>
        </TabStrip>
          </div>
          
      {showSendDialog && (
        <Dialog title="Send Assets" onClose={() => setShowSendDialog(false)} width={400}>
          <div className="p-4">
            <Form
              onSubmit={handleFormSubmit}
              render={({ valid }) => (
                <FormElement>
                  <Field
                    name="asset"
                    component={DropDownList}
                    data={currencyOptions}
                    defaultValue="ETH"
                    label="Select Asset"
                  />
                  
                  <Field
                    name="address"
                    component={Input}
                    label="Recipient Address"
                    validator={addressValidator}
                  />
                  
                  <Field
                    name="amount"
                    component={Input}
                    type="number"
                    label="Amount"
                    validator={createAmountValidator(balance || "0")}
                  />
                  
                  <TransactionStatus />
                  
                  <div className="text-right mt-6">
                    <Button 
                      onClick={() => setShowSendDialog(false)} 
                      className="mr-2"
                      disabled={transactionState.status !== 'idle'}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!valid || transactionState.status !== 'idle'}
                      themeColor="primary"
                    >
                      Send
                    </Button>
                  </div>
                </FormElement>
              )}
            />
          </div>
        </Dialog>
      )}
      
      {showReceiveDialog && (
        <Dialog title="Receive Assets" onClose={() => setShowReceiveDialog(false)} width={400}>
          <div className="p-4 text-center">
            <div className="bg-white p-4 rounded-lg mb-4 inline-block">
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                {/* QR Code Placeholder */}
                <span className="text-gray-500">QR Code</span>
                  </div>
                </div>
                
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Wallet Address</label>
              <div className="flex">
                <Input value={humanReadableAddress || "0x7F5AC0F87Fb5CF233225a85Bd3Cd81A8c95F3436"} readOnly />
                <Button>Copy</Button>
              </div>
            </div>
            
            <div className="text-right mt-6">
              <Button onClick={() => setShowReceiveDialog(false)}>Close</Button>
            </div>
          </div>
        </Dialog>
      )}
      
      {showUploadDialog && (
        <Dialog title="Upload Files" onClose={() => setShowUploadDialog(false)} width={400}>
          <div className="p-4">
            <Upload
              batch={false}
              multiple={true}
              onProgress={handleFileUpload}
              saveUrl="/"
              className="mb-4"
            />
            <ProgressBar value={uploadProgress} />
            <div className="text-center mt-4 text-sm text-gray-500">
              Supported file types: PDF, JPG, PNG
            </div>
          </div>
        </Dialog>
      )}
      
      {showShortcutsDialog && (
        <Dialog title="Keyboard Shortcuts" onClose={() => setShowShortcutsDialog(false)} width={400}>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(SHORTCUTS).map(([name, shortcut]) => (
                <div key={name} className="flex justify-between items-center">
                  <span className="text-gray-700">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded">{shortcut.key}</kbd>
                </div>
              ))}
            </div>
          </div>
        </Dialog>
      )}
      
      {showPriceAlert && (
        <Dialog title="Set Price Alert" onClose={() => setShowPriceAlert(false)} width={400}>
          <div className="p-6">
            <Form
              onSubmit={() => {
                handlePriceAlert();
                setShowPriceAlert(false);
              }}
              render={({ valid }) => (
                <FormElement>
                  <Field
                    name="asset"
                    component={DropDownList}
                    data={currencyOptions}
                    defaultValue="ETH"
                    label="Select Asset"
                  />
                  <Field
                    name="price"
                    component={Input}
                    type="number"
                    label="Alert when price reaches ($)"
                    value={priceAlertValue}
                    onChange={(e) => setPriceAlertValue(e.value)}
                  />
                  <div className="text-right mt-6">
                    <Button onClick={() => setShowPriceAlert(false)} className="mr-2">Cancel</Button>
                    <Button type="submit" themeColor="primary" disabled={!valid}>Set Alert</Button>
                  </div>
                </FormElement>
              )}
            />
          </div>
        </Dialog>
      )}
      
      <NotificationGroup style={{ position: 'fixed', right: 16, bottom: 16 }}>
        {showNotification && (
          <Animation transitionName="fade">
            <Notification
              className="k-notification"
              closable={true}
              onClose={() => setShowNotification(false)}
            >
              <div className={`k-notification-${notificationType}`}>
                <span>{notificationText}</span>
              </div>
            </Notification>
          </Animation>
        )}
      </NotificationGroup>

      {/* Add Onboarding Dialog */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass bg-[#0a1525]/80 backdrop-blur-xl rounded-3xl p-6 mb-8"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Welcome to RadhaSphere Wallet! 🚀</h2>
                <div className="space-y-3">
                  <p className="text-purple-300">Here&apos;s what you can do:</p>
                  <ul className="list-disc list-inside text-white space-y-2">
                    <li>Send and receive crypto assets</li>
                    <li>Track your portfolio performance</li>
                    <li>Set price alerts</li>
                    <li>Manage your NFT collection</li>
                    <li>Use keyboard shortcuts (Press Ctrl + / to view)</li>
                  </ul>
                </div>
              </div>
              <Button onClick={() => setShowOnboarding(false)} className="text-white bg-transparent border-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Use the welcome message in the JSX */}
      <div className="text-center mt-4">
        <p className="text-gray-400">{createWalletMessage}</p>
      </div>

      {/* AI Insights Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">AI-Powered Insights</h2>
        <AIInsights walletAddress={address || ""} transactions={transactions} />
      </div>
    </main>
  );
}

export default WalletDashboard; 