"use client";

import { useState } from 'react';
import Image from 'next/image';
import GradientButton from './components/GradientButton';
import FuturisticNavbar from './components/FuturisticNavbar';
import StarryBackground from './components/StarryBackground';
import ParticleBackground from './components/ParticleBackground';
import PhoneMockup from './components/PhoneMockup';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/wallet');
    }, 1500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated starry background */}
      <StarryBackground />
      <ParticleBackground />
      
      {/* Navbar */}
      <FuturisticNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  <span className="block">Next-Gen</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    AI-Powered Wallet
                  </span>
                </h1>
                <p className="text-white/70 text-lg md:text-xl max-w-lg">
                  RadhaSphere combines cutting-edge blockchain technology with artificial intelligence to revolutionize your crypto experience.
                </p>
              </div>
              
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <GradientButton 
                  variant="nebula" 
                  size="lg"
                  glowEffect={true}
                  onClick={() => window.location.href = '/wallet'}
                >
                  Launch App
                </GradientButton>
                <GradientButton 
                  variant="cosmic"
                  size="lg"
                  href="/features"
                >
                  Explore Features
                </GradientButton>
      </div>

              <div className="flex items-center space-x-6">
                {/* Trust indicators */}
                <div className="flex items-center">
                  <div className="text-white/80 flex items-center">
                    <div className="mr-2">
                      <Image 
                        src="/icons/ethereum.svg" 
                        alt="Ethereum" 
                        width={20} 
                        height={20} 
                      />
                    </div>
                    <span className="text-sm">Ethereum</span>
                  </div>
                </div>
          <div className="flex items-center">
                  <div className="text-white/80 flex items-center">
                    <div className="mr-2">
                      <Image 
                        src="/icons/polygon.svg" 
                        alt="Polygon" 
                        width={20} 
                        height={20} 
                      />
                    </div>
                    <span className="text-sm">Polygon</span>
                  </div>
            </div>
                <div className="flex items-center">
                  <div className="text-white/80 flex items-center">
                    <div className="mr-2">
                      <Image 
                        src="/icons/solana.svg" 
                        alt="Solana" 
                        width={20} 
                        height={20} 
                      />
          </div>
                    <span className="text-sm">Solana</span>
          </div>
        </div>
              </div>
            </div>
            
            {/* Login Form */}
            <div className="glass p-6 sm:p-8 rounded-2xl backdrop-blur-lg relative overflow-hidden data-stream">
              <h2 className="text-2xl font-bold text-white mb-6">
                Quick Access
              </h2>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-sm text-white/70 block mb-2">Email Address</label>
                  <input
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="text-sm text-white/70 block mb-2">Password</label>
                  <input
                    type="password" 
                    id="password"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500/50"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-white/70">
                      Remember me
                    </label>
                      </div>
                  <a href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                    Forgot Password?
                  </a>
                </div>
                
                <GradientButton
                  variant="plasma"
                  fullWidth={true}
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => router.push('/login')}
                >
                  {isSubmitting ? 'Connecting...' : 'Connect Wallet'}
                </GradientButton>
              </form>

              {/* Signup Link */}
              <div className="mt-5 text-center text-white/50 text-sm">
                Don&apos;t have an account?{' '}
                <a href="/signup" className="text-purple-400 hover:text-purple-300">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Cards */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Revolutionary Features
          </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Experience the next generation of cryptocurrency management with cutting-edge
              AI-powered features that make your financial life easier.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="feature-card p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 hover:shadow-glow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-600/30 flex items-center justify-center mb-5">
                <Image 
                  src="/icons/ethereum.svg" 
                  alt="AI Analysis" 
                  width={28} 
                  height={28} 
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Portfolio Analysis</h3>
              <p className="text-white/70">
                Get personalized insights and recommendations for your crypto investments powered by advanced machine learning.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="feature-card p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 hover:shadow-glow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-600/30 flex items-center justify-center mb-5">
                <Image 
                  src="/icons/base.svg" 
                  alt="Smart Trading" 
                  width={28} 
                  height={28} 
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Predictive Market Insights</h3>
              <p className="text-white/70">
                Stay ahead of market trends with AI-powered predictions and real-time alerts customized to your portfolio.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="feature-card p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 hover:shadow-glow">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500/30 to-red-600/30 flex items-center justify-center mb-5">
                <Image 
                  src="/icons/solana.svg" 
                  alt="Secure Storage" 
                  width={28} 
                  height={28} 
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Multi-Chain Support</h3>
              <p className="text-white/70">
                Manage assets across multiple blockchains with a unified interface and seamless cross-chain transfers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile App Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Phone Mockup */}
            <div className="order-2 md:order-1">
              <PhoneMockup className="mx-auto" />
            </div>
            
            {/* Features List */}
            <div className="order-1 md:order-2 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  AI-Powered Mobile Experience
            </h2>
                <p className="text-white/70 mb-8">
                  Take the power of RadhaSphere with you. Our mobile app offers the same advanced features with an optimized interface for on-the-go access.
            </p>
          </div>
          
              <div className="space-y-6">
                {/* Feature Item 1 */}
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-600/20 flex items-center justify-center mr-4">
                    <span className="text-2xl text-purple-400">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Biometric Security</h3>
                    <p className="text-white/70">
                      Advanced facial recognition and fingerprint scanning for ultimate security.
                    </p>
                  </div>
                </div>
                
                {/* Feature Item 2 */}
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20 flex items-center justify-center mr-4">
                    <span className="text-2xl text-blue-400">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Real-time Notifications</h3>
                    <p className="text-white/70">
                      Get instant alerts for price movements, transactions, and security events.
                    </p>
                  </div>
                    </div>
                    
                {/* Feature Item 3 */}
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-red-600/20 flex items-center justify-center mr-4">
                    <span className="text-2xl text-pink-400">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Offline Access</h3>
                    <p className="text-sm text-white/70">
                      You&apos;re offline. View your portfolio and analytics even when you&apos;re offline.
                    </p>
                  </div>
                </div>
              </div>
              
              <GradientButton 
                variant="cosmic"
                size="lg"
                href="#download"
                className="mt-4"
              >
                Download App
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners/Integrations Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted Partners & Integrations
          </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We&apos;ve partnered with industry leaders to provide a seamless and secure experience.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'Ethereum', icon: '/icons/ethereum.svg' },
              { name: 'Polygon', icon: '/icons/polygon.svg' },
              { name: 'Solana', icon: '/icons/solana.svg' },
              { name: 'Optimism', icon: '/icons/optimism.svg' },
              { name: 'Arbitrum', icon: '/icons/arbitrum.svg' },
              { name: 'Base', icon: '/icons/base.svg' },
            ].map((partner, index) => (
              <div 
                key={index}
                className="partner-logo flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <Image
                  src={partner.icon}
                  alt={partner.name}
                  width={40}
                  height={40}
                  className="mb-3"
                />
                <span className="text-sm text-white/80">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Experience the Future of Crypto?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already transformed their crypto experience
              with RadhaSphere&apos;s AI-powered wallet.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <GradientButton 
                variant="nebula" 
                size="lg"
                glowEffect={true}
                className="min-w-[180px]"
                onClick={() => window.location.href = '/wallet'}
              >
                Get Started Free
              </GradientButton>
              <GradientButton 
                variant="void"
                size="lg"
                href="/contact"
                className="min-w-[180px]"
              >
                Contact Sales
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-white/10 relative">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logos/radhasphere-icon.svg"
                  alt="RadhaSphere Logo"
                  width={32}
                  height={32}
                />
                <span className="font-bold text-xl text-white">RadhaSphere</span>
              </div>
              <p className="text-white/60 text-sm">
                The next generation AI-powered crypto wallet for the modern investor.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Roadmap</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.instagram.com/omniradhanexus/" className="text-white/60 hover:text-white transition-colors">About</a></li>
                <li><a href="https://www.linkedin.com/in/omni-nexus-66040a337/" className="text-white/60 hover:text-white transition-colors">Careers</a></li>
                <li><a href="https://dev.to/omniradhanexus" className="text-white/60 hover:text-white transition-colors">Blog</a></li>
                <li><a href="https://x.com/OmniRadhanexus" className="text-white/60 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="text-white/60 hover:text-white transition-colors">Terms</a></li>
                <li><a href="/cookies" className="text-white/60 hover:text-white transition-colors">Cookies</a></li>
                <li><a href="/license" className="text-white/60 hover:text-white transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              © 2025 RadhaSphere. All rights reserved.
            </div>
            
            <div className="flex space-x-4">
              <a href="https://x.com/OmniRadhanexus" className="text-white/60 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a href="https://github.com/krishcode11" className="text-white/60 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a href="https://discord.gg/xmqBUnBa" className="text-white/60 hover:text-white transition-colors">
                <span className="sr-only">Discord</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3846-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/omni-nexus-66040a337/" className="text-white/60 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              
              {/* Dev.to */}
              <a href="https://dev.to/omniradhanexus" className="text-white/60 hover:text-white transition-colors">
                <span className="sr-only">Dev.to</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
                </svg>
              </a>
              
              {/* Instagram */}
              <a href="https://www.instagram.com/omniradhanexus/" className="text-white/60 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
