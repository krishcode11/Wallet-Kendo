"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ParticleBackground from '../components/ParticleBackground';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import StarryBackground from '../components/StarryBackground';
import GradientButton from '../components/GradientButton';


export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup, signInWithGoogle, currentUser } = useAuth();

  // Redirect to wallet if already logged in
  React.useEffect(() => {
    if (currentUser) {
      router.push('/wallet');
    }
  }, [currentUser, router]);

  // First step: Basic details and password
  const handleContinue = () => {
    // Validate inputs
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Continue to next step
    setError('');
    setStep(2);
  };

  // Second step: Complete registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName) {
      setError('Please enter your name');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      // On success, move to onboarding step
      setStep(3);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  // Final step: Go to dashboard
  const goToWallet = () => {
    router.push('/wallet');
  };

  const handleGoogleSignup = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      router.push("/wallet");
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1525] relative">
      <StarryBackground />
      <ParticleBackground />
      
      
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <GradientButton
          onClick={() => router.push('/')}
          className="!px-4 !py-2 text-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </GradientButton>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0d1f35]/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-500/20">
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src="/favicon.svg"
                alt="RadhaSphere Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-purple-300 text-lg">Join RadhaSphere Wallet</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-purple-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a2942] border border-purple-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-purple-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a2942] border border-purple-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-purple-300 mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#1a2942] border border-purple-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                placeholder="Confirm your password"
                required
              />
            </div>

            <GradientButton
              type="submit"
              disabled={loading}
              className="w-full !py-4 text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </GradientButton>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-purple-300 bg-[#0d1f35]">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 bg-white/90 hover:bg-white 
                     text-[#2D3250] font-semibold py-4 px-6 rounded-xl transition-all duration-200 
                     transform hover:scale-[1.02] shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-[#2D3250] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <div className="mt-8 text-center">
            <p className="text-purple-300/80">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/login')}
                className="text-[#F6B17A] hover:text-[#F6B17A]/80"
              >
                Log in
              </button>
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-purple-300/80">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-[#F6B17A] hover:text-[#F6B17A]/80">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-[#F6B17A] hover:text-[#F6B17A]/80">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 