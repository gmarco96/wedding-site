// Wedding Game - Marco's Quest
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
let lives = 3;
let gameRunning = true;
let gamePaused = false;
let bestScore = localStorage.getItem('weddingGameBestScore') || 0;

// Player object
const player = {
	x: 50,
	y: 0,
	width: 30,
	height: 40,
	velocityY: 0,
	jumping: false,
	jumpPower: 12,
	color: '#2c3e50'
};

// Ground
const ground = canvas.height - 80;
player.y = ground;

// Game objects array
let obstacles = [];
let hearts = [];
let gameFrameCount = 0;

// Update best score display
document.getElementById('bestScore').textContent = bestScore;

// Bride (goal)
const bride = {
	x: canvas.width - 60,
	y: ground - 10,
	width: 40,
	height: 50
};

// Gravity
const gravity = 0.5;

// Mouse/touch controls
document.addEventListener('click', () => {
	if (gameRunning && !gamePaused) jump();
});

document.addEventListener('keydown', (e) => {
	if (e.code === 'Space') {
		e.preventDefault();
		if (gameRunning && !gamePaused) jump();
	}
	if (e.code === 'KeyP') togglePause();
});

// Touch support for mobile
canvas.addEventListener('touchstart', () => {
	if (gameRunning && !gamePaused) jump();
});

function jump() {
	if (!player.jumping) {
		player.velocityY = -player.jumpPower;
		player.jumping = true;
	}
}

function togglePause() {
	if (!gameRunning) return;
	gamePaused = !gamePaused;
	document.getElementById('pauseBtn').textContent = gamePaused ? 'Resume' : 'Pause';
}

function spawnObstacle() {
	const obstacleTypes = [
		{ width: 40, height: 30, emoji: '🪑' }, // Chair
		{ width: 50, height: 25, emoji: '🎂' }  // Cake
	];

	const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

	obstacles.push({
		x: canvas.width,
		y: ground - type.height,
		width: type.width,
		height: type.height,
		emoji: type.emoji,
		color: '#e74c3c'
	});
}

function spawnHeart() {
	hearts.push({
		x: canvas.width,
		y: Math.random() * (ground - 100) + 50,
		width: 20,
		height: 20,
		collected: false,
		color: '#e91e63'
	});
}

function update() {
	if (gamePaused || !gameRunning) return;

	// Apply gravity
	player.velocityY += gravity;
	player.y += player.velocityY;

	// Ground collision
	if (player.y >= ground) {
		player.y = ground;
		player.velocityY = 0;
		player.jumping = false;
	}

	// Spawn obstacles
	gameFrameCount++;
	if (gameFrameCount % 80 === 0) {
		spawnObstacle();
	}
	if (gameFrameCount % 150 === 0) {
		spawnHeart();
	}

	// Update obstacles
	obstacles = obstacles.filter(obs => {
		obs.x -= 6;

		// Check collision with player
		if (
			player.x < obs.x + obs.width &&
			player.x + player.width > obs.x &&
			player.y < obs.y + obs.height &&
			player.y + player.height > obs.y
		) {
			lives--;
			document.getElementById('lives').textContent = lives;

			if (lives <= 0) {
				endGame(false);
			} else {
				// Reset player position
				player.x = 50;
				player.y = ground;
				player.velocityY = 0;
			}
		}

		return obs.x > -50;
	});

	// Update hearts
	hearts = hearts.filter(heart => {
		heart.x -= 6;

		// Check collection
		if (
			!heart.collected &&
			player.x < heart.x + heart.width &&
			player.x + player.width > heart.x &&
			player.y < heart.y + heart.height &&
			player.y + player.height > heart.y
		) {
			heart.collected = true;
			score += 10;
			document.getElementById('score').textContent = score;
		}

		return heart.x > -50;
	});

	// Check if reached bride (goal)
	if (
		player.x + player.width > bride.x &&
		player.x < bride.x + bride.width &&
		player.y + player.height > bride.y
	) {
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

	if (won) {
		gameOverTitle.textContent = '💕 You Made It! 💕';
		gameOverMessage.textContent = 'Marco reached Claudia at the altar!';
		gameOverScore.textContent = `Final Score: ${score}`;
	} else {
		gameOverTitle.textContent = 'Game Over';
		gameOverMessage.textContent = 'Marco didn\'t make it to the altar...';
		gameOverScore.textContent = `Final Score: ${score}`;
	}

	gameOverScreen.style.display = 'block';
}

function draw() {
	// Clear canvas
	ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw ground
	ctx.fillStyle = '#90ee90';
	ctx.fillRect(0, ground + 10, canvas.width, canvas.height - ground - 10);

	// Draw decorative ground pattern
	ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
	for (let i = 0; i < canvas.width; i += 40) {
		ctx.fillRect(i, ground + 20, 20, 10);
	}

	// Draw player (Marco)
	ctx.fillStyle = player.color;
	ctx.fillRect(player.x, player.y, player.width, player.height);
	// Head
	ctx.fillStyle = '#d4a574';
	ctx.beginPath();
	ctx.arc(player.x + player.width / 2, player.y - 5, 8, 0, Math.PI * 2);
	ctx.fill();
	// Label
	ctx.fillStyle = '#fff';
	ctx.font = 'bold 16px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('🤵', player.x + player.width / 2, player.y - 8);

	// Draw obstacles
	obstacles.forEach(obs => {
		ctx.fillStyle = obs.color;
		ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
		ctx.font = 'bold 24px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(obs.emoji, obs.x + obs.width / 2, obs.y + obs.height / 2);
	});

	// Draw hearts
	hearts.forEach(heart => {
		if (!heart.collected) {
			ctx.font = '20px Arial';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('💕', heart.x + heart.width / 2, heart.y + heart.height / 2);
		}
	});

	// Draw bride (goal)
	ctx.font = 'bold 36px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'bottom';
	ctx.fillText('👰', bride.x + bride.width / 2, bride.y + bride.height);

	// Draw goal line
	ctx.strokeStyle = '#ffb6c1';
	ctx.lineWidth = 3;
	ctx.setLineDash([10, 10]);
	ctx.beginPath();
	ctx.moveTo(bride.x + bride.width / 2, bride.y - 30);
	ctx.lineTo(bride.x + bride.width / 2, canvas.height);
	ctx.stroke();
	ctx.setLineDash([]);

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

// Button controls
document.getElementById('restartBtn').addEventListener('click', () => {
	location.reload();
});

document.getElementById('pauseBtn').addEventListener('click', togglePause);

// Start game loop
gameLoop();
