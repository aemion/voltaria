"use client";

import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import Cell from "./Cell";
import Vector2D from "./Vector2D";
import Grid, { Mode } from "./Grid";
import { Char, isChar } from "./Char";
import styles from "./crosswords.module.css";
import { useFocus } from "./useFocus";

const cellSize = 40;

export default function Crosswords() {
  const [grid, setGrid] = useState(
    new Grid(
      ("VOLTARIA".split("") as Char[])
        .concat(new Array(8 * 11).fill(""))
        .with(11, "#")
        .with(12, "#"),
      8,
      Mode.Solve
    )
  );
  const [cursor, setCursor] = useState(new Vector2D(0, 1));
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
      ArrowDown: new Vector2D(0, 1),
      ArrowUp: new Vector2D(0, -1),
      ArrowLeft: new Vector2D(-1, 0),
      ArrowRight: new Vector2D(1, 0),
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

    setGrid(grid.withValue(cursor, ""));
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

    setGrid(grid.withValue(cursor, value));
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
