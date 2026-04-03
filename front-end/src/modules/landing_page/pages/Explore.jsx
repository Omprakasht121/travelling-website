// Explore.jsx
import  { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin } from "lucide-react";
import { Destinations } from "../staticdata/ExploreStaticData";
import { useNavigate } from "react-router-dom";
import { getContent } from "../../../shared/services/contentService";
import { useTranslation } from "react-i18next";
import WishlistButton from "../../../shared/component/WishlistButton";

const backendURL = import.meta.env.VITE_BASE_URL;

export default function Explore({product}) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wrapperRef = useRef(null);
  const autoTimerRef = useRef(null);

  const navigate = useNavigate();
  const [exploreData, setExploreData] = useState([]);
  // navigation of page
  const exploreLinks = [
    () => navigate("/jhansi"),
    () => navigate("/mauranipur"),
    () => navigate("/orchha"),
    () => navigate("/khajuraho"),
    () => navigate("/banda"),
    () => navigate("/chitrakoot"),
  ];




 
// image path 
 const getImagePath = (img) => {
    if (!img) return "/fallback.jpg";
    if (img.startsWith("http")) return img;

    if (img.startsWith("/uploads") || img.startsWith("uploads"))
      return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;

    if (img.startsWith("/gallery") || img.startsWith("gallery"))
      return `${backendURL}${img.startsWith("/") ? img : `/${img}`}`;

    return `${import.meta.env.BASE_URL}${img}`;
  };
  // ================================
    // ✅ Fetch backend data (gallery fixed)
    // ================================
    useEffect(() => {
      const fetchData = async () => {
        try {
          const  data = await getContent("Landing", "destinations");
  
          const mappedData = data.map((item) => ({
            name: item.title,
            description: item.description,
            location:item.location,
            img: item.mainImage || "",
          }));
  
          setExploreData(mappedData);
        } catch (err) {
          console.error("Error fetching destinations:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    // ================================
    // ✅ Merge static + backend (gallery ensured)
    // ================================
    const allDestinations = [
      ...Destinations.map((s) => ({
        ...s,
        images: [s.img ], 
      })),
      ...exploreData,
    ];





  const AUTO_SLIDE_MS = 8000; 
  // removed redundant manual preloading to favor native lazy loading

  // auto slide with pause-on-interaction
  useEffect(() => {
    if (isPaused) return;
    autoTimerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % allDestinations.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(autoTimerRef.current);
  }, [isPaused]);

  // pause when mouse is over the hero / wrapper (desktop)
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // when mobile card clicked, set index
  const handleSelect = (i) => {
    setIndex(i);
    setIsPaused(true);
    window.setTimeout(() => setIsPaused(false), 4000);
  };

  // keyboard accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")
        setIndex((p) => (p - 1 + allDestinations.length) % allDestinations.length);
      if (e.key === "ArrowRight")
        setIndex((p) => (p + 1) % allDestinations.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = allDestinations[index];

  const [likes, setLikes] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    setIsLiked(true);

    // remove red fill after 1s
    setTimeout(() => setIsLiked(false), 8000);
  };

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef(null); 

  // ✅ CHANGED: Replaced scroll logic with IntersectionObserver for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container || allDestinations.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options = {
      root: container,
      rootMargin: "0px",
      threshold: 0.51,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index, 10);
          if (!isNaN(index)) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observerRef.current = observer;

    Array.from(container.children).forEach((child) => {
      observer.observe(child);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [allDestinations]); 

  return (
    <main id="explore" className="min-h-screen w-full flex flex-col items-center text-gray-900 pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        {/* header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="flex items-center">
            <img 
              src={`${import.meta.env.BASE_URL}hiking.png`} 
              alt="The Unseen Bundelkhand Hiking Icon" 
              className="h-20 w-20" 
              loading="lazy"
            />
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {t("exploreSection.title")}<span className="border-b-4 border-red-600">{t("exploreSection.titleHighlight")}</span>
          </h1>
          </div>
          <p className="mt-0 text-sm md:text-base text-gray-800  mx-auto md:mx-0">
            {t("exploreSection.description")}
          </p>
        </motion.header>
        {/* main content wrapper */}
        <section
          ref={wrapperRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative  w-full flex md:flex-col justify-center items-center lg:px-8 md:py-8"
        >
          {/* MAIN IMAGE PANEL */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="hidden md:w-[90%] lg:w-[85%] xl:w-[75%] mx-auto md:flex relative flex-1 rounded-2xl overflow-hidden shadow-2xl bg-black md:px-0"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.img}
                alt={current.name}
                initial={{ opacity: 0, scale: 1.03 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-[60vh] md:h-[55vh] object-cover"
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute left-6 w-full pr-12  bottom-6 right-6 md:right-auto md:bottom-8 z-10  pr-6 ">
              <h2 className="hidden md:flex text-2xl md:text-4xl text-white font-bold drop-shadow-lg">
                {current.name}
              </h2>
              <p className="hidden md:flex max-w-3xl mt-2 text-sm md:text-base text-slate-200">
                {current.description}
              </p>
              <div className="mt-4 flex items-center justify-between  ">
                <div className="flex gap-4">
                  <button
                    onClick={exploreLinks[index]}
                    aria-label={`Discover more about ${current.name}`}
                    className="inline-block bg-white text-slate-900 font-semibold px-5 py-2 rounded-full  hover:scale-105 transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(0,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_4px_4px_12px_rgba(50,20,10.6)]"
                  >
                    {t("exploreSection.discoverMore")}
                  </button>
                </div>
                <div className="flex items-center gap-2 pr-5">
                  <WishlistButton 
                    itemData={{
                      id: `dest-landing-${current.name?.toLowerCase().replace(/\s+/g, '-')}`,
                      name: current.name,
                      image: current.img,
                      link: ["/jhansi", "/mauranipur", "/orchha", "/khajuraho", "/banda", "/chitrakoot"][index] || "/explore",
                      category: "Destination"
                    }} 
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="hidden md:flex justify-center items-center mt-6 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent pb-4"
          >
            <div className="flex gap-4 px-4 py-2">
              {allDestinations.map((d, i) => {
                const active = i === index;
                return (
                  <motion.button
                    key={d.id}
                    onClick={() => handleSelect(i)}
                    whileHover={{ scale: 1.1 }}
                    aria-pressed={active}
                    className={`relative flex-shrink-0 rounded-lg overflow-hidden hover:scale-125 border-2 transform transition-all duration-300 ${
                      active
                        ? "border-black/80 scale-110 shadow-[0_0_25px_rgba(0,0,240,0.6)] hover:shadow-[0_0_25px_5px_rgba(0,0,240,0.4)]"
                        : "border-transparent"
                    } shadow-lg focus:outline-none`}
                  >
                    <img
                      src={d.img}
                      alt={`Thumbnail for ${d.name}`}
                      className="w-40 h-28 lg:w-48 lg:h-32 object-cover"
                      loading="lazy"
                    />
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-t-md bg-blue-400 " />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.aside>
        </section>

        {/* MOBILE HORIZONTAL CARDS (visible < md) */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="md:hidden mt-8"
        >
          <div
            ref={containerRef}
           
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide z-30 "
          >
            {allDestinations.map((d, i) => (
              <motion.article
                key={d.id}
                data-index={i} 
                onClick={() => handleSelect(i)}
                whileTap={{ scale: 0.98 }}
                
                className={` snap-center w-[100%] flex-shrink-0 md:min-w-[60%] bg-white/5 rounded-xl overflow-hidden border border-black/10 shadow-lg ${
                  i === activeIndex ? "scale-100" : "scale-100"
                } `}
              >
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full object-cover h-[45vh] border-b-2 border-blue-500"
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2 pr-2">
                    <h3 className="text-3xl font-bold text-black">{d.name}</h3>
                    <div className="flex items-center gap-2 pr-5">
                      <WishlistButton 
                        itemData={{
                          id: `dest-landing-${d.name?.toLowerCase().replace(/\s+/g, '-')}`,
                          name: d.name,
                          image: d.img,
                          link: ["/jhansi", "/mauranipur", "/orchha", "/khajuraho", "/banda", "/chitrakoot"][i] || "/explore",
                          category: "Destination"
                        }} 
                      />
                    </div>
                  </div>

                  <p className="text-sm text-slate-900 mt-2 line-clamp-3">
                    {d.description}
                  </p>
                  <div className=" flex mt-3 justify-between">
                    <button
                     onClick={exploreLinks[i]}
                      aria-label={`Discover more about ${d.name}`}
                      className="inline-block bg-white text-slate-900 font-semibold px-5 py-2 rounded-full hover:scale-105 transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(20,0,0,0.2),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
                    >
                      {t("exploreSection.discoverMore")}
                    </button>
                    <button
                      onClick={() => {
                        // Ask for current location
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const { latitude, longitude } = position.coords;
                              const destination = encodeURIComponent(
                                current.name
                              );
                              const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;
                              window.open(mapsUrl, "_blank");
                            },
                            (error) => {
                              console.error(
                                "Location access denied or unavailable:",
                                error
                              );
                              const destination = encodeURIComponent(
                                current.name
                              );
                              const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
                              window.open(fallbackUrl, "_blank");
                            }
                          );
                        } else {
                          const destination = encodeURIComponent(current.name);
                          const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
                          window.open(fallbackUrl, "_blank");
                        }
                      }}
                      aria-label={`Get directions to ${current.name}`}
                      className="flex gap-2 border justify-center items-center border-orange-950 rounded-full bg-orange-600 px-4 py-1 hover:scale-110 transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
                    >
                      <MapPin className="h-6 w-6 hover:shadow-lg " />
                      <p>{t("exploreSection.letsGo")}</p>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          {/* Dots */}
          <div className="md:hidden py-4 flex justify-center items-center gap-2">
            <div className="flex gap-[6px] bg-white/70 border border-black p-1  px-3 rounded-lg shadow-[inset_4px_2px_8px_rgba(20,0,50,0.4),_inset_-4px_-4px_8px_rgba(0,120,0,0.05),_2px_4px_6px_rgba(0,0,0,0.5)] ">
              {allDestinations.map((_, i) => (
              <motion.div
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i === activeIndex ? "bg-blue-600" : "bg-gray-600/90"
                }`}
                animate={{ scale: i === activeIndex ? 1.2 : 0.9 }}
                transition={{ duration: 0.3 }}
              />
            ))}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}