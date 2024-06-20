import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PropsWithChildren } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <html lang='ja' className='dark'>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
