export type Letter =
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
  | "Z";

export type Char = Letter | "#" | "";

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

  return isLetter(s);
}

export function isLetter(s: string): s is Letter {
  if (s.length !== 1) {
    return false;
  }

  const charCode = s.charCodeAt(0);

  return charCode >= 65 && charCode <= 90;
}
