import { useEffect, useState } from "react";

const useHorizontalScroll = (containerRef, loading, deps = []) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loading) return;

    const checkScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      const maxScroll = container.scrollWidth - container.clientWidth;
      setCanScrollRight(container.scrollLeft < maxScroll - 1);
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll, { passive: true });

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      resizeObserver.disconnect();
    };
  }, [loading, ...deps]);

  return { canScrollLeft, canScrollRight };
};

export default useHorizontalScroll;
