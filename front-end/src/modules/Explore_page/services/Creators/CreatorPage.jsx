import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
import { useAuthModal } from "../../../../context/AuthModalContext";
import CreatorProfileModal from "./CreatorProfileModal";

import { categories, fallbackCover } from "./constants";
import useCreatorsData from "./useCreatorsData";
// import CategoryNavLink from "./CategoryNavLink";
import CreatorCard from "./CreatorCard";
import CategoryNavLink from "./CategoryNavLink";



const CreatorPage = ({ region }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCreator, setSelectedCreator] = useState(null);

  const creators = useCreatorsData(region);
  const { requestAuth, showLogin, showRegister, pendingAction } = useAuthModal();

  const protectedOpenModal = (creator) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      requestAuth(() => setSelectedCreator(creator));
      return;
    }
    setSelectedCreator(creator);
  };

  useEffect(() => {
    if (!showLogin && !showRegister && pendingAction === null) {
      setSelectedCreator(null);
    }
  }, [showLogin, showRegister, pendingAction]);

  useEffect(() => {
    document.body.style.overflow = selectedCreator ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [selectedCreator]);

  const filtered =
    activeCategory === "all"
      ? creators
      : creators.filter((c) => c.categorySlug === activeCategory);

  return (
    <main id="creators" className="pb-8 text-gray-900">
      {/* HEADER */}
      <header className="py-12 relative text-center">
        <img
          src={fallbackCover}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
        />
        <Users className="w-16 h-16 text-orange-400 mx-auto relative" />
        <h1 className="text-5xl font-extrabold relative">{t("services.creators.title")}</h1>
        <p className="text-gray-700 mt-4 relative">
          {t("services.creators.subtitle")}
        </p>
      </header>

      {/* BODY */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex gap-10 flex-col md:flex-row">
          <div className="md:w-1/4">
            <div className="bg-gray-900 border border-gray-800 p-4 mt-4 rounded-2xl">
              <h3 className="font-semibold px-2 mb-2">{t("services.creators.categories")}</h3>
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

export default CreatorPage;
