// Explore.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { act } from "react";





export default function Explore() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wrapperRef = useRef(null);
  const autoTimerRef = useRef(null);
  const navigate = useNavigate();

  // navigation of page 
  const  handlemau = () => navigate("/mauranipur")
  const  handlejhansi = () => navigate("/jhansi")
  const  handleorchha = () => navigate("/orchha")

  const destinations = [
  {
    id: 0,
    name: "Jhansi",
    img: `${import.meta.env.BASE_URL}jhansi6.jpg`,
    link: handlejhansi,
    desc:
      "A key city in Uttar Pradesh’s Bundelkhand region, Jhansi is steeped in history — from its majestic Jhansi Fort to the legacy of Rani Lakshmibai and the 1857 uprising. It serves as a gateway to Bundelkhand’s forts, rivers and cultural landscapes.",
  },
  {
    id: 1,
    name: "Mauranipur",
    img: `${import.meta.env.BASE_URL}orchha3.jpg`,
    link: handlemau,
    desc:
      "Located in the Jhansi district of Uttar Pradesh, Mauranipur is known for its historical textile craftsmanship and deep cultural roots. Formerly called Madhupuri, it lies amid Bundelkhand’s fields and traditions.",
  },
  {
    id: 2,
    name: "Orchha",
    img: `${import.meta.env.BASE_URL}orchha5.jpg`,
    link: handleorchha,
    desc:
      "Orchha is a tranquil historic town in the Bundelkhand region, nestled on the banks of the Betwa River and marked by palaces, temples and riverside forts that date back to the 16th–17th centuries.",
  },
  {
    id: 3,
    name: "Khajuraho",
    img: `${import.meta.env.BASE_URL}khajuraho.jpg`,
    desc:
      "A world-renowned destination in Madhya Pradesh’s Bundelkhand, Khajuraho is celebrated for its exquisite medieval Hindu and Jain temples featuring intricate carvings and rich symbolism. The temple complex is a UNESCO World Heritage site, testifying to the artistic zenith of the Chandela dynasty.",
  },
  {
    id: 4,
    name: "Bandha",
    img: `${import.meta.env.BASE_URL}bandha.jpg`,
    desc:
      "Situated in Uttar Pradesh’s Bundelkhand region, the district of Banda is known for its strategic hills and historic forts like Kalinjar, as well as its distinctive culture and connection to the wider Bundelkhand plateau.",
  },
  {
    id: 5,
    name: "Panna",
    img: `${import.meta.env.BASE_URL}panna.jpg`,
    desc:
      "Nestled in Madhya Pradesh’s Bundelkhand, Panna combines royal history, diamond-mining heritage and lush wilderness. It is famous for the Panna National Park and Tiger Reserve, as well as for being part of the region’s geological and cultural richness.",
  },
  {
    id: 6,
    name: "Datia",
    img: `${import.meta.env.BASE_URL}datia.jpg`,
    desc:
      "A historic town in the northern Bundelkhand region of Madhya Pradesh, Datia enchants visitors with its seven-storied palace built by Raja Bir Singh Deo in 1614 — a remarkable example of Bundela architecture and a fusion of Hindu-Mughal styles.",
  },
  {
    id: 7,
    name: "Chitrakoot",
    img: `${import.meta.env.BASE_URL}chhitrakoot.jpg`,
    desc:
      "A sacred and tranquil region straddling Uttar Pradesh and Madhya Pradesh, Chitrakoot is celebrated in Hindu mythology — as the place where Lord Rama spent part of his exile. It offers a blend of spiritual ambience, riverside serenity and forested hills in the Vindhya range.",
  },
  {
    id: 8,
    name: "Chhatarpur",
    img: `${import.meta.env.BASE_URL}chhatarpur.jpg`,
    desc:
      "Chhatarpur is a district and city in north-eastern Madhya Pradesh’s Bundelkhand region, offering access to ancient temples and rugged landscapes, and serving as a gateway to deeper heritage destinations.",
  },
  
];

  const AUTO_SLIDE_MS = 8000; // auto change every 8s
  // preload images
  useEffect(() => {
    destinations.forEach((d) => {
      const img = new Image();
      img.src = d.img;
    });
  }, []);

  // auto slide with pause-on-interaction
  useEffect(() => {
    if (isPaused) return;
    autoTimerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(autoTimerRef.current);
  }, [isPaused]);

  

  // pause when mouse is over the hero / wrapper (desktop)
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // when mobile card clicked, set index
  const handleSelect = (i) => {
    setIndex(i);
    // small UX: pause auto-slide briefly so user can read
    setIsPaused(true);
    window.setTimeout(() => setIsPaused(false), 4000);
  };

  // keyboard accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIndex((p) => (p - 1 + destinations.length) % destinations.length);
      if (e.key === "ArrowRight") setIndex((p) => (p + 1) % destinations.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = destinations[index];


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

useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const handleScroll = () => {
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const newIndex = Math.round(scrollLeft / cardWidth);

    // Update only when index actually changes
    setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
  };

  container.addEventListener("scroll", handleScroll);
  return () => container.removeEventListener("scroll", handleScroll);
}, []); // ✅ run once only

  return (
    <main className="min-h-screen w-full flex flex-col items-center text-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
        {/* header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{once:false, amount:.2}}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Explore Bundelkhand
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-800  mx-auto md:mx-0">
            Unveil the soul of Bundelkhand. Trace the footsteps of kings, saints, and artists as you explore its forts, forests, and festivals.
          </p>
        </motion.header>
        {/* main content wrapper */}
        <section
          ref={wrapperRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full md:flex-col justify-center items-center lg:px-8 md:py-8"
        >
          {/* MAIN IMAGE PANEL */}
          <motion.div
          initial={{opacity:0, y:-30}}
          whileInView={{opacity:1, y:0}}
          transition={{duration:.8,ease:"easeInOut"}}
          viewport={{once:false, amount:.2}}
          className="hidden md:flex relative flex-1 rounded-2xl overflow-hidden shadow-2xl bg-black md:px-0 lg:mx-32 ">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.img}
                alt={current.name}
                initial={{ opacity: 0, scale: 1.03 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-[60vh] md:h-[65vh] object-cover "
              />
            </AnimatePresence>

            {/* dark gradient overlay for readability */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            {/* title + description anchored bottom-left */}
            <div className="absolute left-6 w-full pr-12  bottom-6 right-6 md:right-auto md:bottom-8 z-10  pr-6 ">
              <h2 className="hidden md:flex text-2xl md:text-4xl text-white font-bold drop-shadow-lg">{current.name}</h2>
              <p className="hidden md:flex max-w-3xl mt-2 text-sm md:text-base text-slate-200">{current.desc}</p>
              <div className="mt-4 flex items-center justify-between  ">
                <div className="flex gap-4">
                  <button onClick={current.link}
                  aria-label={`Discover more about ${current.name}`}
                  className="inline-block bg-white text-slate-900 font-semibold px-5 py-2 rounded-full  hover:scale-105 transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(0,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_4px_4px_12px_rgba(50,20,10.6)]"
                >
                  Discover more
                </button>
                <div className="hidden md:flex">
                  <button
                    onClick={() => {
                      // Ask for current location
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            const { latitude, longitude } = position.coords;
                            const destination = encodeURIComponent(current.name);
                            const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;
                            window.open(mapsUrl, "_blank");
                          },
                          (error) => {
                            console.error("Location access denied or unavailable:", error);
                            const destination = encodeURIComponent(current.name);
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
                  >
                    <MapPin className="h-6 w-6 hover:scale-125 hover:shadow-lg text-white transition-transform duration-300 easeInOut" />
                    
                  </button>
                </div>
                </div>
                <div className="flex items-center gap-2 pr-5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className="relative p-2 rounded-full transition-colors"
                    aria-label="Like"
                  >
                    <Heart
                      className={`h-6 w-6 transition-colors duration-300 ${
                        isLiked ? "fill-red-500 text-red-500" : "text-slate-300"
                      }`}
                    />
                  </motion.button>
                  <p className="text-slate-200 font-semibold">{likes}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* THUMBNAILS row - Desktop only */}
          <motion.aside
          initial={{opacity:0, y:30}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:.8, ease:"easeInOut"}}
          viewport={{once:false, amount:.2}}
          className="hidden md:flex justify-center items-center mt-6 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent pb-4">
              <div className="flex gap-4 px-4 py-2">
                {destinations.map((d, i) => {
                  const active = i === index;
                  return (
                    <motion.button
                      key={d.id}
                      onClick={() => handleSelect(i)}
                      whileHover={{ scale: 1.1 }}
                      
                      aria-pressed={active}
                      className={`relative flex-shrink-0 rounded-lg overflow-hidden hover:scale-125 border-2 transform transition-all duration-300 ${
                        active ? "border-black/80 scale-110 shadow-[0_0_25px_rgba(0,0,240,0.6)] hover:shadow-[0_0_25px_5px_rgba(0,0,240,0.4)]" : "border-transparent"
                      } shadow-lg focus:outline-none`}
                    >
                      <img
                        src={d.img}
                        alt={d.name}
                        className="md:w-[16vw] md:h-28 lg:w-[10vw] lg:h-32 object-cover"
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
        initial={{opacity:0, y:30}}
        whileInView={{opacity:1, y:0}}
        transition={{duration:.8, ease:"easeInOut"}}
        viewport={{once:false,amount:.2}}
        className="md:hidden mt-8">
          <div
          ref={containerRef}
           className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide z-30">
            {destinations.map((d, i) => (
              <motion.article
                key={d.id}
                onClick={() => handleSelect(i)}
                whileTap={{ scale: 0.98 }}
                className={` snap-center min-w-[100%] md:min-w-[60%] bg-white/5 rounded-xl overflow-hidden border border-black/10 shadow-lg ${
                    i === activeIndex ? "scale-100" : "scale-100"
                    } `}
              >
                <img src={d.img} alt={d.name} className="w-full  object-cover h-[50vh] border-b-2 border-blue-500" />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2 pr-2">
                  <h3 className="text-3xl font-bold text-black">{d.name}</h3>
                  <div className="flex items-center gap-2 pr-5">
                    <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className="relative p-2 rounded-full transition-colors"
                    aria-label="Like"
                  >
                    <Heart
                      className={`h-6 w-6 transition-colors duration-300 ${
                        isLiked ? "fill-red-500 text-red-500" : "text-gray-900"
                      }`}
                    />
                  </motion.button>
                  <p className="text-gray-900 font-semibold">{likes}</p>
                  </div>
                </div>
                  
                  <p className="text-sm text-slate-900 mt-2 line-clamp-3">{d.desc}</p>
                  <div className=" flex mt-3 justify-between">
                    <button onClick={d.link}
                  aria-label={`Discover more about ${d.name}`}
                  className="inline-block bg-white text-slate-900 font-semibold px-5 py-2 rounded-full hover:scale-105 transition-transform duration-300 easeInOut shadow-[inset_4px_4px_6px_rgba(20,0,0,0.2),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]"
                >
                  Discover more
                </button>
                    <button
                      onClick={() => {
                        // Ask for current location
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const { latitude, longitude } = position.coords;
                              const destination = encodeURIComponent(current.name);
                              const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;
                              window.open(mapsUrl, "_blank");
                            },
                            (error) => {
                              console.error("Location access denied or unavailable:", error);
                              const destination = encodeURIComponent(current.name);
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
                      <p>Let's Go</p>
                    </button>
                </div>
                </div>
              </motion.article>
            ))}
            
          </div>
          {/* Dots */}
          <div className="md:hidden py-6 flex justify-center items-center gap-2">
            {destinations.map((_, i) => (
              <motion.div
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i === activeIndex ? "bg-blue-500" : "bg-gray-600/90"
                }`}
                animate={{ scale: i === activeIndex ? 1.2 : .9 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
