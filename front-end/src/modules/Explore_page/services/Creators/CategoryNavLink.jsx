import {
  Users,
  CameraIcon,
  VideoIcon,
  GlobeIcon,
} from "lucide-react";

const iconMap = {
  users: <Users className="w-5 h-5" />,
  camera: <CameraIcon className="w-5 h-5" />,
  video: <VideoIcon className="w-5 h-5" />,
  globe: <GlobeIcon className="w-5 h-5" />,
};

const CategoryNavLink = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg ${
      isActive ? "bg-orange-500/10 text-orange-400" : "text-white"
    }`}
  >
    <span>{iconMap[category.icon]}</span>
    <span className="font-semibold">{category.name}</span>
  </button>
);

export default CategoryNavLink;
