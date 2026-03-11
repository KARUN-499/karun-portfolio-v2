import type { Metadata } from 'next';
import { Cormorant_Garamond, Syne, DM_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Karun | Freelancer & Project Manager',
  description: 'Multi-sector freelancer and project manager delivering high-impact outcomes across web, brand, operations, and digital strategy.',
  keywords: ['freelancer', 'project manager', 'web design', 'portfolio'],
  openGraph: {
    title: 'Karun | Freelancer & Project Manager',
    description: 'Where Ideas Become Results',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
