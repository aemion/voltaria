import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export function useFocus<T extends HTMLOrSVGElement>(): [
  RefObject<T | null>,
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const [isFocused, setFocused] = useState(false);
  return [ref, isFocused, setFocused];
}
