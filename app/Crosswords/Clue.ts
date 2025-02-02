import { Direction, Directions } from "./Direction";
import Grid from "./Grid";
import Vector2D from "./Vector2D";

export class Clue {
  constructor(
    readonly start: Vector2D,
    readonly direction: Direction,
    readonly clue: string
  ) {}

  key(): string {
    return `${this.start.x}:${this.start.y}:${this.direction.direction}`;
  }

  withClue(clue: string) {
    return new Clue(this.start, this.direction, clue);
  }
}

export class ClueCollection {
  private clues: { [key: string]: Clue };

  constructor(clues: Clue[]) {
    this.clues = Object.fromEntries(clues.map((clue) => [clue.key(), clue]));
  }

  static fromGrid(grid: Grid): ClueCollection {
    const clues: Clue[] = [];
    [Direction.Horizontal, Direction.Vertical].forEach((direction) => {
      let length = 0;
      let start = new Vector2D(0, 0);
      grid
        .getCells(direction.direction)
        .forEach(({ position, value, isLast }) => {
          if (length === 0) {
            start = position;
          }

          if (isLast || value === "#") {
            if (length > 1) {
              clues.push(new Clue(start, direction, ""));
            }
            length = 0;
          } else {
            length++;
          }
        });
    });

    return new ClueCollection(clues);
  }

  withClue(clue: Clue): ClueCollection {
    if (this.clues[clue.key()] === clue) {
      return this;
    }

    const collection = new ClueCollection([]);
    collection.clues = Object.assign(this.clues, { [clue.key()]: clue });
    return collection;
  }

  getClues() {
    return this.clues;
  }

  getHorizontal() {
    return Object.values(this.clues).filter(
      (clue) => clue.direction.direction === Directions.Horizontal
    );
  }

  getVertical() {
    return Object.values(this.clues).filter(
      (clue) => clue.direction.direction === Directions.Horizontal
    );
  }

  getHorizontalGroupedByRow() {
    const horizontal = this.getHorizontal().toSorted(
      (a, b) => a.start.x - b.start.x
    );
    const result: Clue[][] = [];
    horizontal.forEach((clue) => (result[clue.start.y] ||= []).push(clue));

    return result;
  }

  getVerticalGroupedByColumn() {
    const vertical = this.getVertical().toSorted(
      (a, b) => a.start.y - b.start.y
    );
    const result: Clue[][] = [];
    vertical.forEach((clue) => (result[clue.start.y] ||= []).push(clue));

    return result;
  }
}
