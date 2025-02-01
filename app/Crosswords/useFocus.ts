import { RefObject, useEffect, useRef, useState } from "react";

export function useFocus<T extends SVGElement | HTMLElement>(): [
  RefObject<T | null>,
  boolean,
  (focus: boolean) => void
] {
  const ref = useRef<T>(null);
  const [isFocused, _setFocused] = useState(false);
  useEffect(() => {
    const element = ref.current;

    if (element) {
      const focus = () => _setFocused(true);
      element.addEventListener("focus", focus);
      const blur = () => _setFocused(false);
      element.addEventListener("blur", blur);

      element.focus();

      return () => {
        element.removeEventListener("focus", focus);
        element.removeEventListener("blur", blur);
      };
    }
  }, []);

  const setFocused = (value: boolean) => {
    if (value === isFocused || !ref.current) {
      return;
    }

    if (value === true && ref.current !== document.activeElement) {
      ref.current.focus();
    } else if (value === true && ref.current === document.activeElement) {
      ref.current.blur();
    }
  };

  return [ref, isFocused, setFocused];
}
