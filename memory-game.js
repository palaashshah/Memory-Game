const container = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highscore');
const resetButton = document.getElementById('reset');

let tiles = [];
let firstTile = null;
let secondTile = null;
let score = 0;
let highScore = 0;

// Simplified color palette
const baseColors = [
    '#1CF720', 
    '#FD38B3', 
    '#8CD0DA', 
    '#F2CC1E', 
    '#EB2F03', 
    '#6C01B5'
];

// Function to create the full color array (each color appears 6 times)
function generateTileColors() {
    let fullTileColors = [];
    for (let i = 0; i < 6; i++) {
        fullTileColors = fullTileColors.concat(baseColors);
    }
    return fullTileColors;
}

// Shuffle colors and create the grid
function initializeGame() {
    const tileColors = generateTileColors();
    shuffleColors(tileColors);

    container.innerHTML = ''; // Clear the container
    tiles = []; // Reset tiles array
    firstTile = null;
    secondTile = null;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;

    for (let i = 0; i < 36; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.color = tileColors[i];
        tile.style.backgroundColor = tileColors[i]; // Initially show the colors
        tile.addEventListener('click', handleTileClick);
        container.appendChild(tile);
        tiles.push(tile);
    }

    // After 10 seconds, hide all the colors
    setTimeout(hideTiles, 10000); // 10 seconds = 10000 milliseconds
}

// Function to hide the colors (reset to default state)
function hideTiles() {
    tiles.forEach(tile => {
        tile.style.backgroundColor = 'rgb(255, 255, 255)'; // Reset to white
    });
}

// Handle tile click
function handleTileClick(e) {
    const clickedTile = e.target;

    if (!firstTile) {
        firstTile = clickedTile;
        firstTile.style.backgroundColor = firstTile.dataset.color;
    } else if (clickedTile !== firstTile && !secondTile) {
        secondTile = clickedTile;
        secondTile.style.backgroundColor = secondTile.dataset.color;

        setTimeout(() => {
            if (firstTile.dataset.color === secondTile.dataset.color) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                checkHighScore();
                firstTile = null;
                secondTile = null;
            } else {
                resetTiles();
            }
        }, 500);
    }
}

// Reset unmatched tiles and reset score
function resetTiles() {
    setTimeout(() => {
        firstTile.style.backgroundColor = 'rgb(255, 255, 255)';
        secondTile.style.backgroundColor = 'rgb(255, 255, 255)';
        firstTile = null;
        secondTile = null;
        
        // Reset the score when tiles don't match
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
    }, 500);
}

// Check if a new highscore is achieved
function checkHighScore() {
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = `Highscore: ${highScore}`;
    }
}

// Shuffle colors function
function shuffleColors(colors) {
    for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
    }
}

// Reset button functionality
resetButton.addEventListener('click', () => {
    initializeGame();
});

// Initialize the game on load
initializeGame();
