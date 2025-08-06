import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative z-10 flex flex-col items-center space-y-8 text-center text-white">
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10">
          <div className="mb-4 flex justify-center">
             <div className="p-4 bg-primary rounded-full">
                <Globe className="h-16 w-16 text-primary-foreground" />
             </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            GeoGuess Master
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Explore the world, challenge your friends, and prove you're a geography whiz.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="text-lg font-semibold">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
