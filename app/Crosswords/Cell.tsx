import { Char } from "./Char";

export default function Cell({
  x,
  y,
  symbol,
  highlighted,
  onClick,
}: {
  x: number;
  y: number;
  symbol: Char;
  highlighted: boolean;
  onClick?: () => void;
}) {
  const size = 40;
  const rectCoords = {
    x: x * size - (x > 0 ? 0.5 : 0),
    y: y * size - (y > 0 ? 0.5 : 0),
  };
  const textCoords = {
    x: rectCoords.x + size / 2,
    y: rectCoords.y + size / 2,
    dominantBaseline: "middle",
    textAnchor: "middle",
  };
  return (
    <g {...rectCoords} width={size} height={size} onClick={onClick}>
      <rect
        {...rectCoords}
        width={size}
        height={size}
        fill={highlighted ? "yellow" : symbol !== "#" ? "transparent" : "#000"}
        stroke="black"
        strokeWidth={0.5}
      ></rect>
      <text {...textCoords} width={size} height={size}>
        {symbol}
      </text>
    </g>
  );
}
