// src/modules/events/EventsOfMau.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Music,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { getContent } from "../services/contentService.js";

const backendURL = "http://localhost:5000";

// Static events (unchanged)
const staticEvents = [
  {
    id: "static-1",
    title: "DJ Night Party",
    date: "11 Nov 2022",
    location: "Aura Nightclub, CityName",
    img: `${import.meta.BASE_URL}orchha.jpg`,
    gallery: ["/jhansi6.jpg"],
    badgeDate: { month: "NOV", day: "19" },
    description: "Lorem ipsum dolor sit amet...",
  },
  {
    id: "static-2",
    title: "The Mission",
    date: "14 Nov 2022",
    location: "The Grand Arena, CityName",
    img: "https://placehold.co/400x600/2a0a2a/f0c0ff?text=The+Mission",
    gallery: ["/jhansi6.jpg"],
    badgeDate: { month: "NOV", day: "19" },
    description: "Lorem ipsum dolor sit amet...",
  },
];

// IMAGE PATH FIXER
const getImagePath = (img) => {
  if (!img) return "/fallback.jpg";
  if (img.startsWith("/uploads") || img.startsWith("uploads"))
    return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
  if (img.startsWith("/gallery") || img.startsWith("gallery"))
    return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
  if (img.startsWith("http")) return img;
  return `${import.meta.env.BASE_URL}${img}`;
};

// EVENT CARD
const EventCard = ({
  event,
  idx,
  onClick,
  activeIndexForCard,
  onMouseEnter,
  onMouseLeave,
}) => {
  const gallery = Array.isArray(event.gallery) ? event.gallery : [];

  const imgSrc =
    gallery.length > 0
      ? getImagePath(gallery[activeIndexForCard % gallery.length])
      : getImagePath(event.img);

  return (
    <motion.div
      className="relative flex-shrink-0 w-72 md:w-80 rounded-lg overflow-hidden shadow-2xl cursor-pointer"
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => onClick(idx)}
      onMouseEnter={() => onMouseEnter(idx)}
      onMouseLeave={() => onMouseLeave(idx)}
    >
      <img src={imgSrc} alt={event.title} className="w-full h-96 object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-[rgba(0,0,0,0)] pointer-events-none" />

      <div className="absolute top-4 right-4 bg-black/50 text-white rounded-lg p-2 text-center w-16 backdrop-blur-sm">
        <span className="block font-bold text-xl">
          {event.badgeDate?.month ?? "JAN"}
        </span>
        <span className="block text-lg">{event.badgeDate?.day ?? "01"}</span>
      </div>

      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white font-bold text-2xl">{event.title}</h3>
        <p className="text-gray-300 text-sm mt-1 flex items-center gap-2">
          <Calendar size={14} /> {event.date}
        </p>
        <p className="text-gray-300 text-sm flex items-center gap-2">
          <MapPin size={14} /> {event.location}
        </p>
      </div>
    </motion.div>
  );
};

// MAIN COMPONENT
export default function EventsOfMau() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeImageIndex, setActiveImageIndex] = useState([]);
  const hoverIntervalsRef = useRef({});

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // FETCH EVENTS
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getContent("mauranipur", "events");

        const mapped = (Array.isArray(data) ? data : []).map((it) => ({
          id: it._id,
          title: it.title || "Untitled Event",
          date: it.date || "No date",
          location: it.location || "Unknown Location",
          img: it.mainImage || it.img || "",
          gallery: Array.isArray(it.gallery) ? it.gallery : [],
          badgeDate: {
            month: (it.month || "JAN").toUpperCase(),
            day: it.day || "01",
          },
          description: it.description || "",
        }));

        const combined = [...staticEvents, ...mapped];
        setEvents(combined);
        setActiveImageIndex(Array(combined.length).fill(0));
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([...staticEvents]);
        setActiveImageIndex(Array(staticEvents.length).fill(0));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // HOVER START
  const handleCardMouseEnter = (i) => {
    const speed = 800;
    if (hoverIntervalsRef.current[i])
      clearInterval(hoverIntervalsRef.current[i]);

    hoverIntervalsRef.current[i] = setInterval(() => {
      setActiveImageIndex((p) => {
        const copy = [...p];
        copy[i] = (copy[i] ?? 0) + 1;
        return copy;
      });
    }, speed);
  };

  // HOVER STOP
  const handleCardMouseLeave = (i) => {
    clearInterval(hoverIntervalsRef.current[i]);
    delete hoverIntervalsRef.current[i];
  };

  // CLICK CARD → HERO CHANGE
  const handleCardClick = (i) => {
    if (i === current) return;
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };



// ✅ Initialize activeImageIndex state *after* displayShops is populated
    useEffect(() => {
      if (events.length > 0) {
        setActiveImageIndex(Array(events.length).fill(0));
      }
    }, [events.length]);
  
  
    // Scroll left/right functions
    const scrollLeft = () => {
      containerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    };
  
    const scrollRight = () => {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    };
  
    // 1. --- ⚡️ FIX 1: BUTTON LOGIC ---
    // This useEffect now correctly handles button states and re-runs on data load
    useEffect(() => {
      const container = containerRef.current;
      if (!container || loading) return; // Wait for container and data
  
      const checkScroll = () => {
        if (!container) return;
        
        // Check if we can scroll left
        setCanScrollLeft(container.scrollLeft > 0);
  
        // Check if we can scroll right (using a 1px threshold is more robust)
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        setCanScrollRight(container.scrollLeft < maxScrollLeft - 1);
      };
  
      // Run the check once data is loaded and container is ready
      checkScroll();
  
      // Add event listeners
      container.addEventListener("scroll", checkScroll, { passive: true });
      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(container);
  
      // Cleanup
      return () => {
        container.removeEventListener("scroll", checkScroll);
        resizeObserver.unobserve(container);
      };
  
    }, [loading, events.length]); // Re-run when loading or data changes
    // --


  // HERO ANIMATION
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    }),
  };

  if (loading)
    return (
      <div className="text-center text-white bg-black py-24 text-xl">
        Loading Events...
      </div>
    );

  return (
    <main id="events" className="relative w-full min-h-auto bg-gray-900 text-white overflow-hidden">
      {/* HERO SECTION */}
      <div className= "relative w-full md:w-[50vw] h-[60vh] md:min-h-[60vh] mx-auto  my-4 ">
        <AnimatePresence custom={direction}>
        <motion.section
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute bg-red-500 h-full w-full py-8
            px-4 flex flex-col lg:flex-row items-center rounded-xl  "
          style={{
              backgroundImage: `
                linear-gradient(to top right, rgba(0,0,0,0.9), rgba(0,0,0,0)),
                url(${getImagePath(events[current]?.img)})
              `,
              
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
        >
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              {events[current]?.title}
            </h1>

            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              {events[current]?.description}
            </p>

            <motion.button
              className="border-2 border-white rounded-full px-8 py-3 mt-8 font-semibold flex items-center gap-2 transition-transform duration-300 easeInOut hover:shadow-[inset_2px_4px_6px_rgba(0,0,20,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_2px_6px_rgba(50,0,0,0.4)]"
              whileHover={{
                scale: 1.05,
                backgroundColor: "white",
                color: "black",
              }}
              whileTap={{ scale: 0.95 }}
            >
              More About Event <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <img
                
                alt={events[current]?.title}
                className="hidden absolute w-full h-full object-cover rounded-full shadow-2xl shadow-pink-500/20"
              />

              <motion.div
                className="hidden absolute -top-8 -left-8 text-pink-500"
                animate={{ rotate: [0, -10, 0], y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Music size={64} />
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </AnimatePresence>
      </div>

      {/* EVENT LIST */}
      <section
        className="py-4 lg:py-4"
        style={{ background: "linear-gradient(to bottom, #0e197aff, #1a4e6aff)" }}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-center md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Event List
          </motion.h2>
           <div className="  py-4 flex justify-between items-center gap-4 px-4 md:px-12">
                <button
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className={` h-12 w-12 p-1 flex justify-center items-center rounded-full  transition-transform duration-300 easeInOut md:shadow-[inset_2px_4px_6px_rgba(0,0,20,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_4px_6px_rgba(100,0,150,0.4)]  ${
                      canScrollLeft
                        ? "opacity-100 hover:scale-105  "
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <ChevronLeft className=" text-white hover:scale-110 font-bold transition-transform duration-300 easeInOut" />
                  </button>
                      {/* Right Button */}
                  <button
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className={` h-12 w-12 p-1 flex justify-center items-center rounded-full transition-transform duration-300 easeInOut md:shadow-[inset_2px_4px_6px_rgba(0,0,20,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_4px_6px_rgba(100,0,150,0.4)]  ${
                      canScrollRight
                        ? "opacity-100 hover:scale-105  "
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <ChevronRight className=" text-white hover:scale-110 font-bold transition-transform duration-300 easeInOut" />
                  </button>
              </div>
          <div
            className="flex overflow-x-auto space-x-6 lg:space-x-8 pb-4 no-scrollbar px-6"
            ref={containerRef}
          >
            {events.map((ev, i) => (
              <EventCard
                key={ev.id}
                event={ev}
                idx={i}
                onClick={handleCardClick}
                activeIndexForCard={activeImageIndex[i] ?? 0}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
