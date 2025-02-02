import { Char } from "./Char";
import { ClueCollection } from "./Clue";
import { Directions } from "./Direction";
import Vector2D from "./Vector2D";

export enum Mode {
  Solve,
  Build,
}

type Cell = {
  position: Vector2D;
  value: Char;
  isFirst: boolean;
  isLast: boolean;
};

class Grid {
  readonly height: number;
  readonly clueCollection: ClueCollection;
  constructor(
    readonly values: Char[],
    readonly width: number,
    readonly mode: Mode,
    clueCollection?: ClueCollection
  ) {
    if (!Number.isInteger(width)) {
      throw new Error("Width must be integer");
    }

    const length = values.length;
    if (length === 0 || length % width !== 0) {
      throw new Error("Incorrect number of values in grid");
    }
    this.height = length / width;

    this.clueCollection = clueCollection || ClueCollection.fromGrid(this);
  }

  withValue(position: Vector2D, value: Char): Grid {
    if (!this.isEditable(position)) {
      return this;
    }

    if (value === "#" && this.mode === Mode.Solve) {
      return this;
    }

    return new Grid(
      this.values.with(this.toIndex(position), value),
      this.width,
      this.mode,
      this.clueCollection
    );
  }

  clean(): Grid {
    return new Grid(
      this.values.map((value) => (value === "#" ? "#" : "")),
      this.width,
      this.mode,
      this.clueCollection
    );
  }

  isInside(position: Vector2D): boolean {
    return (
      position.x < this.width &&
      position.x >= 0 &&
      position.y < this.height &&
      position.y >= 0
    );
  }

  isValueWritable(value: Char): boolean {
    if (value === "#" && this.mode === Mode.Solve) {
      return false;
    }

    return true;
  }

  isEditable(position: Vector2D): boolean {
    if (!this.isInside(position)) {
      return false;
    }

    if (this.mode === Mode.Build) {
      return true;
    }

    return this.getValue(position) !== "#";
  }

  toIndex(position: Vector2D) {
    return position.x + position.y * this.width;
  }

  private toPosition(index: number) {
    return new Vector2D(index % this.width, Math.floor(index / this.width));
  }

  getCells(direction: Directions = Directions.Horizontal): Cell[] {
    return this.values.map((_, index) => {
      const realIndex =
        direction === Directions.Horizontal
          ? index
          : (index % this.height) * this.width +
            Math.floor(index / this.height);
      const size =
        direction === Directions.Horizontal ? this.width : this.height;
      const positionInCollection = index % size;
      return {
        position: this.toPosition(realIndex),
        value: this.values[realIndex],
        isFirst: positionInCollection === 0,
        isLast: positionInCollection === size - 1,
      };
    });
  }

  private getValue(position: Vector2D): Char {
    return this.values[this.toIndex(position)];
  }
}

export default Grid;
