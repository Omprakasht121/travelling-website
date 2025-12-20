import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import getImagePath from "../../../shared/utils/getImagePath";


const FoodModal = ({ food, onClose }) => {
  if (!food) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/90 z-50 flex items-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-white">
          <X size={28} />
        </button>

        <div className="flex overflow-x-auto gap-6 px-8">
          {food.images.map((img, i) => (
            <motion.img
              key={i}
              src={getImagePath(img)}
              className="w-[80vw] md:w-[30vw] rounded-xl"
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FoodModal;
