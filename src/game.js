import { renderBoard } from "./dom";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";

function startGame() {
  let status = false;
  const computer = new Player();
  const player = new Player();
  console.log("Starting Game.");

  const playerBoard = player.board;
  const computerBoard = computer.board;
  placeShips(playerBoard);
  placeShips(computerBoard);

  const playerContainer = document.querySelector("#player");
  const computerContainer = document.querySelector("#computer");
  const relocate = document.querySelector("#randomize");

  renderBoard(playerBoard.board, playerContainer, true);
  renderBoard(computerBoard.board, computerContainer, false);

  const computerClickHandler = (e) => {
    if (status) return;

    relocate.disabled = true;

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    if (isNaN(x) || isNaN(y)) return;

    const item = computerBoard.board[y][x];

    if (item === "hit" || item === "missed") return;

    computerBoard.receiveAttack(x, y);

    renderBoard(computerBoard.board, computerContainer, false);

    if (gameOver()) return;

    computerMove();
  };

  const relocateHandler = () => {
    playerBoard.reset();
    placeShips(playerBoard);
    renderBoard(playerBoard.board, playerContainer, true);
  };

  computerContainer.addEventListener("click", computerClickHandler);
  relocate.addEventListener("click", relocateHandler);

  function gameOver() {
    if (computerBoard.areAllSunk()) {
      alert("You Win!");
      status = true;
      return true;
    }
    if (playerBoard.areAllSunk()) {
      alert("You Lose!");
      status = true;
      return true;
    }

    return false;
  }

  function computerMove() {
    const [y, x] = computer.getRandomMove(playerBoard.board);
    player.board.receiveAttack(x, y);
    renderBoard(playerBoard.board, playerContainer, true);
    gameOver();
  }

  return () => {
    computerContainer.removeEventListener("click", computerClickHandler);
    relocate.removeEventListener("click", relocateHandler);
    relocate.disabled = false;
  };
}

function placeShips(board) {
  const shipLenghts = [5, 4, 3, 3, 2];

  for (let length of shipLenghts) {
    let p = false;

    while (!p) {
      const result = Math.random() < 0.5 ? "horizontal" : "vertical";
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const ship = new Ship(length);
      p = board.placeShip(x, y, result, ship);
    }
  }
}

export { startGame };
