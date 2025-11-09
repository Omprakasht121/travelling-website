import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DestinationsOfJhansi = () => {
  const destinations = [
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

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  // Compute visible indices
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

  // For mobile active card scaling
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const handleScroll = () => {
    // Calculate the current visible card index
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const newIndex = Math.round(scrollLeft / cardWidth);

    if (newIndex !== index) setIndex(newIndex);
  };

  container.addEventListener("scroll", handleScroll);
  return () => container.removeEventListener("scroll", handleScroll);
}, [index]);


  return (
    <main id="explore" className="relative min-h-screen w-full bg-gradient-to-b from-sky-950 to-slate-900 text-white py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        {/* Header */}
        <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Destinations
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-300">
            Reach out and let’s bring you closer to the heart of Bundelkhand..
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

            {/* Desktop Animation Section */}
            <div className="relative w-[100%] flex justify-center items-center h-[85vh] md:h-[90vh]">
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
                  className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer"
                  onClick={prevSlide}
                >
                  <h1 className="font-bold text-2xl text-center">
                    {destinations[index].name}
                  </h1>
                  <img
                    src={`${import.meta.env.BASE_URL}${destinations[leftIndex].img}`}
                    alt=""
                    className="h-[40vh] rounded-xl object-cover"
                  />
                  <p className="text-sm md:text-base text-slate-200">
                    {destinations[index].desc}
                  </p>
                </motion.div>

                {/* Main center card */}
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
                    src={`${import.meta.env.BASE_URL}${destinations[index].img}`}
                    alt={destinations[index].name}
                    className=" md:h-[50vh] rounded-xl object-cover"
                  />
                  <p className="text-sm md:text-base text-slate-200">
                    {destinations[index].desc}
                  </p>
                  <button className="border text-lg md:text-xl my-2 px-6 py-1 rounded-xl bg-blue-700 hover:bg-blue-600 transition">
                    Visit Now
                  </button>
                  {/* Dots */}
                  <div className=" flex justify-center items-center gap-2">
                    {destinations.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-3 w-3 rounded-full ${
                          i === index ? "bg-blue-500" : "bg-white/40"
                        }`}
                        animate={{ scale: i === index ? 1.3 : 1 }}
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
                  className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer"
                  onClick={nextSlide}
                >
                  <h1 className="font-bold text-2xl text-center ">
                    {destinations[index].name}
                  </h1>
                  <img
                    src={`${import.meta.env.BASE_URL}${destinations[rightIndex].img}`}
                    alt=""
                    className="h-[40vh] rounded-xl object-cover"
                  />
                  <p className="text-sm md:text-base text-slate-200">
                    {destinations[index].desc}
                  </p>
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
                  <img
                    src={`${import.meta.env.BASE_URL}${destinations[farRightIndex].img}`}
                    alt=""
                    className="h-[35vh] rounded-xl object-cover"
                  />
                </motion.div>
              </AnimatePresence>
               
               {/* Mobile horizontal slider (swipeable) */}
            <div
                ref={containerRef}
                className="flex md:hidden overflow-x-auto snap-x snap-mandatory space-x-4 px-2 my-auto no-scrollbar scroll-smooth"
            >
                {destinations.map((place, i) => (
                <motion.div
                    key={i}
                    className={`max-w-[100%] snap-center flex-shrink-0 bg-white/10 rounded-xl p-3 text-center transition-transform duration-300 ${
                    i === activeIndex ? "scale-100" : "scale- opacity-80"
                    }`}
                >
                    <h1 className="font-bold text-xl mb-2">{place.name}</h1>
                    <img
                    src={`${import.meta.env.BASE_URL}${place.img}`}
                    alt={place.name}
                    className="h-[50vh] w-full rounded-xl object-cover mb-2"
                    />
                    <p className="text-sm text-slate-200 mb-3">{place.desc}</p>
                    <button className="border text-lg w-full py-1 rounded-xl bg-blue-700 hover:bg-blue-600 transition">
                    Visit Now
                    </button>
                    {/* Dots */}
                  <div className=" py-4 flex justify-center items-center gap-2">
                    {destinations.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-3 w-3 rounded-full ${
                          i === index ? "bg-indigo-500" : "bg-white/40"
                        }`}
                        animate={{ scale: i === index ? 1 : .6 }}
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
              className="hidden md:flex p-3 bg-white/20 rounded-full hover:bg-white/40 transition"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

         

          
        </section>
      </div>
    </main>
  );
};

export default DestinationsOfJhansi;
