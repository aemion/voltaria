import { ClueCollection } from "./Clue";

export default function Clues({ clues }: { clues: ClueCollection }) {
  return (
    <div>
      <h2>Horizontal</h2>
      <ul>
        {clues.getHorizontalGroupedByRow().map((clues, index) => (
          <li key={index}>{clues.map((clue) => clue.clue).join(". ")}</li>
        ))}
      </ul>
      <h2>Vertical</h2>
      <ul>
        {clues.getVerticalGroupedByColumn().map((clues, index) => (
          <li key={index}>{clues.map((clue) => clue.clue).join(". ")}</li>
        ))}
      </ul>
    </div>
  );
}
