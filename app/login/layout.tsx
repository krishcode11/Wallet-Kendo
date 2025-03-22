import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | RadhaSphere Wallet',
  description: 'Securely access your RadhaSphere Web3 wallet',
  icons: {
    icon: '/logos/radhasphere-full.svg',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 