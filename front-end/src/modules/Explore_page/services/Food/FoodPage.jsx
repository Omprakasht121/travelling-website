import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  MapPin,
  FlameIcon,
  GoalIcon,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";

import staticFood from "./staticFood";
import useFoodData from "./useFoodData";
import useHorizontalScroll from "./useHorizontalScroll";
import FoodModal from "./FoodModal";
import getImagePath from "../../../shared/utils/getImagePath";


const FoodPage = ({ region, title, subtitle }) => {
  /* ---------------- STATE ---------------- */
  const [activeImageIndex, setActiveImageIndex] = useState([]);
  const [galleryFood, setGalleryFood] = useState(null);
  const containerRef = useRef(null);

  /* ---------------- DATA ---------------- */
  const { foodsData, loading } = useFoodData(region);
  const displayFoods = [...staticFood, ...foodsData];

  /* ---------------- INIT SLIDER INDEX ---------------- */
  useEffect(() => {
    if (displayFoods.length > 0) {
      setActiveImageIndex(Array(displayFoods.length).fill(0));
    }
  }, [displayFoods.length]);

  /* ---------------- SCROLL ---------------- */
  const { canScrollLeft, canScrollRight } = useHorizontalScroll(
    containerRef,
    loading,
    [displayFoods.length]
  );

  const scrollLeft = () => {
    containerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollTo({
      left: containerRef.current.scrollWidth,
      behavior: "smooth",
    });
  };

  /* ---------------- AUTO SLIDESHOW ---------------- */
  useEffect(() => {
    if (!displayFoods.length || !activeImageIndex.length) return;

    const timers = displayFoods.map((food, index) => {
      return setInterval(() => {
        setActiveImageIndex((prev) => {
          const updated = [...prev];
          updated[index] =
            (updated[index] + 1) % food.images.length;
          return updated;
        });
      }, 6000 + index * 1200);
    });

    return () => timers.forEach(clearInterval);
  }, [displayFoods.length, activeImageIndex.length]);

  /* ---------------- MAP ---------------- */
  const handleGo = (mapLink) => {
    if (mapLink) window.open(mapLink, "_blank");
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="text-center bg-black text-white py-24 text-xl">
        Loading Foods...
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <main className="relative w-full text-gray-900 py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">

        {/* HEADER */}
        <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold">
            {title}
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-800">
            {subtitle}
          </p>
        </motion.header>

        {/* SCROLL + CARDS */}
        <section className="relative py-8 lg:px-24">
          <div className="flex justify-end gap-4 px-4">
            <button onClick={scrollLeft} disabled={!canScrollLeft}>
              <ChevronLeft />
            </button>
            <button onClick={scrollRight} disabled={!canScrollRight}>
              <ChevronRight />
            </button>
          </div>

          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory p-4"
          >
            {displayFoods.map((food, i) => (
              <div key={i} className="snap-center min-w-[300px]">
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex[i]}
                      src={getImagePath(food.images[activeImageIndex[i]])}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>

                  <button
                    onClick={() => setGalleryFood(food)}
                    className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full"
                  >
                    <Image className="text-white h-4 w-4" />
                  </button>
                </div>

                <h2 className="font-semibold text-xl mt-2">
                  {food.name}
                </h2>

                <div className="flex gap-2 items-center">
                  <MapPin size={16} /> {food.distance}
                </div>

                <div className="flex gap-2 items-center">
                  <GoalIcon size={16} /> {food.location}
                </div>

                <div className="flex gap-2 items-center">
                  <FlameIcon size={16} /> {food.description}
                </div>

                <div className="flex gap-2 items-center">
                  <Phone size={16} />
                  <a href={`tel:${food.phone}`}>+91 {food.phone}</a>
                </div>

                <button
                  onClick={() => handleGo(food.mapLink)}
                  className="bg-orange-600 text-white w-full mt-2 py-1 rounded"
                >
                  Direction
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FULL PAGE MODAL */}
      <FoodModal
        food={galleryFood}
        onClose={() => setGalleryFood(null)}
      />
    </main>
  );
};

export default FoodPage;
