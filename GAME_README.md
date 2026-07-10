# 🎮 Marco's Quest - Wedding Game

A fun, interactive platformer game for your wedding website where guests help Marco reach Claudia at the altar!

## How to Play

### Controls
- **Click/Tap** the canvas to jump
- **Spacebar** also works (keyboard)
- **Mobile** - Just tap the game area

### Gameplay
1. **Help Marco Jump** - Avoid obstacles
2. **Collect Hearts** 💕 - Get points (+10 each)
3. **Reach Claudia** 👰 - Win the game!

### Mechanics
- **3 Lives** - Hit an obstacle and lose a life
- **Obstacles** - Chairs 🪑 and Cakes 🎂 to jump over
- **Score Tracking** - Your best score is saved
- **Pause** - Click the Pause button if you need a break

---

## Game Features

✨ **Features:**
- Simple, fun gameplay (5-10 minutes per game)
- Wedding-themed obstacles and collectibles
- Score system with persistent best score storage
- Mobile-friendly touch controls
- Pause/Resume functionality
- Game Over screen with final score
- Responsive canvas graphics with emojis
- No external dependencies (pure vanilla JS)

---

## Installation & Setup

The game is already integrated! Just:

```bash
# Start development server
npm run dev

# Go to http://localhost:3000
# Click "Play Marco's Quest" button
# Or visit http://localhost:3000/game.html directly
```

---

## Customization

### Change Game Speed
Edit `assets/js/game.js`, find the obstacle/heart update speeds:

```javascript
// Line ~120 - Obstacle spawn rate (lower = more frequent)
if (gameFrameCount % 80 === 0) {
    spawnObstacle();  // Spawn every 80 frames
}

// Line ~124 - Heart spawn rate
if (gameFrameCount % 150 === 0) {
    spawnHeart();  // Spawn every 150 frames
}
```

### Change Jump Height
Edit `assets/js/game.js`:

```javascript
const player = {
    jumpPower: 12,  // Increase for higher jumps
    // ...
};
```

### Change Obstacle Speed
Edit `assets/js/game.js`, line ~138:

```javascript
obs.x -= 6;  // Pixels per frame (6 = current speed)
// Increase number for faster obstacles
```

### Customize Emojis
Edit `assets/js/game.js`, line ~107:

```javascript
const obstacleTypes = [
    { width: 40, height: 30, emoji: '🪑' },  // Chair
    { width: 50, height: 25, emoji: '🎂' }   // Cake
];
```

Change to any emojis you want! Examples:
- 💐 Flowers
- 🌹 Rose
- 🍾 Champagne
- 🎊 Confetti
- 💍 Ring

---

## Deployment

The game works in production with Vite:

```bash
# Build for production
npm run build

# The game.html will be in dist/
# All assets included automatically
```

---

## File Structure

```
game.html              ← Game page
assets/
├── js/
│   └── game.js        ← Game logic
├── css/
│   └── main.css       ← Shared styles
```

---

## Browser Support

Works on all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile (iOS/Android)

---

## How It Works

### Game Loop
1. **Update** - Move obstacles, check collisions, update score
2. **Draw** - Render all game objects on canvas
3. **Repeat** - 60 times per second (requestAnimationFrame)

### Collision Detection
- Simple rectangle collision (AABB)
- Checks player vs obstacles
- Checks player vs hearts
- Checks player vs goal (bride)

### Score Persistence
- Uses `localStorage` to save best score
- Automatically loads and displays on page load
- Survives page refreshes

---

## Ideas for Enhancements

Want to expand the game? Here are some ideas:

- Add sound effects (collect heart "ding", hit obstacle "ouch")
- Add difficulty levels (easy/normal/hard)
- Add power-ups (invincibility, double points)
- Add multiple levels/stages
- Leaderboard (with names)
- Different characters (groom/bride modes)
- Animated obstacles
- Background music
- Mobile-specific optimizations

---

## Troubleshooting

### Game won't load?
- Make sure `assets/js/game.js` exists
- Check browser console for errors (F12)
- Try refreshing the page

### Emojis not showing?
- Your browser might not support all emojis
- Use simpler ones like 🎂 💕 👰 🤵

### Touch not working on mobile?
- Make sure touch events are enabled
- Some browsers need viewport meta tag (already added)

---

## Credits

Created with vanilla JavaScript, HTML5 Canvas, and lots of wedding love! 💕

Enjoy your game! 🎮
