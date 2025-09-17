class Ship {
  constructor(length = 3) {
    this.length = length;
    this.hits = 0;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    return this.length <= this.hits;
  }
}

export { Ship };
