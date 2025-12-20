import { useEffect, useState } from "react";
import { getContent } from "../../../../shared/services/contentService";


const useHotelData = (region) => {
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent(region, "hotels");

        const mapped = data.map((item) => ({
          name: item.title,
          beforePrice: item.distance || "N/A",
          location: item.location || region,
          rating: item.rating || "4.5",
          ratingLabel: item.description || "good",
          price: item.price || "N/A",
          phone: item.phone || "96******48",
          images: [
            ...(item.mainImage ? [item.mainImage] : []),
            ...(Array.isArray(item.gallery) ? item.gallery : []),
          ],
        }));

        setHotelsData(mapped);
      } catch (err) {
        console.error("Hotel fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region]);

  return { hotelsData, loading };
};

export default useHotelData;
