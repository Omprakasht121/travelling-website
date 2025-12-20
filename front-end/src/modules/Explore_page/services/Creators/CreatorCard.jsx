import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { makeImageUrl } from "./utils";
import { fallbackCover, fallbackProfile } from "./constants";

const CreatorCard = ({ creator, onClick }) => {
  const cover = makeImageUrl(creator.coverPhoto) || fallbackCover;
  const profile =
    makeImageUrl(creator.profilePic) ||
    makeImageUrl(creator.coverPhoto) ||
    fallbackProfile;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      onClick={onClick}
      className="relative w-full h-72 rounded-2xl cursor-pointer group shadow-lg my-4 overflow-hidden"
    >
      <img src={profile} className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

      <div className="absolute bottom-2 left-0 pl-4">
        <img
          src={cover}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-950 mb-2"
        />

        <h3 className="text-2xl font-bold text-white">{creator.name}</h3>
        <p className="text-orange-400 font-medium">{creator.category}</p>

        <div className="flex items-center gap-2 text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          View Profile <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

export default CreatorCard;
