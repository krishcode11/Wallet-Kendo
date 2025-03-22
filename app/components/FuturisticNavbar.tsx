"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import GradientButton from './GradientButton';
import { 
  HomeIcon, 
  DashboardIcon, 
  SendReceiveIcon, 
  NFTIcon, 
  AIInsightsIcon,
  LoginIcon
} from './icons/NavIcons';

interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export default function FuturisticNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Detect scroll for navbar appearance changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { 
      name: 'Home', 
      path: '/', 
      icon: <HomeIcon className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" /> 
    },
    { 
      name: 'Dashboard', 
      path: '/login', 
      icon: <DashboardIcon className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" /> 
    },
    { 
      name: 'Send/Receive', 
      path: '/login', 
      icon: <SendReceiveIcon className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" /> 
    },
    { 
      name: 'NFTs', 
      path: '/login', 
      icon: <NFTIcon className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" /> 
    },
    { 
      name: 'AI Insights', 
      path: '/login', 
      icon: <AIInsightsIcon className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" /> 
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'navbar-glass py-2 backdrop-blur-xl' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10 overflow-hidden">
              <Image
                src="/logos/radhasphere-icon.svg"
                alt="RadhaSphere Logo"
                width={40}
                height={40}
                className="animate-float"
              />
              {/* Animated glowing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-500 opacity-75 animate-pulse"></div>
            </div>
            
            <div className="flex flex-col">
              <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                RadhaSphere
              </div>
              <div className="text-xs text-white/60 hidden sm:block">AI-Powered Wallet</div>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors group flex items-center gap-2 ${
                  isActive(link.path) 
                    ? 'text-white' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.icon}</span>
                <span className="relative z-10">{link.name}</span>
                
                {/* Active indicator */}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
                )}
                
                {/* Hover effect */}
                <span className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200"></span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <GradientButton 
              variant="cosmic"
              size="sm"
              className="hidden sm:flex"
              onClick={() => router.push('/login')}
              icon={<LoginIcon className="w-4 h-4" />}
            >
              <span className="ml-1">Connect</span>
            </GradientButton>
            
            <GradientButton 
              variant="nebula"
              size="sm"
              onClick={() => router.push('/dashboard')}
              glowEffect={true}
              className="relative"
            >
              <span>Launch App</span>
              
              {/* Notification dot */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            </GradientButton>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg backdrop-blur-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 top-0 w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`absolute left-0 top-2 w-full h-0.5 bg-white rounded-full transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute left-0 top-4 w-full h-0.5 bg-white rounded-full transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu - Slides down when open */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="glass rounded-xl p-4 space-y-3 data-stream">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.path) 
                    ? 'bg-white/10 text-white font-medium' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-600/30 flex items-center justify-center mr-3">
                    {link.icon}
                  </div>
                  {link.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 