
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon, LogIn } from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function Header() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.push('/auth');
  };

  if (pathname === "/auth") {
    return null;
  }

  const isLandingPage = pathname === "/";
  
  const baseHeaderClasses = "fixed top-0 z-50 w-full transition-all duration-300";
  const landingPageClasses = "bg-black/20 backdrop-blur-sm border-b border-white/10";
  const otherPageClasses = "bg-background/95 backdrop-blur-sm border-b";

  const headerClasses = `${baseHeaderClasses} ${isLandingPage ? landingPageClasses : otherPageClasses}`;
  const atlasTextClasses = isLandingPage ? 'text-white' : 'text-foreground';
  
  const loginButtonClasses = `border-cyan-400 bg-transparent neon-glow-button rounded-full ${
    theme === 'light' && !isLandingPage 
      ? 'text-foreground hover:text-foreground border-foreground' 
      : 'text-cyan-400 hover:text-white'
  }`;


  return (
    <header className={headerClasses}>
      <div className="container flex h-14 items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
          <span className={`text-2xl font-bold font-futuristic tracking-wider ${atlasTextClasses}`}>ATLAS</span>
        </Link>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
          {loading ? (
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-primary neon-glow-icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || "https://placehold.co/40x40"} alt={user.displayName || 'User'} data-ai-hint="user avatar" />
                    <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard" passHref>
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/profile" passHref>
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                   <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button asChild variant="outline" className={loginButtonClasses}>
                <Link href="/auth">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
