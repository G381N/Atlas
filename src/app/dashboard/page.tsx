import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, HelpCircle, Trophy, Settings, Play } from "lucide-react";

const menuItems = [
  {
    title: "Play Offline Solo Mode",
    icon: User,
    href: "/play",
    description: "Challenge yourself and beat your own high score.",
    buttonText: "Play Solo"
  },
  {
    title: "Play Online with Friends",
    icon: Users,
    href: "#",
    description: "Create a room and challenge your friends.",
    buttonText: "Play Online",
    disabled: true
  },
  {
    title: "How to Play",
    icon: HelpCircle,
    href: "/how-to-play",
    description: "Learn the rules and tips to become a master.",
    buttonText: "Learn"
  },
  {
    title: "Global Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
    description: "See how you rank against players worldwide.",
    buttonText: "View Ranks"
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Welcome, Explorer!</h1>
        <p className="text-muted-foreground text-lg mt-2">Ready for a new adventure?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <Card key={item.title} className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <div className="p-3 bg-primary/20 rounded-lg">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <Button asChild className="w-full" disabled={item.disabled}>
                <Link href={item.href}>
                  <Play className="mr-2 h-4 w-4" />
                  {item.buttonText}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
