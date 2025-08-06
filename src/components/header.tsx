
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const headerClasses =
    theme === 'dark'
      ? "bg-blue-900/80"
      : "bg-blue-500/80";

  // Render a placeholder or a default state on the server to prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-transparent backdrop-blur-sm">
        <div className="container mx-auto flex h-full items-center justify-between">
          <Link href="/" className="text-3xl font-bold font-title text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.4)'}}>
            ATLAS
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10" /> 
            <div className="h-10 w-10 rounded-full bg-gray-500/50" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-sm ${headerClasses}`}>
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link href="/" className="text-3xl font-bold font-title text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.4)'}}>
          ATLAS
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-cyan-400 transition-all">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL || "https://placehold.co/40x40"} />
                    <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="text-white font-bold rounded-full transition-colors neon-glow-button">
              <Link href="/auth">
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
