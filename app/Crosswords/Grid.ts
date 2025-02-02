import { Char } from "./Char";
import Vector2D from "./Vector2D";

export enum Mode {
  Solve,
  Build,
}

class Grid {
  readonly height: number;
  constructor(
    readonly values: Char[],
    readonly width: number,
    readonly mode: Mode
  ) {
    if (!Number.isInteger(width)) {
      throw new Error("Width must be integer");
    }

    const length = values.length;
    if (length === 0 || length % width !== 0) {
      throw new Error("Incorrect number of values in grid");
    }
    this.height = length / width;
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
      this.mode
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

    return this.values[this.toIndex(position)] !== "#";
  }

  toIndex(position: Vector2D) {
    return position.x + position.y * this.width;
  }

  private toPosition(index: number) {
    return new Vector2D(index % this.width, Math.floor(index / this.width));
  }

  getCells(): Array<{ position: Vector2D; value: Char }> {
    return this.values.map((value, index) => ({
      position: this.toPosition(index),
      value,
    }));
  }
}

export default Grid;
