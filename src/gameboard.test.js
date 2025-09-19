import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

describe("Gameboard Class", () => {
  let game;
  beforeEach(() => {
    game = new Gameboard();
  });

  test("Gameboard class initializes", () => {
    expect(game.board[0][0]).toBe("water");
  });

  test("Ship Places.", () => {
    const ship = new Ship();

    expect(game.placeShip(2, 3, "horizontal", ship)).toBe(true);
    expect(game.board[3][2]).not.toBe("water");
    expect(game.board[3][2]).toBe(ship);
    expect(game.board[3][3]).toBe(ship);
    expect(game.board[3][4]).toBe(ship);
  });

  test("Incorrect Locations", () => {
    const ship = new Ship();

    expect(game.placeShip(10, 10, "vertical", ship)).toBe(false);
  });

  test("Incorrect Orientations", () => {
    const ship = new Ship();

    expect(game.placeShip(3, 2, "diagonal", ship)).toBe(false);
  });

  test("Overlapping ships", () => {
    const ship1 = new Ship();
    const ship2 = new Ship();

    expect(game.placeShip(2, 3, "horizontal", ship1)).toBe(true);
    expect(game.placeShip(2, 3, "horizontal", ship2)).toBe(false);
    expect(game.placeShip(2, 3, "vertical", ship2)).toBe(false);
    expect(game.placeShip(2, 4, "vertical", ship2)).toBe(true);
  });

  test("Hitting a ship", () => {
    const ship = new Ship();
    game.placeShip(0, 0, "vertical", ship);

    game.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
    expect(game.board[0][0]).toBe("hit");
  });

  test("Sinking a ship", () => {
    const ship = new Ship();
    game.placeShip(0, 0, "vertical", ship);

    game.receiveAttack(0, 0);
    game.receiveAttack(0, 1);
    game.receiveAttack(0, 2);
    expect(ship.hits).toBe(3);
    expect(ship.isSunk()).toBe(true);
  });

  test("Missing a ship", () => {
    game.receiveAttack(0, 0);
    expect(game.board[0][0]).toBe("missed");
  });

  test("All ships sunk correctly registers.", () => {
    const ship = new Ship(1);

    game.placeShip(0, 0, "vertical", ship);

    game.receiveAttack(0, 0);

    expect(game.areAllSunk()).toBe(true);
  });

  test("All ships sunk doesn't incorrectly register", () => {
    const ship = new Ship(3);

    game.placeShip(0, 0, "vertical", ship);

    game.receiveAttack(0, 0);

    expect(game.areAllSunk()).toBe(false);
  });

  test("All ships sunk works when no ships are placed", () => {
    expect(game.areAllSunk()).toBe(true);
  });
});
