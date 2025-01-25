class Vector2D {
  constructor(readonly x: number, readonly y: number) {}

  add(p: Vector2D): Vector2D {
    return new Vector2D(p.x + this.x, p.y + this.y);
  }

  equals(b: Vector2D) {
    return this.x === b.x && this.y === b.y;
  }
}

export default Vector2D;
