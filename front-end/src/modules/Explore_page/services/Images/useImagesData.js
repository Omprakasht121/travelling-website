import { useEffect, useState } from "react";

import { getContent } from "../../../../shared/services/contentService";
import { staticImages } from "./StaticImages";

const useImagesData = (region = "mauranipur") => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState(staticImages[0]);
  const [smallImages, setSmallImages] = useState(staticImages.slice(1, 5));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent(region, "images");

        const mapped = data.map((item) => ({
          mainImage: item.mainImage || "",
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

  useEffect(() => {
    if (!galleryData.length) return;

    const uploadedMain = galleryData.find((g) => g.mainImage);
    const chosenMain = uploadedMain
      ? uploadedMain.mainImage
      : staticImages[0];

    const uploadedGallery = galleryData.flatMap((g) => g.gallery || []);
    const smallPool = [
      ...uploadedGallery.filter(Boolean),
      ...staticImages.filter((s) => s !== chosenMain),
    ].slice(0, 4);

    setMainImage(chosenMain);
    setSmallImages(smallPool);
  }, [galleryData]);

  const allImages = [
    ...staticImages,
    ...galleryData.flatMap((g) => [g.mainImage, ...(g.gallery || [])]),
  ].filter(Boolean);

  return {
    loading,
    mainImage,
    smallImages,
    allImages,
    setSmallImages,
  };
};

export default useImagesData;
