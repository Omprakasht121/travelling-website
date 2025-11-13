import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookMarked } from "lucide-react"; // A fitting icon

// 1. DATA: We moved the images into the data array for a cleaner structure.
// I've assigned your images to the most relevant points.
const aboutData = [
  {
    id: 1,
    title: "Origin of the Name",
    description:
      "The name Bundelkhand derives from the Bundela Rajput clan, who rose to prominence in the 11th century. The Bundelas ruled much of central India and gave the region its distinctive cultural and political identity.",
    image: `${import.meta.env.BASE_URL}orchha.jpg`,
  },
  {
    id: 2,
    title: "Rise of the Bundela Kingdoms",
    description:
      "The Bundelas established Orchha as their capital in the 16th century under Raja Rudra Pratap Singh. They built magnificent forts, palaces, and temples — blending Rajput valor with intricate Mughal-inspired architecture.",
    image: `${import.meta.env.BASE_URL}gwalior.jpg`,
  },
  {
    id: 3,
    title: "Centers of Art and Devotion",
    description:
      "Bundelkhand flourished as a cradle of art, faith, and craftsmanship. From the erotic sculptures of Khajuraho (built by the Chandela dynasty) to the sacred ghats of Chitrakoot, it became a land where spirituality met artistry.",
    image: `${import.meta.env.BASE_URL}jhansi3.jpg`,
  },
  {
    id: 4,
    title: "Struggle and Resistance",
    description:
      "The region became a symbol of resistance and patriotism, especially during the 1857 First War of Independence, when Rani Laxmi Bai of Jhansi led her heroic defense against British rule — a story now etched in Indian history.",
    // Here we use the specific image you had
    image: `${import.meta.env.BASE_URL}lakshmibai.jpg`,
  },
  {
    id: 5,
    title: "Cultural Crossroads",
    description:
      "Situated between northern and central India, Bundelkhand absorbed influences from Rajput, Mughal, and Maratha cultures — reflected in its language, cuisine, festivals, and fort architecture.",
    // Re-using a great image for the final point
    image: `${import.meta.env.BASE_URL}orchha.jpg`,
  },
];

const About = () => {
  // 2. STATE: We only need to track which item is selected.
  const [selectedId, setSelectedId] = useState(aboutData[0].id);

  // Helper to find the full data object for the selected ID
  const selectedItem = aboutData.find((item) => item.id === selectedId);

  // 3. ANIMATION: Define a reusable animation variant
  const contentVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
  };

  return (
    // Switched to a dark theme for a more dramatic, "historic" feel
    <main className="min-h-screen w-full flex flex-col items-center bg-gray-900 text-gray-100 py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* --- HEADER --- */}
        <motion.header
          className="mb-12 "
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Echoes of Bundelkhand
          </h1>
          <p className="mt-3 text-lg text-gray-300 max-w-2xl">
            Bundelkhand isn’t just a chapter in history — it’s a living saga of
            courage, art, and timeless pride.
          </p>
        </motion.header>

        {/* --- MAIN INTERACTIVE CONTENT --- */}
        {/* This layout is vertical on mobile and horizontal on desktop */}
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* --- NAVIGATION ---
            This is the "timeline" navigation.
            It's a horizontal scroll on mobile and a vertical list on desktop.
          */}
          <nav className="lg:w-1/3">
            {/* We use a UL for semantics.
              "flex-row" on mobile (with overflow)
              "flex-col" on desktop (lg)
            */}
            <ul className="flex flex-row lg:flex-col gap-4 lg:gap-0 overflow-x-auto lg:overflow-x-visible scrollbar-hide">
              {aboutData.map((item, index) => (
                <li
                  key={item.id}
                  className="relative flex-shrink-0 lg:flex-shrink"
                >
                  <button
                    onClick={() => setSelectedId(item.id)}
                    className={`
                      flex items-center gap-4 w-full p-4 lg:p-6 text-left transition-all duration-300 ease-in-out
                      ${
                        selectedId === item.id
                          ? "text-orange-400" // Active state
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50 hover:rounded-lg" // Inactive state
                      }
                    `}
                  >
                    {/* Timeline Dot & Line */}
                    <div className="flex flex-col items-center">
                      {/* Hide top line on first item */}
                      <div
                        className={`w-0.5 h-6 bg-gray-600 ${
                          index === 0 ? "opacity-0" : "opacity-100"
                        } hidden lg:block`}
                      ></div>
                      
                      {/* The Dot */}
                      <div
                        className={`
                        flex-shrink-0 w-4 h-4 rounded-full transition-all duration-300
                        ${
                          selectedId === item.id
                            ? "bg-orange-400 scale-125 shadow-lg shadow-orange-500/30" // Active dot
                            : "bg-gray-600 group-hover:bg-gray-400 " // Inactive dot
                        }
                      `}
                      ></div>
                      
                      {/* Hide bottom line on last item */}
                      <div
                        className={`w-0.5 h-full min-h-[3rem] bg-gray-600 ${
                          index === aboutData.length - 1 ? "opacity-0" : "opacity-100"
                        } hidden lg:block`}
                      ></div>
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-widest text-gray-500">
                        Chapter {item.id}
                      </span>
                      <h3 className="text-lg md:text-xl font-semibold whitespace-nowrap lg:whitespace-normal">
                        {item.title}
                      </h3>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* --- CONTENT VIEWER ---
            This area animates and changes based on the 'selectedId' state.
          */}
          <div className="lg:w-2/3 relative min-h-[500px] lg:min-h-[600px] bg-gray-800/30 rounded-2xl p-4 lg:p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              {/* We use the selectedItem's ID as the key.
                When the key changes, Framer Motion exits the old
                element and animates in the new one.
              */}
              <motion.div
                key={selectedItem.id}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Image */}
                <motion.img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-64 md:h-80 rounded-lg object-cover shadow-xl"
                  // Add a subtle "parallax" style zoom on hover
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Text Description */}
                <div className="mt-6">
                  <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-bold text-orange-400 mb-4">
                    <BookMarked size={32} />
                    {selectedItem.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;