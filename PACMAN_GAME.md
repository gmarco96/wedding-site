# 🤵 Wedding Pac-Man 👰

Your wedding website now features a Pac-Man style maze game with wedding theme!

---

## 🎮 How to Play

### Objective
**Collect ALL hearts 💕 while avoiding the wedding guests!**

### Controls
| Input | Action |
|-------|--------|
| **⬅️ Arrow Left** | Move left |
| **➡️ Arrow Right** | Move right |
| **⬆️ Arrow Up** | Move up |
| **⬇️ Arrow Down** | Move down |
| **W/A/S/D** | Alternative movement |
| **📱 Swipe** | Mobile movement |
| **P** | Pause/Resume |

### Gameplay Mechanics

**Marco (🤵)**
- You control Marco (groom)
- Navigate through the maze
- Collect all green hearts
- Avoid touching the ghosts!

**Collectibles**
- 💕 **Hearts** - Collect all to win!
- +10 points per heart
- Need to collect 100% to complete the level

**Enemies (Wedding Guests)**
1. 👰 **Bride** (Pink) - Chases Marco
2. 👸 **Bridesmaid** (Red) - Chases Marco
3. 💐 **Flowers** (Gold) - Chases Marco

Each ghost has simple AI that moves toward Marco!

**Lives**
- Start with 3 lives
- Lose 1 life if caught by a ghost
- Game over when lives reach 0

---

## 🏆 Win Conditions

### Win
✅ Collect ALL hearts before being caught  
- Marco is ready for the wedding!
- Your score is saved to "Best Score"

### Lose
❌ Get caught by a ghost before collecting all hearts  
- Wedding guests catch up with Marco
- You can try again with restart button

---

## 📊 Scoring System

| Action | Points |
|--------|--------|
| Collect heart | +10 |
| Collect all hearts | +Bonus |

Your best score is automatically saved in browser!

---

## 🎯 Strategy Tips

1. **Learn the Maze** - Remember where walls are
2. **Plan Routes** - Plan your heart collection path
3. **Avoid Corners** - Ghosts can trap you in corners
4. **Use Walls** - Hide behind walls to avoid ghosts
5. **Be Patient** - Don't rush, ghosts move slower

---

## 🔧 Game Features

✨ **Features:**
- Grid-based maze gameplay
- 3 intelligent enemy ghosts
- Procedurally generated maze each game
- Arrow keys + WASD controls
- Mobile swipe support
- Smart ghost AI pathfinding
- Pause/Resume functionality
- Score tracking with best score persistence
- Game over screen with stats
- Smooth, responsive controls

---

## 📱 Mobile Support

✅ **Mobile Friendly:**
- Swipe controls (swipe up/down/left/right to move)
- Responsive game canvas
- Works on all screen sizes
- Touch-optimized UI buttons

**Test on:**
- iPhone (Safari)
- Android (Chrome)
- Tablets
- All modern browsers

---

## 🎨 Customization

### Change Enemy Ghosts
Edit `assets/js/game.js`, find the ghosts array:

```javascript
const ghosts = [
	{ gridX: COLS - 2, gridY: 1, color: '#ff69b4', name: '👰' },
	{ gridX: COLS - 2, gridY: ROWS - 2, color: '#e74c3c', name: '👸' },
	{ gridX: Math.floor(COLS / 2), gridY: 1, color: '#ffd700', name: '💐' }
];
```

Change the `name` emoji to any you want!

### Adjust Difficulty
Change ghost AI speed:
```javascript
ghost.moveInterval = 10 + index * 5;  // Lower = faster ghosts
```

### Change Grid Size
Larger grid = easier, smaller grid = harder:
```javascript
const GRID_SIZE = 40;  // Pixels per grid cell
```

---

## 🎮 Game Statistics

### Default Settings
- Grid Size: 40 pixels per cell
- Game Area: ~19×10 grid cells
- Starting Lives: 3
- Hearts Spawned: ~40 per game (varies)
- Ghost Speed: Medium (varies per ghost)
- Win Condition: Collect 100% of hearts

### Performance
- Frame Rate: 60 FPS
- File Size: ~12 KB (game.js)
- No external dependencies
- Smooth gameplay on all devices

---

## 🚀 Quick Start

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
# Click "Play Wedding Pac-Man"
# Or go directly to /game.html
```

---

## 🔄 What Changed

### From Platformer
- **Before:** Jump over obstacles, collect hearts in scrolling level
- **After:** Navigate maze, collect all hearts, avoid ghosts

### Key Differences
| Feature | Platformer | Pac-Man |
|---------|-----------|---------|
| **Movement** | Jump (1 action) | 4-direction movement |
| **Obstacles** | Moving enemies | Stationary walls |
| **Enemies** | Hit = lose | Collision = lose |
| **Collectibles** | Falling hearts | Scattered in maze |
| **Win Condition** | Reach goal | Collect all items |
| **Difficulty** | Medium | Medium-Hard |
| **Playtime** | 5-10 min | 10-20 min |

---

## 💡 Enhancement Ideas

Want to expand the game? Try:
- ⏱️ **Time Limit** - Collect all hearts within time
- 🎯 **Difficulty Levels** - Easy/Normal/Hard modes
- ⚡ **Power-ups** - Temporary invincibility
- 🏅 **Leaderboard** - Track high scores
- 🎵 **Sound Effects** - Collect, ghost catch, win sounds
- 👥 **Multiplayer** - Two Marco's collecting together
- 📈 **Endless Mode** - New maze each level
- 🌙 **Night Mode** - Dark theme

---

## ❓ FAQ

**Q: How do I move on mobile?**
A: Swipe in the direction you want to move (up/down/left/right)

**Q: Can I pause?**
A: Yes! Click the "Pause" button or press P key

**Q: Why are ghosts moving?**
A: They have simple AI that chases you! Try to outsmart them.

**Q: How do I win?**
A: Collect ALL the green hearts (💕) without getting caught

**Q: Where are my hearts?**
A: Look for green heart emojis scattered throughout the maze

**Q: Can I replay the same maze?**
A: No, maze is generated randomly each game (more replayability!)

---

## 🎉 Have Fun!

Enjoy the Wedding Pac-Man game and share it with your guests! 

**Questions?** Check game.html or assets/js/game.js for detailed comments.

Happy playing! 🎮💕
