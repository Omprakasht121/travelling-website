// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const ItemsOfMau = () => {
//   return (
//     <main className="relative max-h-screen w-full bg-gradient-to-b from-sky-950 to-slate-900 text-white py-4 overflow-hidden">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
//         {/* header */}
//         <motion.header
//           className="md:px-16"
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: false, amount: 0.2 }}
//         >
//           <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
//             Items
//           </h1>
//           <p className="mt-2 text-sm md:text-base text-slate-300">
//             Reach out and let’s bring you closer to the heart of Bundelkhand..
//           </p>
//         </motion.header>

//         {/* main content */}
//         <section className="relative justify-center items-center lg:px-24 py-8">
//           <div className="h-[60vh] grid grid-cols-3 md:grid-cols-4 p-4 gap-4">
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default ItemsOfMau;





import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Sun, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MauExport = () => {
  const [mobile, setMobile] = useState(false);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // your ad images and destinations
  const ads = [
    { src: `${import.meta.env.BASE_URL}orchha.jpg`, link: "/orchha" },
    { src: `${import.meta.env.BASE_URL}jhansi.jpg`, link: "/jhansi" },
    { src: `${import.meta.env.BASE_URL}khajuraho.jpg`, link: "/khajuraho" },
  ];

  // auto image change every 4 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [ads.length]);

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
          <section className="relative flex-1  w-full md:flex-col justify-center items-center lg:px-24 md:py-8">
            <div className="flex justify-center flex-col items-center">
                <div className="relative pt-4">
              {/* image slider */}
              <div
                className="relative flex-1 w-full h-full rounded-2xl overflow-hidden shadow-2xl  h-[400px] md:h-[450px] lg:h-[550px] border-2 cursor-pointer"
                onClick={() => navigate(ads[current].link)}
              >
                <motion.img
                  key={ads[current].src}
                  src={ads[current].src}
                  alt="Ad"
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className=" w-full object-cover"
                />
              </div>

              {/* heading */}
              <div className="relative">
                <div className="absolute left-1/4 md:left-1/3 -bottom-8 md:-bottom-10 bg-blue-500 w-6xl p-4 border-2 rounded-lg">
                  <h1 className="text-2xl md:text-5xl font-bold text-center">
                    MAURANIPUR
                  </h1>
                </div>

                {/* dots */}
                <div className="absolute w-full flex gap-2 justify-center bottom-12 md:bottom-14">
                  {ads.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-2 rounded-full transition-all duration-500 ${
                        current === i ? "bg-white w-4" : "bg-white/40"
                      }`}
                    ></div>
                  ))}
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
            </div>
          </section>
        </div>
      </div>
  );
};

export default MauExport;

