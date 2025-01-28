"use client";

import { KeyboardEvent, useState } from "react";
import Cell from "./Cell";
import Vector2D from "./Vector2D";
import Grid from "./Grid";
import { isChar } from "./Char";
import { useFocus } from "./useFocus";

const cellSize = 40;

export default function Crosswords() {
  const [grid, setGrid] = useState(
    new Grid(["A", "#", "C", "D", "E", "F", "G", "H"], 4)
  );
  const [cursor, setCursor] = useState(new Vector2D(0, 0));

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
    const nexCursor = cursor.add(direction);
    if (grid.isInside(nexCursor)) {
      setCursor(nexCursor);
    }
  };

  const changeValue = (e: KeyboardEvent<SVGElement>) => {
    if (e.ctrlKey) {
      return;
    }

    if (e.code === "Delete" || e.code === "Backspace") {
      setGrid(grid.withValue(cursor, ""));
    }

    const value = e.key.toUpperCase();
    if (!isChar(value)) {
      return;
    }

    setGrid(grid.withValue(cursor, value));
  };

  const handleKeyDown = (e: KeyboardEvent<SVGElement>) => {
    move(e);
    changeValue(e);
  };

  const [ref, isFocused, setFocused] = useFocus<SVGSVGElement>();

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
