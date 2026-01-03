// src/modules/exploreHero/hooks/useHeroAds.js
import { useEffect, useState } from "react";
import { getContent } from "../../../../shared/services/contentService";

const backendURL = import.meta.env.VITE_BASE_URL;

export const useHeroAds = (region, staticImages) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImagePath = (img) => {
    if (!img) return "/fallback.jpg";
    if (typeof img !== "string") return "/fallback.jpg";

    if (img.startsWith("http")) return img;

    if (img.startsWith("/uploads") || img.startsWith("uploads")) {
      return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
    }

    return img;
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await getContent(region, "advertisement");

        const uploadedAds = (Array.isArray(data) ? data : []).map((d) => ({
          img: d.mainImage || d.gallery?.[0] || "",
        }));

        // ✅ STRICT RULE
        if (uploadedAds.length > 0) {
          setImages(uploadedAds); // ONLY uploaded
        } else {
          setImages(staticImages); // ONLY static
        }
      } catch (e) {
        console.error("Hero Ads fetch error:", e);
        setImages(staticImages); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [region, staticImages]);

  return { images, loading, getImagePath };
};
