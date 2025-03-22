"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import StarryBackground from '../components/StarryBackground';
import GradientButton from '../components/GradientButton';
import LoadingScreen from '../components/LoadingScreen';
import ParticleBackground from '../components/ParticleBackground';


// Sample NFT data
const SAMPLE_NFTS = [
  {
    id: 1,
    name: "Cosmic Wanderer #42",
    collection: "Cosmic Wanderers",
    image: "/nft-examples/cosmic-1.jpg",
    price: 0.85,
    currency: "ETH",
    rarity: "Rare",
    chain: "Ethereum"
  },
  {
    id: 2,
    name: "Astral Entity #13",
    collection: "Astral Entities",
    image: "/nft-examples/astral-1.jpg",
    price: 1.2,
    currency: "ETH",
    rarity: "Epic",
    chain: "Ethereum"
  },
  {
    id: 3,
    name: "Nebula Guardian #7",
    collection: "Nebula Guardians",
    image: "/nft-examples/guardian-1.jpg",
    price: 0.5,
    currency: "SOL",
    rarity: "Uncommon",
    chain: "Solana"
  },
  {
    id: 4,
    name: "Space Odyssey #101",
    collection: "Space Odyssey",
    image: "/nft-examples/odyssey-1.jpg",
    price: 250,
    currency: "MATIC",
    rarity: "Legendary",
    chain: "Polygon"
  },
  {
    id: 5,
    name: "Galactic Pioneer #3",
    collection: "Galactic Pioneers",
    image: "/nft-examples/pioneer-1.jpg",
    price: 0.7,
    currency: "ETH",
    rarity: "Rare",
    chain: "Ethereum"
  },
  {
    id: 6,
    name: "Cosmic Wanderer #87",
    collection: "Cosmic Wanderers",
    image: "/nft-examples/cosmic-2.jpg",
    price: 0.95,
    currency: "ETH",
    rarity: "Epic",
    chain: "Ethereum"
  },
  {
    id: 7,
    name: "Astral Entity #29",
    collection: "Astral Entities",
    image: "/nft-examples/astral-2.jpg",
    price: 0.65,
    currency: "ETH",
    rarity: "Uncommon",
    chain: "Ethereum"
  },
  {
    id: 8,
    name: "Nebula Guardian #18",
    collection: "Nebula Guardians",
    image: "/nft-examples/guardian-2.jpg",
    price: 1.8,
    currency: "SOL",
    rarity: "Legendary",
    chain: "Solana"
  }
];

// Mock placeholder images (since we don't have the actual images)
const PLACEHOLDER_IMAGES = [
  "/cosmic.jpg",
  "/astral.jpg",
  "/nebula.jpg",
  "/space.jpg",
  "/galactic.jpg",
  "/stellar.jpg",
  "/void.jpg",
  "/Quantum.jpg",
];

export default function NFTsPage() {
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState(SAMPLE_NFTS);
  const [selectedChain, setSelectedChain] = useState("all");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const { currentUser } = useAuth();
  const router = useRouter();
  
  // Check authentication and load NFTs
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      // In a real app, we would fetch user's NFTs here
      setNfts(SAMPLE_NFTS);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentUser, router]);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  // Filter NFTs based on selected filters
  const filteredNFTs = nfts.filter(nft => {
    if (selectedChain !== "all" && nft.chain !== selectedChain) return false;
    if (selectedCollection !== "all" && nft.collection !== selectedCollection) return false;
    return true;
  });
  
  // Sort NFTs based on selected sorting
  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rarity") {
      const rarityOrder: Record<string, number> = {
        "Common": 1,
        "Uncommon": 2,
        "Rare": 3,
        "Epic": 4,
        "Legendary": 5
      };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    }
    return 0;
  });
  
  // Get unique collections for filter
  const collections = ["all", ...new Set(nfts.map(nft => nft.collection))];
  
  // Get unique chains for filter
  const chains = ["all", ...new Set(nfts.map(nft => nft.chain))];

  return (
    <main className="min-h-screen relative bg-[#06071B]">
      <StarryBackground />
      <ParticleBackground />
      
      <Navbar />
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              NFT Collections
            </h1>
            <p className="text-blue-300">Explore your digital art and collectibles</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <GradientButton 
              variant="nebula" 
              size="md"
              onClick={() => router.push('/nft-gallery')}
            >
              Explore Marketplace
            </GradientButton>
          </div>
        </div>
        
        {/* Featured Collection */}
        <div className="mb-12">
          <div className="relative rounded-3xl overflow-hidden h-64 md:h-80">
            {/* Background image with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700/80 to-blue-700/80"></div>
            <div className="absolute inset-0">
              <Image
                src={PLACEHOLDER_IMAGES[0]}
                alt="Featured collection"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">Featured Collection</span>
              <h2 className="text-3xl font-bold text-white mt-3">Cosmic Wanderers</h2>
              <p className="text-white/80 mb-3 max-w-xl">A collection of 100 unique cosmic explorers traversing the universe, each with their own story and rare attributes.</p>
              
              <div className="flex space-x-4">
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                  View Collection
                </button>
                <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 px-4 py-2 rounded-lg transition-colors">
                  Floor: 0.85 ETH
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Controls */}
        <div className="glass bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4">
              {/* Blockchain Filter */}
              <div>
                <label className="block text-white/70 text-sm mb-1">Blockchain</label>
                <select 
                  value={selectedChain} 
                  onChange={e => setSelectedChain(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {chains.map(chain => (
                    <option key={chain} value={chain}>
                      {chain === "all" ? "All Chains" : chain}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Collection Filter */}
              <div>
                <label className="block text-white/70 text-sm mb-1">Collection</label>
                <select 
                  value={selectedCollection} 
                  onChange={e => setSelectedCollection(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {collections.map(collection => (
                    <option key={collection} value={collection}>
                      {collection === "all" ? "All Collections" : collection}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Sort By */}
              <div>
                <label className="block text-white/70 text-sm mb-1">Sort By</label>
                <select 
                  value={sortBy} 
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rarity">Rarity</option>
                </select>
              </div>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-purple-500/30 text-purple-200" : "bg-white/10 text-white/70"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-purple-500/30 text-purple-200" : "bg-white/10 text-white/70"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* NFT Grid or List */}
        {sortedNFTs.length === 0 ? (
          <div className="glass bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No NFTs Found</h3>
            <p className="text-white/70 mb-6">No NFTs match your current filter settings.</p>
            <button 
              onClick={() => {
                setSelectedChain("all");
                setSelectedCollection("all");
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedNFTs.map((nft, index) => (
              <div key={nft.id} className="group">
                <div className="glass bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-purple-500/20">
                  {/* NFT Image */}
                  <div className="aspect-square relative">
                    <Image
                      src={PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}
                      alt={nft.name}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Rarity Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium 
                        ${nft.rarity === "Common" ? "bg-gray-500/40 text-gray-200" : ""}
                        ${nft.rarity === "Uncommon" ? "bg-green-500/40 text-green-200" : ""}
                        ${nft.rarity === "Rare" ? "bg-blue-500/40 text-blue-200" : ""}
                        ${nft.rarity === "Epic" ? "bg-purple-500/40 text-purple-200" : ""}
                        ${nft.rarity === "Legendary" ? "bg-yellow-500/40 text-yellow-200" : ""}
                      `}>
                        {nft.rarity}
                      </span>
                    </div>
                    
                    {/* Chain Icon */}
                    <div className="absolute top-3 left-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        {nft.chain === "Ethereum" && (
                          <Image 
                            src="/icons/ethereum.svg" 
                            alt="ETH" 
                            width={14}
                            height={14}
                          />
                        )}
                        {nft.chain === "Solana" && (
                          <Image 
                            src="/icons/solana.svg" 
                            alt="SOL" 
                            width={14}
                            height={14}
                          />
                        )}
                        {nft.chain === "Polygon" && (
                          <Image 
                            src="/icons/polygon.svg" 
                            alt="MATIC" 
                            width={14}
                            height={14}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* NFT Info */}
                  <div className="p-4">
                    <div className="text-xs text-white/60 mb-1">{nft.collection}</div>
                    <h3 className="text-white font-medium truncate">{nft.name}</h3>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center">
                        <span className="text-white/60 text-sm mr-1">Price:</span>
                        <span className="text-white font-medium">{nft.price} {nft.currency}</span>
                      </div>
                      
                      <button className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedNFTs.map((nft, index) => (
              <div key={nft.id} className="glass bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* NFT Image - smaller in list view */}
                  <div className="w-full md:w-32 h-32 relative flex-shrink-0">
                    <Image
                      src={PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]}
                      alt={nft.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* NFT Info */}
                  <div className="p-4 flex-1 flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        {/* Chain Icon */}
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          {nft.chain === "Ethereum" && (
                            <Image 
                              src="/icons/ethereum.svg" 
                              alt="ETH" 
                              width={12}
                              height={12}
                            />
                          )}
                          {nft.chain === "Solana" && (
                            <Image 
                              src="/icons/solana.svg" 
                              alt="SOL" 
                              width={12}
                              height={12}
                            />
                          )}
                          {nft.chain === "Polygon" && (
                            <Image 
                              src="/icons/polygon.svg" 
                              alt="MATIC" 
                              width={12}
                              height={12}
                            />
                          )}
                        </div>
                        <div className="text-xs text-white/60">{nft.collection}</div>
                        
                        {/* Rarity Badge */}
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-medium 
                          ${nft.rarity === "Common" ? "bg-gray-500/40 text-gray-200" : ""}
                          ${nft.rarity === "Uncommon" ? "bg-green-500/40 text-green-200" : ""}
                          ${nft.rarity === "Rare" ? "bg-blue-500/40 text-blue-200" : ""}
                          ${nft.rarity === "Epic" ? "bg-purple-500/40 text-purple-200" : ""}
                          ${nft.rarity === "Legendary" ? "bg-yellow-500/40 text-yellow-200" : ""}
                        `}>
                          {nft.rarity}
                        </span>
                      </div>
                      
                      <h3 className="text-white font-medium mt-1">{nft.name}</h3>
                    </div>
                    
                    <div className="mt-3 md:mt-0 flex items-center justify-between md:justify-end md:space-x-4">
                      <div className="flex items-center">
                        <span className="text-white/60 text-sm mr-1">Price:</span>
                        <span className="text-white font-medium">{nft.price} {nft.currency}</span>
                      </div>
                      
                      <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 