import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const destinations = [
  {
    name: "Orchha",
    img: "https://images.unsplash.com/photo-1682687220205-1f3b1eb1c4d4?q=80&w=800",
    desc: "A historical town famous for temples and forts.",
  },
  {
    name: "Datia",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
    desc: "Known for its grand temples and architecture.",
  },
  {
    name: "Chanderi",
    img: "https://images.unsplash.com/photo-1526481280693-3bfa7568e8f8?q=80&w=800",
    desc: "A heritage town famous for its handloom sarees.",
  },
  {
    name: "Jhansi",
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800",
    desc: "City of bravery and rich history.",
  },
];

const DestinationsOfMau = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  // 🔹 Desktop: handle next/prev slide
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? destinations.length - 1 : prev - 1
    );
  };

  // 🔹 Mobile: sync dots with scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMobile) return;

    const updateActive = () => {
      const cards = Array.from(container.children);
      if (!cards.length) return;

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let minDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        if (dist < minDist) {
          minDist = dist;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateActive);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    updateActive();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <div className="flex flex-col items-center py-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Destinations</h1>

      {/* ==== Desktop View ==== */}
      <div className="hidden md:flex items-center justify-center w-full relative">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-8 z-10 p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-full text-white transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Slide Transition */}
        <div className="w-[60%] h-[500px] flex justify-center items-center overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -150 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative flex flex-col items-center text-center bg-white shadow-lg rounded-2xl p-4 w-full"
            >
              <img
                src={destinations[activeIndex].img}
                alt={destinations[activeIndex].name}
                className="h-72 w-full object-cover rounded-xl mb-3"
              />
              <h2 className="text-2xl font-semibold mb-2">
                {destinations[activeIndex].name}
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                {destinations[activeIndex].desc}
              </p>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-500 transition">
                Visit Now
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-8 z-10 p-3 bg-gray-800/50 hover:bg-gray-700/70 rounded-full text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ==== Mobile View ==== */}
      <div
        ref={containerRef}
        className="md:hidden flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-6 w-full"
      >
        {destinations.map((place, i) => (
          <motion.div
            key={i}
            className="min-w-[90%] snap-center flex-shrink-0 bg-white rounded-2xl shadow-lg p-4 text-center"
          >
            <img
              src={place.img}
              alt={place.name}
              className="h-64 w-full object-cover rounded-xl mb-3"
            />
            <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
            <p className="text-gray-600 text-sm mb-3">{place.desc}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-500 transition">
              Visit Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* ==== Dots (common for both) ==== */}
      <div className="flex justify-center gap-2 mt-5">
        {destinations.map((_, i) => (
          <motion.div
            key={i}
            className={`h-3 w-3 rounded-full ${
              i === activeIndex ? "bg-blue-600" : "bg-gray-400"
            }`}
            animate={{ scale: i === activeIndex ? 1.3 : 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationsOfMau;

















// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { getContent } from "../services/contentService.js";

// const backendURL = "http://localhost:5000";

// const DestinationsOfMau = () => {
//   const staticDestinations = [
//     {
//       name: "Orchha",
//       img: "jhansi.jpg",
//       desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
//     },
//     {
//       name: "Datia",
//       img: "datia.jpg",
//       desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
//     },
//     {
//       name: "Chanderi",
//       img: "jhansi2.jpg",
//       desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
//     },
//     {
//       name: "Jhansi",
//       img: "jhansi6.jpg",
//       desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
//     },
//     {
//       name: "Tikamgarh",
//       img: "jhansi3.jpg",
//       desc: "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising.",
//     },
//   ];

//   const getImagePath = (img) => {
//     if (!img) return "/fallback.jpg";
//     if (img.startsWith("http")) return img;
//     if (img.startsWith("/uploads") || img.startsWith("uploads"))
//       return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
//     return `${import.meta.env.BASE_URL}${img}`;
//   };

//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [destinationData, setDestinationsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch dynamic destinations from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getContent("mauranipur", "destinations");
//         const mappedData = data.map((item) => ({
//           name: item.title,
//           desc: item.description,
//           img: item.mainImage || item.galleryImages?.[0] || "",
//         }));
//         setDestinationsData(mappedData);
//       } catch (err) {
//         console.error("Error fetching destinations:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // ✅ Merge static + dynamic destinations
//   const destinations = [...staticDestinations, ...destinationData];

//   const nextSlide = () => {
//     setDirection(1);
//     setIndex((prev) => (prev + 1) % destinations.length);
//   };

//   const prevSlide = () => {
//     setDirection(-1);
//     setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
//   };

//   const leftIndex = (index - 1 + destinations.length) % destinations.length;
//   const rightIndex = (index + 1) % destinations.length;
//   const farRightIndex = (index + 2) % destinations.length;

//   const variants = {
//     enter: (dir) => ({
//       x: dir > 0 ? 300 : -300,
//       opacity: 0,
//       scale: 0.8,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//       zIndex: 10,
//     },
//     exit: (dir) => ({
//       x: dir < 0 ? 300 : -300,
//       opacity: 0,
//       scale: 0.8,
//     }),
//   };

// const containerRef = useRef(null);
// const [activeIndex, setActiveIndex] = useState(0);

// useEffect(() => {
//   const container = containerRef.current;
//   if (!container) return;

//   const handleScroll = () => {
//     const scrollLeft = container.scrollLeft;
//     const cardWidth = container.offsetWidth;
//     const newIndex = Math.round(scrollLeft / cardWidth);

//     // Update only when index actually changes
//     setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
//   };

//   container.addEventListener("scroll", handleScroll);
//   return () => container.removeEventListener("scroll", handleScroll);
// }, []); // ✅ run once only


//   if (loading)
//     return (
//       <div className="text-center text-white py-24 text-xl">Loading...</div>
//     );

//   return (
//     <main
//       id="explore"
//       className="relative min-h-screen w-full  text-gray-900 py-4 overflow-hidden"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
//         <motion.header
//           className="md:px-16"
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
//             Destinations
//           </h1>
//           <p className="mt-2 text-sm md:text-base text-slate-800">
//             Reach out and let’s bring you closer to the heart of Bundelkhand..
//           </p>
//         </motion.header>

//         {/* ==== Main Section ==== */}
//         <section className="relative justify-center items-center lg:px-28 md:py-8">
//           <div className="relative flex justify-center items-center md:gap-6 overflow-hidden">
//             <button
//               onClick={prevSlide}
//               className="hidden md:flex ml-2 p-2 bg-gray-700/60 rounded-full hover:bg-gray-700/40 hover:scale-105 transition-transform duration-300 easeInOut"
//             >
//               <ChevronLeft className="w-6 h-6 text-black/80" />
//             </button>

//             <div className="relative w-[100%] flex justify-center items-center h-[85vh] md:h-[90vh]">
//               <AnimatePresence initial={false} custom={direction}>
//                 {/* === Left Small Card === */}
//                 <motion.div
//                   key={`left-${leftIndex}`}
//                   custom={direction}
//                   variants={variants}
//                   initial="enter"
//                   animate={{ x: "-110%", scale: 0.8, opacity: 0.5, zIndex: 5 }}
//                   exit="exit"
//                   transition={{ duration: 0.6 }}
//                   className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer"
//                   onClick={prevSlide}
//                 >
//                   <h1 className="font-bold text-2xl text-center">
//                     {destinations[leftIndex].name}
//                   </h1>
//                   <img
//                     src={getImagePath(destinations[leftIndex].img)}
//                     alt=""
//                     className="h-[40vh] rounded-xl object-cover border-2 border-black/20"
//                   />
//                   <p className="text-sm md:text-base text-center text-slate-800">
//                     {destinations[leftIndex].desc}
//                   </p>
//                 </motion.div>

//                 {/* === Main Center Card === */}
//                 <motion.div
//                   key={`main-${index}`}
//                   custom={direction}
//                   variants={variants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   transition={{
//                     x: { type: "spring", stiffness: 200, damping: 25 },
//                     opacity: { duration: 0.3 },
//                   }}
//                   className="absolute hidden md:flex flex-col gap-4 w-[90%] md:w-[40%] text-center md:p-2"
//                 >
//                   <h1 className="font-bold text-2xl">
//                     {destinations[index].name}
//                   </h1>
//                   <img
//                     src={getImagePath(destinations[index].img)}
//                     alt={destinations[index].name}
//                     className="md:h-[50vh] rounded-xl object-cover border-2 border-black/20"
//                   />
//                   <p className="text-sm md:text-base text-slate-800">
//                     {destinations[index].desc}
//                   </p>
//                   <button className=" text-white text-lg md:text-xl my-2 px-6 py-2 font-semibold rounded-xl bg-blue-700 hover:bg-blue-600 hover:scale-110 transition-transform duration-300 easeInOut   shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
//                     Visit Now
//                   </button>
//                 </motion.div>

//                 {/* === Right Small Card === */}
//                 <motion.div
//                   key={`right-${rightIndex}`}
//                   custom={direction}
//                   variants={variants}
//                   initial="enter"
//                   animate={{ x: "110%", scale: 0.8, opacity: 0.5, zIndex: 5 }}
//                   exit="exit"
//                   transition={{ duration: 0.6 }}
//                   className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer"
//                   onClick={nextSlide}
//                 >
//                   <h1 className="font-bold text-2xl text-center">
//                     {destinations[rightIndex].name}
//                   </h1>
//                   <img
//                     src={getImagePath(destinations[rightIndex].img)}
//                     alt=""
//                     className="h-[40vh] rounded-xl object-cover border-2 border-black/20"
//                   />
//                   <p className="text-sm md:text-base text-center text-slate-800">
//                     {destinations[rightIndex].desc}
//                   </p>
//                 </motion.div>
//               </AnimatePresence>

//               {/* === Mobile Scroll Cards === */}
//               <motion.div
                
//                 className=" md:hidden overflow-x-auto snap-x snap-mandatory space-x-4 px-2 my-auto no-scrollbar scroll-smooth"
//               >
//                <div ref={containerRef}
//                 className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide z-30"> 
//                  {destinations.map((place, i) => (
//                   <motion.div
//                     key={i}
//                     className={`max-w-[100%] snap-center flex-shrink-0 bg-white/10 rounded-xl p-3 text-center transition-transform duration-300 ${
//                       i === activeIndex ? "scale-100" : "scale-100"
//                     }`}
//                   >
//                     <h1 className="font-bold text-xl mb-2">{place.name}</h1>
//                     <img
//                       src={getImagePath(place.img)}
//                       alt={place.name}
//                       className="h-[50vh] w-full rounded-xl object-cover mb-2 border-2 border-black/40"
//                     />
//                     <p className="text-sm text-slate-800 mb-3">{place.desc}</p>
//                     <button
//                     className="text-white text-lg w-full py-2 rounded-xl bg-blue-700 hover:bg-blue-600 transition-transform duration-300 easeInOut hover:scale-110 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
//                       Visit Now
//                     </button>
                    
//                   </motion.div>
                  
//                 ))}
//                </div>
                
//               </motion.div>
              
//             </div>
//             <button
//               onClick={nextSlide}
//               className="hidden md:flex ml-2 p-2 bg-gray-700/60 rounded-full hover:bg-gray-700/40 hover:scale-105 transition-transform duration-300 easeInOut"
//             >
//               <ChevronRight className="w-6 h-6 text-black" />
//             </button>
            
//           </div>
//           {/* dots  */}
//                     <div className="flex justify-center items-center gap-2 ">
//                     {destinations.map((_, i) => (
//                       <motion.div
//                         key={i}
//                         className={`h-3 w-3 rounded-full ${
//                           i === index ? "bg-blue-500" : "bg-gray-700/40"
//                         }`}
//                         animate={{ scale: i === index ? 1 : .8 }}
//                         transition={{ duration: 0.3 }}
//                       />
//                     ))}
//                   </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default DestinationsOfMau;
