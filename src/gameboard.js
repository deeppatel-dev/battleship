import { Ship } from "./ship";
class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill("water"));
  }
  placeShip(x, y, placement, ship) {
    const length = ship.length;

    if (x >= 10 || y >= 10) {
      return false;
    }

    placement = placement.toLowerCase();

    if (placement === "horizontal") {
      if (x + length >= 10) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (this.board[y][x + i] !== "water") {
          return false;
        }
      }
    } else if (placement === "vertical") {
      if (y + length >= 10) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        if (this.board[y + i][x] !== "water") {
          return false;
        }
      }
    } else {
      return false;
    }
    for (let i = 0; i < length; i++) {
      if (placement === "horizontal") {
        this.board[y][x + i] = ship;
      } else if (placement === "vertical") {
        this.board[y + i][x] = ship;
      }
    }

    return true;
  }
}

export { Gameboard };
