"use client";

import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import Cell from "./Cell";
import Vector2D from "./Vector2D";
import { isChar } from "./Char";
import styles from "./crosswords.module.css";
import { useFocus } from "./useFocus";
import { Direction } from "./Direction";
import Grid from "./Grid";

const cellSize = 40;

export default function Crosswords({
  grid,
  onChange,
}: {
  grid: Grid;
  onChange: (grid: Grid) => void;
}) {
  const [cursor, setCursor] = useState(new Vector2D(0, 0));
  const [wordDirection, setWordDirection] = useState(new Vector2D(1, 0));
  const [ref, isFocused, setFocused] = useFocus<HTMLInputElement>();
  const [input, setInput] = useState("");

  const doMove = (direction: Vector2D) => {
    const nexCursor = cursor.add(direction);
    if (grid.isEditable(nexCursor)) {
      setCursor(nexCursor);
    }
  };

  const move = (e: KeyboardEvent) => {
    const directions: { [key: string]: Vector2D } = {
      ArrowDown: Direction.Horizontal.vector,
      ArrowUp: Direction.Horizontal.vector.opposite(),
      ArrowLeft: Direction.Vertical.vector.opposite(),
      ArrowRight: Direction.Vertical.vector,
    };
    const direction = directions[e.code];

    if (direction === undefined) {
      return;
    }
    e.preventDefault();

    setWordDirection(
      new Vector2D(Math.abs(direction.x), Math.abs(direction.y))
    );
    // TODO maybe put the focused full word in the input
    setInput("");

    doMove(direction);
  };

  const deleteValue = (e: KeyboardEvent) => {
    if (!grid.isEditable(cursor)) {
      return;
    }

    if (!["Delete", "Backspace"].includes(e.key)) {
      return;
    }

    onChange(grid.withValue(cursor, ""));
    if (e.key === "Backspace") {
      doMove(wordDirection.opposite());
    }

    e.preventDefault();
    setInput(input.slice(0, -1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    move(e);
    deleteValue(e);
  };

  const handleMouseDown = (e: MouseEvent, position: Vector2D) => {
    e.preventDefault();
    if (grid.isEditable(position)) {
      setCursor(position);
      setFocused(true);
    }
  };

  // TODO check with autocorrect, etc...
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const value = inputValue.slice(-1).toUpperCase();

    if (inputValue.length !== input.length + 1) {
      return;
    }

    if (!isChar(value)) {
      return;
    }

    if (!grid.isValueWritable(value)) {
      return;
    }

    onChange(grid.withValue(cursor, value));
    setInput(`${input}${value}`);
    doMove(wordDirection);
  };

  return (
    <>
      <input
        className={styles.input}
        value={input}
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        ref={ref}
      />
      <svg
        className={styles.grid}
        width={cellSize * grid.width + 1}
        height={cellSize * grid.height + 1}
        shapeRendering={"crispEdges"}
      >
        {grid.getCells().map(({ position, value }) => (
          <Cell
            key={grid.toIndex(position)}
            symbol={value}
            {...position}
            size={cellSize}
            isHighlighted={position.equals(cursor) && isFocused}
            isActive={position.equals(cursor) && isFocused}
            onMouseDown={(e) => handleMouseDown(e, position)}
          />
        ))}
      </svg>
    </>
  );
}
