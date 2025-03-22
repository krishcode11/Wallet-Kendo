"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StarryBackground from "../components/StarryBackground";
import GradientButton from "../components/GradientButton";
import LoadingScreen from "../components/LoadingScreen";
import ParticleBackground from '../components/ParticleBackground';
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Switch } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Notification, NotificationGroup } from "@progress/kendo-react-notification";
import { useAccessibility } from '../contexts/AccessibilityContext';

// Import Kendo styles
import "@progress/kendo-react-layout";
import "@progress/kendo-react-buttons";
import "@progress/kendo-react-inputs";
import "@progress/kendo-react-dropdowns";
import "@progress/kendo-react-notification";

// Sample data
const currencies = [
  { text: "USD - US Dollar", value: "USD" },
  { text: "EUR - Euro", value: "EUR" },
  { text: "GBP - British Pound", value: "GBP" },
  { text: "JPY - Japanese Yen", value: "JPY" },
  { text: "AUD - Australian Dollar", value: "AUD" },
];

const languages = [
  { text: "English", value: "en" },
  { text: "Spanish", value: "es" },
  { text: "French", value: "fr" },
  { text: "German", value: "de" },
  { text: "Chinese", value: "zh" },
];

const themes = [
  { text: "Cosmic (Default)", value: "cosmic" },
  { text: "Dark Matter", value: "dark-matter" },
  { text: "Nebula", value: "nebula" },
  { text: "Solar Flare", value: "solar-flare" },
];

const networks = [
  { text: "Ethereum Mainnet", value: "ethereum" },
  { text: "Polygon", value: "polygon" },
  { text: "Optimism", value: "optimism" },
  { text: "Arbitrum", value: "arbitrum" },
  { text: "Binance Smart Chain", value: "bsc" }
];

interface TabSelectEvent {
  selected: number;
}

interface NotificationEvent {
  target: {
    value: boolean;
  };
}

interface DropDownChangeEvent<T> {
  target: {
    value: T;
  };
}

interface InputChangeEvent {
  value: string | number;
}

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [name, setName] = useState("RadhaSphere User");
  const [email, setEmail] = useState("user@example.com");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [autoLockTime, setAutoLockTime] = useState(5);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    reduceMotion,
    toggleReduceMotion,
  } = useAccessibility();
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTabSelect = (e: TabSelectEvent) => {
    setSelectedTab(e.selected);
  };
  
  const handleNotificationChange = (e: NotificationEvent) => {
    setNotificationsEnabled(e.target.value);
  };
  
  const handleTwoFactorChange = (e: NotificationEvent) => {
    setTwoFactorEnabled(e.target.value);
  };
  
  const handleBiometricsChange = (e: NotificationEvent) => {
    setBiometricsEnabled(e.target.value);
  };
  
  const handleAutoLockChange = (e: NotificationEvent) => {
    setAutoLockEnabled(e.target.value);
  };
  
  const handleAutoLockTimeChange = (e: InputChangeEvent) => {
    setAutoLockTime(Number(e.value));
  };
  
  const handleCurrencyChange = (e: DropDownChangeEvent<typeof currencies[0]>) => {
    setSelectedCurrency(e.target.value);
  };
  
  const handleLanguageChange = (e: DropDownChangeEvent<typeof languages[0]>) => {
    setSelectedLanguage(e.target.value);
  };
  
  const handleThemeChange = (e: DropDownChangeEvent<typeof themes[0]>) => {
    setSelectedTheme(e.target.value);
  };
  
  const handleNetworkChange = (e: DropDownChangeEvent<typeof networks[0]>) => {
    setSelectedNetwork(e.target.value);
  };
  
  const handleSaveChanges = () => {
    // Show success notification
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <main className="min-h-screen relative bg-[#06071B]">
      <StarryBackground />
      <ParticleBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Settings
            </h1>
            <p className="text-blue-300">Customize your RadhaSphere experience</p>
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
        
        <div className="glass bg-white/5 backdrop-blur-xl rounded-3xl p-6 mb-8">
          <TabStrip 
            selected={selectedTab} 
            onSelect={handleTabSelect} 
            animation={true} 
            className="k-cosmic-theme"
          >
            <TabStripTab title="General">
              <div className="p-4 text-white">
                <h2 className="text-xl font-semibold mb-6 text-white">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Display Name</label>
                    <Input 
                      value={name}
                      onChange={(e) => setName(e.value)}
                      className="w-full bg-white/10 border border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <Input 
                      value={email}
                      onChange={(e) => setEmail(e.value)}
                      className="w-full bg-white/10 border border-white/20 text-white"
                      disabled={true}
                    />
                    <p className="mt-1 text-xs text-blue-300">Contact support to change your email address</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Default Currency</label>
                    <DropDownList
                      data={currencies}
                      textField="text"
                      dataItemKey="value"
                      value={selectedCurrency}
                      onChange={handleCurrencyChange}
                      className="w-full bg-white/10 border border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Language</label>
                    <DropDownList
                      data={languages}
                      textField="text"
                      dataItemKey="value"
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                      className="w-full bg-white/10 border border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Theme</label>
                    <DropDownList
                      data={themes}
                      textField="text"
                      dataItemKey="value"
                      value={selectedTheme}
                      onChange={handleThemeChange}
                      className="w-full bg-white/10 border border-white/20 text-white"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Switch
                        checked={notificationsEnabled}
                        onChange={handleNotificationChange}
                      />
                    </div>
                    <label className="text-sm font-medium text-white">Enable Notifications</label>
                  </div>
                </div>
              </div>
            </TabStripTab>
            
            <TabStripTab title="Security">
              <div className="p-4 text-white">
                <h2 className="text-xl font-semibold mb-6 text-white">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-blue-300 mt-1">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={twoFactorEnabled}
                      onChange={handleTwoFactorChange}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Biometric Authentication</p>
                      <p className="text-sm text-blue-300 mt-1">Use your fingerprint or Face ID to log in</p>
                    </div>
                    <Switch
                      checked={biometricsEnabled}
                      onChange={handleBiometricsChange}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Auto-lock Wallet</p>
                      <p className="text-sm text-blue-300 mt-1">Automatically lock your wallet after a period of inactivity</p>
                    </div>
                    <Switch
                      checked={autoLockEnabled}
                      onChange={handleAutoLockChange}
                    />
                  </div>
                  
                  {autoLockEnabled && (
                    <div className="ml-4">
                      <label className="block text-sm font-medium text-white mb-2">Auto-lock after (minutes)</label>
                      <Input 
                        type="number"
                        value={autoLockTime}
                        onChange={handleAutoLockTimeChange}
                        min={1}
                        max={60}
                        className="w-32 bg-white/10 border border-white/20 text-white"
                      />
                    </div>
                  )}
                  
                  <PanelBar className="bg-white/10 text-white rounded-lg">
                    <PanelBarItem title="Change Password" expanded={false} className="text-white">
                      <div className="p-4 space-y-4 bg-white/5">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Current Password</label>
                          <Input 
                            type="password"
                            className="w-full bg-white/10 border border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">New Password</label>
                          <Input 
                            type="password"
                            className="w-full bg-white/10 border border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">Confirm New Password</label>
                          <Input 
                            type="password"
                            className="w-full bg-white/10 border border-white/20 text-white"
                          />
                        </div>
                        <Button
                          themeColor="primary"
                          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white mt-2"
                        >
                          Update Password
                        </Button>
                      </div>
                    </PanelBarItem>
                    
                    <PanelBarItem title="Recovery Phrase" expanded={false} className="text-white">
                      <div className="p-4 bg-white/5">
                        <p className="text-sm text-blue-300 mb-4">
                          Your recovery phrase is the only way to restore your wallet if you lose access to your device. 
                          Keep it in a safe and secure place.
                        </p>
                        <Button
                          themeColor="primary"
                          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                        >
                          View Recovery Phrase
                        </Button>
                      </div>
                    </PanelBarItem>
                  </PanelBar>
                </div>
              </div>
            </TabStripTab>
            
            <TabStripTab title="Network">
              <div className="p-4 text-white">
                <h2 className="text-xl font-semibold mb-6 text-white">Network Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Primary Network</label>
                    <DropDownList
                      data={networks}
                      textField="text"
                      dataItemKey="value"
                      value={selectedNetwork}
                      onChange={handleNetworkChange}
                      className="w-full bg-white/10 border border-white/20 text-white"
                    />
                    <p className="mt-1 text-xs text-blue-300">Select your default blockchain network</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Automatic Gas Management</p>
                      <p className="text-sm text-blue-300 mt-1">Automatically optimize gas fees for transactions</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Testnet Access</p>
                      <p className="text-sm text-blue-300 mt-1">Enable testnet networks for development</p>
                    </div>
                    <Switch checked={false} />
                  </div>
                  
                  <div className="mt-8 p-4 bg-white/10 rounded-lg border border-yellow-500/30">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">Advanced Configuration</p>
                        <p className="text-sm text-blue-300 mt-1">
                          Changing these settings may affect wallet performance and security. 
                          Only modify if you understand the implications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabStripTab>

            <TabStripTab title="Accessibility">
              <div className="p-6 text-white">
                <h2 className="text-xl font-semibold mb-6">Accessibility Settings</h2>
                
                <div className="space-y-6">
                  {/* High Contrast Mode */}
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium">High Contrast Mode</h3>
                      <p className="text-sm text-gray-300">Increase contrast for better readability</p>
                    </div>
                    <Switch
                      checked={highContrast}
                      onChange={toggleHighContrast}
                      className="ml-4"
                    />
                  </div>

                  {/* Font Size Controls */}
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Font Size</h3>
                    <p className="text-sm text-gray-300 mb-4">Current size: {fontSize}px</p>
                    <div className="flex space-x-4">
                      <Button onClick={decreaseFontSize} className="bg-purple-600">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </Button>
                      <Button onClick={resetFontSize} className="bg-gray-600">Reset</Button>
                      <Button onClick={increaseFontSize} className="bg-purple-600">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </Button>
                    </div>
                  </div>

                  {/* Reduced Motion */}
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium">Reduced Motion</h3>
                      <p className="text-sm text-gray-300">Minimize animations and transitions</p>
                    </div>
                    <Switch
                      checked={reduceMotion}
                      onChange={toggleReduceMotion}
                      className="ml-4"
                    />
                  </div>
                </div>
              </div>
            </TabStripTab>
          </TabStrip>
        </div>
        
        <div className="flex justify-end">
          <GradientButton onClick={handleSaveChanges}>
            Save Changes
          </GradientButton>
        </div>
      </div>
      
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 z-50">
          <NotificationGroup>
            <Notification
              type={{ style: 'success', icon: true }}
              closable={true}
              onClose={() => setShowSuccess(false)}
            >
              <span className="text-white">Settings saved successfully!</span>
            </Notification>
          </NotificationGroup>
        </div>
      )}
    </main>
  );
} 