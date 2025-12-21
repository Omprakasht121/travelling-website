import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import getImagePath from "./getImagePath";




const GalleryCardPopUp = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:scale-110 transition"
        >
          <X size={28} />
        </button>

        <div className="flex overflow-x-auto gap-6 px-8 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {card.images.map((img, i) => (
            <motion.img
              key={i}
              src={getImagePath(img)}
              className="snap-center object-cover rounded-xl w-[85vw] sm:w-[60vw] md:w-[30vw] max-h-[80vh]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryCardPopUp;
