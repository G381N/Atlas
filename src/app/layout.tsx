
import type { Metadata } from 'next';
import { Baloo_2, Poppins, Caveat, Orbitron } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
});

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-baloo',
});

const caveat = Caveat({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-caveat',
});

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-orbitron',
});


export const metadata: Metadata = {
  title: 'Atlas - A Geography Game',
  description: 'A geography-based web game inspired by childhood classics.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${baloo.variable} ${caveat.variable} ${orbitron.variable} font-body antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
