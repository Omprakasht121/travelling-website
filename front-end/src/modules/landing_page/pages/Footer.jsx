import React from "react";
import { Facebook, Twitter, Github, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] text-gray-300 py-12 border-t border-gray-700">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-5 ">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              ⚡ Bundeli
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Empower your Brand & Captivate your Audience with MultiGency right
              away and Boost your Business.
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
                    <h3 className="text-white font-semibold mb-3">Product</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition">Features</li>
                        <li className="hover:text-white transition">Pricing</li>
                        <li className="hover:text-white transition">Case Studies</li>
                        <li className="hover:text-white transition">Reviews</li>
                        <li className="hover:text-white transition">Updates</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition">About</li>
                        <li className="hover:text-white transition">Contact Us</li>
                        <li className="hover:text-white transition">Careers</li>
                        <li className="hover:text-white transition">Culture</li>
                        <li className="hover:text-white transition">Blog</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white transition">Getting Started</li>
                        <li className="hover:text-white transition">Help Center</li>
                        <li className="hover:text-white transition">Server Status</li>
                        <li className="hover:text-white transition">Report a Bug</li>
                        <li className="hover:text-white transition">Chat Support</li>
                    </ul>
                </div>
             </div>
         </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © Copyright by <span className="text-gray-300">OMM</span>
        </div>
    </footer>
  );
};

export default Footer;
