# Arcane Memory Card Game

A React + TypeScript memory card game featuring animated card interactions, 3D tilt effects, and persistent high score tracking.

## Overview

This is a browser-based memory game where the player must click each character card only once. The cards shuffle after each correct selection, increasing difficulty as the player progresses. The game tracks score and stores the highest score locally in the browser.

The project focuses on interactive UI design, animation, and state management in React.

## Tech Stack

- React
- TypeScript
- Vite
- GSAP (animations)
- react-parallax-tilt (3D hover effects)
- CSS (custom styling)
- localStorage (persistent state)

## Features

### Gameplay
- Memory-based selection game
- Score tracking system
- High score persistence across sessions
- Automatic reshuffling after each valid selection
- Loss detection when selecting a previously chosen card

### Animations
- GSAP-powered card entrance animations
  - Cards rise from below
  - 3D flip effect on entry
  - Staggered sequencing for visual flow
- Smooth hover tilt interaction using parallax tilt
- Animated game state transitions

### Persistence
- High score stored in browser localStorage
- Automatically loaded on game initialization
- Updated whenever a new high score is achieved

## Game Logic

1. Player selects a card
2. If the card has not been selected before:
   - Score increases
   - Cards reshuffle
3. If the card was already selected:
   - Game ends
   - Score resets
   - High score is updated if applicable
4. Game continues until loss condition is triggered

## Setup and Installation

```bash
npm install
npm run dev

## Build

npm run build