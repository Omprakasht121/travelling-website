import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "hi" ? "en" : "hi";
    i18n.changeLanguage(newLang);
  };

  const isHindi = i18n.language === "hi";

  return (
    <motion.button
      onClick={toggleLanguage}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20 text-sm font-semibold transition-colors duration-200"
      title={isHindi ? "Switch to English" : "हिंदी में बदलें"}
    >
      <Languages className="w-4 h-4 text-orange-500" />
      <span className="text-orange-600">
        {isHindi ? "EN" : "हिं"}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;
