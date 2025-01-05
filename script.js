const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCell, clickedCellIndex) {
    if (cells[clickedCellIndex].classList.contains('X') || cells[clickedCellIndex].classList.contains('O') || !gameActive) {
        return;
    }
    cells[clickedCellIndex].classList.add(currentPlayer);
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (cells[a].classList.contains(currentPlayer) && cells[b].classList.contains(currentPlayer) && cells[c].classList.contains(currentPlayer)) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }
    if ([...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'))) {
        statusDisplay.innerHTML = 'Game ended in a draw!';
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `It's Player ${currentPlayer}'s turn`;
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerHTML = `It's Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.classList.remove('X');
        cell.classList.remove('O');
    });
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

resetButton.addEventListener('click', resetGame);