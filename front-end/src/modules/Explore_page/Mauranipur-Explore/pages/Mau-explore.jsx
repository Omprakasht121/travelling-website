import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, Sun, User, User2, User2Icon, UserCog2Icon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getContent } from "../services/contentService.js";
import UserProfileModal from "../../modals/UserProfileModal.jsx";
import { useAuthModal } from "../../../../context/AuthModalContext.jsx";
import GlobalSearch from "../../../../components/GlobalSearch.jsx";

const backendURL = "http://localhost:5000";

const MauExplore = () => {
  const [mobile, setMobile] = useState(false);
  const [account, setAccount] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [adsImage, setAdsImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const[search, setSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


const { userData, logout, requestAuth, requestRegisterAuth } = useAuthModal();

  // ✅ Static images (converted to object form for consistent structure)
  const staticImages = [
  { img: "/orchha.jpg" },
  { img: "/orchha2.jpg" },
  { img: "/jhansi6.jpg" },
  { img: "/jhansi.jpg" },
];

  // ✅ Convert backend image paths properly
  const getImagePath = (img) => {
    if (!img) return "/fallback.jpg";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads") || img.startsWith("uploads"))
      return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;
    return img;
  };

  // ✅ Fetch advertisements dynamically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent("mauranipur", "advertisement");
        const mappedData = data.map((item) => ({
          img: item.mainImage || item.galleryImages?.[0] || "",
        }));
        setAdsImage(mappedData);
      } catch (err) {
        console.error("Error fetching advertisements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Merge static + dynamic ads
  const advertisementImages = [...staticImages, ...adsImage];

  // ✅ Auto-slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % advertisementImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [advertisementImages.length]);

  // ✅ Animation variants
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

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 5) setIsScrolled(true);
    else setIsScrolled(false);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // ✅ Typing animation text
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

  if (loading)
    return (
      <div className="text-center text-white py-24 text-xl">Loading...</div>
    );


  return (
    <div
      id="home"
      className="relative min-h-auto  w-full  text-gray-900 py-4 overflow-hidden"
    >
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
            <div>
              <Link to="/">
                <img
                  src={`${import.meta.env.BASE_URL}vite.svg`}
                  alt="logo"
                  className="h-6 w-6 lg:h-8 lg:w-8 hover:scale-110 transition-transform duration-700 ease-in-out"
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
                href="#creators"
                className="hidden md:flex hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Creators
              </a>
              <a
                href="#events"
                className="hidden md:flex hover:scale-125 hover:text-orange-700 hover:underline transition-transform duration-500"
              >
                Events
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
              <div className="hidden md:flex border border-black rounded-full hover:scale-105 transition-transform duration-700 hover:shadow-[0_0_15px_rgba(0,99,241,0.6)]">
                <button className="px-6 py-1 rounded-full bg-orange-500 hover:bg-orange-600px-6 py-1 rounded-full bg-orange-600 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]">
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
          className={`fixed inset-0 bg-black/70 z-50 transition-opacity md:hidden ${
            mobile ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setMobile(false)}
        ></div>

        {/* Sidebar */}
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

        {/* Main Section */}
        <section className="relative  flex-1 w-full md:flex-col justify-center items-center md:px-12 lg:px-32 py-8 pt-16 md:pt-24">
          <div className="relative flex justify-center flex-col items-center">
            <div className="w-full md:w-[60vw] h-[30vh] md:min-h-[60vh] flex justify-center items-center relative overflow-hidden rounded-xl">
              <AnimatePresence custom={direction}>
                <motion.img
                  key={current}
                  src={getImagePath(advertisementImages[current].img)}
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
              <div className="w-full flex gap-2 justify-center bottom-12 md:bottom-14">
                {advertisementImages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all duration-500 ${
                      current === i ? "bg-blue-500 w-4" : "bg-white/40"
                    }`}
                  ></div>
                ))}
              </div>

              <div className="bg-blue-500 w-6xl  py-2 p-6 rounded-lg z-20  shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]">
                <h1 className="text-2xl md:text-5xl font-bold text-center text-white">
                  MAURANIPUR
                </h1>
              </div>
            </div>
          </div>

          {/* Typing text */}
          <div className="flex justify-center items-center mt-16 text-center px-2">
            <h4 className="max-w-xl text-center text-sm md:text-lg leading-relaxed">
              {displayedText}
            </h4>
          </div>

          <div className=" text-white flex justify-center items-center mt-4">
            <button className=" bg-blue-700 px-8 py-2 rounded-full text-lg font-bold hover:scale-110 transition-transform duration-500  shadow-[inset_4px_4px_6px_rgba(0,0,60,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)] hover:shadow-[inset_4px_4px_6px_rgba(0,0,60,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_0_16px_rgba(200,10,20,0.5)]">
              Explore
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MauExplore;
