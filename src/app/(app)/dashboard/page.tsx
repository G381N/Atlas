
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Users,
  User,
  HelpCircle,
  Trophy,
  Settings,
  LogOut,
  Trash2,
  Music,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const menuItems = [
  {
    title: "Play Offline Solo Mode",
    icon: User,
    href: "/play",
    className: "btn-secondary",
  },
  {
    title: "Play Online with Friends",
    icon: Users,
    href: "#",
    className: "btn-primary",
    disabled: true,
  },
  {
    title: "How to Play",
    icon: HelpCircle,
    href: "/how-to-play",
    className: "btn-accent",
  },
  {
    title: "Global Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
    className: "btn-warning",
  },
];

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isMusicOn, setIsMusicOn] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleDeleteAccount = () => {
    // This is a placeholder. In a real app, you would have a confirmation modal
    // and a server action to delete the user account.
    alert("This feature is not yet implemented.");
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 hero-background">
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Header Icons */}
      <div className="absolute top-4 left-4 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-black/20 text-white hover:bg-black/40">
              <Settings className="h-8 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card/90 backdrop-blur-sm">
            <DropdownMenuItem className="flex items-center justify-between">
              <Label htmlFor="music-toggle" className="flex items-center gap-2 cursor-pointer">
                <Music className="h-4 w-4" />
                <span>Toggle Music</span>
              </Label>
              <Switch id="music-toggle" checked={isMusicOn} onCheckedChange={setIsMusicOn} />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
               <Label htmlFor="theme-toggle" className="flex items-center gap-2 cursor-pointer">
                {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>{theme === 'light' ? 'Day Mode' : 'Night Mode'}</span>
              </Label>
              <Switch id="theme-toggle" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="absolute top-4 right-4 z-20">
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-black/20 text-white hover:bg-black/40">
              <User className="h-8 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card/90 backdrop-blur-sm">
             <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
             <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDeleteAccount} className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Account</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-atlas text-7xl md:text-9xl mb-2">
          <span className="text-atlas-red">A</span>
          <span className="text-atlas-blue">T</span>
          <span className="text-atlas-yellow">L</span>
          <span className="text-atlas-red">A</span>
          <span className="text-atlas-green">S</span>
        </h1>
        <p className="font-quote text-white text-2xl md:text-3xl max-w-md mb-8" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
          Name a place for a country, starting with the letter A
        </p>

        <div className="w-full max-w-sm space-y-4">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              asChild
              className={`w-full h-16 text-xl font-bold justify-center rounded-full ${item.className}`}
              disabled={item.disabled}
            >
              <Link href={item.href}>
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
