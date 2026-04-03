import React from "react";
import { Facebook, Twitter, Github, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-[#1a1a1a] text-gray-300 py-12 border-t border-gray-700">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-5 ">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              ⚡ {t("footer.brand")}
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              {t("footer.brandDesc")}
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {[Facebook, Twitter, Github, Linkedin, Youtube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Columns */}
             <div className="col-span-3 flex justify-between py-4">
                <div>
                    <h3 className="text-white font-semibold mb-3">{t("footer.product")}</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition">{t("footer.features")}</li>
                        <li className="hover:text-white transition">{t("footer.pricing")}</li>
                        <li className="hover:text-white transition">{t("footer.caseStudies")}</li>
                        <li className="hover:text-white transition">{t("footer.reviews")}</li>
                        <li className="hover:text-white transition">{t("footer.updates")}</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">{t("footer.company")}</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition">{t("footer.aboutUs")}</li>
                        <li className="hover:text-white transition">{t("footer.contactUs")}</li>
                        <li className="hover:text-white transition">{t("footer.careers")}</li>
                        <li className="hover:text-white transition">{t("footer.culture")}</li>
                        <li className="hover:text-white transition">{t("footer.blog")}</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">{t("footer.support")}</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition">{t("footer.gettingStarted")}</li>
                        <li className="hover:text-white transition">{t("footer.helpCenter")}</li>
                        <li className="hover:text-white transition">{t("footer.serverStatus")}</li>
                        <li className="hover:text-white transition">{t("footer.reportBug")}</li>
                        <li className="hover:text-white transition">{t("footer.chatSupport")}</li>
                    </ul>
                </div>
             </div>
         </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          {t("footer.copyright")} <span className="text-gray-300">OMM</span>
        </div>
    </footer>
  );
};

export default Footer;
