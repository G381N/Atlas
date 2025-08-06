
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import { AuthProvider } from '@/context/auth-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${poppins.variable} font-headline antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <Header />
            <main className="relative z-10">{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
