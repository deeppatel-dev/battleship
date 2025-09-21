import { Ship } from "./ship";

function renderBoard(board, container, isPlayer) {
  container.innerHTML = "";

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const item = board[y][x];
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (item === "hit") {
        cell.classList.add("hit");
      } else if (item === "missed") {
        cell.classList.add("missed");
      } else if (isPlayer && item instanceof Ship) {
        cell.classList.add("ship");
      }

      container.appendChild(cell);
    }
  }
}

export { renderBoard };
