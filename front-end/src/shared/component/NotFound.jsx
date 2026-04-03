import React from "react";
import { motion } from "framer-motion";
import { MapPinOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center bg-gradient-to-br from-amber-800/10 to-blue-800/10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <MapPinOff className="w-20 h-20 text-orange-500" />
        <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
        <h2 className="text-2xl font-bold text-gray-700">{t("notFound.title")}</h2>
        <p className="text-gray-600 max-w-md">
          {t("notFound.description")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-700 text-white text-lg font-bold hover:bg-blue-800 hover:scale-110 transition-transform duration-300 shadow-lg"
        >
          {t("notFound.goHome")}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
