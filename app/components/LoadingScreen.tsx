"use client";

import React from 'react';
import Image from 'next/image';
import StarryBackground from './StarryBackground';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <StarryBackground />
      
      <div className="relative flex flex-col items-center">
        {/* App logo */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-8 animate-float">
          <Image 
            src="/logos/radhasphere-icon.svg" 
            alt="RadhaSphere Logo"
            width={60}
            height={60}
            className="z-10"
          />
        </div>
        
        {/* Loading animation */}
        <div className="relative w-16 h-16 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-purple-500 animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-xl font-medium text-white loading-text">
          <span className="animate-pulse inline-block">L</span>
          <span className="animate-pulse inline-block" style={{ animationDelay: '0.1s' }}>o</span>
          <span className="animate-pulse inline-block" style={{ animationDelay: '0.2s' }}>a</span>
          <span className="animate-pulse inline-block" style={{ animationDelay: '0.3s' }}>d</span>
          <span className="animate-pulse inline-block" style={{ animationDelay: '0.4s' }}>i</span>
          <span className="animate-pulse inline-block" style={{ animationDelay: '0.5s' }}>n</span>
          <span className="animate-pulse inline-block" style={{ animationDelay: '0.6s' }}>g</span>
          <span className="animate-pulse inline-block" style={{ animationDelay: '0.7s' }}>.</span>
          <span className="animate-pulse inline-block" style={{ animationDelay: '0.8s' }}>.</span>
          <span className="animate-pulse inline-block" style={{ animationDelay: '0.9s' }}>.</span>
        </div>
        
        {/* Glowing orb effect */}
        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 filter blur-3xl -z-10"></div>
      </div>
    </div>
  );
} 