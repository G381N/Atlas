
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import { Map, Flag, Landmark, Globe } from "lucide-react";

const categories = [
    { id: "countries", label: "Countries only", icon: Flag },
    { id: "capitals", label: "Capitals only", icon: Landmark },
    { id: "countries-capitals-states", label: "Countries, Capitals & States", icon: Map },
    { id: "any", label: "Any real place", icon: Globe },
];

export default function PlayPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-56px)] p-4">
      <Card className="w-full max-w-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Choose Your Challenge</CardTitle>
          <CardDescription className="text-center">Select a category to start your solo adventure.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <RadioGroup defaultValue="countries" className="grid gap-4 my-6">
              {categories.map((category) => (
                <Label key={category.id} htmlFor={category.id} className="flex items-center gap-4 p-4 rounded-lg border bg-background cursor-pointer hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={category.id} id={category.id} />
                  <category.icon className="h-6 w-6 text-primary" />
                  <span className="font-semibold">{category.label}</span>
                </Label>
              ))}
            </RadioGroup>
            <Button asChild size="lg" className="w-full text-lg">
              <Link href="/game">Start Game</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
