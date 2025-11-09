import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InstagramEmbed from "../../../../shared/instagram-component/InstagramEmbed";


const VideoOfOrchha = () => {
  // --- Your Reels ---
  const reels = [
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
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== index) setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [index]);

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-sky-950 to-slate-900 text-white py-4 overflow-hidden">
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
          <p className="mt-2 text-sm md:text-base text-slate-300">
            Experience the essence of Bundelkhand through stories, reels, and travel moments.
          </p>
        </motion.header>

        {/* Main Section */}
        <section className="relative justify-center items-center lg:px-28 md:py-8">
          <div className="relative flex justify-center items-center md:gap-6 overflow-hidden">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="hidden md:flex p-3 bg-white/20 rounded-full hover:bg-white/40 transition"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Desktop animation section */}
            <div className=" relative w-[100%] flex justify-center items-center h-[100vh] md:h-[92vh]">
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
                  className=" absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer blur-sm"
                  onClick={prevSlide}
                >
                  <h1 className="hidden font-bold text-2xl text-center">
                    {reels[leftIndex].title}
                  </h1>
                  <div className="rounded-xl overflow-hidden h-[70vh]">
                    <InstagramEmbed permalink={reels[leftIndex].url} maxWidth={350} />
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
                  <h1 className="hidden font-bold text-2xl">{reels[index].title}</h1>
                  <div className="rounded-2xl overflow-fit  h-full">
                    <InstagramEmbed permalink={reels[index].url} maxWidth={400} />
                  </div>
                  <p className="hidden text-sm md:text-base text-slate-200">
                    {reels[index].desc}
                  </p>
                  <button className="border text-lg md:text-xl px-6 py-1 rounded-xl bg-blue-700 hover:bg-blue-600 transition">
                    Watch Now
                  </button>
                  {/* Dots */}
                  <div className="md:py-4 flex justify-center items-center gap-2">
                    {reels.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-3 w-3 rounded-full ${
                          i === index ? "bg-blue-700" : "bg-white/40"
                        }`}
                        animate={{ scale: i === index ? 1 : .8 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
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
                  className=" absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer blur-sm"
                  onClick={nextSlide}
                >
                  <h1 className=" hidden font-bold text-2xl text-center">
                    {reels[rightIndex].title}
                  </h1>
                  <div className="rounded-xl overflow-hidden h-[70vh] ">
                    <InstagramEmbed permalink={reels[rightIndex].url} maxWidth={350} />
                  </div>
                </motion.div>

                {/* Far right incoming card (slightly visible for motion flow) */}
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
                  <div className="rounded-xl overflow-hidden h-[70vh]">
                    <InstagramEmbed permalink={reels[farRightIndex].url} maxWidth={300} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile horizontal scroll section */}
              <div
                ref={containerRef}
                className="flex md:hidden overflow-x-auto snap-x snap-mandatory space-x-4   no-scrollbar scroll-smooth"
              >
                {reels.map((reel, i) => (
                  <motion.div
                    key={i}
                    className={`max-w-[100%] snap-center flex-shrink-0 bg-white/10 rounded-xl p-2 text-center transition-transform duration-300 ${
                      i === activeIndex ? "scale-100" : "scale-95 opacity-80"
                    }`}
                  >
                    {/* <h1 className="font-bold text-xl mb-2">{reel.title}</h1> */}
                    <div className="rounded-xl overflow-hidden  flex justify-center items-center">
                      <InstagramEmbed permalink={reel.url} maxWidth={380} />
                    </div>
                    <p className="text-sm text-slate-200 mb-3">{reel.desc}</p>
                    <button className="border text-lg px-6 py-1  mb-4 rounded-xl bg-blue-700 hover:bg-blue-600 transition">
                      Watch Now
                    </button>
                    {/* Dots */}
                    <div className="pb-2 flex justify-center items-center gap-2">
                      {reels.map((_, i) => (
                        <motion.div
                          key={i}
                          className={`h-3 w-3 rounded-full ${
                            i === index ? "bg-blue-700" : "bg-white/40"
                          }`}
                          animate={{ scale: i === index ? 1 : .7 }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="hidden md:flex  bg-white/20 rounded-full hover:bg-white/40 transition"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            
          </div>

          
        </section>
      </div>
    </main>
  );
};

export default VideoOfOrchha;
