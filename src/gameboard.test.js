import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

describe("Gameboard Class", () => {
  test("Gameboard class initializes", () => {
    const game = new Gameboard();
    expect(game.board[0][0]).toBe("water");
  });

  test("Ship Places.", () => {
    const game = new Gameboard();
    const ship = new Ship();

    expect(game.placeShip(2, 3, "horizontal", ship)).toBe(true);
    expect(game.board[3][2]).not.toBe("water");
  });
});
