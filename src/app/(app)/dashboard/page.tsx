
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, User, HelpCircle, Trophy } from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const menuItems = [
  {
    title: "Play Offline Solo Mode",
    icon: User,
    href: "/play",
    className: "!bg-secondary hover:!bg-secondary/90 !border-secondary-darker",
  },
  {
    title: "Play Online with Friends",
    icon: Users,
    href: "#",
    className: "!bg-primary hover:!bg-primary/90 !border-primary-darker",
    disabled: true,
  },
  {
    title: "How to Play",
    icon: HelpCircle,
    href: "/how-to-play",
    className: "!bg-accent hover:!bg-accent/90 !border-accent-darker",
  },
  {
    title: "Global Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
    className: "!bg-yellow-500 hover:!bg-yellow-500/90 !border-yellow-700",
  },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="container flex items-center justify-center h-screen"><p>Loading...</p></div>;
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Welcome, Explorer!</h1>
        <p className="text-muted-foreground text-lg mt-2">Ready for a new adventure?</p>
      </div>
      <div className="w-full max-w-md space-y-4">
        {menuItems.map((item) => (
            <Button
              key={item.title}
              asChild
              size="lg"
              className={`w-full text-lg font-bold h-16 justify-start ${item.className}`}
              disabled={item.disabled}
            >
              <Link href={item.href}>
                <item.icon className="mr-4 h-6 w-6" />
                {item.title}
              </Link>
            </Button>
        ))}
      </div>
    </div>
  );
}
