# **App Name**: GeoGuess Master

## Core Features:

- Authentication: Landing page with Firebase Authentication (Google Sign-In and Email/Password).
- Post-Login Dashboard: Dashboard with 'Play Online', 'Play Offline', 'How to Play', and 'Settings' options.
- Single Player Mode Setup: Single Player mode that chooses a category, generates a random starting letter (excluding L, X, Z).
- Place Validation Tool: Gemini API integration to validate place names and auto-add valid names to a local data tool, including fuzzy search and case-insensitivity.
- Timer and Scoring: In-game timer display, score display, and dynamically reduced time limit based on the score.
- Global Leaderboard: Leaderboard to showcase top scores, player aliases, and optional country flags.
- Day/Night Mode Toggle: Theme Toggle button that swaps between daytime and nighttime 3D scenes, using Three.js effects.

## Style Guidelines:

- Primary color: A vivid sky blue (#5ECEF4) to establish a daytime atmosphere.
- Background color: A desaturated sky blue (#D5F1F9) as the page backdrop.
- Accent color: A gentle yellow (#F4E25E) for highlights, drawing user's attention and enhancing engagement.
- Body and headline font: 'Poppins' for a rounded, playful, modern look.
- Use bright, playful icons for game modes and options.
- Dashboard and game screens mimic the attached image's button arrangement, prioritizing visual clarity.
- Day/Night transition with smooth, animated 3D effects using Three.js.