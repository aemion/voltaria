"use client";

import styles from "./page.module.css";
import Crosswords from "./Crosswords/Crosswords";
import sample from "./Crosswords/sample";
import { useState } from "react";
import Clues from "./Crosswords/Clues";

export default function Home() {
  const [grid, setGrid] = useState(sample);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Crosswords grid={grid} onChange={(grid) => setGrid(grid)} />
        <Clues clues={grid.clueCollection} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
