import { Ship } from "./ship";
class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill("water"));
  }

  reset() {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        this.board[y][x] = "water";
      }
    }
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

  receiveAttack(x, y) {
    if (x >= 10 || y >= 10 || x < 0 || y < 0) {
      return false;
    }

    let target = this.board[y][x];

    if (target === "water") {
      this.board[y][x] = "missed";
    } else if (target instanceof Ship) {
      target.hit();
      this.board[y][x] = { status: "hit", ship: target };
      return true;
    }
  }

  areAllSunk() {
    for (let row of this.board) {
      for (let element of row) {
        if (element instanceof Ship && !element.isSunk()) {
          return false;
        }
      }
    }
    return true;
  }

  getBoard() {
    return this.board;
  }
}

export { Gameboard };
