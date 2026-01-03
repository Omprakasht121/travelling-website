// src/modules/events/hooks/useEventData.js
import { useEffect, useState } from "react";
import { getContent } from "../../../../shared/services/contentService";
import { staticEvents } from "./StaticEvents";


export const useEventData = (region) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getContent(region, "events");

        const uploadedEvents = (Array.isArray(data) ? data : []).map((it) => ({
          id: it._id,
          title: it.title || "Untitled Event",
          date: it.date || "No date",
          location: it.location || "Unknown",
          img: it.mainImage || "",
          gallery: Array.isArray(it.gallery) ? it.gallery : [],
          badgeDate: {
            month: (it.month || "JAN").toUpperCase(),
            day: it.day || "01",
          },
          description: it.description || "",
        }));

        // ✅ STRICT RULE
        if (uploadedEvents.length > 0) {
          setEvents(uploadedEvents); 
        } else {
          setEvents(staticEvents); 
        }
      } catch (e) {
        console.error("EVENT FETCH ERROR:", e);
        setEvents(staticEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [region]);

  return { events, loading };
};
