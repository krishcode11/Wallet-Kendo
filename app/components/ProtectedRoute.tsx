"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth check for public routes
    const publicRoutes = ['/', '/login', '/signup', '/reset-password'];
    if (publicRoutes.includes(pathname)) {
      setIsAuthorized(true);
      return;
    }

    // Check if user is authenticated
    if (!loading && !currentUser) {
      router.push('/login');
    } else if (!loading && currentUser) {
      setIsAuthorized(true);
    }
  }, [currentUser, loading, pathname, router]);

  // Show loading screen while checking auth
  if (loading || !isAuthorized) {
    return <LoadingScreen />;
  }

  // If authorized, render children
  return <>{children}</>;
} 