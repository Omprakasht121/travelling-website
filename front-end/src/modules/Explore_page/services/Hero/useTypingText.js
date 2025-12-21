// src/modules/exploreHero/hooks/useTypingText.js
import { useEffect, useState } from "react";

export const useTypingText = (text, speed = 25) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setValue(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text]);

  return value;
};
