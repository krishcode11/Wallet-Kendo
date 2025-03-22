"use client";

import React from 'react';

interface IconProps {
  className?: string;
}

export const DashboardIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

export const SendReceiveIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M7 11l5-5m0 0l5 5m-5-5v12" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M17 17l-5 5m0 0l-5-5m5 5V10" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const NFTIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M14.5 5.5L19 10l-4.5 4.5m-5 0L5 10l4.5-4.5M12 4v16" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const AIInsightsIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <path 
      d="M12 8v4l3 3" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 16l-1.5 1.5M15 16l1.5 1.5M16.5 9.5L18 8M7.5 9.5L6 8" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const LoginIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 22V12h6v10" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
); 