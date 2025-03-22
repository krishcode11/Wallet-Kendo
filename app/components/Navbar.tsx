"use client";

import { usePathname, useRouter } from "next/navigation";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path: string) => router.push(path);
  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AppBar
      className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-md
      ${scrolled
        ? 'bg-black/30 shadow-2xl border-b border-purple-500/30'
        : 'bg-gradient-to-r from-purple-900/40 via-black/20 to-blue-900/40'
      }`}
    >
      {/* Left - Logo & Brand */}
      <AppBarSection>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => router.push("/")}
        >
          {/* Cosmic Logo Image */}
          <div className="w-12 h-12 p-1 bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-700 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.7)] animate-float">
            <Image
              src="/logos/radhasphere-icon.svg"
              alt="RadhaSphere"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>

          {/* Brand Text with Cosmic Glow */}
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-fuchsia-500
            bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(139,92,246,0.7)]">
            RadhaSphere Wallet
          </h1>
        </div>
      </AppBarSection>

      <AppBarSpacer />

      {/* Center - Navigation */}
      <AppBarSection>
        <ButtonGroup>
          {[
            { label: "Home", path: "/" },
            { label: "Send/Receive", path: "/send-receive" },
            { label: "NFTs", path: "/nfts" },
            { label: "AI Insights", path: "/aiinsights" },
            { label: "Settings", path: "/settings" },
          ].map(({ label, path }) => (
            <Button
              key={path}
              onClick={() => handleNavigation(path)}
              className={`transition-all duration-300 rounded-xl mx-1 px-5 py-2
                ${isActive(path)
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-700 shadow-purple-500/50 shadow-lg text-purple-200'
                  : 'text-white'}
                hover:scale-105 hover:bg-purple-500/20 hover:shadow-purple-400/30 hover:shadow-md`}
            >
              {label === "AI Insights" ? (
                <span className="flex items-center">
                  <span className="mr-1">{label}</span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                </span>
              ) : (
                label
              )}
            </Button>
          ))}
        </ButtonGroup>
      </AppBarSection>

      {/* Right - User Menu & Logout */}
      <AppBarSection>
        {currentUser ? (
          <div className="flex items-center space-x-4">
            
            
            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 
                border border-red-500/30 hover:border-red-500/50 transition-all duration-300
                flex items-center space-x-2"
            >
             
              <span>Logout</span>
            </Button>
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
              {currentUser.email?.[0].toUpperCase() || 'U'}
            </div>
          </div>
        ) : (
          <Button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 
              border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
          >
            Login
          </Button>
        )}
      </AppBarSection>
    </AppBar>
  );
}
