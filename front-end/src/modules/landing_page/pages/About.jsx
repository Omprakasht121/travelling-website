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
      "A cinematic landscape of ancient Bundelkhand with rocky plateaus, winding rivers, and dense forests under a golden sunrise, early medieval India, subtle silhouettes of Rajput warriors in the distance, historical and atmospheric, warm earthy tones, ultra-detailed, realistic style",
    image: `${import.meta.env.BASE_URL}originofbundelkhand.png`,
  },
  {
    id: 2,
    title: "Rise of the Bundela Kingdoms",
    description:
      "Between the 14th and 18th centuries, Bundelkhand witnessed the rise of powerful Bundela kingdoms, most notably Orchha, Datia, and Panna. Leaders like Raja Rudra Pratap Singh laid the foundations of strong states that challenged larger empires. These kingdoms blended military strength with cultural ambition, building forts, palaces, and towns that still define the region’s historic identity.",
    image: `${import.meta.env.BASE_URL}chapter2.png`,
  },
  {
    id: 3,
    title: "Centers of Art and Devotion",
    description:
      "Bundelkhand flourished as a center of temple architecture, art, and devotion. From the magnificent Khajuraho temples to sacred towns like Orchha, the region celebrated spirituality through stone and sculpture. Intricate carvings, devotional music, and folk traditions reflected a deep connection between daily life and faith, making Bundelkhand a timeless cultural sanctuary.",
    image: `${import.meta.env.BASE_URL}chapter3.png`,
  },
  {
    id: 4,
    title: "Struggle and Resistance",
    description:
      "Bundelkhand has long been a land of resistance. From confronting Mughal authority to opposing British colonial rule, its people fiercely defended their autonomy. Legendary figures like Maharani Laxmibai of Jhansi emerged as symbols of courage and sacrifice. These struggles shaped a strong regional identity rooted in honor, bravery, and self-respect.",
    // Here we use the specific image you had
    image: `${import.meta.env.BASE_URL}chapter4.png`,
  },
  {
    id: 5,
    title: "Cultural Crossroads",
    description:
      "Bundelkhand stands at a cultural crossroads where Rajasthani, Mughal, and Deccan influences blend seamlessly with local traditions. Its folk songs, dances, cuisine, dialects, and festivals reflect centuries of cultural exchange. Even today, Bundelkhand’s villages preserve a living heritage—simple, proud, and deeply connected to the land.",
    // Re-using a great image for the final point
    image: `${import.meta.env.BASE_URL}chapter5.png`,
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
    <main id="about" className="min-h-screen w-full flex flex-col items-center bg-gray-900 text-gray-100 py-16 overflow-hidden">
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
            Echoes of Bundel<span className="border-b-4 border-red-600 " >khand</span>
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
                  className="w-full h-64 md:h-[50vh] rounded-lg object-cover shadow-xl"
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