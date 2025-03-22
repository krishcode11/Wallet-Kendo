"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import ParticleBackground from '../components/ParticleBackground';
import StarryBackground from '../components/StarryBackground';
import GradientButton from '../components/GradientButton';
import LoadingScreen from '../components/LoadingScreen';
import { 
  Chart, 
  ChartSeries, 
  ChartSeriesItem, 
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartArea,
  ChartLegend
} from "@progress/kendo-react-charts";
import "@progress/kendo-react-charts";
import "hammerjs";

// Sample NFT collection data
const NFT_COLLECTIONS = [
  {
    id: 'cosmic-wanderers',
    name: 'Cosmic Wanderers',
    price: 1.25,
    currency: 'ETH',
    thumbnail: '/cosmic.jpg',
    items: 10000,
    owners: 4325,
    floorPrice: 1.25,
    volume: 245.8
  },
  {
    id: 'astral-entities',
    name: 'Astral Entities',
    price: 0.85,
    currency: 'ETH',
    thumbnail: '/astral.jpg',
    items: 8500,
    owners: 3150,
    floorPrice: 0.85,
    volume: 178.3
  },
  {
    id: 'nebula-guardians',
    name: 'Nebula Guardians',
    price: 0.65,
    currency: 'ETH',
    thumbnail: '/nebula.jpg',
    items: 5000,
    owners: 2240,
    floorPrice: 0.65,
    volume: 112.5
  },
  {
    id: 'quantum-pixels',
    name: 'Quantum Pixels',
    price: 0.45,
    currency: 'ETH',
    thumbnail: '/Quantum.jpg',
    items: 12000,
    owners: 5730,
    floorPrice: 0.45,
    volume: 89.2
  }
];

// Sample floor price history data
const floorPriceHistory = [
  { date: '1 Aug', cosmic: 0.85, astral: 0.55, nebula: 0.42, quantum: 0.28 },
  { date: '8 Aug', cosmic: 0.95, astral: 0.60, nebula: 0.45, quantum: 0.30 },
  { date: '15 Aug', cosmic: 1.05, astral: 0.70, nebula: 0.52, quantum: 0.35 },
  { date: '22 Aug', cosmic: 1.15, astral: 0.75, nebula: 0.58, quantum: 0.38 },
  { date: '29 Aug', cosmic: 1.20, astral: 0.80, nebula: 0.60, quantum: 0.40 },
  { date: '5 Sep', cosmic: 1.25, astral: 0.85, nebula: 0.65, quantum: 0.45 }
];

// Sample user owned NFTs
const USER_NFTS = [
  {
    id: 'cosmic-wanderer-1234',
    collection: 'Cosmic Wanderers',
    name: 'Cosmic Wanderer #1234',
    image: '/cosmic.jpg',
    acquiredDate: '2023-08-15',
    acquiredPrice: 0.95,
    currentValue: 1.25
  },
  {
    id: 'astral-entity-5678',
    collection: 'Astral Entities',
    name: 'Astral Entity #5678',
    image: '/astral.jpg',
    acquiredDate: '2023-07-22',
    acquiredPrice: 0.65,
    currentValue: 0.85
  }
];

export default function NFTGalleryPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('owned');
  const [selectedCollection, setSelectedCollection] = useState(NFT_COLLECTIONS[0]);

  const router = useRouter();

  useEffect(() => {
    // Simulate loading for UI demo purposes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

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
              NFT Gallery
            </h1>
            <p className="text-blue-300">Discover, collect, and showcase digital art</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => router.push('/wallet')}
              className="flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 border-b border-white/10">
          <div className="flex space-x-8">
            <button
              className={`pb-4 px-1 text-lg font-medium transition-colors relative ${
                activeTab === 'owned' 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white/80'
              }`}
              onClick={() => setActiveTab('owned')}
            >
              My Collection
              {activeTab === 'owned' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></span>
              )}
            </button>
            
            <button
              className={`pb-4 px-1 text-lg font-medium transition-colors relative ${
                activeTab === 'explore' 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white/80'
              }`}
              onClick={() => setActiveTab('explore')}
            >
              Explore
              {activeTab === 'explore' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></span>
              )}
            </button>
          </div>
        </div>
        
        {/* Content */}
        {activeTab === 'owned' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User NFTs */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Your NFTs</h2>
              
              {USER_NFTS.map((nft) => (
                <div 
                  key={nft.id}
                  className="glass bg-white/5 backdrop-blur-xl rounded-3xl p-5 flex space-x-4 transition-transform hover:scale-[1.02]"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden relative flex-shrink-0">
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">{nft.name}</h3>
                    <p className="text-sm text-blue-300 mb-2">{nft.collection}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-white/60">Acquired</p>
                        <p className="text-white">{nft.acquiredDate}</p>
                      </div>
                      
                      <div>
                        <p className="text-white/60">Bought for</p>
                        <p className="text-white">{nft.acquiredPrice} ETH</p>
                      </div>
                      
                      <div>
                        <p className="text-white/60">Current value</p>
                        <p className="text-white">{nft.currentValue} ETH</p>
                      </div>
                      
                      <div>
                        <p className="text-white/60">Profit/Loss</p>
                        <p className={`${
                          nft.currentValue > nft.acquiredPrice ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {((nft.currentValue - nft.acquiredPrice) / nft.acquiredPrice * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="glass bg-white/5 backdrop-blur-xl rounded-3xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Add to Your Collection</h3>
                <p className="text-white/70 mb-4">Browse trending collections and find your next digital masterpiece</p>
                <GradientButton onClick={() => setActiveTab('explore')}>
                  Explore Collections
                </GradientButton>
              </div>
            </div>
            
            {/* NFT Floor Price Chart */}
            <div className="glass bg-white/5 backdrop-blur-xl rounded-3xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Collection Floor Prices</h2>
              
              <div className="h-[300px] mb-4">
                <Chart style={{ height: '100%' }}>
                  <ChartArea background="transparent" />
                  <ChartCategoryAxis>
                    <ChartCategoryAxisItem 
                      categories={floorPriceHistory.map(item => item.date)}
                      color="rgba(255, 255, 255, 0.5)"
                      majorGridLines={{ visible: false }}
                    />
                  </ChartCategoryAxis>
                  <ChartValueAxis>
                    <ChartValueAxisItem 
                      color="rgba(255, 255, 255, 0.5)"
                      labels={{ 
                        color: "rgba(255, 255, 255, 0.7)",
                        format: "{0} ETH"
                      }}
                      line={{ visible: false }}
                      majorGridLines={{ color: "rgba(255, 255, 255, 0.1)" }}
                    />
                  </ChartValueAxis>
                  <ChartSeries>
                    <ChartSeriesItem 
                      type="line" 
                      data={floorPriceHistory.map(item => item.cosmic)}
                      name="Cosmic Wanderers"
                      color="#8A2BE2"
                      markers={{ visible: false }}
                    />
                    <ChartSeriesItem 
                      type="line" 
                      data={floorPriceHistory.map(item => item.astral)}
                      name="Astral Entities"
                      color="#00BFFF"
                      markers={{ visible: false }}
                    />
                  </ChartSeries>
                  <ChartLegend position="bottom" background="transparent" labels={{ color: "white" }} />
                </Chart>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-white/60 text-sm">Your portfolio value</p>
                  <p className="text-white text-xl font-semibold">2.10 ETH</p>
                  <p className="text-green-400 text-sm">+15.3% last month</p>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-white/60 text-sm">Market sentiment</p>
                  <p className="text-white text-xl font-semibold">Bullish</p>
                  <p className="text-blue-300 text-sm">Floor prices rising</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Collection */}
            <div className="glass bg-white/5 backdrop-blur-xl rounded-3xl p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-semibold text-white mb-2">Featured Collection</h2>
                  <h3 className="text-3xl font-bold text-white mb-4">{selectedCollection.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-white/60 text-sm">Floor Price</p>
                      <p className="text-white text-xl font-semibold">{selectedCollection.floorPrice} ETH</p>
                    </div>
                    
                    <div>
                      <p className="text-white/60 text-sm">Volume</p>
                      <p className="text-white text-xl font-semibold">{selectedCollection.volume} ETH</p>
                    </div>
                    
                    <div>
                      <p className="text-white/60 text-sm">Items</p>
                      <p className="text-white text-xl font-semibold">{selectedCollection.items.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-white/60 text-sm">Owners</p>
                      <p className="text-white text-xl font-semibold">{selectedCollection.owners.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <GradientButton>
                    View Collection
                  </GradientButton>
                </div>
                
                <div className="w-full md:w-1/2 h-[300px]">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <Image
                      src={selectedCollection.thumbnail}
                      alt={selectedCollection.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Popular Collections */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Popular Collections</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {NFT_COLLECTIONS.map((collection) => (
                  <div 
                    key={collection.id}
                    className="glass bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden transition-transform hover:scale-[1.03] cursor-pointer"
                    onClick={() => setSelectedCollection(collection)}
                  >
                    <div className="w-full h-48 relative">
                      <Image
                        src={collection.thumbnail}
                        alt={collection.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-white mb-2">{collection.name}</h3>
                      
                      <div className="flex justify-between">
                        <div>
                          <p className="text-white/60 text-xs">Floor</p>
                          <p className="text-white font-medium">{collection.floorPrice} ETH</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-white/60 text-xs">Items</p>
                          <p className="text-white font-medium">{collection.items.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 