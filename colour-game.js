const colorBox = document.getElementById("colorBox");
const colorOptions = document.querySelectorAll(".colorOption");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("scoreDisplay");
const newGameButton = document.getElementById("newGameButton");

let targetColor = "";
let score = 0;

// Generate a random color
function getRandomColor() {
  return `rgb(${rand(255)}, ${rand(255)}, ${rand(255)})`;
}

function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

// Function to set colors and target
function setupColors() {
  const colors = [];

  for (let i = 0; i < colorOptions.length; i++) {
    const randomColor = getRandomColor();
    colors.push(randomColor);
    colorOptions[i].style.backgroundColor = randomColor;

    // Reset event listeners
    colorOptions[i].onclick = handleGuess;
  }

  // Set a new target color
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;
}

// Handle color guess with animations
function handleGuess(event) {
  const correctMessages = ["Correct!", "Super!", "Great!", "awesome!"];
  const wrongMessages = ["Wrong! Try again.", "Almost! Try again.", "Oops! Incorrect!", "Failed!", "Go back to school!"];
  const selectedColor = event.target.style.backgroundColor;

  // Reset animations
  gameStatus.classList.remove("bounce");

  if (selectedColor === targetColor) {
    gameStatus.textContent = correctMessages[rand(correctMessages.length - 1)];
    gameStatus.style.color = "green";
    gameStatus.classList.add("bounce");
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    setupColors(); // Reshuffle after correct guess
  } else {
    gameStatus.textContent = wrongMessages[rand(wrongMessages.length - 1)];
    gameStatus.style.color = "red";
  }
}

// Start a new game
function startNewGame() {
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  gameStatus.textContent = "";
  setupColors();
}

// Initialize game
newGameButton.addEventListener("click", startNewGame);
startNewGame();
