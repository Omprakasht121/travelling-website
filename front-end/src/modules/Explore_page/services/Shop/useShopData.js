import { useEffect, useState } from "react";
import { getContent } from "../../../../shared/services/contentService";


const useShopData = (region) => {
  const [shopsData, setShopsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent(region, "shops");

        const mappedData = data.map((item) => ({
          name: item.title,
          distance: item.distance || "N/A",
          location: item.region || region,
          description: item.description,
          images: [
            ...(item.mainImage ? [item.mainImage] : []),
            ...(Array.isArray(item.gallery) ? item.gallery : []),
          ],
        }));

        setShopsData(mappedData);
      } catch (err) {
        console.error("Error fetching shops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region]);

  return { shopsData, loading };
};

export default useShopData;
