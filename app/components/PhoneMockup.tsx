"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface PhoneMockupProps {
  className?: string;
}

export default function PhoneMockup({ className = '' }: PhoneMockupProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  
  // Smooth out the rotation
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  // Reset rotation when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };
  
  // Screen rotation
  useEffect(() => {
    if (!isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 4);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovered]);
  
  // Wallet screens
  const screens = [
    '/dashboard-preview.jpg',
    '/screenshot.png',
  ];
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative max-w-[280px] mx-auto"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Phone frame */}
        <div className="relative aspect-[9/19] w-full rounded-[2.5rem] overflow-hidden border-[8px] border-[#262626] bg-black shadow-2xl">
          {/* Top notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-7 bg-black rounded-b-2xl z-10 flex items-center justify-center">
            <div className="w-20 h-2 rounded-full bg-[#262626]"></div>
          </div>
          
          {/* Screen content */}
          <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image 
                  src={screens[currentScreen]} 
                  alt="Wallet Interface" 
                  className="object-cover"
                  fill
                  priority
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Holographic overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 mix-blend-overlay pointer-events-none"></div>
            
            {/* Scan lines effect */}
            <div 
              className="absolute inset-0 bg-repeat-y pointer-events-none opacity-10" 
              style={{ 
                backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8) 50%)', 
                backgroundSize: '100% 4px'
              }}
            ></div>
            
            {/* Glitch effect */}
            {isHovered && (
              <>
                <div 
                  className="absolute inset-0 bg-blue-500/10 mix-blend-screen animate-glitch-1 pointer-events-none"
                  style={{ clipPath: 'polygon(0 15%, 100% 15%, 100% 40%, 0 40%)' }}
                ></div>
                <div 
                  className="absolute inset-0 bg-purple-500/10 mix-blend-screen animate-glitch-2 pointer-events-none"
                  style={{ clipPath: 'polygon(0 65%, 100% 65%, 100% 80%, 0 80%)' }}
                ></div>
              </>
            )}
          </div>
        </div>
        
        {/* Phone shadow */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/20 filter blur-md rounded-full"></div>
        
        {/* Power button */}
        <div className="absolute top-32 -right-2 w-1 h-12 bg-[#1a1a1a] rounded-r"></div>
        
        {/* Volume buttons */}
        <div className="absolute top-20 -left-2 w-1 h-6 bg-[#1a1a1a] rounded-l"></div>
        <div className="absolute top-28 -left-2 w-1 h-6 bg-[#1a1a1a] rounded-l"></div>
        
        {/* Floating particles */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
                initial={{ 
                  x: Math.random() * 280 - 50, 
                  y: Math.random() * 580, 
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: [null, Math.random() * -100 - 50],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )}
      </motion.div>
      
      {/* Glow effect under phone */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 rounded-full filter blur-xl transition-opacity duration-700"
        style={{ 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(30, 64, 175, 0.1) 60%, transparent 100%)',
          opacity: isHovered ? 0.8 : 0.2
        }}
      ></div>
    </div>
  );
} 