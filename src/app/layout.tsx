import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ThreeScene from '@/components/three-scene';
import Header from '@/components/header';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
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
      <body className={`${poppins.variable} font-headline antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThreeScene />
          <Header />
          <main className="relative z-10">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
