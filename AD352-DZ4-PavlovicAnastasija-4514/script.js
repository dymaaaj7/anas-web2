// Get all memory cards
const memoryCards = document.querySelectorAll('.memory-card');
const resetButton = document.getElementById('resetBtn');

// Game state variables
let hasFlippedCard = false;
let isBoardLocked = false;
let firstCard = null;
let secondCard = null;

// Flip card function
function flipCard() {
    // Prevent flipping if board is locked or same card clicked
    if (isBoardLocked) return;
    if (this === firstCard) return;

    // Add flip class to animate the card
    this.classList.add('flip');

    // If first card hasn't been flipped yet
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second card flipped
    secondCard = this;
    checkForMatch();
}

// Check if two cards match
function checkForMatch() {
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableMatchedCards() : unflipCards();
}

// Disable click events on matched cards
function disableMatchedCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoardState();
}

// Flip cards back if they don't match
function unflipCards() {
    isBoardLocked = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoardState();
    }, 1500);
}

// Reset board state for next turn
function resetBoardState() {
    [hasFlippedCard, isBoardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Shuffle cards randomly
function shuffleCards() {
    memoryCards.forEach(card => {
        const randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    });
}

// Reset game - flip all cards back and shuffle
function resetGame() {
    memoryCards.forEach(card => {
        card.classList.remove('flip');
    });

    // Wait for flip animation before shuffling
    setTimeout(() => {
        shuffleCards();
        // Re-attach event listeners to all cards
        memoryCards.forEach(card => {
            card.removeEventListener('click', flipCard);
            card.addEventListener('click', flipCard);
        });
    }, 500);
}

// Initialize game
function initGame() {
    shuffleCards();
    memoryCards.forEach(card => card.addEventListener('click', flipCard));
    console.log(`Game initialized with ${memoryCards.length} cards`);
}

// Add event listener to reset button
if (resetButton) {
    resetButton.addEventListener('click', resetGame);
}

// Start the game
initGame();
