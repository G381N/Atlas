
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle, Clock, Star, Trophy, MapPin, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validatePlace, saveScore } from '@/actions/game';
import Link from 'next/link';

const INITIAL_TIME = 60; // Increased time for more thoughtful answers
const TIME_DECREMENT = 2; 
const SCORE_MILESTONE = 5; 

export default function GamePage() {
  const [gameState, setGameState] = useState({
    score: 0,
    currentLetter: '',
    timeLeft: INITIAL_TIME,
    timeLimit: INITIAL_TIME,
    usedPlaces: [] as string[], // Changed to array to maintain order
    gameOver: false,
    isSubmitting: false,
  });
  const [username, setUsername] = useState("Explorer"); // In a real app, this would come from auth.

  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();

  const availableLetters = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''), []);

  const generateNewLetter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    return availableLetters[randomIndex];
  }, [availableLetters]);

  useEffect(() => {
    setGameState(prev => ({ ...prev, currentLetter: generateNewLetter() }));
  }, [generateNewLetter]);
  
  const handleGameOver = useCallback(async (score: number) => {
    setGameState(prev => ({ ...prev, gameOver: true, isSubmitting: false }));
    try {
      if (score > 0) {
        await saveScore(score, username);
      }
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
    if (!placeName || gameState.isSubmitting || gameState.gameOver) return;

    if (placeName.toUpperCase()[0] !== gameState.currentLetter) {
        toast({
            variant: "destructive",
            title: "Wrong Letter!",
            description: `The place must start with the letter "${gameState.currentLetter}".`,
        });
        return;
    }

    const placeNameLower = placeName.toLowerCase();
    if (gameState.usedPlaces.includes(placeNameLower)) {
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
            const newTimeLimit = (newScore % SCORE_MILESTONE === 0 && gameState.timeLimit > 10)
                ? gameState.timeLimit - TIME_DECREMENT
                : gameState.timeLimit;
            
            const lastChar = placeName.slice(-1).toUpperCase();
            // A simple check to ensure the last character is a letter.
            const nextLetter = (lastChar >= 'A' && lastChar <= 'Z') ? lastChar : generateNewLetter();

            setGameState(prev => ({
                ...prev,
                score: newScore,
                currentLetter: nextLetter,
                usedPlaces: [...prev.usedPlaces, placeNameLower],
                timeLeft: newTimeLimit,
                timeLimit: newTimeLimit,
            }));

            setInputValue('');
        } else {
            handleGameOver(gameState.score); // End game on incorrect answer
            let description = `"${placeName}" doesn't seem to be a real place.`;
            if (result.suggestedCorrection) {
                description = `Did you mean ${result.suggestedCorrection}? Your streak ends here.`;
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
        setGameState(prev => ({...prev, isSubmitting: false}));
    } finally {
       // isSubmitting is handled in the logic branches
       if (!gameState.gameOver) {
         setGameState(prev => ({ ...prev, isSubmitting: false }));
       }
    }
  };

  // Calculate urgency level for visual effects
  const timePercentage = (gameState.timeLeft / gameState.timeLimit) * 100;
  const isUrgent = gameState.timeLeft <= 10;
  const isCritical = gameState.timeLeft <= 5;

  if (gameState.gameOver) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 hero-background">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <Card className="relative z-10 w-full max-w-md text-center bg-card/90 backdrop-blur-sm border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Game Over!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Trophy className="mx-auto h-24 w-24 text-accent animate-bounce" />
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
            </div>
            <p className="text-xl text-muted-foreground">Your final score:</p>
            <p className="text-6xl font-bold text-primary animate-pulse">{gameState.score}</p>
            {gameState.usedPlaces.length > 0 && (
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-2">Places you conquered:</p>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                  {gameState.usedPlaces.slice(-10).map((place, index) => (
                    <Badge key={index} variant="secondary" className="text-xs capitalize">
                      {place}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-4">
              <Button size="lg" className="w-full sparkle-button" onClick={() => window.location.reload()}>
                Play Again
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen w-full flex gap-6 p-4 hero-background transition-all duration-500 ${
      isUrgent ? 'animate-pulse' : ''
    }`}>
      {/* Red overlay for urgency */}
      <div className={`absolute inset-0 transition-all duration-1000 z-0 ${
        isCritical 
          ? 'bg-red-500/50' 
          : isUrgent 
            ? 'bg-red-500/20' 
            : timePercentage < 50 
              ? 'bg-red-500/10' 
              : 'bg-black/30'
      } ${isUrgent ? 'animate-pulse' : ''}`}></div>

      {/* Previous Places Card */}
      <Card className={`relative z-10 w-80 bg-card/90 backdrop-blur-sm border-2 transition-all duration-300 ${
        isUrgent ? 'border-red-400/50 shadow-red-400/25' : 'border-primary/20'
      }`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-accent" />
            Previous Places
            <Badge variant="secondary" className="ml-auto">{gameState.usedPlaces.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {gameState.usedPlaces.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <MapPin className="h-12 w-12 mb-2 opacity-50" />
                <p className="text-sm text-center">No places entered yet.<br />Start exploring!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {gameState.usedPlaces.map((place, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 p-3 rounded-lg bg-background/50 border transition-all duration-300 ${
                      index === gameState.usedPlaces.length - 1 
                        ? 'border-primary bg-primary/10 animate-in slide-in-from-left-1' 
                        : 'border-border/50'
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-grow">
                      <p className="capitalize font-medium text-sm">{place}</p>
                      <p className="text-xs text-muted-foreground">Starting with {place.charAt(0).toUpperCase()}</p>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Main Game Area */}
      <div className="flex-1 flex items-center justify-center">
        <Card className={`relative z-10 w-full max-w-2xl bg-card/90 backdrop-blur-sm border-2 transition-all duration-300 ${
          isUrgent ? 'border-red-400/50 shadow-xl shadow-red-400/25' : 'border-primary/20'
        }`}>
          <CardHeader className="text-center">
            {/* Clock Timer */}
            <div className="flex justify-center mb-4">
              <div className={`relative w-32 h-32 rounded-full border-8 flex items-center justify-center transition-all duration-300 ${
                isCritical 
                  ? 'border-red-500 bg-red-500/20 animate-bounce' 
                  : isUrgent 
                    ? 'border-orange-500 bg-orange-500/20' 
                    : timePercentage < 50 
                      ? 'border-yellow-500 bg-yellow-500/10' 
                      : 'border-primary bg-primary/10'
              }`}>
                <div className="absolute inset-2 rounded-full border-4 border-background"></div>
                <div className="text-center">
                  <Clock className={`h-6 w-6 mx-auto mb-1 ${
                    isUrgent ? 'text-red-500 animate-spin' : 'text-primary'
                  }`} />
                  <div className={`text-2xl font-bold font-mono ${
                    isCritical ? 'text-red-500 animate-pulse' : isUrgent ? 'text-orange-500' : 'text-foreground'
                  }`}>
                    {String(Math.floor(gameState.timeLeft / 60)).padStart(2, '0')}:
                    {String(gameState.timeLeft % 60).padStart(2, '0')}
                  </div>
                </div>
                
                {/* Circular progress */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="text-background"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className={`transition-all duration-300 ${
                      isCritical ? 'stroke-red-500' : isUrgent ? 'stroke-orange-500' : 'stroke-primary'
                    }`}
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - timePercentage / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
              </div>
            </div>

            {/* Score Display */}
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full">
                <Star className="h-5 w-5 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-2xl font-bold text-primary">{gameState.score}</span>
                <span className="text-sm text-muted-foreground">points</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="text-center space-y-8 py-8">
            <div className="space-y-4">
              <p className={`text-xl transition-all duration-300 ${
                isUrgent ? 'text-red-500 animate-pulse' : 'text-muted-foreground'
              }`}>
                Name a place starting with:
              </p>
              
              {/* Letter Display */}
              <div className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                isCritical 
                  ? 'bg-red-500/30 border-4 border-red-500 animate-bounce' 
                  : isUrgent 
                    ? 'bg-orange-500/30 border-4 border-orange-500 animate-pulse' 
                    : 'bg-primary/20 border-4 border-primary'
              }`}>
                <span className={`text-6xl font-bold transition-all duration-300 ${
                  isCritical ? 'text-red-500 animate-pulse' : isUrgent ? 'text-orange-500' : 'text-primary'
                }`}>
                  {gameState.currentLetter}
                </span>
              </div>
              
              {isUrgent && (
                <p className="text-sm text-red-500 animate-bounce font-semibold">
                  ⚡ Hurry up! Time is running out! ⚡
                </p>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmission} className="flex w-full max-w-md mx-auto items-center space-x-2">
              <Input 
                type="text" 
                placeholder="e.g., Paris, London, Tokyo..."
                className={`text-lg h-14 transition-all duration-300 ${
                  isUrgent ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={gameState.isSubmitting}
                autoFocus
              />
              <Button 
                type="submit" 
                size="lg" 
                className={`h-14 px-6 transition-all duration-300 ${
                  isUrgent 
                    ? 'bg-red-500 hover:bg-red-600 border-red-600 animate-pulse' 
                    : 'sparkle-button'
                }`} 
                disabled={gameState.isSubmitting}
              >
                {gameState.isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Checking...
                  </div>
                ) : (
                  'Submit'
                )}
              </Button>
            </form>

            {/* Helpful hints */}
            <div className="text-sm text-muted-foreground space-y-1">
              <p>💡 <strong>Tip:</strong> Try cities, countries, landmarks, or any real place!</p>
              {gameState.score > 0 && (
                <p>🎯 <strong>Streak:</strong> {gameState.score} correct answer{gameState.score !== 1 ? 's' : ''}!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
