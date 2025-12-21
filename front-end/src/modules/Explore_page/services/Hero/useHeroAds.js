// src/modules/exploreHero/hooks/useHeroAds.js
import { useEffect, useState } from "react";
import { getContent } from "../../../../shared/services/contentService";

const backendURL = import.meta.env.VITE_BASE_URL;

export const useHeroAds = (region, staticImages) => {
  const [images, setImages] = useState(staticImages);
  const [loading, setLoading] = useState(true);

  const getImagePath = (img) => {   
    if (!img) return "/fallback.jpg";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads") || img.startsWith("uploads"))
      return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
    return img;
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await getContent(region, "advertisement");
        const mapped = data.map((d) => ({
          img: d.mainImage || d.galleryImages?.[0] || "",
        }));
        setImages([...staticImages, ...mapped]);
      } catch (e) {
        setImages(staticImages);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [region]);

  return { images, loading, getImagePath };
};
