import { Char } from "./Char";

export default function Cell({
  x,
  y,
  size,
  symbol,
  highlighted,
  onMouseDown,
}: {
  x: number;
  y: number;
  size: number;
  symbol: Char;
  highlighted: boolean;
  onMouseDown?: () => void;
}) {
  const rectCoords = {
    x: x * size + 1,
    y: y * size + 1,
  };
  const textCoords = {
    x: rectCoords.x + size / 2,
    y: rectCoords.y + size / 2,
    dominantBaseline: "middle",
    textAnchor: "middle",
  };

  return (
    <g {...rectCoords} width={size} height={size} onMouseDown={onMouseDown}>
      <rect
        {...rectCoords}
        width={size}
        height={size}
        fill={highlighted ? "yellow" : symbol !== "#" ? "transparent" : "#000"}
        stroke="black"
        strokeWidth={1}
      ></rect>
      <text {...textCoords} width={size} height={size}>
        {symbol}
      </text>
    </g>
  );
}
