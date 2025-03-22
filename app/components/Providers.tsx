'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';
import ProtectedRoute from './ProtectedRoute';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AccessibilityProvider>
          <ProtectedRoute>
              {children}
            </ProtectedRoute>
          </AccessibilityProvider>
        </ThemeProvider>
    </AuthProvider>
  );
}