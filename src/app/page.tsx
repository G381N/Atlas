import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://storage.googleapis.com/project-game-assets/night.png"
          alt="Night World Map"
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />

        {/* Animations */}
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="plane">
           <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform -rotate-45"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-1-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
          </svg>
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
      <footer className="bg-[#121212] py-8 text-center text-gray-400">
        <div className="container mx-auto">
          <p className="font-body">Made for nostalgia. Purely out of childhood memories.</p>
          <a href="https://gebin.net" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-body text-red-500 hover:underline transition-colors">
            Click here to view my portfolio →
          </a>
        </div>
      </footer>
    </>
  );
}
