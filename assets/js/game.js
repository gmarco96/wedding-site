// Wedding Pac-Man Game - Collect All Hearts!
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Grid setup
const GRID_SIZE = 40;
const COLS = Math.floor(canvas.width / GRID_SIZE);
const ROWS = Math.floor(canvas.height / GRID_SIZE);

// Game variables
let score = 0;
let lives = 3;
let gameRunning = true;
let gamePaused = false;
let bestScore = localStorage.getItem('weddingGameBestScore') || 0;
let totalHearts = 0;
let heartsCollected = 0;

// Update best score display
document.getElementById('bestScore').textContent = bestScore;

// Player (Marco)
const player = {
	gridX: 1,
	gridY: Math.floor(ROWS / 2),
	nextGridX: 1,
	nextGridY: Math.floor(ROWS / 2),
	direction: 'right',
	nextDirection: 'right'
};

// Ghosts (wedding guests chasing Marco)
const ghosts = [
	{ gridX: COLS - 2, gridY: 1, color: '#ff69b4', name: '👰' },      // Bride (pink)
	{ gridX: COLS - 2, gridY: ROWS - 2, color: '#e74c3c', name: '👸' }, // Bridesmaid (red)
	{ gridX: Math.floor(COLS / 2), gridY: 1, color: '#ffd700', name: '💐' }  // Flowers (gold)
];

// Maze walls
const walls = [];

// Hearts to collect
const hearts = [];

// Game frame count
let gameFrameCount = 0;

// Initialize game
function initGame() {
	// Create maze
	createMaze();

	// Place hearts
	placeHearts();

	// Initialize ghosts
	ghosts.forEach((ghost, index) => {
		ghost.moveCounter = 0;
		ghost.moveInterval = 10 + index * 5; // Different speeds
	});
}

function createMaze() {
	walls.length = 0;

	// Create a simple maze pattern
	for (let x = 0; x < COLS; x++) {
		for (let y = 0; y < ROWS; y++) {
			// Outer walls
			if (x === 0 || x === COLS - 1 || y === 0 || y === ROWS - 1) {
				walls.push({ x, y });
			}
			// Inner wall patterns
			else if (x % 4 === 0 && y % 3 === 0) {
				walls.push({ x, y });
			}
			else if (x % 5 === 2 && y % 4 === 1) {
				walls.push({ x, y });
			}
		}
	}
}

function placeHearts() {
	hearts.length = 0;
	for (let x = 1; x < COLS - 1; x++) {
		for (let y = 1; y < ROWS - 1; y++) {
			const isWall = walls.some(w => w.x === x && w.y === y);
			const isPlayer = player.gridX === x && player.gridY === y;
			const isGhost = ghosts.some(g => g.gridX === x && g.gridY === y);

			if (!isWall && !isPlayer && !isGhost && Math.random() > 0.7) {
				hearts.push({ x, y, collected: false });
			}
		}
	}
	totalHearts = hearts.length;
	heartsCollected = 0;
}

function isWall(gridX, gridY) {
	return walls.some(w => w.x === gridX && w.y === gridY);
}

function isValidMove(gridX, gridY) {
	if (gridX < 0 || gridX >= COLS || gridY < 0 || gridY >= ROWS) return false;
	return !isWall(gridX, gridY);
}

function movePlayer(direction) {
	let newX = player.gridX;
	let newY = player.gridY;

	switch(direction) {
		case 'up': newY--; break;
		case 'down': newY++; break;
		case 'left': newX--; break;
		case 'right': newX++; break;
	}

	if (isValidMove(newX, newY)) {
		player.gridX = newX;
		player.gridY = newY;
		player.direction = direction;
		return true;
	}
	return false;
}

function moveGhost(ghost) {
	const directions = ['up', 'down', 'left', 'right'];

	// Simple AI: move towards player
	const dx = player.gridX - ghost.gridX;
	const dy = player.gridY - ghost.gridY;

	let bestDir = directions[Math.floor(Math.random() * directions.length)];
	let bestDist = Math.abs(dx) + Math.abs(dy);

	// Try to move towards player
	for (let dir of directions) {
		let newX = ghost.gridX;
		let newY = ghost.gridY;

		switch(dir) {
			case 'up': newY--; break;
			case 'down': newY++; break;
			case 'left': newX--; break;
			case 'right': newX++; break;
		}

		if (isValidMove(newX, newY)) {
			const dist = Math.abs(player.gridX - newX) + Math.abs(player.gridY - newY);
			if (dist < bestDist) {
				bestDist = dist;
				bestDir = dir;
			}
		}
	}

	// Move ghost
	switch(bestDir) {
		case 'up':
			if (isValidMove(ghost.gridX, ghost.gridY - 1)) ghost.gridY--;
			break;
		case 'down':
			if (isValidMove(ghost.gridX, ghost.gridY + 1)) ghost.gridY++;
			break;
		case 'left':
			if (isValidMove(ghost.gridX - 1, ghost.gridY)) ghost.gridX--;
			break;
		case 'right':
			if (isValidMove(ghost.gridX + 1, ghost.gridY)) ghost.gridX++;
			break;
	}
}

function update() {
	if (gamePaused || !gameRunning) return;

	gameFrameCount++;

	// Move ghosts
	ghosts.forEach(ghost => {
		ghost.moveCounter++;
		if (ghost.moveCounter >= ghost.moveInterval) {
			moveGhost(ghost);
			ghost.moveCounter = 0;
		}
	});

	// Check heart collection
	hearts.forEach(heart => {
		if (!heart.collected && player.gridX === heart.x && player.gridY === heart.y) {
			heart.collected = true;
			heartsCollected++;
			score += 10;
			document.getElementById('score').textContent = score;
		}
	});

	// Check ghost collision
	const hitByGhost = ghosts.some(ghost =>
		ghost.gridX === player.gridX && ghost.gridY === player.gridY
	);

	if (hitByGhost) {
		lives--;
		document.getElementById('lives').textContent = lives;

		if (lives <= 0) {
			endGame(false);
		} else {
			// Reset player to start
			player.gridX = 1;
			player.gridY = Math.floor(ROWS / 2);
		}
	}

	// Check win condition - collect all hearts
	if (heartsCollected === totalHearts && totalHearts > 0) {
		endGame(true);
	}
}

function endGame(won) {
	gameRunning = false;

	// Update best score
	if (score > bestScore) {
		bestScore = score;
		localStorage.setItem('weddingGameBestScore', bestScore);
		document.getElementById('bestScore').textContent = bestScore;
	}

	// Show game over screen
	const gameOverScreen = document.getElementById('gameOverScreen');
	const gameOverTitle = document.getElementById('gameOverTitle');
	const gameOverMessage = document.getElementById('gameOverMessage');
	const gameOverScore = document.getElementById('gameOverScore');
	const heartsInfo = document.getElementById('heartsInfo');

	if (won) {
		gameOverTitle.textContent = '💕 You Won! 💕';
		gameOverMessage.textContent = `Collected all ${totalHearts} hearts!`;
		heartsInfo.textContent = `Marco is ready for the wedding! 🤵👰`;
		gameOverScore.textContent = `Final Score: ${score}`;
	} else {
		gameOverTitle.textContent = 'Game Over';
		gameOverMessage.textContent = 'The wedding guests caught up with Marco!';
		heartsInfo.textContent = `You collected ${heartsCollected}/${totalHearts} hearts`;
		gameOverScore.textContent = `Final Score: ${score}`;
	}

	gameOverScreen.style.display = 'block';
}

function draw() {
	// Clear canvas
	ctx.fillStyle = '#e8f4f8';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw maze walls
	ctx.fillStyle = '#2c3e50';
	walls.forEach(wall => {
		ctx.fillRect(wall.x * GRID_SIZE + 2, wall.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4);
	});

	// Draw hearts
	hearts.forEach(heart => {
		if (!heart.collected) {
			ctx.font = 'bold 24px Arial';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('💕', heart.x * GRID_SIZE + GRID_SIZE / 2, heart.y * GRID_SIZE + GRID_SIZE / 2);
		}
	});

	// Draw player (Marco)
	ctx.font = 'bold 32px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('🤵', player.gridX * GRID_SIZE + GRID_SIZE / 2, player.gridY * GRID_SIZE + GRID_SIZE / 2);

	// Draw ghosts
	ghosts.forEach(ghost => {
		ctx.font = 'bold 28px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(ghost.name, ghost.gridX * GRID_SIZE + GRID_SIZE / 2, ghost.gridY * GRID_SIZE + GRID_SIZE / 2);
	});

	// Draw hearts collected indicator
	ctx.fillStyle = '#333';
	ctx.font = 'bold 14px Arial';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillText(`Hearts: ${heartsCollected}/${totalHearts}`, 10, canvas.height - 20);

	// Draw pause overlay
	if (gamePaused) {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#fff';
		ctx.font = 'bold 48px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
	}
}

function gameLoop() {
	update();
	draw();
	requestAnimationFrame(gameLoop);
}

function togglePause() {
	if (!gameRunning) return;
	gamePaused = !gamePaused;
	document.getElementById('pauseBtn').textContent = gamePaused ? 'Resume' : 'Pause';
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
	if (!gameRunning || gamePaused) return;

	switch(e.code) {
		case 'ArrowUp':
		case 'KeyW':
			e.preventDefault();
			movePlayer('up');
			break;
		case 'ArrowDown':
		case 'KeyS':
			e.preventDefault();
			movePlayer('down');
			break;
		case 'ArrowLeft':
		case 'KeyA':
			e.preventDefault();
			movePlayer('left');
			break;
		case 'ArrowRight':
		case 'KeyD':
			e.preventDefault();
			movePlayer('right');
			break;
		case 'KeyP':
			togglePause();
			break;
	}
});

// Mobile touch controls
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
	touchStartX = e.touches[0].clientX;
	touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchend', (e) => {
	if (!gameRunning || gamePaused) return;

	const touchEndX = e.changedTouches[0].clientX;
	const touchEndY = e.changedTouches[0].clientY;

	const deltaX = touchEndX - touchStartX;
	const deltaY = touchEndY - touchStartY;

	if (Math.abs(deltaX) > Math.abs(deltaY)) {
		if (deltaX > 0) movePlayer('right');
		else movePlayer('left');
	} else {
		if (deltaY > 0) movePlayer('down');
		else movePlayer('up');
	}
});

// Button controls
document.getElementById('restartBtn').addEventListener('click', () => {
	location.reload();
});

document.getElementById('pauseBtn').addEventListener('click', togglePause);

// Initialize and start game loop
initGame();
gameLoop();
