import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
  const { t } = useTranslation();
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-600 py-2 px-4 md:px-16 lg:px-24 pt-20 md:pt-24">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-blue-700 transition-colors duration-200"
      >
        <Home className="w-4 h-4" />
        <span>{t("nav.home")}</span>
      </Link>

      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-blue-700 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
