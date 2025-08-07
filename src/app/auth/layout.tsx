
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
       <div className="absolute top-4 left-4 z-10">
         <Button asChild variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 hover:text-white">
            <Link href="/">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back to Home</span>
            </Link>
        </Button>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
