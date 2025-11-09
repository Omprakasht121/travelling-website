
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sun, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ExploreOrchha = () => {
  const [mobile, setMobile] = useState(false);
  const [current, setCurrent] = useState(0);
  // const navigate = useNavigate();

    
  const images = [
    `${import.meta.env.BASE_URL}orchha.jpg`,
    `${import.meta.env.BASE_URL}orchha2.jpg`,
    `${import.meta.env.BASE_URL}jhansi6.jpg`,
    `${import.meta.env.BASE_URL}jhansi.jpg`,
  ];

  // const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // ✅ Auto change every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ Animation Variants
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%", // enter from right or left
      opacity: 1,
      scale: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%", // exit opposite direction
      opacity: 1,
      scale: 1,
      zIndex: 0,
      transition: { duration: 1, ease: "easeInOut" },
    }),
  };
  // typing animation
  const text =
    "To run the test, you'll be connected to Measurement Lab (M-Lab) and your IP address will be shared with them and processed by them in accordance with their privacy policy.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(typing);
    }, 25);
    return () => clearInterval(typing);
  }, []);

  return (
    <div id="home" className=" relative max-h-screen w-full bg-gradient-to-b from-sky-950 to-slate-900 text-white py-4 overflow-hidden">
        <div className="container flex flex-col mx-auto px-4 sm:px-6 lg:px-24 w-full">
          {/* header/navbar */}
          <header className="z-40 h-12 md:h-16 top-4 w-full bg-white flex justify-between items-center transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.2 }}
              className="container mx-auto px-4 sm:px-6 lg:px-16 md:text-sm lg:text-lg font-semibold flex justify-between items-center"
            >
              <div>
                <Link to="/">
                  <img
                    src={`${import.meta.env.BASE_URL}vite.svg`}
                    alt="logo"
                    className="h-6 w-6 lg:h-8 lg:w-8 hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </Link>
              </div>

              <nav className="hidden md:flex md:gap-4 lg:gap-8">
                <a
                  href="#home"
                  className="hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
                >
                  Home
                </a>
                <a
                  href="#images"
                  className="hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
                >
                  Images
                </a>
                <a
                  href="#explore"
                  className="hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
                >
                  Explore
                </a>
                <Link
                  to="/creators"
                  className="hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
                >
                  Creators
                </Link>
                <Link
                  to="/events"
                  className="hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
                >
                  Events
                </Link>
              </nav>

              <div className="flex gap-4 justify-center items-center">
                <button className="p-1 md:p-2 rounded-full border-[1px] border-black/40 bg-gray-200 hover:scale-110 transition-transform duration-700 hover:shadow-[0_0_15px_rgba(0,99,241,0.4)]">
                  <Sun />
                </button>
                <div className="hidden md:flex border border-black rounded-full hover:scale-105 transition-transform duration-700 hover:shadow-[0_0_15px_rgba(0,99,241,0.6)]">
                  <button className="px-6 py-1 rounded-full bg-orange-500 hover:bg-orange-600">
                    SignIn
                  </button>
                </div>
                <div className="md:hidden flex hover:scale-110 transition-transform duration-700 hover:shadow-[0_0_15px_rgba(0,99,241,0.4)]">
                  <button onClick={() => setMobile(true)}>
                    <Menu className="h-6 w-6 text-black" />
                  </button>
                </div>
              </div>
            </motion.div>
          </header>

          {/* background overlay */}
          <div
            className={`fixed inset-0 bg-black/70 z-50 transition-opacity md:hidden ${
              mobile ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setMobile(false)}
          ></div>

          {/* sidebar features */}
          <div
            className={`fixed inset top-0 right-0 h-full w-28 bg-blue-500 z-50 transform transition-transform duration-300 ease-in-out ${
              mobile ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col bg-blue-500 justify-center items-center gap-6 p-8">
              <button onClick={() => setMobile(false)}>
                <X />
              </button>
              <nav className="flex flex-col gap-4">
                <Link
                  to="/"
                  className="hover:scale-110 hover:text-blue-950 hover:underline"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:scale-110 hover:text-blue-950 hover:underline"
                >
                  About
                </Link>
                <Link
                  to="/explore"
                  className="hover:scale-110 hover:text-blue-950 hover:underline"
                >
                  Explore
                </Link>
                <Link
                  to="/creators"
                  className="hover:scale-110 hover:text-blue-950 hover:underline"
                >
                  Creators
                </Link>
                <Link
                  to="/events"
                  className="hover:scale-110 hover:text-blue-950 hover:underline"
                >
                  Events
                </Link>
              </nav>
            </div>
          </div>

          {/* main content */}
          <section className="relative flex-1  w-full md:flex-col justify-center items-center  md:px-12 lg:px-24 py-8 ">
            <div className=" relative flex justify-center flex-col items-center ">
                <div className="w-full h-[30vh] md:h-[60vh] flex justify-center items-center relative overflow-hidden rounded-xl">
              <AnimatePresence custom={direction}>
               
                <motion.img
                  key={current}
                  src={images[current]}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full h-full object-cover rounded-xl border-b "
                />
                 <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
                
              </AnimatePresence>
              
            </div>
            <div className="absolute z-50 -bottom-10 space-y-2">
              {/* dots */}
                <div className=" w-full flex gap-2 justify-center bottom-12 md:bottom-14 ">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-2 rounded-full transition-all duration-500 ${
                        current === i ? "bg-blue-500 w-4" : "bg-white/40"
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="  bg-blue-500 w-6xl p-4 border-2 rounded-lg z-50  ">
                  <h1 className="text-2xl md:text-5xl font-bold text-center">
                    MAURANIPUR
                  </h1>
                </div>
              </div>
            </div>
            {/* typing description */}
            <div className="flex justify-center items-center mt-16 text-center  px-2">
              <h4 className="max-w-xl text-center text-sm md:text-lg leading-relaxed">
                {displayedText}
              </h4>
            </div>

            <div className="flex justify-center items-center mt-4">
              <button className="border bg-blue-700 px-8 py-2 rounded-full text-lg font-bold hover:scale-105 transition-transform duration-500">
                Explore
              </button>
            </div>
          </section>
        </div>
      </div>
  );
};

export default ExploreOrchha;

