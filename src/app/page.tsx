import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-blue-400 p-4">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="World Map Background"
          layout="fill"
          objectFit="cover"
          data-ai-hint="world map cartoon"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center text-white">

        <h1 className="text-8xl md:text-9xl font-bold tracking-tight text-white uppercase" style={{ WebkitTextStroke: '4px #333' }}>
          <span className="text-orange-500">A</span>
          <span className="text-blue-800">T</span>
          <span className="text-yellow-400">L</span>
          <span className="text-orange-500">A</span>
          <span className="text-green-600">S</span>
        </h1>

        <p className="mt-2 max-w-lg text-xl text-foreground font-semibold">
          Name a place starting with the last letter of the previous one
        </p>
        
        <div className="w-full max-w-sm space-y-4 pt-4">
          <Button asChild size="lg" className="w-full text-lg font-bold !bg-orange-500 hover:!bg-orange-600 !text-white !border-4 !border-orange-700 h-16">
            <Link href="/dashboard">Play Online with Friends</Link>
          </Button>
          <Button asChild size="lg" className="w-full text-lg font-bold !bg-green-600 hover:!bg-green-700 !text-white !border-4 !border-green-800 h-16">
            <Link href="/play">Play Offline Solo Mode</Link>
          </Button>
          <Button asChild size="lg" className="w-full text-lg font-bold !bg-blue-800 hover:!bg-blue-900 !text-white !border-4 !border-blue-950 h-16">
            <Link href="/how-to-play">How To Play</Link>
          </Button>
        </div>

        <div className="absolute bottom-0 right-0 p-8">
            <Image
                src="https://placehold.co/200x250.png"
                alt="Explorer Character"
                width={200}
                height={250}
                data-ai-hint="explorer girl cartoon"
            />
        </div>
      </div>
    </div>
  );
}
