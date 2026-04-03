// src/modules/events/components/EventCard.jsx
import { motion } from "framer-motion";
import { Calendar, GlobeLock, MapPin } from "lucide-react";
import getImagePath from "../../../shared/utils/getImagePath";
import WishlistButton from "../../../../shared/component/WishlistButton";


const EventCard = ({
  event,
  idx,
  onClick,
  activeImageIndex,
  onMouseEnter,
  onMouseLeave,
}) => {
  const gallery = event.gallery || [];
  const img =
    gallery.length > 0
      ? gallery[activeImageIndex % gallery.length]
      : event.img;


      console.log(gallery)
      console.log(activeImageIndex)
      console.log(img)
  return (
    <motion.div
      className="relative flex-shrink-0 w-72 md:w-80 rounded-lg overflow-hidden shadow-2xl cursor-pointer"
      whileHover={{ scale: 1.02, y: -6 }}
      onClick={() => onClick(idx)}
      onMouseEnter={() => onMouseEnter(idx)}
      onMouseLeave={() => onMouseLeave(idx)}
    >
      <img
        src={getImagePath(img)}
        className="w-full h-96 object-cover"
        alt={event.title}
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute top-4 right-4 bg-black/50 text-white rounded-lg p-2 text-center w-16">
        <span className="block font-bold text-xl">
          {event.badgeDate.month}
        </span>
        <span className="block text-lg">{event.badgeDate.day}</span>
      </div>

      <div className="absolute top-4 left-4 z-10">
        <WishlistButton 
          itemData={{
            id: `event-${event.title?.toLowerCase().replace(/\s+/g, '-')}`,
            name: event.title,
            image: getImagePath(img),
            link: window.location.pathname,
            category: "Event"
          }} 
        />
      </div>

      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white font-bold text-2xl">{event.title}</h3>
        <p className="text-gray-300 text-sm flex gap-2">
          <Calendar size={14} /> {event.date}
        </p>
        <p className="text-gray-300 text-sm flex gap-2  items-center">
          <MapPin size={14} /> {event.location}
        </p>
      </div>
    </motion.div>
  );
};

export default EventCard;
