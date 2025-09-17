import { Ship } from "./ship";

describe("Ship Class", () => {
  test("Ship Initialization", () => {
    const ship = new Ship();
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  test("Increments hits correctly", () => {
    const ship = new Ship();
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("Ship sinks.", () => {
    const ship = new Ship();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("Ship works with different lengths", () => {
    const ship = new Ship(5);
    expect(ship.length).toBe(5);
    expect(ship.hits).toBe(0);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(5);
    expect(ship.isSunk()).toBe(true);
  });
});
