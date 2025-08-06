
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#5CB9F2] p-4">
      <div className="absolute inset-0 z-0">
        <Image
          src="/day.png"
          alt="World Map Background"
          layout="fill"
          objectFit="cover"
          className="block dark:hidden"
        />
        <Image
          src="/night.png"
          alt="World Map Background"
          layout="fill"
          objectFit="cover"
          className="hidden dark:block"
        />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6 text-center text-white">
        <h1
          className="text-8xl md:text-9xl font-bold tracking-tight text-white uppercase"
          style={{
            WebkitTextStroke: '4px #1E3A8A',
            textStroke: '4px #1E3A8A',
            textShadow: '6px 6px 0px rgba(0, 0, 0, 0.2)',
          }}
        >
          <span style={{ color: '#F56538' }}>A</span>
          <span style={{ color: '#3B82F6' }}>T</span>
          <span style={{ color: '#FBBF24' }}>L</span>
          <span style={{ color: '#F56538' }}>A</span>
          <span style={{ color: '#22C55E' }}>S</span>
        </h1>

        <p
          className="mt-2 max-w-lg text-2xl text-white font-semibold px-4"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}
        >
          Name a place starting with the last
          <br />
          letter of the previous one
        </p>

        <div className="w-full max-w-sm space-y-4 pt-4">
          <Button
            asChild
            size="lg"
            className="w-full text-xl font-bold h-16 bg-[#F56538] hover:bg-[#E15A31] border-b-4 border-[#C84F2B]"
          >
            <Link href="/dashboard">PLAY</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
