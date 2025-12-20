import { useEffect, useState } from "react";
import { fallbackCover, fallbackProfile } from "./constants";
import { getContent } from "../../../../shared/services/contentService";

const useCreatorsData = (region) => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const data = await getContent(region, "creators");
        if (!Array.isArray(data)) return;

        const mapped = data.map((c) => {
          const coverPhoto =
            c.mainImage || (Array.isArray(c.gallery) && c.gallery[0]) || null;

          const profilePic =
            c.profilePic ||
            (Array.isArray(c.gallery) && c.gallery[0]) ||
            c.mainImage ||
            null;

          return {
            id: c._id,
            name: c.title || "Untitled",
            bio: c.description || "",
            category: c.segment || c.category || "Creator",
            categorySlug: (c.segment || c.category || "other").toLowerCase(),
            coverPhoto: coverPhoto || fallbackCover,
            profilePic: profilePic || fallbackProfile,
            social: {
              instagram: c.instagram_url || "",
              youtube: c.youtube_url || "",
              facebook: c.facebook_url || "",
            },
            contact: {
              phone: c.phone || "",
              email: c.email || "",
              whatsapp: c.whatsapp || "",
            },
            stats: {
              posts: c.posts || 0,
              followers: c.followers || "0",
              following: c.following || 0,
            },
            bestPhotos: Array.isArray(c.gallery) ? c.gallery : [],
          };
        });

        setCreators(mapped);
      } catch (err) {
        console.error("CREATOR FETCH ERROR:", err);
      }
    };

    fetchCreators();
  }, [region]);

  return creators;
};

export default useCreatorsData;
