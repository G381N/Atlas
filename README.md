# ATLAS - Geography Game

A nostalgic geography game brought to the web, where players name places for countries starting with specific letters.

## About

This project was created by **Gebin George** ([gebin.net](https://gebin.net)) as a web version of a beloved childhood game. The goal is to help children improve their geography knowledge while having fun with a game that brings back nostalgic memories.

I started this project as a personal endeavor to recreate a geography game we used to play during childhood. Currently, I'm collaborating with a few friends from college to add multiplayer functionality to make the game even more engaging.

## How the Game Works

ATLAS is a classic geography game where:
- Players are presented with a country and a starting letter
- They must name a place (city, town, landmark, etc.) in that country beginning with the specified letter
- The game tests geographical knowledge and quick thinking
- Perfect for educational purposes and helping children become better at geography
- Each correct answer advances the game with new challenges

### Current Game Flow
1. **Login/Authentication**: Secure user accounts with personalized progress tracking
2. **Dashboard**: Main menu with game options and settings
3. **Solo Mode**: Play at your own pace against the system
4. **Theme Customization**: Switch between light and dark modes
5. **Music Controls**: Toggle background music for enhanced experience

## Current Features

- ✅ **Solo Offline Mode**: Play the geography game at your own pace
- ✅ **User Authentication**: Secure login and account management
- ✅ **Theme Toggle**: Switch between light and dark modes with beautiful day/night backgrounds
- ✅ **Music Controls**: Toggle background music on/off
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **Modern UI**: Clean, colorful interface with smooth animations
- 🚧 **Global Leaderboard**: Track high scores (coming soon)

## Upcoming Features

- 🔄 **Multiplayer Mode**: Real-time gameplay with friends (in development with college collaborators)
- 🔄 **Enhanced Scoring System**: More detailed scoring mechanics and difficulty levels
- 🔄 **Additional Game Modes**: Various difficulty levels and game variations
- 🔄 **Social Features**: Friend challenges and competitive tournaments

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Authentication**: Custom auth system with secure session management
- **Deployment**: Vercel (optimized for performance)
- **Theme System**: next-themes for seamless dark/light mode switching
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks and context

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/G381N/Atlas.git
cd Atlas
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Atlas/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── (app)/          # Protected app routes
│   │   │   ├── dashboard/  # Main game dashboard
│   │   │   ├── play/       # Solo game mode
│   │   │   └── ...
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Shadcn/ui components
│   │   └── ...
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── public/                # Static assets
└── docs/                  # Project documentation
```

## Contributing

This project is being developed collaboratively with friends from college to add multiplayer functionality. We welcome contributions!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- **Phase 1**: ✅ Solo gameplay with authentication
- **Phase 2**: 🔄 Multiplayer implementation (in progress)
- **Phase 3**: 🔄 Enhanced game modes and social features

## License

This project is open source and available under the MIT License.

## Contact & Links

- **Creator**: Gebin George
- **Portfolio**: [gebin.net](https://gebin.net)
- **Repository**: [GitHub](https://github.com/G381N/Atlas)

---

*Bringing childhood geography games to the digital age! 🌍*

> "Geography is just physics slowed down, with a couple of trees stuck in it." - Terry Pratchett
