import { renderBoard } from "./dom";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";

function startGame() {
  const computer = new Player();
  const player = new Player();
  console.log("Starting Game.");
  const playerBoard = player.board;
  const computerBoard = computer.board;
  placeShips(playerBoard);
  placeShips(computerBoard);
  console.log(playerBoard.board);
  console.log(computerBoard.board);

  const playerContainer = document.querySelector("#player");
  const computerContainer = document.querySelector("#computer");

  renderBoard(playerBoard.board, playerContainer, true);
  renderBoard(computerBoard.board, computerContainer, false);
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
