import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, FlameIcon, GoalIcon, Image, MapPin, X } from "lucide-react";
import { getContent } from "../services/contentService.js";

const backendURL = "http://localhost:5000"; // ✅ Change when deployed

// ✅ Static Hard-Coded Shops
const staticHotels = [
  {
    name: "Sweet Dairy (Cafe)",
    distance: "320 meter away",
    location: "Sweet Dairy Mau Uttar Pradesh",
    price: "_,999",
    images: ["panna.jpg", "jhansi6.jpg", "orchha3.jpg"],
  },
  {
    name: "Bharat Bakery",
    distance: "150 meter",
    location: "Bharat Bakery Mau Uttar Pradesh",
    price: "famous for chinese",
    images: ["bandha.jpg", "jhansi6.jpg", "panna.jpg"],
  },
  {
    name: "Tea Point",
    distance: "280 meter",
    location: "Tea Point Mau Uttar Pradesh",
    price: "famous for milk",
    images: ["orchha3.jpg", "bandha.jpg", "jhansi6.jpg"],
  },
  {
    name: "Raj Sweets",
    distance: "500 meter",
    location: "Raj Sweets Mau Uttar Pradesh",
    price: "famous for samosa",
    images: ["jhansi6.jpg", "panna.jpg", "bandha.jpg"],
  },
  {
    name: "Fruit Mart",
    distance: "200 meter",
    location: "Fruit Mart Mau Uttar Pradesh",
    price: "famous for patoto",
    images: ["bandha.jpg", "panna.jpg", "orchha3.jpg"],
  },
];

// ✅ Helper to get image path
const getImagePath = (img, folder = "") => {
  if (!img) return "/fallback.jpg";

  if (img.startsWith("/uploads") || img.startsWith("uploads"))
    return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
  if (img.startsWith("/gallery") || img.startsWith("gallery"))
    return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;

  if (img.startsWith("http")) return img;
  return `${import.meta.env.BASE_URL}${folder}${img}`;
};

const HotelsOfMau = () => {
  const [activeImageIndex, setActiveImageIndex] = useState([]);
  const [galleryHotel, setGalleryHotel] = useState(null);
  const containerRef = useRef(null);
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧩 Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent("mauranipur", "hotels"); // region & category

        // 🆕 Map backend data into frontend-friendly format
        const mappedData = data.map((item) => ({
          name: item.title,
          distance: item.distance || "N/A",
          location: item.location || "Mauranipur",
          price: item.price || "N/A",
          images: [
            ...(item.mainImage ? [item.mainImage] : []),
            ...(item.gallery && Array.isArray(item.gallery) ? item.gallery : []),
          ],
        }));

        setHotelsData(mappedData);
        setActiveImageIndex(Array(staticHotels.length + mappedData.length).fill(0));
      } catch (err) {
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🧩 Combine static + dynamic hotels
  const displayHotels = [...staticHotels, ...hotelsData];

  // ✅ Initialize activeImageIndex state *after* displayHotels is populated
  useEffect(() => {
    if (displayHotels.length > 0) {
      setActiveImageIndex(Array(displayHotels.length).fill(0));
    }
  }, [displayHotels.length]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  // ✅ FIXED: Button state logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container || loading) return;

    const checkScroll = () => {
      if (!container) return;

      setCanScrollLeft(container.scrollLeft > 0);
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setCanScrollRight(container.scrollLeft < maxScrollLeft - 1);
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll, { passive: true });

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      if (resizeObserver && container) resizeObserver.unobserve(container);
    };
  }, [loading, displayHotels.length]);

  // ✅ FIXED: Auto-slide images for each card
  useEffect(() => {
    if (displayHotels.length === 0 || activeImageIndex.length === 0) return;

    const intervals = displayHotels.map((_, hotelIndex) => {
      const delay = 6000 + hotelIndex * 1200;
      return setInterval(() => {
        setActiveImageIndex((prev) => {
          const newArr = [...prev];
          const total = displayHotels[hotelIndex].images.length;
          if (total > 0) {
            newArr[hotelIndex] = (newArr[hotelIndex] + 1) % total;
          }
          return newArr;
        });
      }, delay);
    });

    return () => intervals.forEach(clearInterval);
  }, [displayHotels.length, activeImageIndex.length]); // ✅ fixed dependency

  // 🧩 Open Google Maps
  const handleGo = (location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      location
    )}`;
    window.open(url, "_blank");
  };

  if (loading)
    return (
      <div className="text-center text-white bg-black py-24 text-xl">Loading Hotels...</div>
    );

  return (
    <main className="relative max-h-screen w-full text-gray-900 py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        {/* Header */}
        <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Hotels & Banquet
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-800">
            Rest, relax, and rejoice — where every stay feels like home and every event feels royal.
          </p>
        </motion.header>

        {/* Main Content */}
        <section className="relative justify-center items-center lg:px-24 py-8">
          <div className=" flex justify-end items-center gap-4 px-4">
                      <button
                          onClick={scrollLeft}
                          disabled={!canScrollLeft}
                          className={` h-8 w-8 p-1 flex justify-center items-center rounded-full transition-transform duration-300 easeInOut md:shadow-[inset_2px_4px_6px_rgba(0,0,20,0.2),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_2px_6px_rgba(0,0,0,0.2)]  ${
                            canScrollLeft
                              ? "opacity-100 hover:scale-105  "
                              : "opacity-50 cursor-not-allowed"
                          }`}
                        >
                          <ChevronLeft className=" text-black hover:scale-110 font-bold transition-transform duration-300 easeInOut" />
                        </button>
                            {/* Right Button */}
                        <button
                          onClick={scrollRight}
                          disabled={!canScrollRight}
                          className={` h-8 w-8 p-1 flex justify-center items-center rounded-full transition-transform duration-300 easeInOut md:shadow-[inset_2px_4px_6px_rgba(0,0,20,0.2),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_2px_6px_rgba(0,0,0,0.2)]  ${
                            canScrollRight
                              ? "opacity-100 hover:scale-105  "
                              : "opacity-50 cursor-not-allowed"
                          }`}
                        >
                          <ChevronRight className=" text-black hover:scale-110 font-bold transition-transform duration-300 easeInOut" />
                        </button>
                    </div>

          {/* Horizontal slider */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-8 p-4 no-scrollbar"
          >
            {displayHotels.map((hotel, hotelIndex) => (
              <div
                key={hotelIndex}
                className="snap-center min-w-[250px] md:min-w-[300px] flex flex-col gap-2"
              >
                {/* Image slideshow */}
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex[hotelIndex]}
                      src={getImagePath(
                        hotel.images[activeImageIndex[hotelIndex]]
                      )}
                      alt={hotel.name}
                      className="object-cover h-full w-full rounded-xl"
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>

                  <button
                    onClick={() => setGalleryHotel(hotel)}
                    className="absolute bottom-0 right-0 p-2 m-2 bg-gray-700/60 rounded-full border border-black/20 hover:scale-110 transition shadow-[inset_4px_4px_6px_rgba(20,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
                  >
                    <Image className="h-4 w-4 text-white" />
                  </button>
                </div>

                {/* Inner dots */}
                <div className="flex gap-2 justify-center">
                  {hotel.images.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        i === activeImageIndex[hotelIndex]
                          ? "bg-orange-500"
                          : "bg-gray-600/40"
                      }`}
                      animate={{
                        scale: i === activeImageIndex[hotelIndex] ? 1.3 : 1,
                      }}
                    />
                  ))}
                </div>

                {/* Text info */}
                <h1 className="font-semibold text-xl text-center md:text-left">
                  {hotel.name}
                </h1>
                <div className="hidden flex gap-2 items-center">
                  <MapPin className="h-4 w-4" />
                  <h4>{hotel.distance}</h4>
                </div>
                <div className="flex gap-2 items-center">
                  <GoalIcon className="h-4 w-4" />
                  <h4>{hotel.location}</h4>
                </div>
                <div className="flex gap-2 items-center">
                  <FlameIcon className="h-4 w-4" />
                  <h4 className="text-lg font-semibold">₹ {hotel.price}</h4>
                </div>
                <div>
                  <button
                    onClick={() => handleGo(hotel.location)}
                    className="bg-orange-600 hover:bg-orange-600/90 hover:scale-110 w-full font-semibold md:px-6 py-1 rounded-lg transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]"
                  >
                    Direction
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {galleryHotel && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setGalleryHotel(null)}
              className="absolute top-6 right-6 text-white hover:scale-110 transition"
            >
              <X size={28} />
            </button>

            <div className="flex overflow-x-auto gap-6 px-8 snap-x snap-mandatory scroll-smooth no-scrollbar">
              {galleryHotel.images.map((img, i) => (
                <motion.img
                  key={i}
                  src={getImagePath(img)}
                  alt=""
                  className="snap-center object-cover rounded-xl w-[85vw] sm:w-[60vw] md:w-[30vw] max-h-[80vh]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default HotelsOfMau;
