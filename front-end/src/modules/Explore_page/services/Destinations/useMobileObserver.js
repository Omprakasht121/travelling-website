import { useEffect, useRef, useState } from "react";

const useMobileObserver = (items) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(id)) setActiveIndex(id);
          }
        });
      },
      { root: container, threshold: 0.51 }
    );

    observerRef.current = observer;
    Array.from(container.children).forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, [items]);

  return { containerRef, activeIndex };
};

export default useMobileObserver;
