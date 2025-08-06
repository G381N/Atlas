import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-blue-400 p-4">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://storage.googleapis.com/project-game-assets/atlas_background.png"
          alt="World Map Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center text-white">
        <h1
          className="text-8xl md:text-9xl font-bold tracking-tight text-white uppercase"
          style={{ WebkitTextStroke: '4px #3B82F6' }}
        >
          <span className="text-orange-500">A</span>
          <span className="text-blue-500">T</span>
          <span className="text-yellow-400">L</span>
          <span className="text-orange-500">A</span>
          <span className="text-green-500">S</span>
        </h1>

        <p className="mt-2 max-w-lg text-xl text-foreground font-semibold">
          Name a place starting with the last letter of the previous one
        </p>

        <div className="w-full max-w-sm space-y-4 pt-4">
          <Button
            asChild
            size="lg"
            className="w-full text-lg font-bold !bg-primary hover:!bg-primary/90 !border-primary-darker h-16"
          >
            <Link href="/dashboard">PLAY ONLINE WITH FRIENDS</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="w-full text-lg font-bold !bg-secondary hover:!bg-secondary/90 !border-secondary-darker h-16"
          >
            <Link href="/play">PLAY OFFLINE SOLO MODE</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="w-full text-lg font-bold !bg-accent hover:!bg-accent/90 !border-accent-darker h-16"
          >
            <Link href="/how-to-play">HOW TO PLAY</Link>
          </Button>
        </div>

        <div className="absolute bottom-0 right-0 p-8">
          <Image
            src="https://storage.googleapis.com/project-game-assets/explorer_girl.png"
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