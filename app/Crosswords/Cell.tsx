import { MouseEventHandler, PropsWithChildren } from "react";
import { Char } from "./Char";

interface Props extends PropsWithChildren {
  x: number;
  y: number;
  size: number;
  symbol: Char;
  isHighlighted: boolean;
  isActive?: boolean;
  onMouseDown?: MouseEventHandler<SVGGElement>;
}

export default function Cell({
  x,
  y,
  size,
  symbol,
  isHighlighted,
  onMouseDown,
  isActive = false,
}: Props) {
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
  const cursorCoords = {
    x1: textCoords.x,
    x2: textCoords.x,
    y1: textCoords.y - size / 3,
    y2: textCoords.y + size / 5,
  };

  return (
    <g {...rectCoords} width={size} height={size} onMouseDown={onMouseDown}>
      <rect
        {...rectCoords}
        width={size}
        height={size}
        fill={
          isHighlighted ? "yellow" : symbol !== "#" ? "transparent" : "#000"
        }
        stroke="black"
        strokeWidth={1}
      ></rect>
      <text {...textCoords} width={size} height={size}>
        {symbol}
      </text>
      {isActive && (
        <line {...cursorCoords} stroke="black">
          <animate
            attributeName="stroke"
            values="#black;transparent"
            dur="1s"
            calcMode="discrete"
            repeatCount="indefinite"
          />
        </line>
      )}
    </g>
  );
}
