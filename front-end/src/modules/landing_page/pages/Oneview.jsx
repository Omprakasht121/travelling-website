import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getContent } from "../../../shared/services/contentService"; // <-- keep this

const Oneview = () => {
  // ⭐ STATIC video IDs
  const staticVideos = [
    "8S63BUvVqD4",
    "XP1D7FaN-Wc",
    "-gpPSFd5GNo",
  ];

  // ⭐ FINAL MERGED VIDEO LIST
  const [videos, setVideos] = useState(staticVideos);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);

  // ⭐ Fetch video links dynamically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContent("landing", "videos");

        // ⭐ Convert dynamic URLs → YouTube IDs
        const dynamicIDs = data
          .map((item) => {
            const url = item.ytvideo_link;
            if (!url) return null;

            // extract video ID from ANY YouTube link
            const match = url.match(/(?:v=|be\/|embed\/)([A-Za-z0-9_-]{11})/);
            return match ? match[1] : null;
          })
          .filter(Boolean);

        // ⭐ Merge static + dynamic
        setVideos((prev) => [...prev, ...dynamicIDs]);

      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-play when index changes
  useEffect(() => {
    setPlaying(true);
  }, [currentIndex]);

  // Auto-play when enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setPlaying(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  // Navigation
  const nextVideo = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
  const prevVideo = () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);

  // ⭐ Correct video ID
  const currentID = videos[currentIndex];

  const src = `https://www.youtube.com/embed/${currentID}?autoplay=${
    playing ? 1 : 0
  }&mute=${muted ? 1 : 0}&modestbranding=1&rel=0&showinfo=0`;

  return (
    <main className="min-h-auto w-full flex flex-col items-center py-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Bundelkhand In Motion
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-800 max-w-2xl mx-auto md:mx-0">
            Witness Bundelkhand come alive — through sweeping drone views, temple
            bells, cascading rivers, and inviting you to see, feel, and fall in love
            with its soul.
          </p>
        </header>

        {/* Video Player Section */}
        <section ref={videoRef} className="relative w-full md:flex-col justify-center items-center md:py-8">

          <div className="relative flex justify-center items-center">

            {/* Video Frame */}
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">

              <button
                onClick={prevVideo}
                className="md:flex items-center justify-center absolute left-0 top-1/2 z-30 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full md:p-3 transition-all"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </button>

              <iframe
                title="Bundelkhand Video"
                src={src}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="rounded-2xl"
              />

              <button
                onClick={nextVideo}
                className="md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full md:p-3 transition-all"
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </button>

            </div>

          </div>

          {/* Dots */}
          <div className="flex justify-center items-center mt-3 gap-2">
            {videos.map((_, i) => (
              <motion.div
                key={i}
                className={`h-3 w-3 rounded-full ${
                  i === currentIndex ? "bg-blue-900" : "bg-gray-800/70"
                }`}
                animate={{ scale: i === currentIndex ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-4">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="text-white font-semibold text-lg px-4 py-4 bg-orange-700/90 rounded-full hover:bg-orange-800/90 hover:scale-110 hover:border hover:border-black/30 transition-all duration-300 easeInOut"
            >
              {playing ? <Pause className="w-4 h-4 md:w-6 md:h-6" /> : <Play className="w-4 h-4 md:w-6 md:h-6" />}
            </button>

            <button
              onClick={() => setMuted((m) => !m)}
              className="text-white font-semibold text-lg px-4 py-4 bg-orange-700/90 rounded-full hover:bg-orange-800/90 hover:scale-110 hover:border hover:border-black/30 transition-all duration-300 easeInOut"
            >
              {muted ? <VolumeX className="w-4 h-4 md:w-6 md:h-6" /> : <Volume2 className="w-4 h-4 md:w-6 md:h-6" />}
            </button>
          </div>

        </section>
      </div>
    </main>
  );
};

export default Oneview;
