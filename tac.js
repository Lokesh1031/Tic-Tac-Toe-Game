const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = Array(9).fill("");

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8], 
  [0,3,6],[1,4,7],[2,5,8], 
  [0,4,8],[2,4,6]          
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    disableCells();
  } else if (gameState.every(cell => cell !== "")) {
    statusText.textContent = "It's a Draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winCombos.some(combo => {
    return combo.every(index => gameState[index] === currentPlayer);
  });
}

function disableCells() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
  gameState.fill("");
  currentPlayer = 'X';
  statusText.textContent =`Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener('click', handleClick);
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);