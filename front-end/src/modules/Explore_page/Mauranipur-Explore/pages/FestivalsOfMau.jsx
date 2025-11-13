import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react"; // Icons for events

// 1. DATA: Re-structured for the new layout
// One "featured" event and a list of "grid" events
const featuredEvent = {
  id: 1,
  title: "Orchha Utsav",
  description:
    "The premier event of the season. A vibrant celebration of culture, art, and music set against the backdrop of Orchha's magnificent medieval palaces and temples.",
  image: "/orchha.jpg", // Assumes in /public
};

const gridEvents = [
  {
    id: 2,
    title: "Lokrang Festival",
    description: "Witness the stunning diversity of folk arts and tribal dances.",
    image: "/orchha2.jpg",
    size: "large", // This will be our big 2x2 card
  },
  {
    id: 3,
    title: "Jhansi Mahotsav",
    description: "Honoring the legacy of Rani Laxmi Bai.",
    image: "/jhansi6.jpg",
    size: "small",
  },
  {
    id: 4,
    title: "Sacred River Fairs",
    description: "Experience the spiritual heart of the land.",
    image: "/jhansi.jpg",
    size: "small",
  },
];

// 2. Animation Variants
// Stagger animation for containers
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Fade-up animation for items
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// 3. NEW: The Bento Grid Card Component
const EventCard = ({ event }) => {
  const isLarge = event.size === "large";

  return (
    <motion.div
      variants={itemVariants}
      // Set card span based on 'size'
      className={`relative rounded-2xl overflow-hidden cursor-pointer group
        ${isLarge ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"}
      `}
    >
      <motion.img
        src={event.image}
        alt={event.title}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {/* Glassy overlay on hover */}
      <div className="absolute inset-0 bg-black/50 transition-all duration-300 group-hover:bg-black/30 group-hover:backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col justify-end h-full p-6">
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {event.title}
        </h3>
        <p className="text-gray-200 mt-2">{event.description}</p>
        <ArrowRight className="w-6 h-6 text-white mt-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </motion.div>
  );
};

/**
 * MAIN COMPONENT: Festivals
 * Redesigned with the "Bento Grid" layout.
 */
const Festivals = () => {
  return (
    <main className="relative min-h-screen w-full bg-gray-950 text-white py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        {/* 1. Header */}
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CalendarDays className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Festivals & Events
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            The vibrant heart of Bundelkhand, celebrating life, culture, and
            history.
          </p>
        </motion.header>

        {/* 2. Featured Event Section (Inspired by your image) */}
        <motion.section
          className="w-full max-w-6xl mx-auto py-24 flex flex-col md:flex-row items-center gap-8 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Text Content */}
          <motion.div className="md:w-1/2" variants={itemVariants}>
            <span className="text-sm font-bold uppercase text-orange-400 tracking-widest">
              Featured Event
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-4">
              {featuredEvent.title}
            </h2>
            <p className="text-lg text-gray-300 mt-6">
              {featuredEvent.description}
            </p>
            <motion.button className="mt-10 px-8 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-lg hover:bg-orange-500 hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Get Details <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="md:w-1/2 w-full h-96 rounded-2xl overflow-hidden shadow-2xl"
            variants={itemVariants}
          >
            <motion.img
              src={featuredEvent.image}
              alt={featuredEvent.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </motion.section>

        {/* 3. "All Events" Title */}
        <motion.div
          className="flex justify-between items-center max-w-6xl mx-auto mt-16 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">All Events</h2>
          <button className="px-5 py-2 border border-orange-400 text-orange-400 rounded-full font-semibold hover:bg-orange-400 hover:text-gray-950 transition-colors">
            See All
          </button>
        </motion.div>

        {/* 4. The Bento Box Grid */}
        <motion.div
          className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-[600px] md:h-[800px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* We map the gridEvents to our new EventCard component */}
          {gridEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Festivals;