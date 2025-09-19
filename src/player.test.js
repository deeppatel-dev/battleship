import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";

describe("Player Class", () => {
  let player;
  beforeEach(() => {
    player = new Player();
  });

  test("Player Class Initializes", () => {
    expect(player.board.board[0][0]).toBe("water");
  });

  test("getRandomMove()", () => {
    const move = player.getRandomMove();

    expect(move.length).toBe(2);
    expect(move[0]).toBeGreaterThanOrEqual(0);
    expect(move[0]).toBeLessThan(10);
    expect(move[1]).toBeGreaterThanOrEqual(0);
    expect(move[1]).toBeLessThan(10);
  });
});
