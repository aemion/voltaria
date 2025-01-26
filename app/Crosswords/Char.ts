export type Char =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "#"
  | "";

export function isChar(s: string): s is Char {
  if (s.length === 0) {
    return true;
  }

  if (s.length > 1) {
    return false;
  }

  if (s === "#") {
    return true;
  }

  const charCode = s.charCodeAt(0);

  return charCode >= 65 && charCode <= 90;
}
