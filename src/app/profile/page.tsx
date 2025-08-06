import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <User className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle className="text-2xl">Profile</CardTitle>
                            <CardDescription>Manage your account settings and view your stats.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://placehold.co/80x80" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Change Avatar</Button>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Explorer" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="explorer@example.com" disabled />
                        </div>
                    </div>
                    <div className="text-right">
                        <Button>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
