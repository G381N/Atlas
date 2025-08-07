
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-provider";
import { User as UserIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If not loading and no user, redirect to auth page
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [user, loading, router]);


    if (loading) {
        return <div className="container flex items-center justify-center h-screen"><p>Loading...</p></div>;
    }

    if (!user) {
        // This will be shown briefly before the redirect happens.
        return null;
    }

    const handleLogout = async () => {
        await logout();
        router.push('/auth');
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <UserIcon className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="text-2xl">Profile</CardTitle>
                            <CardDescription>Manage your account settings and view your stats.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.photoURL || "https://placehold.co/80x80"} />
                            <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Change Avatar</Button>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={user.displayName || "Explorer"} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email || ""} disabled />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Button onClick={handleLogout} variant="destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                        <Button>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
