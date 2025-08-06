import type { Metadata } from 'next';
import { Lilita_One } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';

const lilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lilita-one',
});

export const metadata: Metadata = {
  title: 'GeoGuess Master',
  description: 'A geography-based web game.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lilitaOne.variable} font-headline antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          <main className="relative z-10">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
