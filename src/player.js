import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

class Player {
  constructor() {
    this.board = new Gameboard();
  }

  getRandomMove(board) {
    const valid = [];

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const target = this.board.board[y][x];
        if (target === "water" || target instanceof Ship) {
          valid.push([y, x]);
        }
      }
    }

    const rand = Math.floor(Math.random() * valid.length);

    return valid[rand];
  }
}

export { Player };
