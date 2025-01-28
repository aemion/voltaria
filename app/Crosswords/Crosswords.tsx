"use client";

import { KeyboardEvent, useState } from "react";
import Cell from "./Cell";
import Vector2D from "./Vector2D";
import Grid from "./Grid";
import { Char, isChar } from "./Char";
import { useFocus } from "./useFocus";

const cellSize = 40;

export default function Crosswords() {
  const [grid, setGrid] = useState(
    new Grid(
      ("VOLTARIA".split("") as Char[])
        .concat(new Array(8 * 11).fill(""))
        .with(11, "#")
        .with(12, "#"),
      8
    )
  );
  const [cursor, setCursor] = useState(new Vector2D(0, 1));
  const [wordDirection, setWordDirection] = useState(new Vector2D(1, 0));
  const [ref, isFocused, setFocused] = useFocus<SVGSVGElement>();

  const doMove = (direction: Vector2D) => {
    const nexCursor = cursor.add(direction);
    if (grid.isInside(nexCursor)) {
      setCursor(nexCursor);
    }
  };

  const move = (e: KeyboardEvent<SVGElement>) => {
    const directions: { [key: string]: Vector2D } = {
      ArrowDown: new Vector2D(0, 1),
      ArrowUp: new Vector2D(0, -1),
      ArrowLeft: new Vector2D(-1, 0),
      ArrowRight: new Vector2D(1, 0),
    };
    const direction = directions[e.code];

    if (direction === undefined) {
      return;
    }

    setWordDirection(
      new Vector2D(Math.abs(direction.x), Math.abs(direction.y))
    );

    doMove(direction);
  };

  const changeValue = (e: KeyboardEvent<SVGElement>) => {
    if (e.ctrlKey) {
      return;
    }

    if (e.code === "Delete" || e.code === "Backspace") {
      setGrid(grid.withValue(cursor, ""));
      if (e.code === "Backspace") {
        doMove(wordDirection.opposite());
      }

      return;
    }

    const value = e.key.toUpperCase();
    if (!isChar(value)) {
      return;
    }

    setGrid(grid.withValue(cursor, value));
    doMove(wordDirection);
  };

  const handleKeyDown = (e: KeyboardEvent<SVGElement>) => {
    move(e);
    changeValue(e);
  };

  return (
    <svg
      ref={ref}
      tabIndex={0}
      style={{ dominantBaseline: "hanging", outline: "none" }}
      onKeyDown={handleKeyDown}
      width={cellSize * grid.width + 1}
      height={cellSize * grid.height + 1}
      shapeRendering={"crispEdges"}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {grid.getCells().map(({ position, value }) => (
        <Cell
          key={grid.toIndex(position)}
          symbol={value}
          {...position}
          size={cellSize}
          isHighlighted={position.equals(cursor) && isFocused}
          isActive={position.equals(cursor) && isFocused}
          onMouseDown={() => setCursor(position)}
        />
      ))}
    </svg>
  );
}
