let dino = document.getElementById("dino");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let highScoreDisplay = document.getElementById("high-score");
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameRunning = false;

highScoreDisplay.textContent = highScore;

// Jump Function (Works on Spacebar & Mobile Tap)
function jump() {
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");
        setTimeout(() => {
            dino.classList.remove("jump");
        }, 500);
    }
}

// Detect Spacebar & Mobile Tap
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

// Start Game
function startGame() {
    gameRunning = true;
    score = 0;
    scoreDisplay.textContent = score;
    obstacle.style.right = "-30px";

    let gameInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(gameInterval);
            return;
        }

        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

        if (obstacleLeft > 550 && obstacleLeft < 580 && dinoBottom < 50) {
            gameRunning = false;
            alert("Game Over! Score: " + score);
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                highScoreDisplay.textContent = highScore;
            }
        } else {
            score++;
            scoreDisplay.textContent = score;
        }
    }, 100);

    moveObstacle();
}

// Move Obstacle
function moveObstacle() {
    obstacle.style.animation = "obstacleMove 2s infinite linear";
}

// Animation for Obstacle
let styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    @keyframes obstacleMove {
        0% { right: -30px; }
        100% { right: 600px; }
    }
`;
document.head.appendChild(styleSheet);