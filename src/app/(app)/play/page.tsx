
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlayPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-56px)] p-4">
      <Card className="w-full max-w-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Ready to Play?</CardTitle>
          <CardDescription className="text-center">The game will start with a random letter.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg" className="w-full text-lg mt-6">
            <Link href="/game">Start Game</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
