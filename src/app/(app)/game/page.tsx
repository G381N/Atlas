
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Clock, Star, Trophy, MapPin, History, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validatePlace, saveScore } from '@/actions/game';
import Link from 'next/link';

const INITIAL_TIME = 60; // Increased time for more thoughtful answers
const TIME_DECREMENT = 2; 
const SCORE_MILESTONE = 5; 

// Timer component with circular design
const CircularTimer = ({ timeLeft, timeLimit, isUrgent }: { timeLeft: number; timeLimit: number; isUrgent: boolean }) => {
  const progress = (timeLeft / timeLimit) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={`relative w-28 h-28 ${isUrgent ? 'animate-pulse' : ''}`}>
      <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-muted-foreground/30"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-1000 ease-linear ${
            isUrgent ? 'text-red-500' : timeLeft < 20 ? 'text-yellow-500' : 'text-green-500'
          }`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`text-2xl font-bold ${isUrgent ? 'text-red-500' : 'text-foreground'}`}>
            {timeLeft}
          </div>
          <div className="text-xs text-muted-foreground">seconds</div>
        </div>
      </div>
    </div>
  );
};

// Previous places card component
const PreviousPlacesCard = ({ usedPlaces }: { usedPlaces: string[] }) => {
  const recentPlaces = usedPlaces.slice(-5).reverse(); // Show last 5 places
  
  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm border-2 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Previous Places
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentPlaces.length === 0 ? (
          <p className="text-muted-foreground text-sm">No places entered yet</p>
        ) : (
          <div className="space-y-2">
            {recentPlaces.map((place, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg animate-in slide-in-from-top-2 duration-300"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium capitalize">{place}</span>
                {index === 0 && (
                  <span className="text-xs bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full ml-auto">
                    Latest
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 

export default function GamePage() {
  const [gameState, setGameState] = useState({
    score: 0,
    currentLetter: '',
    timeLeft: INITIAL_TIME,
    timeLimit: INITIAL_TIME,
    usedPlaces: [] as string[], // Changed from Set to array for easier display
    gameOver: false,
    isSubmitting: false,
  });
  const [username, setUsername] = useState("Explorer"); // In a real app, this would come from auth.

  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();

  const availableLetters = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''), []);

  // Check if it's urgent time (last 10 seconds)
  const isUrgent = gameState.timeLeft <= 10 && gameState.timeLeft > 0;
  
  // Calculate red filter intensity based on time left
  const redFilterIntensity = Math.max(0, (20 - gameState.timeLeft) / 20); // Starts at 20 seconds

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

  if (gameState.gameOver) {
    return (
      <div className="min-h-screen w-full hero-background relative">
        <div 
          className="absolute inset-0 bg-black/30 z-0"
        ></div>
        <div className="relative z-10 container flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md text-center bg-card/90 backdrop-blur-sm border-2 border-primary/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Game Over!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Trophy className="mx-auto h-24 w-24 text-accent animate-bounce" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Star className="h-4 w-4 text-yellow-700" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xl text-muted-foreground">Your final score is:</p>
                <p className="text-6xl font-bold text-primary animate-pulse">{gameState.score}</p>
                <p className="text-sm text-muted-foreground">
                  Places discovered: {gameState.usedPlaces.length}
                </p>
              </div>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="w-full btn-primary animate-in slide-in-from-left-4 duration-500" 
                  onClick={() => window.location.reload()}
                >
                  Play Again
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="secondary" 
                  className="w-full btn-secondary animate-in slide-in-from-right-4 duration-500"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = (gameState.timeLeft / gameState.timeLimit) * 100;

  return (
    <div className="min-h-screen w-full hero-background relative">
      {/* Red overlay that intensifies as time runs out */}
      <div 
        className="absolute inset-0 bg-red-500 transition-all duration-1000 z-0"
        style={{ 
          opacity: redFilterIntensity * 0.3,
          mixBlendMode: 'multiply'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      {/* Blinking red overlay for urgent state */}
      {isUrgent && (
        <div className="absolute inset-0 bg-red-500/20 animate-pulse z-0"></div>
      )}
      
      <div className="relative z-10 container mx-auto p-4 min-h-screen">
        {/* Top Stats Bar */}
        <div className="flex justify-between items-center mb-6 pt-4">
          <Card className="bg-card/90 backdrop-blur-sm border-2 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-2xl font-bold text-primary">{gameState.score}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/90 backdrop-blur-sm border-2 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <CircularTimer 
                timeLeft={gameState.timeLeft} 
                timeLimit={gameState.timeLimit}
                isUrgent={isUrgent}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Previous Places */}
          <div className="md:col-span-1">
            <PreviousPlacesCard usedPlaces={gameState.usedPlaces} />
          </div>

          {/* Center Column - Main Game */}
          <div className="md:col-span-2">
            <Card className={`w-full bg-card/90 backdrop-blur-sm border-2 transition-all duration-300 shadow-2xl ${
              isUrgent ? 'border-red-500 shadow-red-500/20' : 'border-primary/30'
            }`}>
              <CardHeader className="text-center pb-4">
                <CardTitle className={`text-2xl font-bold transition-colors duration-300 ${
                  isUrgent ? 'text-red-500' : 'text-foreground'
                }`}>
                  {isUrgent ? '⚡ HURRY UP! ⚡' : 'Geography Challenge'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-8 py-8">
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground animate-in slide-in-from-top-2 duration-500">
                    Enter a place starting with the letter:
                  </p>
                  
                  {/* Letter Display */}
                  <div className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center relative transition-all duration-300 ${
                    isUrgent 
                      ? 'bg-red-500/20 shadow-lg shadow-red-500/30 animate-pulse' 
                      : 'bg-primary/20 shadow-lg shadow-primary/30'
                  }`}>
                    <span className={`text-7xl font-bold transition-colors duration-300 ${
                      isUrgent ? 'text-red-500' : 'text-primary'
                    }`}>
                      {gameState.currentLetter}
                    </span>
                    
                    {/* Animated ring around letter */}
                    <div className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${
                      isUrgent 
                        ? 'border-red-500 animate-spin' 
                        : 'border-primary/50'
                    }`}></div>
                  </div>

                  {/* Streak indicator */}
                  {gameState.score > 0 && (
                    <div className="flex justify-center">
                      <div className="bg-green-500/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full animate-in slide-in-from-bottom-2 duration-500">
                        <span className="text-sm font-medium">
                          🔥 {gameState.score} place{gameState.score > 1 ? 's' : ''} streak!
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Input Form */}
                <form onSubmit={handleSubmission} className="flex w-full max-w-lg mx-auto items-center space-x-4 animate-in slide-in-from-bottom-4 duration-700">
                  <Input 
                    type="text" 
                    placeholder="e.g., Paris, Tokyo, New York..."
                    className={`text-lg h-14 transition-all duration-300 ${
                      isUrgent 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-primary/50 focus:border-primary'
                    }`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={gameState.isSubmitting}
                    autoFocus
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className={`h-14 px-8 transition-all duration-300 ${
                      isUrgent 
                        ? 'bg-red-500 hover:bg-red-600 border-red-600' 
                        : 'btn-primary'
                    }`}
                    disabled={gameState.isSubmitting}
                  >
                    {gameState.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Checking...
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </form>

                {/* Game hints */}
                <div className="text-sm text-muted-foreground space-y-1 animate-in slide-in-from-bottom-6 duration-1000">
                  <p>💡 Think of cities, towns, landmarks, or any geographical location!</p>
                  <p>🌍 The more unique, the better your chances!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
