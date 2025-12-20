import { useEffect, useState } from "react";
import { getContent } from "../../../../shared/services/contentService";


const useFoodData = (region) => {
  const [foodsData, setFoodsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent(region, "food");

        const mappedData = data.map((item) => ({
          name: item.title,
          distance: item.distance || "N/A",
          location: item.location || region,
          description: item.description || "Famous local cuisine",
          phone: item.phone || "96******48",
          mapLink: item.mapLink,
          images: [
            ...(item.mainImage ? [item.mainImage] : []),
            ...(Array.isArray(item.gallery) ? item.gallery : []),
          ],
        }));

        setFoodsData(mappedData);
      } catch (error) {
        console.error("Food fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region]);

  return { foodsData, loading };
};

export default useFoodData;
