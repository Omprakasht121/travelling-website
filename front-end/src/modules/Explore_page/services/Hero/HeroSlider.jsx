import { AnimatePresence, motion } from "framer-motion";
import getImagePath from "../../../shared/utils/getImagePath";


const HeroSlider = ({ ads, current, direction, variants }) => (
  <div className="relative w-full md:w-[60vw] h-[30vh] md:min-h-[60vh] overflow-hidden rounded-xl">
    <AnimatePresence custom={direction}>
      <motion.img
        key={current}
        src={getImagePath(ads[current].img)}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="absolute w-full h-full object-cover rounded-xl border-2 border-black/20"
      />
    </AnimatePresence>
    <div className="absolute z-30 -bottom-5 md:-bottom-8 space-y-2">
               {/* Dots */}
               <div className="w-full flex gap-2 justify-center bottom-12 md:bottom-14">
                 {ads.map((_, i) => (
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
);

export default HeroSlider;
