import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getContent } from "../services/contentService.js";

const backendURL = "http://localhost:5000";

const DestinationsOfMau = () => {
  const staticDestinations = [
    {
      name: "Orchha",
      img: "jhansi.jpg",
      desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
    },
    {
      name: "Datia",
      img: "datia.jpg",
      desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
    },
    {
      name: "Chanderi",
      img: "jhansi2.jpg",
      desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
    },
    {
      name: "Jhansi",
      img: "jhansi6.jpg",
      desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
    },
    {
      name: "Tikamgarh",
      img: "jhansi3.jpg",
      desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
    },
  ];

  const getImagePath = (img) => {
    if (!img) return "/fallback.jpg";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads") || img.startsWith("uploads"))
      return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
    return `${import.meta.env.BASE_URL}${img}`;
  };

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [destinationData, setDestinationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch dynamic destinations from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent("mauranipur", "destinations");
        const mappedData = data.map((item) => ({
          name: item.title,
          desc: item.description,
          img: item.mainImage || item.galleryImages?.[0] || "",
        }));
        setDestinationsData(mappedData);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Merge static + dynamic destinations
  const destinations = [...staticDestinations, ...destinationData];

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const leftIndex = (index - 1 + destinations.length) % destinations.length;
  const rightIndex = (index + 1) % destinations.length;
  const farRightIndex = (index + 2) % destinations.length;

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 10,
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== index) setIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [index]);

  if (loading)
    return (
      <div className="text-center text-white py-24 text-xl">Loading...</div>
    );

  return (
    <main
      id="explore"
      className="relative min-h-screen w-full  text-gray-900 py-4 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Destinations
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-800">
            Reach out and let’s bring you closer to the heart of Bundelkhand..
          </p>
        </motion.header>

        {/* ==== Main Section ==== */}
        <section className="relative justify-center items-center lg:px-28 md:py-8">
          <div className="relative flex justify-center items-center md:gap-6 overflow-hidden">
            <button
              onClick={prevSlide}
              className="hidden md:flex ml-2 p-2 bg-gray-700/60 rounded-full hover:bg-gray-700/40 hover:scale-105 transition-transform duration-300 easeInOut"
            >
              <ChevronLeft className="w-6 h-6 text-black/80" />
            </button>

            <div className="relative w-[100%] flex justify-center items-center h-[85vh] md:h-[90vh]">
              <AnimatePresence initial={false} custom={direction}>
                {/* === Left Small Card === */}
                <motion.div
                  key={`left-${leftIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate={{ x: "-110%", scale: 0.8, opacity: 0.5, zIndex: 5 }}
                  exit="exit"
                  transition={{ duration: 0.6 }}
                  className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer"
                  onClick={prevSlide}
                >
                  <h1 className="font-bold text-2xl text-center">
                    {destinations[leftIndex].name}
                  </h1>
                  <img
                    src={getImagePath(destinations[leftIndex].img)}
                    alt=""
                    className="h-[40vh] rounded-xl object-cover border-2 border-black/20"
                  />
                  <p className="text-sm md:text-base text-center text-slate-800">
                    {destinations[leftIndex].desc}
                  </p>
                </motion.div>

                {/* === Main Center Card === */}
                <motion.div
                  key={`main-${index}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 25 },
                    opacity: { duration: 0.3 },
                  }}
                  className="absolute hidden md:flex flex-col gap-4 w-[90%] md:w-[40%] text-center md:p-2"
                >
                  <h1 className="font-bold text-2xl">
                    {destinations[index].name}
                  </h1>
                  <img
                    src={getImagePath(destinations[index].img)}
                    alt={destinations[index].name}
                    className="md:h-[50vh] rounded-xl object-cover border-2 border-black/20"
                  />
                  <p className="text-sm md:text-base text-slate-800">
                    {destinations[index].desc}
                  </p>
                  <button className=" text-white text-lg md:text-xl my-2 px-6 py-2 font-semibold rounded-xl bg-blue-700 hover:bg-blue-600 hover:scale-110 transition-transform duration-300 easeInOut   shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
                    Visit Now
                  </button>
                  <div className="flex justify-center items-center gap-2">
                    {destinations.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-3 w-3 rounded-full ${
                          i === index ? "bg-blue-500" : "bg-gray-700/40"
                        }`}
                        animate={{ scale: i === index ? 1.3 : 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* === Right Small Card === */}
                <motion.div
                  key={`right-${rightIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate={{ x: "110%", scale: 0.8, opacity: 0.5, zIndex: 5 }}
                  exit="exit"
                  transition={{ duration: 0.6 }}
                  className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer"
                  onClick={nextSlide}
                >
                  <h1 className="font-bold text-2xl text-center">
                    {destinations[rightIndex].name}
                  </h1>
                  <img
                    src={getImagePath(destinations[rightIndex].img)}
                    alt=""
                    className="h-[40vh] rounded-xl object-cover border-2 border-black/20"
                  />
                  <p className="text-sm md:text-base text-center text-slate-800">
                    {destinations[rightIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* === Mobile Scroll Cards === */}
              <div
                ref={containerRef}
                className="flex md:hidden overflow-x-auto snap-x snap-mandatory space-x-4 px-2 my-auto no-scrollbar scroll-smooth"
              >
                {destinations.map((place, i) => (
                  <motion.div
                    key={i}
                    className={`max-w-[100%] snap-center flex-shrink-0 bg-white/10 rounded-xl p-3 text-center transition-transform duration-300 ${
                      i === activeIndex ? "scale-100" : "opacity-80"
                    }`}
                  >
                    <h1 className="font-bold text-xl mb-2">{place.name}</h1>
                    <img
                      src={getImagePath(place.img)}
                      alt={place.name}
                      className="h-[50vh] w-full rounded-xl object-cover mb-2 border-2 border-black/40"
                    />
                    <p className="text-sm text-slate-800 mb-3">{place.desc}</p>
                    <button className="text-white text-lg w-full py-2 rounded-xl bg-blue-700 hover:bg-blue-600 transition-transform duration-300 easeInOut hover:scale-110 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
                      Visit Now
                    </button>
                    <div className="flex justify-center items-center gap-2 py-4">
                    {destinations.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-3 w-3 rounded-full ${
                          i === index ? "bg-blue-500" : "bg-gray-700/40"
                        }`}
                        animate={{ scale: i === index ? 1 : .8 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="hidden md:flex ml-2 p-2 bg-gray-700/60 rounded-full hover:bg-gray-700/40 hover:scale-105 transition-transform duration-300 easeInOut"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DestinationsOfMau;
