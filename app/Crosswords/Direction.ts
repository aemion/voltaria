import Vector2D from "./Vector2D";

export enum Directions {
  Horizontal = "H",
  Vertical = "V",
}

export class Direction {
  static Horizontal = new Direction(Directions.Horizontal);
  static Vertical = new Direction(Directions.Vertical);

  readonly vector: Vector2D;
  constructor(readonly direction: Directions) {
    if (this.direction === Directions.Horizontal) {
      this.vector = new Vector2D(0, 1);
    } else {
      this.vector = new Vector2D(1, 0);
    }
  }
}
