import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImagesOfJhansi = () => {
  const allImages = [
    "jhansi.jpg",
    "datia.jpg",
    "jhansi3.jpg",
    "jhansi2.jpg",
    "gwalior.jpg",
    "jhansi6.jpg",
    "bandha.jpg",
    "orchha.jpg",
  ];

  const [mainImage, setMainImage] = useState(allImages[0]);
  const [smallImages, setSmallImages] = useState(allImages.slice(1, 5));
  const [showAll, setShowAll] = useState(false);

  // randomize small images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...allImages].sort(() => Math.random() - 0.5);
      setSmallImages(shuffled.slice(0, 4));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main id="images" className="relative max-h-screen w-full bg-gradient-to-b from-sky-950 to-slate-900 text-white py-4 overflow-hidden">
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
            Images
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-300">
            Reach out and let’s bring you closer to the heart of Bundelkhand..
          </p>
        </motion.header>

        {/* main content */}
        <section className="relative justify-center items-center lg:px-24 py-8">
          <div className="h-[60vh] grid grid-cols-3 md:grid-cols-4 p-4 gap-4">
            {/* main image */}
            <motion.div
              key={mainImage}
              className="h-full w-full col-span-3 md:col-span-2 rounded-xl overflow-hidden"
              initial={{ opacity: 0.8, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                src={`${import.meta.env.BASE_URL}orchha3.jpg`}
                alt=""
                className="object-cover h-full w-full rounded-xl"
              />
            </motion.div>

            {/* right-side images */}
            <div className="col-span-3 md:col-span-2 flex gap-4 justify-center">
              {[0, 1].map((col) => (
                <div key={col} className="flex flex-col gap-4 w-1/2">
                  {smallImages.slice(col * 2, col * 2 + 2).map((img, index) => (
                    <AnimatePresence key={img}>
                      <motion.img
                        key={img}
                        src={`${import.meta.env.BASE_URL}${img}`}
                        alt=""
                        className="object-cover rounded-xl h-full w-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                      />
                    </AnimatePresence>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* show all button */}
          <div className="text-right mt-2 md:mt-4 pr-4">
            <button
              onClick={() => setShowAll(true)}
              className="text-white hover:text-sky-400 transition-all duration-300 underline text-sm md:text-base"
            >
              Show all photos
            </button>
          </div>
        </section>

        {/* full gallery modal */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex flex-wrap justify-center items-center gap-4 p-6 z-50 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {allImages.map((img) => (
                <motion.img
                  key={img}
                  src={`${import.meta.env.BASE_URL}${img}`}
                  alt=""
                  className="object-cover w-96 h-60 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
              <button
                onClick={() => setShowAll(false)}
                className="fixed top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full px-4 py-2"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default ImagesOfJhansi;
