
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun, LogIn } from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full text-white hover:bg-white/20 transition-colors"
    >
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default function Header() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  const navClasses = theme === 'dark' 
    ? "bg-blue-900/80" 
    : "bg-blue-500/80";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-sm ${navClasses}`}>
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link href="/" className="text-3xl font-bold font-title text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.4)'}}>
          ATLAS
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
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
            <Button asChild className="bg-white text-blue-600 font-bold hover:bg-gray-200 rounded-full transition-colors">
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
