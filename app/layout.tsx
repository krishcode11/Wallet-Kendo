import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/accessibility.css";
import "@progress/kendo-theme-material/dist/all.css";
import { Providers } from './components/Providers';
import { AuthProvider } from './contexts/AuthContext';
import { Web3Provider } from './contexts/Web3Context';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RadhaSphere Wallet",
  description: "Your secure gateway to Web3",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${geistSans.className}`}>
        <AuthProvider>
          <Web3Provider>
            <Providers>
              {children}
            </Providers>
          </Web3Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
