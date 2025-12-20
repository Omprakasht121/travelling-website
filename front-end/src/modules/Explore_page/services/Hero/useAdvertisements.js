import { useEffect, useState } from "react";
import { getContent } from "../../../../shared/services/contentService";
import { staticAds } from "./staticAds";


const useAdvertisements = (region) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent(region, "advertisement");
        const mapped = data.map((item) => ({
          img: item.mainImage || item.galleryImages?.[0] || "",
        }));
        setAds([...staticAds, ...mapped]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [region]);

  useEffect(() => {
    if (!ads.length) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % ads.length);
    }, 8000);
    return () => clearInterval(id);
  }, [ads.length]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 1 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    }),
  };

  return { ads, current, direction, variants, loading };
};

export default useAdvertisements;
