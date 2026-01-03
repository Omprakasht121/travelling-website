// src/modules/exploreHero/HeroPage.jsx
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, Sun, User2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { staticHero } from "./staticHero";
import { useTypingText } from "./useTypingText";
import { useHeroAds } from "./useHeroAds";
import { useScrollHeader } from "./useScrollHeader";
import { useAuthModal } from "../../../../context/AuthModalContext";
import GlobalSearch from "../../../../components/GlobalSearch";
import UserProfileModal from "../../../../shared/modals/UserProfileModal";




  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
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
      x: dir < 0 ? "100%" : "-100%",
      opacity: 1,
      scale: 1,
      zIndex: 0,
      transition: { duration: 1, ease: "easeInOut" },
    }),
  };

const HeroPage = ({ region, title, desc }) => {
  const ads = staticHero[region];

  const { images, loading, getImagePath } =
    useHeroAds(region, ads.staticImages);

  const typedText = useTypingText(desc);
  const isScrolled = useScrollHeader();

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [account, setAccount] = useState(false);

  const { userData, logout, requestAuth, requestRegisterAuth } =
    useAuthModal();

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % images.length);
    }, 8000);
    return () => clearInterval(id);
  }, [images.length]);

  if (loading)
    return <div className="text-center py-24">Loading...</div>;

  return (
    /* ⬇️ SAME JSX YOU ALREADY HAVE ⬇️ */
    /* I did NOT touch layout or classes */
    <div id="home"
    className="relative min-h-auto  w-full  text-gray-900 py-4 overflow-hidden">
      <div className="container flex flex-col mx-auto px-4 sm:px-6 lg:px-24 w-full">
        {/* Header/Navbar */}
        <header className={`fixed left-0 right-0 z-40 h-12 md:h-16 w-full bg-white flex justify-between items-center rounded-full bg-black/10 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50  shadow-[inset_4px_4px_6px_rgba(0,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)] md:shadow-sm
          ${isScrolled ? "top-1" : "top-4"}
        `}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="container mx-auto px-4 sm:px-6 lg:px-16 md:text-sm lg:text-lg  font-semibold flex justify-between md:justify-around items-center"
          >
            <div className=" ">
              <Link to="/" >
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="logo"
                  className="h-auto w-12 md:w-20  hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </Link>
            </div>

            <nav className=" text-sm md:text-lg flex gap-4 lg:gap-8">
              <a
                href="#home"
                className="hidden md:flex hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Home
              </a>
              <a
                href="#images"
                className=" hidden md:flex hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Images
              </a>
              <a
                href="#explore"
                className="hidden md:flex hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Explore
              </a>
              <a
                href="#events"
                className="hidden md:flex hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Events
              </a>
               <a
                href="#creators"
                className="hidden md:flex hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Creators
              </a>
              
            </nav>

            <div className="flex gap-4 justify-center items-center">
              <button className="hidden p-1 md:p-2 rounded-full border-[1px] border-black/40 bg-gray-200 hover:scale-110 transition-transform duration-700 hover:shadow-[0_0_15px_rgba(0,99,241,0.4)]">
                <Sun />
              </button>

              <button
              onClick={() => setSearch(prev => !prev)} // 👈 toggles true/false
              className="p-1 md:p-2 hover:scale-110 transition-transform duration-900 ease-in-out hover:shadow-[0_0_15px_rgba(0,99,241,0.4)]"
            >
              <Search className="w-6 h-6 text-black" />
            </button>
              <button
              onClick={() => setAccount(prev => !prev)}
              className="p-1 md:p-2 hover:scale-110 md:border border-sky-800/30 rounded-full transition-transform duration-900 ease-in-out md:shadow-[inset_4px_4px_6px_rgba(0,0,40,0.3),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_6px_8px_rgba(0,0,0,0.6)] hover:shadow-[inset_4px_4px_6px_rgba(0,0,40,0.3),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_6px_12px_rgba(0,0,150,0.6)]"
            >
              <User2 className="w-6 h-6 text-black" />
            </button>
              {/* <div className="hidden border border-black rounded-full hover:scale-105 transition-transform duration-700 hover:shadow-[0_0_15px_rgba(0,99,241,0.6)]">
                <button 
                className="px-6 py-1 rounded-full bg-orange-500 hover:bg-orange-600px-6 py-1 rounded-full bg-orange-600 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]">
                  SignIn
                </button>
              </div> */}
              <div className="md:hidden flex hover:scale-110 transition-transform duration-700 hover:shadow-[0_0_15px_rgba(0,99,241,0.4)]">
                <button onClick={() => setMobile(true)}>
                  <Menu className="h-6 w-6 text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        </header>
        {/* search slider  */}
        <GlobalSearch open={search} onClose={() => setSearch(false)} />
        
        {/* screen Overlay */}
        <div
          className={`fixed inset-0 bg-black/70 z-50 transition-opacity ${
            account ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setAccount(false)}
        ></div>

       
         {/* User Profile Modal */}
      <UserProfileModal
        isOpen={account}
        onClose={() => setAccount(false)}
        
        user={userData} // <-- Pass userData from context

        onLoginClick={() => {
          setAccount(false);
          requestAuth(() => setAccount(true)); // Re-open profile after login
        }}
        
        onRegisterClick={() => {
          setAccount(false);
          requestRegisterAuth(() => setAccount(true)); // Re-open profile after register
        }}
        
        onLogoutClick={() => {
          // --- UPDATED ---
          logout(); // Call context logout function
          setAccount(false);
        }}
        
        onEditProfileClick={() => console.log("Edit profile")}
        onWishlistClick={() => console.log("Wishlist")}
        wishlistCount={4}
      />
        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black/80  z-50 transition-opacity md:hidden ${
            mobile ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setMobile(false)}
        ></div>

        {/* Sidebar */}
        <div
          className={`fixed inset top-0 right-0 h-full w-28 bg-blue-800 z-50 transform transition-transform duration-300 ease-in-out  shadow-[inset_4px_4px_6px_rgba(20,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)] ${
            mobile ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col  justify-center items-center gap-6 p-8">
            <button onClick={() => setMobile(false)}>
              <X />
            </button>
            <nav className="flex flex-col gap-4 text-white font-semibold ">
              <a
                href="#home"
                className=" hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Home
              </a>
              <a
                href="#images"
                className="  hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Images
              </a>
              <a
                href="#explore"
                className=" hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Explore
              </a>
              <a
                href="#events"
                className=" hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Events
              </a>
               <a
                href="#creators"
                className=" hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Creators
              </a>
            </nav>
          </div>
        </div>

        {/* Main Section */}
        <section className="relative  flex-1 w-full md:flex-col justify-center items-center md:px-12 lg:px-32 py-8 pt-16 md:pt-24">
          <div className="relative flex justify-center flex-col items-center">
            <div className="w-full md:w-[60vw] h-[30vh] md:min-h-[60vh] flex justify-center items-center relative overflow-hidden rounded-xl">
              <AnimatePresence custom={direction}>
                <motion.img
                  key={current}
                  src={getImagePath(images[current].img)}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full h-full object-cover rounded-xl border-2 border-black/20"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
              </AnimatePresence>
            </div>

            <div className="absolute z-30 -bottom-5 md:-bottom-8 space-y-2">
              {/* Dots */}
              <div className="flex justify-center items-center ">
                <div className="flex  gap-2 justify-center bg-gray-100/70 p-1 px-2 border border-gray-800/90 rounded-full bottom-12 md:bottom-14">
                  {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all duration-500  ${
                      current === i ? "bg-blue-600 w-4 " : "bg-gray-800/60"
                    }`}
                  ></div>
                ))}
                </div>
              </div>

              <div className="bg-blue-500 w-6xl  py-4 p-6 rounded-lg z-20  shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
                <h1 className="text-2xl md:text-5xl font-bold text-center text-white">
                  {title}
                </h1>
              </div>
            </div>
          </div>

          {/* Typing text */}
          <div className="flex justify-center items-center mt-16 text-center px-2">
            <h4 className="max-w-xl text-center text-sm md:text-lg leading-relaxed">
              {typedText}
            </h4>
          </div>

          <div className=" text-white flex justify-center items-center mt-4">
            <button onClick={() => (window.location.hash = "explore")}
            className=" bg-blue-700 px-8 py-2 rounded-full text-lg font-bold hover:scale-110 transition-transform duration-500  shadow-[inset_4px_4px_6px_rgba(0,0,60,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)] hover:shadow-[inset_4px_4px_6px_rgba(0,0,60,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_0_16px_rgba(200,10,20,0.5)]">
              Explore
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroPage;
