import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FlameIcon,
  Image,
  MapPin,
} from "lucide-react";

import staticShops from "./staticShops";
import useShopData from "./useShopData";

import useHorizontalScroll from "../../../shared/utils/useHorizontalScroll";

import getImagePath from "../../../shared/utils/getImagePath";
import GalleryCardPopUp from "../../../shared/utils/GalleryCardPopUp";


const ShopPage = ({ region, title, subtitle }) => {

      /* ---------------- STATE ---------------- */
  const [activeImageIndex, setActiveImageIndex] = useState([]);
  const [galleryShop, setGalleryShop] = useState(null);

  const containerRef = useRef(null);

  /* ---------------- DATA ---------------- */
  const { shopsData, loading } = useShopData(region);
  const displayShops = shopsData.length > 0 ? shopsData : staticShops;

  /* ---------------- INIT SLIDER INDEX ---------------- */
  useEffect(() => {
    if (displayShops.length > 0) {
      setActiveImageIndex(Array(displayShops.length).fill(0));
    }
  }, [displayShops.length]);


  /* ---------------- SCROLL ---------------- */
  const { canScrollLeft, canScrollRight } = useHorizontalScroll(
    containerRef,
    loading,
    [displayShops.length]
  );

  const scrollLeft = () => {
    containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollWidth,
      behavior: "smooth",
    });
  };

    /* ---------------- AUTO SLIDESHOW ---------------- */

  useEffect(() => {
    if (!displayShops.length || !activeImageIndex.length) return;

    const intervals = displayShops.map((_, index) =>
      setInterval(() => {
        setActiveImageIndex((prev) => {
          const arr = [...prev];
          arr[index] = (arr[index] + 1) % displayShops[index].images.length;
          return arr;
        });
      }, 6000 + index * 1200)
    );

    return () => intervals.forEach(clearInterval);
  }, [displayShops.length, activeImageIndex.length]);

  /* ---------------- MAP ---------------- */
  const handleGo = (mapLink) => {
    if (mapLink) window.open(mapLink, "_blank");
  };

  
  /* ---------------- loading ---------------- */
  if (loading) {
    return (
      <div className="text-center text-white bg-black py-24 text-xl">
        Loading Shops...
      </div>
    );
  }

  
  /* ---------------- UI ---------------- */

  return (
    <main className="relative max-h-screen w-full text-gray-900 py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-800">
            {subtitle}
          </p>
        </motion.header>


        {/* SCROLL + CARDS */}
        <section className="relative py-8 lg:px-24">
          <div className="flex justify-end gap-4 px-4">
            {/* left button  */}
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

          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory p-4"
          >
            {displayShops.map((shop, shopIndex) => (
              <div key={shopIndex} 
              className="snap-center  flex flex-col gap-2">
                <div className="relative h-[250px] w-[300px] rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex[shopIndex]}
                      src={getImagePath(
                        shop.images[activeImageIndex[shopIndex]]
                      )}
                      alt={shop.name}
                      className="object-cover h-full w-full rounded-xl border border-black/40"
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>

                  <button
                    onClick={() => setGalleryShop(shop)}
                    className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full"
                  >
                    <Image className="text-white h-4 w-4" />
                  </button>
                </div>

                 {/* Dots (inner images) */}
                <div className="flex gap-2 justify-center">
                  {shop.images.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        i === activeImageIndex[shopIndex]
                          ? "bg-orange-500"
                          : "bg-gray-600/40"
                      }`}
                      animate={{
                        scale: i === activeImageIndex[shopIndex] ? 1.3 : 1,
                      }}
                    />
                  ))}
                </div>
                
                {/* info  */}
                <h1 className="font-semibold text-xl text-center md:text-left">
                  {shop.name}
                </h1>
                <div className="hidden flex gap-2 items-center">
                  <MapPin className="h-4 w-4" />
                  <h4>{shop.distance}</h4>
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4" />
                  <h4>{shop.location}</h4>
                </div>
                <div className="hidden flex gap-2 items-center">
                  <FlameIcon className="h-4 w-4" />
                  <h4>{shop.description}</h4>
                </div>
                <button
                  onClick={() => handleGo(food.mapLink)}
                  className=" bg-orange-600 border-b border-sky-900/60 hover:bg-orange-600/90 hover:scale-110 w-full font-semibold md:px-6 py-1 rounded-lg transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]"
                >
                  Direction
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

        {/* pop-up galley  */}
      <GalleryCardPopUp
      card={galleryShop} 
      onClose={() => setGalleryShop(null)} />
    </main>
  );
};

export default ShopPage;
