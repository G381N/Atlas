
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Clock, Star, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validatePlace, saveScore } from '@/actions/game';
import Link from 'next/link';

const INITIAL_TIME = 30; // 30 seconds
const TIME_DECREMENT = 2; // Reduce time by 2s
const SCORE_MILESTONE = 5; // Every 5 correct answers

export default function GamePage() {
  const [gameState, setGameState] = useState({
    score: 0,
    currentLetter: '',
    timeLeft: INITIAL_TIME,
    timeLimit: INITIAL_TIME,
    usedPlaces: new Set<string>(),
    gameOver: false,
    isSubmitting: false,
  });
  const [username, setUsername] = useState("Explorer"); // In a real app, this would come from auth.

  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();

  const availableLetters = useMemo(() => "ABCDEFGHIKMNOPQRSTUVW".split(''), []);

  const generateNewLetter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    return availableLetters[randomIndex];
  }, [availableLetters]);

  useEffect(() => {
    setGameState(prev => ({ ...prev, currentLetter: generateNewLetter() }));
  }, [generateNewLetter]);
  
  const handleGameOver = useCallback(async (score: number) => {
    setGameState(prev => ({ ...prev, gameOver: true }));
    try {
      await saveScore(score, username);
    } catch (error) {
      console.error("Failed to save score", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save your score. Please try again later.",
      });
    }
  }, [username, toast]);

  useEffect(() => {
    if (gameState.gameOver) return;

    if (gameState.timeLeft <= 0) {
      handleGameOver(gameState.score);
      return;
    }

    const timer = setInterval(() => {
      setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.timeLeft, gameState.gameOver, gameState.score, handleGameOver]);

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const placeName = inputValue.trim();
    if (!placeName || gameState.isSubmitting) return;

    if (placeName.toUpperCase()[0] !== gameState.currentLetter) {
        toast({
            variant: "destructive",
            title: "Wrong Letter!",
            description: `The place must start with the letter "${gameState.currentLetter}".`,
        });
        return;
    }

    if (gameState.usedPlaces.has(placeName.toLowerCase())) {
        toast({
            variant: "destructive",
            title: "Already Used!",
            description: "You've already entered this place.",
        });
        return;
    }

    setGameState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
        const result = await validatePlace({ placeName });

        if (result.isValid) {
            toast({
                title: "Correct!",
                description: `${placeName} is a valid place.`,
                action: <CheckCircle className="text-green-500" />
            });
            
            const newScore = gameState.score + 1;
            const newTimeLimit = (newScore % SCORE_MILESTONE === 0 && gameState.timeLimit > 5)
                ? gameState.timeLimit - TIME_DECREMENT
                : gameState.timeLimit;

            setGameState(prev => ({
                ...prev,
                score: newScore,
                currentLetter: generateNewLetter(),
                usedPlaces: new Set(prev.usedPlaces).add(placeName.toLowerCase()),
                timeLeft: newTimeLimit,
                timeLimit: newTimeLimit,
            }));

            setInputValue('');
        } else {
            let description = "That doesn't seem to be a real place.";
            if (result.suggestedCorrection) {
                description += ` Did you mean ${result.suggestedCorrection}?`;
            }
            toast({
                variant: "destructive",
                title: "Incorrect!",
                description: description,
                action: <AlertCircle className="text-red-500" />
            });
        }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not validate the place. Please try again.",
        });
    } finally {
        setGameState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  if (gameState.gameOver) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-56px)] p-4">
        <Card className="w-full max-w-md text-center bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-4xl">Game Over!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Trophy className="mx-auto h-24 w-24 text-accent" />
            <p className="text-xl">Your final score is:</p>
            <p className="text-6xl font-bold text-primary">{gameState.score}</p>
            <div className="flex gap-4">
              <Button size="lg" className="w-full" onClick={() => window.location.reload()}>Play Again</Button>
              <Button asChild size="lg" variant="secondary" className="w-full"><Link href="/dashboard">Dashboard</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = (gameState.timeLeft / gameState.timeLimit) * 100;

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-56px)] p-4">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center text-muted-foreground">
            <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-accent" />
                <span className="text-2xl font-bold text-foreground">{gameState.score}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                <span className="text-2xl font-bold text-foreground">{gameState.timeLeft}s</span>
            </div>
          </div>
           <Progress value={progress} className="w-full mt-2 h-3" />
        </CardHeader>
        <CardContent className="text-center space-y-8 py-12">
            <p className="text-xl text-muted-foreground">Enter a place starting with the letter:</p>
            <div className="mx-auto w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-6xl font-bold text-primary">{gameState.currentLetter}</span>
            </div>
            <form onSubmit={handleSubmission} className="flex w-full max-w-md mx-auto items-center space-x-2">
                <Input 
                    type="text" 
                    placeholder="e.g., Paris, France..."
                    className="text-lg h-12"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={gameState.isSubmitting}
                />
                <Button type="submit" size="lg" className="h-12" disabled={gameState.isSubmitting}>
                    {gameState.isSubmitting ? 'Checking...' : 'Submit'}
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
