"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  announceMessage: (message: string, priority?: 'polite' | 'assertive') => void;
  focusableElements: HTMLElement[];
  registerFocusable: (element: HTMLElement) => void;
  unregisterFocusable: (element: HTMLElement) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);

  // High Contrast Mode
  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => {
      const newValue = !prev;
      document.documentElement.classList.toggle('high-contrast', newValue);
      localStorage.setItem('highContrast', String(newValue));
      return newValue;
    });
  }, []);

  // Font Size Controls
  const increaseFontSize = useCallback(() => {
    setFontSize(prev => {
      const newSize = Math.min(prev + 2, 24);
      document.documentElement.style.fontSize = `${newSize}px`;
      localStorage.setItem('fontSize', String(newSize));
      return newSize;
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize(prev => {
      const newSize = Math.max(prev - 2, 12);
      document.documentElement.style.fontSize = `${newSize}px`;
      localStorage.setItem('fontSize', String(newSize));
      return newSize;
    });
  }, []);

  const resetFontSize = useCallback(() => {
    setFontSize(16);
    document.documentElement.style.fontSize = '16px';
    localStorage.setItem('fontSize', '16');
  }, []);

  // Reduced Motion
  const toggleReduceMotion = useCallback(() => {
    setReduceMotion(prev => {
      const newValue = !prev;
      document.documentElement.classList.toggle('reduce-motion', newValue);
      localStorage.setItem('reduceMotion', String(newValue));
      return newValue;
    });
  }, []);

  // Screen Reader Announcements
  const announceMessage = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.classList.add('sr-only');
    document.body.appendChild(announcer);

    // Force a repaint to ensure the announcement is made
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);

    // Clean up
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, []);

  // Focus Management
  const registerFocusable = useCallback((element: HTMLElement) => {
    setFocusableElements(prev => [...prev, element]);
  }, []);

  const unregisterFocusable = useCallback((element: HTMLElement) => {
    setFocusableElements(prev => prev.filter(el => el !== element));
  }, []);

  // Initialize from localStorage
  useEffect(() => {
    const storedHighContrast = localStorage.getItem('highContrast') === 'true';
    const storedFontSize = parseInt(localStorage.getItem('fontSize') || '16');
    const storedReduceMotion = localStorage.getItem('reduceMotion') === 'true';

    setHighContrast(storedHighContrast);
    setFontSize(storedFontSize);
    setReduceMotion(storedReduceMotion);

    document.documentElement.classList.toggle('high-contrast', storedHighContrast);
    document.documentElement.style.fontSize = `${storedFontSize}px`;
    document.documentElement.classList.toggle('reduce-motion', storedReduceMotion);
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const value = {
    highContrast,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    reduceMotion,
    toggleReduceMotion,
    announceMessage,
    focusableElements,
    registerFocusable,
    unregisterFocusable,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}; 