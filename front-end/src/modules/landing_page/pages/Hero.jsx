import React, { useEffect, useState } from "react";
import {AnimatePresence, motion,easeInOut} from "framer-motion";
import {ChevronLeft, ChevronRight, Menu, Moon, Sun, X, Search,} from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [mobile, setMobile] = useState(false);
  const titles = ["Bundelkhand", "बुन्देलखण्ड", "Mauranipur", "Orchha", "Bandha"];
  const [index, setIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const  handleAdmin = () => navigate("/admin")

  const images = [
    `${import.meta.env.BASE_URL}gwalior.jpg`,
    `${import.meta.env.BASE_URL}orchha2.jpg`,
    `${import.meta.env.BASE_URL}jhansi6.jpg`,
    `${import.meta.env.BASE_URL}jhansi.jpg`,
  ];

  const [direction, setDirection] = useState(1);

const [index1, setIndex1] = useState(0);

  // Automatically change every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex1((prev) => (prev + 1) % titles.length);
    }, 6000); // change speed here
    return () => clearInterval(interval);
  }, [titles.length]);

  // ✅ Background animation variants
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%", // comes from side
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%", // exits opposite
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="max-h-screen flex flex-col overflow-hidden  ">
      {/* Navbar */}
      <header className="fixed z-40 h-12 top-4 md:h-16 w-full px-4 bg-white flex justify-between items-center transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="container mx-auto px-4 sm:px-6 lg:px-16 md:text-sm lg:text-lg font-semibold flex justify-between items-center"
        >
          <div>
            <a href="#hero">
              <img
                src={`${import.meta.env.BASE_URL}vite.svg`}
                alt="logo"
                className="h-6 w-6 lg:h-8 lg:w-8 hover:scale-110 transition-transform duration-1000 ease-in-out"
              />
            </a>
          </div>

          <nav className="hidden md:flex md:gap-4 lg:gap-8">
            {["Home", "About", "Explore", "Creators", "Events"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-1000 ease-in-out"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Theme & Menu */}
          <div className="flex gap-4 justify-center items-center">
            <button
              onClick={toggleTheme}
              className="hidden p-1 md:p-2 rounded-full border-[1px] border-black/40 bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform duration-900 ease-in-out hover:shadow-[0_0_15px_rgba(0,99,241,0.4)]"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 md:h-4 md:w-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 md:h-4 md:w-4 text-gray-900" />
              )}
            </button>

            <div className="hidden md:flex border border-black rounded-full hover:scale-105 transition-transform duration-1000 ease-in-out hover:shadow-[0_0_15px_rgba(0,99,241,0.6)] ">
              <button
              className="px-6 py-1 rounded-full bg-orange-600 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]">
                SIGNUP
              </button>
            </div>

            <div className="md:hidden flex hover:scale-110 transition-transform duration-900 ease-in-out">
              <button onClick={() => setMobile(true)}>
                <Menu className="h-6 w-6 text-black dark:text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black/70 z-50 transition-opacity md:hidden ${
          mobile ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobile(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-28 bg-blue-500 z-50 transform transition-transform duration-300 ease-in-out ${
          mobile ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col bg-blue-500 justify-center items-center gap-6 p-8">
          <button onClick={() => setMobile(false)}>
            <X />
          </button>
          <nav className="flex flex-col gap-4">
            {["Home", "About", "Explore", "Creators", "Events"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:scale-110 hover:text-blue-950 hover:underline"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full flex-1 md:flex-col justify-center items-center lg:px-8 md:py-8 bg-cover bg-center overflow-hidden">
        {/* ✅ Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <AnimatePresence custom={direction}>
            <motion.img
              key={images[index]}
              src={images[index]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full object-cover"
            />
             <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
          </AnimatePresence>
        </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/60 z-0"
            />
        {/* Content */}
        <div className="flex relative flex-1 rounded-2xl overflow-hidden  md:px-0 lg:mx-32 justify-center items-center">
          <button
            onClick={handlePrev}
            className="hidden md:flex p-3 border border-black/40 bg-white/20 rounded-full hover:bg-white/40 transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="relative w-full flex justify-center items-center h-[80vh] md:h-[90vh]">
            <motion.div className="absolute flex flex-col gap-4 md:w-full text-center p-4 md:p-2 justify-center items-center md:gap-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                The Unseen
              </h1>
              <h1 className="text-orange-500 text-5xl md:text-7xl lg:text-8xl drop-shadow-lg font-extrabold overflow-hidden p-2 md:p-6 ">
            {/* overflow-hidden ensures smooth upward sliding */}
            <AnimatePresence mode="wait">
                <motion.span
                key={titles[index1]}
                initial={{ y: "50%", opacity: 0 }}     // enter from bottom
                animate={{ y: "0%", opacity: 1 }}       // slide to center
                exit={{ y: "-50%", opacity: 0 }}       // exit upward
                transition={{ duration: 1, ease: easeInOut }}
                className="inline-block"
                >
                {titles[index1]}
                </motion.span>
            </AnimatePresence>
            </h1>

              <p className="max-w-xl text-sm md:text-lg text-gray-100 drop-shadow-lg">
                Traveling is the act of moving from one place to another, often
                to experience new cultures, see new sights, and gain a break
                from daily routines.
              </p>

              <div className="flex flex-col md:flex-row p-4 md:p-8 rounded-lg items-center gap-4 border border-gray-800/60 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
                <div className="flex items-center bg-white rounded-full hover:border hover:border-blue-500 hover:scale-105 transition-transform duration-1000 easeInOut hover:border-red-800 shadow-[0_0_25px_rgba(0,0,240,0.6)] hover:shadow-[0_0_25px_5px_rgba(0,0,240,0.4)]">
                  <motion.input
                    whileFocus={{ scale: 1.03 }}
                    type="text"
                    placeholder="Enter Place to Visit"
                    className="w-full rounded-l-full px-12 py-3 focus:outline-none focus:scale-110 focus:bg-sky-50"
                  />
                  <Search className="w-8 h-8 text-black mx-4" />
                </div>

                <a href="#">
                  <button className=" bg-indigo-700 rounded-full font-semibold px-10 md:px-10 py-3 text-xl text-white hover:scale-110 hover:bg-indigo-600  hover:border-red-800  transition-all duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]">
                    Explore
                  </button>
                </a>
              </div>
            </motion.div>
          </div>

          <button
            onClick={handleNext}
            className="hidden md:flex p-3 bg-white/20 rounded-full border border-black/40 hover:bg-white/40 transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Dots */}
        <div className="pb-8 flex justify-center items-center gap-2">
          <button
            onClick={handlePrev}
            className="md:hidden rounded-full hover:scale-110 transition"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          {images.map((_, i) => (
            <motion.div
              key={i}
              className={`h-3 w-3 rounded-full ${
                i === index ? "bg-blue-500" : "bg-white/40"
              }`}
              animate={{ scale: i === index ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            />
          ))}
          <button
            onClick={handleNext}
            className="md:hidden rounded-full hover:scale-110 transition"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
