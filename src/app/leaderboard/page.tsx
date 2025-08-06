import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { getLeaderboardScores, Score } from "@/actions/leaderboard";

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardScores();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <Trophy className="mx-auto h-12 w-12 text-accent" />
          <CardTitle className="text-4xl">Global Leaderboard</CardTitle>
          <CardDescription>See who is the ultimate GeoGuess Master!</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.length > 0 ? (
                leaderboardData.map((player: Score) => (
                  <TableRow key={player.rank} className="font-medium">
                    <TableCell className="text-center text-lg">
                      {player.rank && player.rank <= 3 ? (
                        <span className={
                          player.rank === 1 ? "text-yellow-500" :
                          player.rank === 2 ? "text-gray-400" :
                          "text-amber-700"
                        }><Trophy className="inline-block h-6 w-6" /></span>
                      ) : player.rank}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{player.name}</span>
                        <span className="text-xl">{player.country}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-lg text-primary font-bold">{player.score}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No scores yet. Be the first to play!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
