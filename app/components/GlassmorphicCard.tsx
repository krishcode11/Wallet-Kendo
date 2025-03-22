"use client";

import React from 'react';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassmorphicCard({ 
  children, 
  className = "", 
  hoverEffect = true 
}: GlassmorphicCardProps) {
  return (
    <div 
      className={`
        glass p-6 rounded-2xl border border-white/20
        ${hoverEffect ? 'card-3d transition-all duration-300 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
} 