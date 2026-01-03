import { useEffect, useState } from "react";
import { getContent } from "../../../../shared/services/contentService";
import { staticImages } from "./StaticImages";

const useImagesData = (region) => {
  const [loading, setLoading] = useState(true);
  const [galleryData, setGalleryData] = useState([]);

  const [mainImage, setMainImage] = useState(null);
  const [smallImages, setSmallImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

  /* ----------------------------------
     FETCH DATA
  ----------------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent(region, "images");

        const mapped = data.map((item) => ({
          mainImage: item.mainImage || null,
          gallery: item.galleryImages || item.gallery || item.images || [],
        }));

        setGalleryData(mapped);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region]);

  /* ----------------------------------
     DECISION LOGIC
  ----------------------------------- */
  useEffect(() => {
    const hasUploaded = galleryData.length > 0;

    if (!hasUploaded) {
      // ✅ NO UPLOAD → STATIC ONLY
      setMainImage(staticImages[0]);
      setSmallImages(staticImages.slice(1, 5));
      setAllImages(staticImages);
      return;
    }

    // ✅ UPLOADED EXISTS → UPLOADED ONLY
    const uploadedImages = galleryData.flatMap((g) => [
      g.mainImage,
      ...(g.gallery || []),
    ]).filter(Boolean);

    setMainImage(uploadedImages[0]);
    setSmallImages(uploadedImages.slice(1, 5));
    setAllImages(uploadedImages);
  }, [galleryData]);

  return {
    loading,
    mainImage,
    smallImages,
    allImages,
    setSmallImages,
  };
};

export default useImagesData;
