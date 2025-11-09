import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";


const FestivalsOfOrchha = () => {
    
  const images = [
    `${import.meta.env.BASE_URL}orchha.jpg`,
    `${import.meta.env.BASE_URL}orchha2.jpg`,
    `${import.meta.env.BASE_URL}jhansi6.jpg`,
    `${import.meta.env.BASE_URL}jhansi.jpg`,
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // ✅ Auto change every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ Animation Variants
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%", // enter from right or left
      opacity: 1,
      scale: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%", // exit opposite direction
      opacity: 1,
      scale: 1,
      zIndex: 0,
      transition: { duration: 1, ease: "easeInOut" },
    }),
  };


  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-sky-950 to-slate-900 text-white py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        {/* header */}
        <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Festivals & Culture
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-300">
            Reach out and let’s bring you closer to the heart of Bundelkhand..
          </p>
        </motion.header>

        {/* main content */}
        
      {/* main content */}
      <section className="relative justify-center items-center lg:px-24 py-8">
        <div className="h-[60vh] p-4 gap-4 flex justify-center items-center overflow-hidden relative">

          {/* Left arrow (optional manual control) */}
          <button
            className="hidden md:flex p-3 bg-white/20 rounded-full hover:bg-white/40 transition absolute left-4 z-20"
            onClick={() => {
              setDirection(-1);
              setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Animated image container */}
          <div className="w-full h-full flex justify-center items-center relative overflow-hidden rounded-xl">
            <AnimatePresence custom={direction}>
              <motion.img
                key={index}
                src={images[index]}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full object-cover rounded-xl"
              />
            </AnimatePresence>
          </div>

          {/* Left arrow (optional manual control) */}
          <button
            className="hidden md:flex p-3 bg-white/20 rounded-full hover:bg-white/40 transition absolute left-4 z-20"
            onClick={() => {
              setDirection(-1);
              setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>
    
      </div>
    </main>
  );
};

export default FestivalsOfOrchha;
