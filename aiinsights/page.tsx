'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import StarryBackground from '../components/StarryBackground';
import GradientButton from '../components/GradientButton';
import LoadingScreen from '../components/LoadingScreen';
import AIChatAgent from '../components/AIChatAgent';
import ParticleBackground from '../components/ParticleBackground';

interface InsightCard {
  title: string;
  description: string;
  icon: string;
  category: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function AIInsights() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showChat, setShowChat] = useState(false);

  // Sample insights data
  const insights: InsightCard[] = [
    {
      title: "Market Sentiment Analysis",
      description: "Current market sentiment is bullish with a 75% positive outlook based on social media analysis and trading patterns.",
      icon: "/icons/sentiment.svg",
      category: "market"
    },
    {
      title: "Portfolio Optimization",
      description: "Based on your holdings, consider diversifying into DeFi tokens to optimize risk-adjusted returns.",
      icon: "/icons/portfolio.svg",
      category: "portfolio"
    },
    {
      title: "Gas Fee Prediction",
      description: "Gas fees are expected to be lowest in the next 2 hours. Consider scheduling your transactions then.",
      icon: "/icons/gas.svg",
      category: "gas"
    },
    {
      title: "Security Alert",
      description: "New phishing campaign detected targeting DEX users. Always verify smart contract addresses.",
      icon: "/icons/security.svg",
      category: "security"
    },
    {
      title: "Trending Tokens",
      description: "AI analysis shows increasing momentum for Layer 2 scaling solution tokens in the past 24 hours.",
      icon: "/icons/trending.svg",
      category: "market"
    },
    {
      title: "Smart Contract Analysis",
      description: "Recent audit of popular DeFi protocols shows potential vulnerabilities in yield farming contracts.",
      icon: "/icons/smartcontract.svg",
      category: "security"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Insights' },
    { id: 'market', label: 'Market Analysis' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'security', label: 'Security' },
    { id: 'gas', label: 'Gas Optimization' }
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a1525] relative">
      <StarryBackground />
      <ParticleBackground />
      
      {/* Back to Wallet Button */}
      <div className="absolute top-4 left-4 z-20">
        <GradientButton
          onClick={() => router.push('/wallet')}
          className="!px-4 !py-2 text-sm flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Wallet
        </GradientButton>
      </div>
      
      {/* Header */}
      <div className="relative z-10 pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-2">
            AI Insights
          </h1>
          <p className="text-purple-300 text-center text-lg mb-8">
            Powered by Evee, your personal crypto AI assistant
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedCategory === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Insights Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Market Insights</h2>
                <GradientButton
                  onClick={() => setLoading(true)}
                  className="!px-4 !py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Refresh
                  </div>
                </GradientButton>
              </div>
              
              {filteredInsights.map((insight, index) => (
                <div
                  key={index}
                  className="bg-[#0d1f35]/80 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/20
                           transform transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/40"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mr-4">
                      <Image
                        src={insight.icon}
                        alt={insight.title}
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {insight.title}
                      </h3>
                      <span className="text-sm text-purple-300 bg-purple-500/10 px-2 py-1 rounded-full">
                        {categories.find(cat => cat.id === insight.category)?.label || insight.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-purple-200/90 mb-4">
                    {insight.description}
                  </p>

                  {insight.action && (
                    <GradientButton
                      onClick={insight.action.onClick}
                      className="w-full !py-2 text-sm"
                    >
                      {insight.action.label}
                    </GradientButton>
                  )}
                </div>
              ))}
            </div>

            {/* AI Chat Agent Section */}
            <div className="lg:sticky lg:top-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">AI Assistant</h2>
                <GradientButton
                  onClick={() => setShowChat(!showChat)}
                  className="!px-4 !py-2 text-sm lg:hidden"
                >
                  {showChat ? 'Hide Chat' : 'Show Chat'}
                </GradientButton>
              </div>
              <div className={`lg:block ${showChat ? 'block' : 'hidden'}`}>
                <AIChatAgent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}