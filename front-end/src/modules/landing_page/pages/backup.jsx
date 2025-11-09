// 











// import React, { useState, useRef, useCallback, useEffect } from "react";
// import { GoogleMap, useLoadScript, Polyline } from "@react-google-maps/api";
// import { Locate, Plus, Minus, MapPin } from "lucide-react";
// import { motion, useAnimation } from "framer-motion";

// const containerStyle = {
//   width: "100%",
//   height: "80vh",
//   borderRadius: "12px",
//   overflow: "hidden",
// };

// const center = { lat: 24.75, lng: 79.5 }; // Bundelkhand approx center

// // 🟥 Bundelkhand outline (approximate)
// const bundelkhandCoords = [
//   { lat: 26.22, lng: 78.18 }, // Gwalior
//   { lat: 25.75, lng: 78.55 }, // Jhansi
//   { lat: 25.20, lng: 79.65 }, // Chitrakoot
//   { lat: 24.45, lng: 79.90 }, // Damoh
//   { lat: 23.85, lng: 78.75 }, // Sagar
//   { lat: 24.65, lng: 77.75 }, // Shivpuri
//   { lat: 26.22, lng: 78.18 }, // back to start
// ];

// const RegionMap = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyCQEToJKXV3KwKBh0s7Z5_jOuETpPMQzjU", // ⚠️ Replace this
//   });

//   const mapRef = useRef();
//   const [zoom, setZoom] = useState(7);
//   const [progress, setProgress] = useState(0);
//   const controls = useAnimation();

//   const onLoad = useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   // 🧭 Animate boundary draw
//   useEffect(() => {
//     controls.start({
//       progress: 1,
//       transition: { duration: 3, ease: "easeInOut" },
//     });
//   }, [controls]);

//   const zoomIn = () => setZoom((z) => Math.min(z + 1, 18));
//   const zoomOut = () => setZoom((z) => Math.max(z - 1, 4));

//   const locateUser = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           mapRef.current.panTo({ lat: latitude, lng: longitude });
//           mapRef.current.setZoom(12);
//         },
//         () => alert("Unable to get your location")
//       );
//     }
//   };

//   const openGoogleMaps = () => {
//     window.open("https://www.google.com/maps/place/Bundelkhand", "_blank");
//   };

//   if (!isLoaded) return <p className="text-center text-white">Loading map...</p>;

//   return (
//     <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-slate-900 to-sky-950 text-white py-12">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
//         <motion.header
//           className="mb-8 t"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
//             Region of Our Bundelkhand
//           </h1>
//           <p className="mt-2 text-sm md:text-base text-slate-300 max-w-2xl mx-auto md:mx-0">
//             Discover destinations, local food, festivals & creators — click a
//             thumbnail to explore details.
//           </p>
//         </motion.header>
//         {/* main content  */}
//         <section className="relative w-full md:px-8 md:py-8">
//           <div className="max-w-6xl mx-auto border-2 border-blue-500 rounded-3xl shadow-lg p-2  flex flex-col md:flex-row gap-8">
//             <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={zoom}
//             onLoad={onLoad}
//             options={{
//               disableDefaultUI: true,
//               zoomControl: false,
//               streetViewControl: false,
//               mapTypeId: "hybrid",
//             }}
//           >
//             {/* Animated Polyline */}
//             <motion.div
//               animate={controls}
//               initial={{ progress: 0 }}
//               onUpdate={(latest) => setProgress(latest.progress)}
//             >
              
//             </motion.div>
//           </GoogleMap>

//           {/* Controls */}
//           <div className="absolute bottom-10 right-10 flex flex-col space-y-2">
//             <button
//               onClick={locateUser}
//               className="bg-slate-800/80 p-2 rounded-full hover:bg-slate-700"
//             >
//               <Locate className="w-6 h-6 text-white" />
//             </button>
//             <button
//               onClick={zoomIn}
//               className="bg-slate-800/80 p-2 rounded-full hover:bg-slate-700"
//             >
//               <Plus className="w-6 h-6 text-white" />
//             </button>
//             <button
//               onClick={zoomOut}
//               className="bg-slate-800/80 p-2 rounded-full hover:bg-slate-700"
//             >
//               <Minus className="w-6 h-6 text-white" />
//             </button>
//             <button
//               onClick={openGoogleMaps}
//               className="bg-slate-800/80 p-2 rounded-full hover:bg-slate-700"
//             >
//               <MapPin className="w-6 h-6 text-white" />
//             </button>
//           </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default RegionMap;
