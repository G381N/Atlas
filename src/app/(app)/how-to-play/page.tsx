
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Globe, Trophy } from "lucide-react";

export default function HowToPlayPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <Globe className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-4xl">How to Play</CardTitle>
          <CardDescription>Your guide to becoming a GeoGuess Master!</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none dark:prose-invert">
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="p-2 bg-primary/20 rounded-full mt-1"><Check className="h-6 w-6 text-primary" /></div>
              <div>
                <strong>Start the Game:</strong> Choose a category to begin your solo challenge. A random letter will be shown to you.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-primary/20 rounded-full mt-1"><Globe className="h-6 w-6 text-primary" /></div>
              <div>
                <strong>Enter a Place:</strong> Type in a real place name (country, city, etc.) that starts with the given letter.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-primary/20 rounded-full mt-1"><Clock className="h-6 w-6 text-primary" /></div>
              <div>
                <strong>Beat the Clock:</strong> You have a time limit for each answer. Be quick! The timer gets shorter as you get better, making the game more challenging.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-primary/20 rounded-full mt-1"><Trophy className="h-6 w-6 text-primary" /></div>
              <div>
                <strong>Climb the Ranks:</strong> Each correct answer increases your score. Aim for a high score to get on the global leaderboard!
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
