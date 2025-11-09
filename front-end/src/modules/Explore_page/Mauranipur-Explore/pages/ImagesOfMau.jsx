// ImagesOfMau.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // ✅ Import motion
import { getContent } from "../services/contentService.js";

const backendURL = "http://localhost:5000";

const ImagesOfMau = () => {
  const staticImages = [
    "jhansi.jpg",
    "datia.jpg",
    "jhansi3.jpg",
    "jhansi2.jpg",
    "gwalior.jpg",
    "jhansi6.jpg",
    "bandha.jpg",
    "orchha.jpg",
  ];

  const getImagePath = (img) => {
    if (!img) return "/fallback.jpg";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads") || img.startsWith("uploads"))
      return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
    return `${import.meta.env.BASE_URL}${img}`;
  };

  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const [mainImage, setMainImage] = useState(staticImages[0]);
  const [smallImages, setSmallImages] = useState(staticImages.slice(1, 5));

  // ✅ Fetch backend data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent("mauranipur", "images");
        const mapped = data.map((item) => ({
          mainImage: item.mainImage || "",
          gallery:
            item.galleryImages || item.gallery || item.images || [],
        }));
        setGalleryData(mapped);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Build display lists
  useEffect(() => {
    if (galleryData.length > 0) {
      const uploadedMain = galleryData.find((g) => g.mainImage);
      const chosenMain = uploadedMain
        ? uploadedMain.mainImage
        : staticImages[0];

      const uploadedGallery = galleryData.flatMap((g) => g.gallery || []);
      const smallPool = [
        ...uploadedGallery.filter(Boolean),
        ...staticImages.filter((s) => s !== chosenMain),
      ].slice(0, 4);

      setMainImage(chosenMain);
      setSmallImages(smallPool);
    }
  }, [galleryData]);

  const allImages = [
    ...staticImages,
    ...galleryData.flatMap((g) => [
      g.mainImage,
      ...(g.gallery || []),
    ]),
  ].filter(Boolean);

  // ✅ Randomly fade-change small images
  useEffect(() => {
  if (!smallImages.length) return;

  const intervalIds = [];

  const pickRandomImage = (current) => {
    const pool = allImages.filter((img) => img !== current);
    return pool[Math.floor(Math.random() * pool.length)];
  };

  // each small image slot updates at random intervals (4–7 seconds)
  smallImages.forEach((_, index) => {
    const randomTime = Math.floor(Math.random() * 4000) ; // 4–7 sec
    const id = setInterval(() => {
      setSmallImages((prev) => {
        const newArr = [...prev];
        newArr[index] = pickRandomImage(prev[index++]);
        return newArr;
      });
    }, randomTime);
    intervalIds.push(id);
  });

  return () => intervalIds.forEach(clearInterval);
}, [allImages.length]);

  

  if (loading)
    return (
      <div className="text-center text-white py-24 text-xl">Loading...</div>
    );

  return (
    <main
      id="images"
      className="relative max-h-screen w-full  text-gray-900 py-4 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        <header className="md:px-16 mb-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Images
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-800">
            Reach out and let’s bring you closer to the heart of Bundelkhand..
          </p>
        </header>

        {/* main content */}
        <section className="relative justify-center items-center lg:px-24 py-8">
          <div className=" h-[61vh] grid grid-cols-3 md:grid-cols-4 p-4 gap-4">
            {/* main image */}
            <div className="h-full w-full col-span-3 md:col-span-2 rounded-xl overflow-hidden">
              <img
                src={getImagePath(mainImage)}
                alt=""
                className="object-cover h-full w-full rounded-xl border-2 border-black/20"
              />
            </div>

            <div className="col-span-3 md:col-span-2 flex gap-4  justify-center">
              {[0, 1].map((col) => (
                <div key={col} className="flex flex-col gap-4  w-1/2">
                  {smallImages.slice(col * 2, col * 2 + 2).map((img, i) => (
                    <motion.img
                      key={col * 2 + i} // 🔑 stable key to stop stacking
                      src={getImagePath(img)}
                      alt=""
                      className="object-cover rounded-xl h-[14vh] md:h-[28vh] w-full border border-black/10"
                      initial={{ opacity: 1, scale:1}}
                      animate={{ opacity: 1, scale:1 }} // simple fade flash
                      transition={{
                        duration: 1, // 0.5–2 sec fade
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* show all button */}
          <div className=" text-right mt-2 md:mt-4 pr-4">
            <button
              onClick={() => setShowAll(true)}
              className="text-gray-800 hover:text-sky-400 transition-all duration-300 underline text-sm md:text-base"
            >
              Show all photos
            </button>
          </div>
        </section>

        {/* full gallery modal */}
        {showAll && (
          <div className="fixed inset-0 bg-black/90 flex flex-wrap justify-center items-center gap-4 p-6 z-50 overflow-auto">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={getImagePath(img)}
                alt=""
                className="object-cover w-96 h-72 rounded-xl hover:scale-105 hover:border-2 hover:border-sky-700 animation-transform duration-300 easeInOut"
              />
            ))}
            <button
              onClick={() => setShowAll(false)}
              className="fixed top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full px-4 py-2"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ImagesOfMau;
