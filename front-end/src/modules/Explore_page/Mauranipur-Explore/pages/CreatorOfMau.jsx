// src/modules/.../Creators.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Mail,
  Phone,
  MessageSquare,
  Instagram,
  Youtube,
  Facebook,
  ArrowRight,
  X,
  Camera,
  Video,
  Globe,
  FacebookIcon,
} from "lucide-react";
import { getContent } from "../services/contentService.js"; // keep your service path
import CreatorProfileModal from "./modals/CreatorProfileModal.jsx";
import { useAuthModal } from "../../../../context/AuthModalContext.jsx";
import { useNavigate } from "react-router-dom";

const backendURL = "http://localhost:5000";
const fallbackProfile = "/default-profile.jpg";
const fallbackCover = "/default-cover.jpg";


// --------------------------------------------------
// CATEGORY LIST (same as you had)
// --------------------------------------------------
const categories = [
  { id: "all", name: "All Creators", icon: <Users className="w-5 h-5" /> },
  { id: "photography", name: "Photography", icon: <Camera className="w-5 h-5" /> },
  { id: "vlogging", name: "Vloggers", icon: <Video className="w-5 h-5" /> },
  { id: "guides", name: "Local Guides", icon: <Globe className="w-5 h-5" /> },
];

// --------------------------------------------------
// CATEGORY NAV BUTTON
// --------------------------------------------------
const CategoryNavLink = ({ category, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center w-full gap-3 p-3 rounded-lg text-left transition-colors duration-200"
    animate={{ backgroundColor: isActive ? "rgba(249,115,22,0.1)" : "transparent" }}
    whileHover={{ backgroundColor: "rgba(249,115,22,0.05)" }}
  >
    <span className={isActive ? "text-orange-400" : "text-gray-400"}>
      {category.icon}
    </span>
    <h3 className={`font-semibold text-lg ${isActive ? "text-orange-400" : "text-white"}`}>
      {category.name}
    </h3>
  </motion.button>
);

// --------------------------------------------------
// Helper: build correct URL for images
// --------------------------------------------------
const makeImageUrl = (imgPath) => {
  if (!imgPath) return null;
  // server returns paths like "/uploads/..." or "/uploads/gallery/..."
  if (imgPath.startsWith("/")) return `${backendURL}${imgPath}`;
  if (imgPath.startsWith("uploads")) return `${backendURL}/${imgPath}`;
  if (/^https?:\/\//.test(imgPath)) return imgPath;
  // otherwise treat as static asset under public/
  return `${import.meta.env.BASE_URL}${imgPath}`;
};



// --------------------------------------------------
// CREATOR CARD
// --------------------------------------------------
const CreatorCard = ({ creator, onClick }) => {
  const cover = makeImageUrl(creator.coverPhoto) || fallbackCover;
  const profile = makeImageUrl(creator.profilePic) || makeImageUrl(creator.coverPhoto) || fallbackProfile;

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
      <img src={profile} alt={creator.name} className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

      <div className="absolute bottom-2 left-0 pl-4 ">
        <img
          src={cover}
          alt={creator.name}
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


// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------
const Creators = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [creators, setCreators] = useState([]);

  const { requestAuth, showLogin, showRegister, pendingAction } = useAuthModal();

  const navigate = useNavigate()


 // ⭐ PROTECTED CLICK — FIXED
const protectedOpenModal = (creator) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    // save callback to run AFTER login
    requestAuth(() => setSelectedCreator(creator));
    return;
  }

  // user already logged in → open modal
  setSelectedCreator(creator);
};

useEffect(() => {
  if (!showLogin && !showRegister && pendingAction === null) {
    // login was closed or cancelled
    setSelectedCreator(null);
  }
}, [showLogin, showRegister, pendingAction]);


  useEffect(() => {
  if (selectedCreator) {
    document.body.style.overflow = "hidden";   // 🔒 lock background scroll
  } else {
    document.body.style.overflow = "auto";     // 🔓 unlock when modal closes
  }

  return () => {
    document.body.style.overflow = "auto";     // safety cleanup
  };
}, [selectedCreator]);


  useEffect(() => {
    const fetchCreators = async () => {
      try {
        // fetch creators from backend (region 'mauranipur' used in your project earlier)
        const data = await getContent("mauranipur", "creators"); // keep same signature
        if (!Array.isArray(data)) return;

        const mapped = data.map((c) => {
          // cover = mainImage; profilePic fallback to profilePic or first gallery or mainImage
          const coverPhoto = c.mainImage || (Array.isArray(c.gallery) && c.gallery[0]) || null;
          const profilePic = c.profilePic || (Array.isArray(c.gallery) && c.gallery[0]) || c.mainImage || null;

          return {
            id: c._id,
            name: c.title || "Untitled",
            bio: c.description || "",
            category: c.segment || c.category || "Creator",
            categorySlug: (c.segment || c.category || "other").toLowerCase(),
            coverPhoto: coverPhoto || fallbackCover,
            profilePic: profilePic || fallbackProfile,
            social: {
              instagram: c.instagram_url || c.instagram || "",
              youtube: c.youtube_url || c.youtube || "",
              facebook: c.facebook_url || c.facebook || "",
            },
            contact: {
              phone: c.phone || "",
              email: c.email || "",
              whatsapp: c.whatsapp || "",
            },
            stats: {
              posts: c.posts || 0,
              followers: c.followers || "0",
              following: c.following || 0,
            },
            // gallery images (used only in modal)
            bestPhotos: Array.isArray(c.gallery) ? c.gallery : [],
          };
        });

        setCreators(mapped);
      } catch (err) {
        console.error("CREATOR FETCH ERROR:", err);
      }
    };

    fetchCreators();
  }, []);

  const filtered =
    activeCategory === "all"
      ? creators
      : creators.filter((c) => c.categorySlug === activeCategory);

  return (
    <main id="creators" className=" pb-8 text-gray-900 min-h-auto">
      {/* HEADER */}
      <header className="py-12 relative text-center">
        <img
          src={fallbackCover}
          className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
          alt="bg"
        />
        <div className="absolute inset-0 "></div>

        <Users className="w-16 h-16 text-orange-400 mx-auto relative" />
        <h1 className="text-5xl font-extrabold relative">Meet The Creators</h1>
        <p className="text-gray-700 mt-4 relative">The storytellers of Bundelkhand.</p>
      </header>

      {/* BODY */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex gap-10 flex-col md:flex-row">
          {/* SIDEBAR */}
          <div className="md:w-1/4 w-full top-24">
            <div className="bg-gray-900 border border-gray-800 p-4 mt-4 rounded-2xl">
              <h3 className="font-semibold px-2 mb-2">Categories</h3>
              {categories.map((cat) => (
                <CategoryNavLink
                  key={cat.id}
                  category={cat}
                  isActive={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </div>
          </div>

          {/* CREATOR GRID */}
          <div className="w-full md:w-3/4">
            <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence>
                {filtered.map((c) => (
                  <CreatorCard
                  key={c.id}
                  creator={c}
                  onClick={(e) => {
                    e.stopPropagation();    
                    protectedOpenModal(c);
                  }}
                />

                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedCreator && !showLogin && !showRegister && (
          <CreatorProfileModal
            creator={selectedCreator}
            onClose={() => setSelectedCreator(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Creators;
