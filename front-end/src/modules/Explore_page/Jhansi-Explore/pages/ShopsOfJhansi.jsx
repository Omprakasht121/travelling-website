import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlameIcon, GoalIcon, Image, MapPin, X } from "lucide-react";

const shops = [
  {
    name: "Sweet Dairy (Cafe)",
    distance: "320 meter away",
    location: "Sweet Dairy Mau Uttar Pradesh",
    speciality:"famous for sweet",
    images: ["panna.jpg", "jhansi6.jpg", "orchha3.jpg"],
  },
  {
    name: "Bharat Bakery",
    distance: "150 meter",
    location: "Bharat Bakery Mau Uttar Pradesh",
    speciality:"famous for chinese",
    images: ["bandha.jpg", "jhansi6.jpg", "panna.jpg"],
  },
  {
    name: "Tea Point",
    distance: "280 meter",
    location: "Tea Point Mau Uttar Pradesh",
    speciality:"famous for milk",
    images: ["orchha3.jpg", "bandha.jpg", "jhansi6.jpg"],
  },
  {
    name: "Raj Sweets",
    distance: "500 meter",
    location: "Raj Sweets Mau Uttar Pradesh",
    speciality:"famous for smaosha",
    images: ["jhansi6.jpg", "panna.jpg", "bandha.jpg"],
  },
  {
    name: "Fruit Mart",
    distance: "200 meter",
    location: "Fruit Mart Mau Uttar Pradesh",
    speciality:"famous for patoto",
    images: ["bandha.jpg", "panna.jpg", "orchha3.jpg"],
  },
  {
    name: "Fruit Mart",
    distance: "200 meter",
    location: "Fruit Mart Mau Uttar Pradesh",
    speciality:"famous for patoto",
    images: ["bandha.jpg", "panna.jpg", "orchha3.jpg"],
  },
];

const ShopsOfJhansi = () => {
  const [activeShop, setActiveShop] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(
    Array(shops.length).fill(0)
  );
  const [galleryShop, setGalleryShop] = useState(null);
  const containerRef = useRef(null);

  // Auto change shop images every few seconds
    useEffect(() => {
    const intervals = shops.map((_, shopIndex) => {
        const delay = 8000 + shopIndex * 1500; // card1:8s, card2:6.5s, etc.
        return setInterval(() => {
        setActiveImageIndex((prev) => {
            const newArr = [...prev];
            const total = shops[shopIndex].images.length;
            newArr[shopIndex] = (newArr[shopIndex] + 1) % total;
            return newArr;
        });
        }, delay);
    });

    return () => intervals.forEach(clearInterval);
    }, []);

  // Track horizontal scroll for outer dots
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const newIndex = Math.round(
        container.scrollLeft / container.offsetWidth
      );
      setActiveShop(newIndex);
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

  return (
    <main className="relative max-h-screen w-full bg-gradient-to-b from-sky-950 to-slate-900 text-white py-4 overflow-hidden">
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
            Famous Shops
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-300">
            Reach out and let’s bring you closer to the heart of Bundelkhand..
          </p>
        </motion.header>

        {/* main content */}
        <section className="relative justify-center items-center lg:px-24 py-8">
          {/* Horizontal slider */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-8 p-4 no-scrollbar"
          >
            {shops.map((shop, shopIndex) => (
              <div
                key={shopIndex}
                className="snap-center flex-shrink-0 w-[80%] sm:w-[45%] md:w-[23%] flex flex-col gap-2"
              >
                {/* Image slideshow */}
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex[shopIndex]}
                      src={`${import.meta.env.BASE_URL}${
                        shop.images[activeImageIndex[shopIndex]]
                      }`}
                      alt={shop.name}
                      className="object-cover h-full w-full rounded-xl"
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>

                  {/* Image icon */}
                  <button
                    onClick={() => setGalleryShop(shop)}
                    className="absolute bottom-0 right-0 p-2 m-2 bg-gray-700/60 rounded-full border hover:scale-110 transition"
                  >
                    <Image className="h-4 w-4" />
                  </button>
                </div>

                {/* Inner dots (images) */}
                <div className="flex gap-2 justify-center">
                  {shop.images.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        i === activeImageIndex[shopIndex]
                          ? "bg-orange-500"
                          : "bg-white/40"
                      }`}
                      animate={{ scale: i === activeImageIndex[shopIndex] ? 1.3 : 1 }}
                    />
                  ))}
                </div>

                {/* Text info */}
                <h1 className="font-semibold text-xl text-center md:text-left">
                  {shop.name}
                </h1>
                <div className="flex gap-2 justify-start items-center">
                    <MapPin className="h-4 w-4" />
                    <h4>{shop.distance}</h4>
                </div>
                <div className="flex gap-2 justify-start items-center">
                    <GoalIcon className="h-4 w-4" />
                    <h4>{shop.location}</h4>
                </div>
                <div className="flex gap-2 justify-start items-center">
                    <FlameIcon className="h-4 w-4" />
                    <h4>{shop.speciality}</h4>
                </div>
                <button
                    onClick={() => handleGo(shop.location)}
                    className="border bg-orange-700 hover:bg-orange-600 transition w-full md:w-auto md:px-6 py-1 rounded-xl "
                  >
                    Go
                  </button>
              </div>
            ))}
          </div>

          {/* Outer Dots */}
          <div className="flex gap-2 justify-center py-6">
            {shops.map((_, i) => (
              <motion.div
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i === activeShop ? "bg-blue-500" : "bg-white/40"
                }`}
                animate={{ scale: i === activeShop ? 1 : .7 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {galleryShop && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setGalleryShop(null)}
              className="absolute top-6 right-6 text-white hover:scale-110 transition"
            >
              <X size={28} />
            </button>
            <div className="flex overflow-x-auto gap-6 px-8 snap-x snap-mandatory scroll-smooth no-scrollbar">
              {galleryShop.images.map((img, i) => (
                <motion.img
                  key={i}
                  src={`${import.meta.env.BASE_URL}${img}`}
                  alt=""
                  className="snap-center object-cover rounded-xl w-[85vw] sm:w-[60vw] md:w-[30vw] max-h-[80vh] "
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

export default ShopsOfJhansi;
