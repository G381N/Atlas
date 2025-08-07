
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, Github, Instagram, Globe } from 'lucide-react';
import FlightPaths from '@/components/flight-paths';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <>
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden hero-background">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Animations */}
        <div className="flight-paths-container">
          <FlightPaths />
        </div>


        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center space-y-4 text-center text-white p-4">
          <h1 className="text-6xl md:text-8xl font-bold font-title">
            Welcome to Atlas
          </h1>
          <p className="mt-2 max-w-2xl text-lg md:text-xl font-body text-gray-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            A throwback geography game from school bus rides and recess breaks.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold text-xl h-16 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 sparkle-button"
          >
            <Link href="/auth">🎮 Start Game</Link>
          </Button>
        </div>
        
        <div className="absolute bottom-8 z-10">
           <ArrowDown className="h-8 w-8 text-white animate-bounce" />
        </div>
      </div>

      {/* Story Section */}
      <section className="bg-[#1b1f3b] py-20 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-slate-800/50 rounded-lg p-8 shadow-2xl">
            <blockquote className="text-center font-quote text-2xl md:text-3xl leading-relaxed text-gray-300">
              “Back in school, during recess and bus rides, there was one game I never got tired of — guessing places, testing our geography, and laughing with friends. It helped me fall in love with maps, cultures, and countries. This app is my tribute to that timeless joy.”
            </blockquote>
            <p className="mt-6 text-right font-quote text-xl text-gray-400">
              — Gebin George
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 py-12 text-gray-300 backdrop-blur-sm font-body">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="font-futuristic text-xl font-bold text-white mb-4">ATLAS</h3>
            <p className="text-sm">A geography game for the modern web, inspired by nostalgia and built with passion.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-futuristic text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-to-play" className="hover:text-primary transition-colors">How to Play</Link></li>
              <li><Link href="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link></li>
              <li><Link href="/auth" className="hover:text-primary transition-colors">Login / Sign Up</Link></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
             <h3 className="font-futuristic text-lg font-bold text-white mb-4">Connect</h3>
             <div className="flex justify-center md:justify-start space-x-4">
                <a href="https://github.com/gebin-george" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Github className="h-6 w-6" /></a>
                <a href="https://instagram.com/gebin.george" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></a>
                <a href="https://gebin.net" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Globe className="h-6 w-6" /></a>
             </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Gebin George. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
