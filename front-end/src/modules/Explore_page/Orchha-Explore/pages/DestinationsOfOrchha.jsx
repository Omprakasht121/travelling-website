// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, Heart, Image, X } from "lucide-react";
// import { getContent } from "../../../../shared/services/contentService.js";
// import { staticDestinations } from "../staticdata/StaticDestinations.jsx";

// const backendURL = import.meta.env.VITE_BASE_URL;

// const DestinationsOfOrchha = () => {
//   const getImagePath = (img) => {
//     if (!img) return "/fallback.jpg";
//     if (img.startsWith("http")) return img;

//     if (img.startsWith("/uploads") || img.startsWith("uploads"))
//       return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;

//     if (img.startsWith("/gallery") || img.startsWith("gallery"))
//       return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;

//     return `${import.meta.env.BASE_URL}${img}`;
//   };

//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState(0);

//   const [destinationData, setDestinationsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [galleryDestination, setGalleryDestination] = useState(null);

//   // ================================
//   // ✅ Fetch backend data (gallery fixed)
//   // ================================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getContent("orchha", "destinations");

//         const mappedData = data.map((item) => ({
//           name: item.title,
//           desc: item.description,
//           location:item.location,
//           img: item.mainImage || "",
//           images: [item.mainImage, ...(item.gallery || [])], 
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

//   // ================================
//   // ✅ Merge static + backend (gallery ensured)
//   // ================================
//   const destinations = [
//     ...staticDestinations.map((s) => ({
//       ...s,
//       images: [s.img, ...(s.images || [])], // ⭐ ensure array
//     })),
//     ...destinationData,
//   ];

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

//   const [isLiked, setIsLiked] = useState(false);

//   const handleLike = () => {
//     setIsLiked(true);
//     setTimeout(() => setIsLiked(false), 8000);
//   };

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

//   // ================================
//   // MOBILE SCROLL LOGIC (unchanged)
//   // ================================
//   const [activeIndex, setActiveIndex] = useState(0);
//   const containerRef = useRef(null);
//   const observerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container || destinations.length === 0) return;

//     if (observerRef.current) observerRef.current.disconnect();

//     const options = {
//       root: container,
//       threshold: 0.51,
//     };

//     const callback = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const id = parseInt(entry.target.dataset.index, 10);
//           if (!isNaN(id)) setActiveIndex(id);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(callback, options);
//     observerRef.current = observer;

//     Array.from(container.children).forEach((child) => observer.observe(child));

//     return () => observerRef.current && observerRef.current.disconnect();
//   }, [destinations, loading]);

  
//   const handleGo = (location) => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
//       location
//     )}`;
//     window.open(url, "_blank");
//   };


//   if (loading)
//     return (
//       <div className="text-center text-white py-24 text-xl">Loading...</div>
//     );

//   return (
//     <main id="explore" className="relative min-h-auto w-full py-4 overflow-hidden">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
//         {/* HEADER */}
//         <motion.header
//           className="md:px-16"
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <h1 className="text-3xl md:text-5xl font-extrabold">Destinations</h1>
//           <p className="mt-2 text-sm md:text-base text-slate-800">
//             Reach out and let’s bring you closer to the heart of Bundelkhand..
//           </p>
//         </motion.header>

//         {/* === MAIN SECTION === */}
//         <section className="relative lg:px-28 md:py-8">
//           <div className="relative flex justify-center items-center md:gap-6 overflow-hidden">

//             {/* LEFT ARROW */}
//             <button
//               onClick={prevSlide}
//               className="hidden md:flex p-2 bg-gray-700/60 rounded-full hover:scale-105 transition"
//             >
//               <ChevronLeft className="w-6 h-6 text-black" />
//             </button>

//             {/* CENTER SLIDER */}
//             <div className="relative w-full md:w-[90%] lg:w-[80%] xl:w-[75%] flex justify-center items-center md:min-h-[90vh]">
//               <AnimatePresence initial={false} custom={direction}>

//                 {/* LEFT CARD */}
//                 <motion.div
//                   key={`left-${leftIndex}`}
//                   custom={direction}
//                   variants={variants}
//                   initial="enter"
//                   animate={{ x: "-100%", scale: 0.8, opacity: 0.5 }}
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
//                     className="h-[40vh] rounded-xl object-cover border-2 border-black/20"
//                   />
//                   <p className="text-sm text-center text-slate-800">
//                     {destinations[leftIndex].desc}
//                   </p>
//                 </motion.div>

//                 {/* CENTER CARD */}
//                 <motion.div
//                   key={`main-${index}`}
//                   custom={direction}
//                   variants={variants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   className="absolute hidden md:flex flex-col gap-4 w-[90%] md:w-[40%] text-center"
//                 >
//                   <h1 className="font-bold text-2xl">
//                     {destinations[index].name}
//                   </h1>

//                   <div className="relative px-2">
//                     <img
//                       src={getImagePath(destinations[index].img)}
//                       className="md:h-[50vh] w-full rounded-xl object-cover border-2 border-black/20"
//                     />

//                     {/* LIKE BUTTON */}
//                     <motion.button
//                       whileTap={{ scale: 0.9 }}
//                       onClick={handleLike}
//                       className="absolute top-0 right-0 p-4 rounded-full"
//                     >
//                       <Heart
//                         className={`h-6 w-6 ${
//                           isLiked ? "fill-red-500 text-red-500" : "text-gray-900"
//                         }`}
//                       />
//                     </motion.button>

//                     {/* GALLERY BUTTON */}
//                     <button
//                       onClick={() => setGalleryDestination(destinations[index])}
//                       className="absolute bottom-0 right-0 p-2 m-4 bg-gray-700/60 rounded-full border border-black/20 hover:scale-110 transition shadow-[inset_4px_4px_6px_rgba(20,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
//                     >
//                       <Image className="h-4 w-4 text-white" />
//                     </button>
//                   </div>

//                   <p className="text-sm text-slate-800">
//                     {destinations[index].desc}
//                   </p>

//                   <button onClick={() => handleGo(destinations[index].location)}
//                   className="text-white text-lg px-6 py-2 rounded-xl bg-blue-700 hover:scale-110 transition">
//                     Visit Now
//                   </button>
//                 </motion.div>

//                 {/* RIGHT CARD */}
//                 <motion.div
//                   key={`right-${rightIndex}`}
//                   custom={direction}
//                   variants={variants}
//                   initial="enter"
//                   animate={{ x: "100%", scale: 0.8, opacity: 0.5 }}
//                   exit="exit"
//                   className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer"
//                   onClick={nextSlide}
//                 >
//                   <h1 className="font-bold text-2xl text-center">
//                     {destinations[rightIndex].name}
//                   </h1>
//                   <img
//                     src={getImagePath(destinations[rightIndex].img)}
//                     className="h-[40vh] rounded-xl object-cover border-2 border-black/20"
//                   />
//                   <p className="text-sm text-center text-slate-800">
//                     {destinations[rightIndex].desc}
//                   </p>
//                 </motion.div>
//               </AnimatePresence>

//               {/* MOBILE CARDS */}
//               <div
//                 ref={containerRef}
//                 className="flex md:hidden overflow-x-auto snap-x snap-mandatory space-x-4  pt-8 my-auto no-scrollbar scroll-smooth"
//               >
//                 {destinations.map((place, i) => (
//                   <motion.div
//                     key={i}
//                     data-index={i}
//                     className="w-[100%] snap-center flex-shrink-0 bg-white/10 rounded-xl p-3 text-center transition-transform duration-300"
//                   >
//                     <h1 className="font-bold text-xl mb-2">{place.name}</h1>
//                     <div className="relative">
//                       <img
//                         src={getImagePath(place.img)}
//                         className="h-[50vh] w-full rounded-xl object-cover mb-2 border-2 border-black/40"
//                       />

//                       {/* LIKE BUTTON */}
//                       <motion.button
//                         whileTap={{ scale: 0.9 }}
//                         onClick={handleLike}
//                         className="absolute top-0 right-0 p-2 rounded-full"
//                       >
//                         <Heart
//                           className={`h-6 w-6 ${
//                             isLiked ? "fill-red-500 text-red-500" : "text-gray-900"
//                           }`}
//                         />
//                       </motion.button>

//                       {/* GALLERY BUTTON */}
//                       <button
//                         onClick={() => setGalleryDestination(place)}
//                         className="absolute bottom-0 right-0 p-2 m-2 bg-gray-700/60 rounded-full border border-black/20 hover:scale-110 transition shadow-[inset_4px_4px_6px_rgba(20,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
//                       >
//                         <Image className="h-4 w-4 text-white" />
//                       </button>
//                     </div>

//                     <p className="text-sm text-slate-800 mb-3">{place.desc}</p>

//                     <button onClick={() => handleGo(place.location)}

//                     className="text-white text-lg w-full py-2 rounded-xl bg-blue-700 hover:scale-110 transition">
//                       Visit Now
//                     </button>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             <button
//               onClick={nextSlide}
//               className="hidden md:flex p-2 bg-gray-700/60 rounded-full hover:scale-105"
//             >
//               <ChevronRight className="w-6 h-6 text-black" />
//             </button>
//           </div>

//           {/* DOTS */}
//           <div className="hidden md:flex justify-center mt-4 gap-2">
//             {destinations.map((_, i) => (
//               <motion.div
//                 key={i}
//                 className={`h-3 w-3 rounded-full ${
//                   i === index ? "bg-blue-500" : "bg-gray-700/40"
//                 }`}
//               />
//             ))}
//           </div>

//           <div className="flex md:hidden justify-center mt-4 gap-2">
//             {destinations.map((_, i) => (
//               <motion.div
//                 key={i}
//                 className={`h-3 w-3 rounded-full ${
//                   i === activeIndex ? "bg-blue-500" : "bg-gray-700/40"
//                 }`}
//               />
//             ))}
//           </div>
//         </section>
//       </div>

//       {/* ========================== */}
//       {/* FULLSCREEN GALLERY POPUP */}
//       {/* ========================== */}
//       <AnimatePresence>
//         {galleryDestination && (
//           <motion.div
//             className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <button
//               onClick={() => setGalleryDestination(null)}
//               className="absolute top-6 right-6 text-white hover:scale-110 transition"
//             >
//               <X size={28} />
//             </button>

//             <div className="flex overflow-x-auto gap-6 px-8 snap-x snap-mandatory scroll-smooth no-scrollbar">
//               {galleryDestination.images.map((img, i) => (
//                 <motion.img
//                   key={i}
//                   src={getImagePath(img)}
//                   className="snap-center object-cover rounded-xl w-[85vw] sm:w-[60vw] md:w-[30vw] max-h-[55vh]"
//                   initial={{ opacity: 0, y: 40 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </main>
//   );
// };

// export default DestinationsOfOrchha;

import DestinationPage from "../../services/Destinations/DestinationPage";

const DestinationsOfMau = () => {
  return <DestinationPage region="orchha" />;
};

export default DestinationsOfMau;
