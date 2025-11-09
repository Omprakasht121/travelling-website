import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InstagramEmbed from "../../../../shared/instagram-component/InstagramEmbed";
import { getContent } from "../services/contentService.js";

const backendURL = "http://localhost:5000";

const VideoOfMau2 = () => {
  // --- Static Reels ---
  const staticReels = [
    {
      title: "Exploring Khajuraho",
      url: "https://www.instagram.com/p/DOakPP6Eg0_/",
      desc: "Witness the stunning architecture and cultural charm of Khajuraho, a UNESCO heritage site in Bundelkhand.",
    },
    {
      title: "Panna Tiger Reserve",
      url: "https://www.instagram.com/p/DN8GnJekimV/",
      desc: "Experience the wild beauty of Panna Tiger Reserve — where nature meets adventure.",
    },
    {
      title: "Chitrakoot Spiritual Journey",
      url: "https://www.instagram.com/p/DN0DSJk2L1c/",
      desc: "Dive into the serene landscapes and divine atmosphere of Chitrakoot, the soul of Bundelkhand.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch videos dynamically from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch from the “videos” category instead of destinations
        const data = await getContent("mauranipur", "videos");
        const mappedData = data.map((item) => ({
          title: item.title || "Untitled Video",
          url: item.reel_url, // directly use URL stored in backend
          desc: item.description || "",
        }));
        setVideoData(mappedData);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Merge static + backend videos
  const reels = [...staticReels, ...videoData];

  // ✅ Navigation logic (same as before)
  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reels.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  // Compute visible indices
  const leftIndex = (index - 1 + reels.length) % reels.length;
  const rightIndex = (index + 1) % reels.length;
  const farRightIndex = (index + 2) % reels.length;

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

  // For mobile horizontal scroll
  // ✅ ADD THIS NEW CODE
const [activeIndex, setActiveIndex] = useState(0);
const containerRef = useRef(null);
const observerRef = useRef(null); // To hold the observer instance

useEffect(() => {
  const container = containerRef.current;
  // Only run if the container exists and destinations are loaded
  if (!container || reels.length === 0) return;

  // Disconnect any previous observer before creating a new one
  if (observerRef.current) {
    observerRef.current.disconnect();
  }

  const options = {
    root: container, // The scroll container itself is the viewport
    rootMargin: "0px",
    threshold: 0.51, // Trigger when 51% of the card is visible
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      // When a card becomes more than 51% visible
      if (entry.isIntersecting) {
        // Get the index we stored on the element
        const index = parseInt(entry.target.dataset.index, 10);
        if (!isNaN(index)) {
          setActiveIndex(index);
        }
      }
    });
  };

  // Create and store the new observer
  const observer = new IntersectionObserver(callback, options);
  observerRef.current = observer;

  // Observe all the card elements (children of the container)
  Array.from(container.children).forEach((child) => {
    observer.observe(child);
  });

  // Cleanup function to disconnect observer when component unmounts
  return () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  };
  
}, [reels, loading]); // Re-run this effect when data is loaded
  if (loading)
    return (
      <div className="text-center text-white py-24 text-xl">Loading...</div>
    );

  return (
    <main className="relative min-h-screen w-full text-gray-900 py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        {/* Header */}
        <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Videos / Social Media
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-800">
            Experience the essence of Bundelkhand through stories, reels, and
            travel moments.
          </p>
        </motion.header>

        {/* Main Section */}
        <section className="relative justify-center items-center lg:px-28 md:py-8">
          <div className="relative flex justify-center items-center md:gap-6 overflow-hidden">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="hidden md:flex ml-2 p-2 bg-gray-700/60 rounded-full hover:bg-gray-700/40 hover:scale-105 transition-transform duration-300 easeInOut"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>

            {/* Desktop Animation */}
            <div className="relative w-[100%] flex justify-center items-center h-[100vh] md:h-[92vh]">
              <AnimatePresence initial={false} custom={direction}>
                {/* Left small card */}
                <motion.div
                  key={`left-${leftIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate={{ x: "-110%", scale: 0.8, opacity: 0.5, zIndex: 5 }}
                  exit="exit"
                  transition={{ duration: 0.6 }}
                  className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer blur-sm"
                  onClick={prevSlide}
                >
                  <div className="rounded-xl overflow-hidden h-[70vh]">
                    <InstagramEmbed
                      permalink={reels[leftIndex].url}
                      maxWidth={350}
                    />
                  </div>
                </motion.div>

                {/* Main large card */}
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
                  className="absolute hidden md:flex flex-col gap-2 w-[100%] md:w-[40%] text-center md:px-2"
                >
                  <div className="rounded-2xl overflow-fit h-full">
                    <InstagramEmbed
                      permalink={reels[index].url}
                      maxWidth={400}
                    />
                  </div>
                  <button onClick={() => reels[index].url && window.open(reels[index].url, "_blank")}
                  className=" text-white text-lg md:text-xl my-2 px-6 py-2 font-semibold rounded-xl bg-blue-700 hover:bg-blue-600 hover:scale-110 transition-transform duration-300 easeInOut   shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
                    Watch Now
                  </button>
                 
                </motion.div>

                {/* Right small card */}
                <motion.div
                  key={`right-${rightIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate={{ x: "110%", scale: 0.8, opacity: 0.5, zIndex: 5 }}
                  exit="exit"
                  transition={{ duration: 0.6 }}
                  className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer blur-sm"
                  onClick={nextSlide}
                >
                  <div className="rounded-xl overflow-hidden h-[70vh]">
                    <InstagramEmbed
                      permalink={reels[rightIndex].url}
                      maxWidth={350}
                    />
                  </div>
                </motion.div>

                {/* Far right incoming card */}
                <motion.div
                  key={`farRight-${farRightIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate={{ x: "220%", scale: 0.7, opacity: 0 }}
                  exit="exit"
                  transition={{ duration: 0.6 }}
                  className="absolute hidden md:flex flex-col gap-3 w-1/3"
                >
                  <div className="rounded-xl overflow-hidden h-[10vh]">
                    <InstagramEmbed
                      permalink={reels[farRightIndex].url}
                      maxWidth={300}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile horizontal scroll section */}
              <div
                ref={containerRef}
                className="flex md:hidden overflow-x-auto snap-x snap-mandatory space-x-4 no-scrollbar scroll-smooth"
              >
                {reels.map((reel, i) => (
                  <motion.div
                    key={i}
                    data-index={i}
                    className={`max-w-[100%] snap-center flex-shrink-0 bg-white/10 rounded-xl p-2 text-center transition-transform duration-300 ${
                      i === activeIndex ? "scale-100" : "scale-100"
                    }`}
                  >
                    <div className="rounded-xl overflow-hidden flex justify-center items-center">
                      <InstagramEmbed permalink={reel.url} maxWidth={380} />
                    </div>
                    <p className="text-sm text-slate-800 mb-3">{reel.desc}</p>
                    <button onClick={() => reels[index].url && window.open(reels[index].url, "_blank")}
                    className="text-white text-lg md:text-xl my-2 px-6  w-full py-2 font-semibold rounded-xl bg-blue-700 hover:bg-blue-600 hover:scale-110 transition-transform duration-300 easeInOut   shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
                      Watch Now
                    </button>
                   
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="hidden md:flex ml-2 p-2 bg-gray-700/60 rounded-full hover:bg-gray-700/40 hover:scale-105 transition-transform duration-300 easeInOut"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>

           {/* desktop dots  */}
                  <div className="md:py-4 hidden md:flex justify-center items-center gap-2">
                    {reels.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-3 w-3 rounded-full ${
                          i === index ? "bg-blue-700" : "bg-gray-800/40"
                        }`}
                        animate={{ scale: i === index ? 1 : 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
           {/* dots  */}
                    <div className="flex md:hidden pb-4 flex justify-center items-center gap-2">
                      {reels.map((_, j) => (
                        <motion.div
                          key={j}
                          className={`h-3 w-3 rounded-full ${
                            j === activeIndex ? "bg-blue-700" : "bg-gray-800/40"
                          }`}
                          animate={{ scale: j === activeIndex ? 1 : 0.7 }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </div>
        </section>
      </div>
    </main>
  );
};

export default VideoOfMau2;
