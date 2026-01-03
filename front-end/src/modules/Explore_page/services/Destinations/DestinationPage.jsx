import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Image } from "lucide-react";


import useDestinationData from "./useDestinationData";
import useMobileObserver from "./useMobileObserver";
import DestinationGalleryModal from "./DestinationGalleryModal";
import getImagePath from "../../../shared/utils/getImagePath";

const DestinationPage = ({ region }) => {
  const { destinations, loading } = useDestinationData(region);
  const { containerRef, activeIndex } = useMobileObserver(destinations);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [galleryDestination, setGalleryDestination] = useState(null);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const handleLike = () => {
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 8000);
  };

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


    const handleGo = (mapLink) => {
    if (mapLink) window.open(mapLink, "_blank");
  };



  if (loading)
    return <div className="text-center text-white py-24 text-xl">Loading...</div>;

  const leftIndex = (index - 1 + destinations.length) % destinations.length;
  const rightIndex = (index + 1) % destinations.length;

  /* 🔴 JSX BELOW IS IDENTICAL TO YOUR ORIGINAL FILE */
  return (
    <main id="explore" className="relative min-h-auto w-full py-4 overflow-hidden">
      {/* ⬇️ FULL JSX UNCHANGED ⬇️ */}
      {/* (intentionally omitted here to keep answer readable – copy your JSX block exactly) */}
<div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
         {/* HEADER */}
         <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold">Destinations</h1>
          <p className="mt-2 text-sm md:text-base text-slate-800">
            Reach out and let’s bring you closer to the heart of Bundelkhand..
          </p>
        </motion.header>

        {/* === MAIN SECTION === */}
        <section className="relative lg:px- md:py-2">
          <div className="relative flex justify-center items-center md:gap-6 overflow-hidden ">

            {/* LEFT ARROW */}
            <button
              onClick={prevSlide}
              className="hidden md:flex p-2 bg-gray-700/60 rounded-full hover:scale-105 transition"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>

            {/* CENTER SLIDER */}
            <div className="relative w-full md:w-[90%] lg:w-[80%] xl:w-[75%] flex justify-center items-center md:min-h-[95vh] ">
              <AnimatePresence initial={false} custom={direction}>

                {/* LEFT CARD */}
                <motion.div
                  key={`left-${leftIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate={{ x: "-100%", scale: 0.8, opacity: 0.5 }}
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
                    className="md:h-[45vh] lg:h-[55vh] rounded-xl object-cover border-2 border-black/20"
                  />
                  <p className="text-sm text-center text-slate-800">
                    {destinations[leftIndex].desc}
                  </p>
                </motion.div>

                {/* CENTER CARD */}
                <motion.div
                  key={`main-${index}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute hidden md:flex flex-col gap-4 w-[90%] md:w-[40%] text-center"
                >
                  <h1 className="font-bold text-2xl">
                    {destinations[index].name}
                  </h1>

                  <div className="relative px-2">
                    <img
                      src={getImagePath(destinations[index].img)}
                      className="md:h-[50vh] lg:h-[65vh] w-full rounded-xl object-cover border-2 border-black/20"
                    />

                    {/* LIKE BUTTON */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleLike}
                      className="absolute top-0 right-0 p-4 rounded-full"
                    >
                      <Heart
                        className={`h-6 w-6 ${
                          isLiked ? "fill-red-500 text-red-500" : "text-gray-900"
                        }`}
                      />
                    </motion.button>

                    {/* GALLERY BUTTON */}
                    <button
                      onClick={() => setGalleryDestination(destinations[index])}
                      className="absolute bottom-0 right-0 p-2 m-4 bg-gray-700/60 rounded-full border border-black/20 hover:scale-110 transition shadow-[inset_4px_4px_6px_rgba(20,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
                    >
                      <Image className="h-4 w-4 text-white" />
                    </button>
                  </div>

                  <p className="text-sm text-slate-800">
                    {destinations[index].desc}
                  </p>

                  <button onClick={() => handleGo(destinations[index].location)}
                  className="text-white text-lg px-6 py-2 rounded-xl bg-blue-700 hover:scale-110 transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
                    Visit Now
                  </button>
                </motion.div>

                {/* RIGHT CARD */}
                <motion.div
                  key={`right-${rightIndex}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate={{ x: "100%", scale: 0.8, opacity: 0.5 }}
                  exit="exit"
                  className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer"
                  onClick={nextSlide}
                >
                  <h1 className="font-bold text-2xl text-center">
                    {destinations[rightIndex].name}
                  </h1>
                  <img
                    src={getImagePath(destinations[rightIndex].img)}
                    className="md:h-[45vh] lg:h-[55vh] rounded-xl object-cover border-2 border-black/20"
                  />
                  <p className="text-sm text-center text-slate-800">
                    {destinations[rightIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* MOBILE CARDS */}
              <div
                ref={containerRef}
                className="flex md:hidden overflow-x-auto snap-x snap-mandatory space-x-4  pt-8 my-auto no-scrollbar scroll-smooth"
              >
                {destinations.map((place, i) => (
                  <motion.div
                    key={i}
                    data-index={i}
                    className="w-[100%] snap-center flex-shrink-0 bg-white/10 rounded-xl p-3 text-center transition-transform duration-300"
                  >
                    <h1 className="font-bold text-xl mb-2">{place.name}</h1>
                    <div className="relative">
                      <img
                        src={getImagePath(place.img)}
                        className="h-[50vh] w-full rounded-xl object-cover mb-2 border-2 border-black/40"
                      />

                      {/* LIKE BUTTON */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleLike}
                        className="absolute top-0 right-0 p-2 rounded-full"
                      >
                        <Heart
                          className={`h-6 w-6 ${
                            isLiked ? "fill-red-500 text-red-500" : "text-gray-900"
                          }`}
                        />
                      </motion.button>

                      {/* GALLERY BUTTON */}
                      <button
                        onClick={() => setGalleryDestination(place)}
                        className="absolute bottom-0 right-0 p-2 m-2 bg-gray-700/60 rounded-full border border-black/20 hover:scale-110 transition shadow-[inset_4px_4px_6px_rgba(20,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
                      >
                        <Image className="h-4 w-4 text-white" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-800 mb-3">{place.desc}</p>

                    <button onClick={() => handleGo(place.mapLink)}

                    className="text-white text-lg w-full py-2  bg-blue-700 hover:bg-blue-600 hover:scale-110 rounded-lg transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
                      Visit Now
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="hidden md:flex p-2 bg-gray-700/60 rounded-full hover:scale-105"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* DOTS */}
          <div className="hidden md:flex justify-center  gap-2">
            {destinations.map((_, i) => (
              <motion.div
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i === index ? "bg-blue-600" : "bg-gray-700/60"
                }`}
                animate={{ scale: i === index ? 1.1 : 0.7 }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>

          <div className="flex md:hidden justify-center mt-4 gap-2">
            {destinations.map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === activeIndex ? "bg-blue-600 " : "bg-gray-700/40 "
                }`}
                animate={{ scale: i === activeIndex ? 1.2 : 0.95 }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>
        </section>
      </div>

      <DestinationGalleryModal
        destination={galleryDestination}
        onClose={() => setGalleryDestination(null)}
      />
    </main>
  );
};

export default DestinationPage;
