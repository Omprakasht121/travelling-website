import { useEffect, useState } from "react";

import staticDestination from "./staticDestination";
import { getContent } from "../../../../shared/services/contentService";


const useDestinationData = (region) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent(region, "destinations");

        const mappedData = data.map((item) => ({
          name: item.title,
          desc: item.description,
          location: item.location,
          mapLink: item.mapLink,
          img: item.mainImage || "",
          images: [item.mainImage, ...(item.gallery || [])],
        }));

        const merged = [
          ...mappedData, ...staticDestination.map((s) => ({
            ...s,
            images: [s.img, ...(s.images || [])],
          }))
          
        ];

        setDestinations(merged);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region]);

  return { destinations, loading };
};

export default useDestinationData;
