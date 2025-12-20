import { useEffect, useRef, useState } from "react";

export const useVideoLogic = (reels, loading) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setIndex((p) => (p + 1) % reels.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((p) => (p - 1 + reels.length) % reels.length);
  };

  const leftIndex = (index - 1 + reels.length) % reels.length;
  const rightIndex = (index + 1) % reels.length;
  const farRightIndex = (index + 2) % reels.length;

  // ----- MOBILE OBSERVER  -----
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loading || !reels.length) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.dataset.index);
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.51 }
    );

    observerRef.current = observer;
    Array.from(container.children).forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, [reels, loading]);

  return {
    index,
    direction,
    nextSlide,
    prevSlide,
    leftIndex,
    rightIndex,
    farRightIndex,
    containerRef,
    activeIndex,
  };
};
