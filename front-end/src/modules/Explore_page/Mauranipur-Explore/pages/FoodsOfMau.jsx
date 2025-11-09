import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  MapPin,
  FlameIcon,
  GoalIcon,
  X,
} from "lucide-react";
import { getContent } from "../services/contentService.js";

const backendURL = "http://localhost:5000";

const staticFood = [
  {
    name: "Sweet Dairy (Cafe)",
    distance: "320 meter away",
    location: "Sweet Dairy Mau Uttar Pradesh",
    description: "Famous for sweets",
    images: ["panna.jpg", "jhansi6.jpg", "orchha3.jpg"],
  },
  {
    name: "Bharat Bakery",
    distance: "150 meter",
    location: "Bharat Bakery Mau Uttar Pradesh",
    description: "Famous for Chinese",
    images: ["bandha.jpg", "jhansi6.jpg", "panna.jpg"],
  },
  {
    name: "Tea Point",
    distance: "280 meter",
    location: "Tea Point Mau Uttar Pradesh",
    description: "Famous for milk",
    images: ["orchha3.jpg", "bandha.jpg", "jhansi6.jpg"],
  },
  {
    name: "Raj Sweets",
    distance: "500 meter",
    location: "Raj Sweets Mau Uttar Pradesh",
    description: "Famous for samosa",
    images: ["jhansi6.jpg", "panna.jpg", "bandha.jpg"],
  },
  {
    name: "Fruit Mart",
    distance: "200 meter",
    location: "Fruit Mart Mau Uttar Pradesh",
    description: "Famous for fruits",
    images: ["bandha.jpg", "panna.jpg", "orchha3.jpg"],
  },
];

// ✅ Helper to get image path
const getImagePath = (img, folder = "") => {
  if (!img) return "/fallback.jpg";

  // 🆕: detect if backend image from /uploads or /gallery
  if (img.startsWith("/uploads") || img.startsWith("uploads"))
    return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
  if (img.startsWith("/gallery") || img.startsWith("gallery"))
    return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;

  if (img.startsWith("http")) return img;
  return `${import.meta.env.BASE_URL}${folder}${img}`;
};

const FoodsOfMau = () => {
  const [activeFood, setActiveFood] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState([]);
  const [galleryFood, setGalleryFood] = useState(null);
  const containerRef = useRef(null);
  const [foodsData, setFoodsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent("mauranipur", "food");

        const mappedData = data.map((item) => ({
          name: item.title,
          distance: item.distance || "N/A",
          location: item.location || "Mauranipur",
          description: item.description || "Famous local cuisine",
          images: [
            ...(item.mainImage ? [item.mainImage] : []),
            ...(item.gallery && Array.isArray(item.gallery)
              ? item.gallery
              : []),
          ],
        }));

        setFoodsData(mappedData);
        setActiveImageIndex(
          Array(staticFood.length + mappedData.length).fill(0)
        );
      } catch (err) {
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Combine static + dynamic foods
  const displayFoods = [...staticFood, ...foodsData];

  // ✅ Auto-slide images for each food card
  useEffect(() => {
    const intervals = displayFoods.map((_, foodIndex) => {
      const delay = 6000 + foodIndex * 1200;
      return setInterval(() => {
        setActiveImageIndex((prev) => {
          const newArr = [...prev];
          const total = displayFoods[foodIndex].images.length;
          newArr[foodIndex] = (newArr[foodIndex] + 1) % total;
          return newArr;
        });
      }, delay);
    });

    return () => intervals.forEach(clearInterval);
  }, [displayFoods.length]);

  // ✅ Handle horizontal scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveFood(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGo = (location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      location
    )}`;
    window.open(url, "_blank");
  };

  if (loading)
    return (
      <div className="text-center text-white py-24 text-xl">Loading...</div>
    );

  return (
    <main className="relative max-h-screen w-full  text-gray-900 py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        {/* Header */}
        <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Famous FOOD & Restaurant
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-800">
            Discover cafés, dhabas, and restaurants that serve more than food —
            they serve stories.
          </p>
        </motion.header>

        {/* Cards Section */}
        <section className="relative justify-center items-center lg:px-24 py-8">
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-8 p-4 no-scrollbar"
          >
            {displayFoods.map((food, foodIndex) => (
              <div
                key={foodIndex}
                className="snap-center flex-shrink-0 w-[80%] sm:w-[45%] md:w-[23%] flex flex-col gap-2"
              >
                {/* Image slideshow */}
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex[foodIndex]}
                      src={getImagePath(
                        food.images[activeImageIndex[foodIndex]]
                      )}
                      alt={food.name}
                      className="object-cover h-full w-full rounded-xl border border-black/40"
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>

                  {/* Image icon */}
                  <button
                    onClick={() => setGalleryFood(food)}
                    className="absolute bottom-0 right-0 p-2 m-2 bg-gray-700/60 rounded-full border border-black/20 hover:scale-110 transition shadow-[inset_4px_4px_6px_rgba(20,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
                  >
                    <Image className="h-4 w-4 text-white" />
                  </button>
                </div>

                {/* Dots (inner images) */}
                <div className="flex gap-2 justify-center">
                  {food.images.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        i === activeImageIndex[foodIndex]
                          ? "bg-orange-500"
                          : "bg-gray-600/40"
                      }`}
                      animate={{
                        scale: i === activeImageIndex[foodIndex] ? 1.3 : 1,
                      }}
                    />
                  ))}
                </div>

                {/* Info */}
                <h1 className="font-semibold text-xl text-center md:text-left">
                  {food.name}
                </h1>
                <div className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4" />
                  <h4>{food.distance}</h4>
                </div>
                <div className="flex gap-2 items-center">
                  <GoalIcon className="h-4 w-4" />
                  <h4>{food.location}</h4>
                </div>
                <div className="flex gap-2 items-center">
                  <FlameIcon className="h-4 w-4" />
                  <h4>{food.description}</h4>
                </div>

                <div>
                  <button
                  onClick={() => handleGo(food.location)}
                  className=" bg-orange-600 hover:bg-orange-600/90 hover:scale-110 w-full font-semibold md:px-6 py-1 rounded-lg transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]"
                >
                  Direction
                </button>
                </div>
              </div>
            ))}
          </div>

          {/* Outer dots */}
          <div className="flex gap-2 justify-center py-6">
            {displayFoods.map((_, i) => (
              <motion.div
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i === activeFood ? "bg-blue-500" : "bg-gray-700/40"
                }`}
                animate={{ scale: i === activeFood ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {galleryFood && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setGalleryFood(null)}
              className="absolute top-6 right-6 text-white hover:scale-110 transition"
            >
              <X size={28} />
            </button>

            <div className="flex overflow-x-auto gap-6 px-8 snap-x snap-mandatory scroll-smooth no-scrollbar">
              {galleryFood.images.map((img, i) => (
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

export default FoodsOfMau;
