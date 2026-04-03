import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getContent } from "../../../Admin_Panel/service/adminAPI";
import { useVideoLogic } from "./VideoLogic";
import InstagramEmbed from "../../../../shared/instagram-component/InstagramEmbed";
import { staticReels } from "./StaticReels.js";
import { SkeletonGrid } from "../../../../shared/component/SkeletonCard";


const VideoPage = ({region}) => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---- FETCH BACKEND VIDEOS ----
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent(region, "videos");
        const mapped = data.map((item) => ({
          title: item.title || "Untitled Video",
          url: item.reel_url,
          desc: item.description || "",
        }));
        setVideoData(mapped);
      } catch (e) {
        console.error("Video fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const reels = videoData.length > 0 ? videoData : staticReels;

  const {
    index,
    direction,
    nextSlide,
    prevSlide,
    leftIndex,
    rightIndex,
    farRightIndex,
    containerRef,
    activeIndex,
  } = useVideoLogic(reels, loading);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: { x: 0, opacity: 1, scale: 1, zIndex: 10 },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  if (loading)
    return <SkeletonGrid count={3} />;

  return (
    <main className="relative min-h-auto w-full text-gray-900 py-8 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">

        {/* HEADER */}
        <motion.header
          className="md:px-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl text-center md:text-5xl font-extrabold">
            Videos / Social Media
          </h1>
          <p className="mt-2 text-sm text-center md:text-base text-slate-800">
            Experience Bundelkhand through reels and stories.
          </p>
        </motion.header>

        {/* MAIN */}
        <section className="relative justify-center items-center lg:px-28 md:py-8">
                  <div className="relative flex justify-center items-center md:gap-6">
                    {/* Left Arrow */}
                    <button
                      onClick={prevSlide}
                      className="hidden md:flex ml-2 p-2 bg-gray-700/60 rounded-full hover:bg-gray-700/40 hover:scale-105 transition-transform duration-300 easeInOut"
                    >
                      <ChevronLeft className="w-6 h-6 text-black" />
                    </button>
        
                    
                    <div className="relative w-[100%] flex justify-center items-center h-auto md:min-h-[103vh]">
                      <AnimatePresence initial={false} custom={direction}>
                        {/* Left small card */}
                        <motion.div
                          key={`left-${leftIndex}`}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          
                          animate={{ x: "-100%", scale: 0.8, opacity: 0.5, zIndex: 5 }}
                          exit="exit"
                          transition={{ duration: 0.6 }}
                          className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer blur-sm"
                          onClick={prevSlide}
                        >
                         
                          <div className="rounded-xl overflow-hidden h-auto">
                            <InstagramEmbed
                              permalink={reels[leftIndex].url}
                              maxWidth={350}
                            />
                          </div>
                        </motion.div>
        
                        {/* Main large card */}
                        <motion.div
                          key={`main-${index}`}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { type: "spring", stiffness: 200, damping: 25 },
                            opacity: { duration: 0.3 },
                          }}
                          className="absolute hidden md:flex flex-col gap-2 w-[100%] md:w-[40%] text-center md:px-2"
                        >
                          
                          <div className="rounded-2xl overflow-fit h-auto">
                            <InstagramEmbed
                              permalink={reels[index].url}
                              maxWidth={400}
                            />
                          </div>
                          <button
                            onClick={() =>
                              reels[index].url && window.open(reels[index].url, "_blank")
                            }
                            className=" text-white text-lg md:text-xl my-2 px-6 py-2 font-semibold rounded-xl bg-blue-700 hover:bg-blue-600 hover:scale-110 transition-transform duration-300 easeInOut   shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]"
                          >
                            Watch Now
                          </button>
                          {/* desktop dots  */}
                          <div className="md:py-4 hidden md:flex justify-center items-center gap-2">
                            {reels.map((_, i) => (
                              <motion.div
                                key={i}
                                className={`h-3 w-3 rounded-full ${
                                  i === index ? "bg-blue-700" : "bg-gray-800/40"
                                }`}
                                animate={{ scale: i === index ? 1 : 0.8 }}
                                transition={{ duration: 0.3 }}
                              />
                            ))}
                          </div>
                        </motion.div>
        
                        {/* Right small card */}
                        <motion.div
                          key={`right-${rightIndex}`}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                        
                          animate={{ x: "100%", scale: 0.8, opacity: 0.5, zIndex: 5 }}
                          exit="exit"
                          transition={{ duration: 0.6 }}
                          className="absolute hidden md:flex flex-col gap-3 w-1/3 cursor-pointer blur-sm"
                          onClick={nextSlide}
                        >
                          
                          <div className="rounded-xl overflow-hidden h-auto">
                            <InstagramEmbed
                              permalink={reels[rightIndex].url}
                              maxWidth={350}
                            />
                          </div>
                        </motion.div>
        
                        {/* Far right incoming card */}
                        <motion.div
                          key={`farRight-${farRightIndex}`}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate={{ x: "200%", scale: 0.7, opacity: 0 }}
                          exit="exit"
                          transition={{ duration: 0.6 }}
                          className="absolute hidden md:flex flex-col gap-3 w-1/3"
                        >
                          <div className="rounded-xl overflow-hidden h-auto">
                            <InstagramEmbed
                              permalink={reels[farRightIndex].url}
                              maxWidth={300}
                            />
                          </div>
                        </motion.div>
                      </AnimatePresence>
        
                      {/* Mobile horizontal scroll section */}
                      <div
                        ref={containerRef}
                        className="flex md:hidden overflow-x-auto snap-x snap-mandatory space-x-4  no-scrollbar scroll-smooth"
                      >
                        {reels.map((reel, i) => (
                          <motion.div
                            key={i}
                            data-index={i}
                            className={`w-[100%] snap-center flex-shrink-0 bg-white/10 rounded-xl p-1 text-center transition-transform duration-300 ${
                              i === activeIndex ? "scale-100" : "scale-100"
                            }`}
                          >
                            <div className="rounded-xl overflow-hidden flex justify-center items-center">
                              <InstagramEmbed permalink={reel.url} maxWidth={380} />
                            </div>
                            <p className="text-sm text-slate-800 mb-3">{reel.desc}</p>
                            <button
                              onClick={() =>
                                reels[index].url &&
                                window.open(reels[index].url, "_blank")
                              }
                              className="text-white text-lg md:text-xl my-2 px-6  w-full py-2 font-semibold rounded-xl bg-blue-700 hover:bg-blue-600 hover:scale-110 transition-transform duration-300 easeInOut   shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_2px_4px_6px_rgba(0,0,0,0.5)]"
                            >
                              Watch Now
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
        
                    {/* Right Arrow */}
                    <button
                      onClick={nextSlide}
                      className="hidden md:flex ml-2 p-2 bg-gray-700/60 rounded-full hover:bg-gray-700/40 hover:scale-105 transition-transform duration-300 easeInOut"
                    >
                      <ChevronRight className="w-6 h-6 text-black" />
                    </button>
                  </div>
        
                  {/* dots  */}
                  <div className="flex md:hidden pb-4 flex justify-center items-center gap-2">
                    {reels.map((_, j) => (
                      <motion.div
                        key={j}
                        className={`h-3 w-3 rounded-full ${
                          j === activeIndex ? "bg-blue-700" : "bg-gray-800/40"
                        }`}
                        animate={{ scale: j === activeIndex ? 1 : 0.7 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </section>
      </div>
    </main>
  );
};

export default VideoPage;
