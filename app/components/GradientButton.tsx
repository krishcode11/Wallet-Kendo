"use client";

import { useState, ReactNode } from 'react';
import Link from 'next/link';

export type ButtonVariant = 'nebula' | 'cosmic' | 'plasma' | 'void' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface GradientButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  glowEffect?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
}

export default function GradientButton({
  children,
  variant = 'nebula',
  size = 'md',
  className = '',
  href,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  glowEffect = false,
  onClick,
  type = 'button'
}: GradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Size classes
  const sizeClasses = {
    xs: 'py-1 px-2 text-xs font-medium',
    sm: 'py-1.5 px-3 text-sm font-medium',
    md: 'py-2 px-4 text-sm font-semibold',
    lg: 'py-2.5 px-5 text-base font-semibold'
  };
  
  // Variant classes
  const variantClasses = {
    nebula: `relative overflow-hidden backdrop-blur-sm border border-purple-500/30 
            ${isHovered 
              ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-xl' 
              : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white'}
            hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300`,
            
    cosmic: `relative overflow-hidden backdrop-blur-sm border border-blue-400/20 
           ${isHovered 
              ? 'bg-gradient-to-r from-teal-500/80 to-blue-500/80 text-white shadow-lg' 
              : 'bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-white'}
            hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300`,
            
    plasma: `relative overflow-hidden backdrop-blur-sm border border-pink-500/30 
            ${isHovered 
              ? 'bg-gradient-to-r from-pink-600/90 to-orange-400/90 text-white shadow-lg' 
              : 'bg-gradient-to-r from-pink-600/20 to-orange-400/20 text-white'}
            hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300`,
            
    void: `relative overflow-hidden border border-slate-400/20
          ${isHovered 
              ? 'bg-gradient-to-r from-slate-800/90 to-slate-900/90 text-white shadow-inner' 
              : 'bg-gradient-to-r from-slate-800/40 to-slate-900/40 text-white'}
          hover:bg-slate-900/60 transition-all duration-300`,
          
    ghost: `relative overflow-hidden border border-transparent 
           ${isHovered 
              ? 'bg-white/20 text-white backdrop-blur-md' 
              : 'bg-transparent text-white/80'}
           hover:bg-white/10 transition-all duration-300`
  };
  
  // Combined classes
  const buttonClasses = `
    inline-flex items-center justify-center
    rounded-lg font-medium
    transition-all duration-300 ease-out
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${glowEffect ? 'hover:shadow-glow' : ''}
    ${className}
  `;
  
  // Hover animations for button
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  // Glow effect
  const glowStyles = glowEffect ? {
    boxShadow: isHovered ? '0 0 25px rgba(139, 92, 246, 0.5), 0 0 10px rgba(139, 92, 246, 0.4)' : '',
    transform: isHovered ? 'translateY(-2px)' : '',
  } : {};
  
  // Button content with icon
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      <span className="relative z-10 tracking-wide">{children}</span>
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      
      {/* Animated gradient overlay */}
      <span 
        className={`absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}
        style={{
          background: variant === 'nebula' ? 'linear-gradient(45deg, rgba(192, 132, 252, 0.3), rgba(100, 217, 251, 0.3))' :
                      variant === 'cosmic' ? 'linear-gradient(45deg, rgba(45, 212, 191, 0.3), rgba(59, 130, 246, 0.3))' :
                      variant === 'plasma' ? 'linear-gradient(45deg, rgba(249, 168, 212, 0.3), rgba(251, 146, 60, 0.3))' :
                      'none'
        }}
      />
      
      {/* Light reflection effect */}
      <span 
        className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-10' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
        }}
      />
      
      {/* Particle effect on hover */}
      {isHovered && (
        <span className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <span 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/70 animate-float-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${1 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </span>
      )}
    </>
  );
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link 
        href={href}
        className={buttonClasses}
        style={glowStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {buttonContent}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button
      type={type}
      className={buttonClasses}
      style={glowStyles}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
} 