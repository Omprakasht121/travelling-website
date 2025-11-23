import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";
import { useContact } from "../hooks/contacthook.js";

const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;
const mailTo = import.meta.env.VITE_GMAIL_URL;
const facebookUrl = import.meta.env.VITE_FACEBOOK_URL;
const twitterUrl = import.meta.env.VITE_TWITTER_URL;
const linkedinUrl = import.meta.env.VITE_LINKEDINURL_URL;
const websiteUrl = import.meta.env.VITE_WEBSITE_URL;



const ContactUs = () => {
    const { register, handleSubmit, doSubmit, errors, loading } = useContact();
    const openWhatsApp = (phone, message = "") => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    }
    const socialLinks = [
        facebookUrl,
        instagramUrl,
        twitterUrl,
        linkedinUrl,
        websiteUrl,
    ];


  return (
    <main className="min-h-screen w-full flex flex-col items-center  text-gray-900 py-12 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
                <motion.header
                  className="mb-8"
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{once:false, amount:.2}}
                >
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                    Connect with Us
                  </h1>
                  <p className="mt-2 text-sm md:text-base text-slate-800  mx-auto md:mx-0">
                   Reach out and let’s bring you closer to the heart of Bundelkhand — where travel becomes a connection, and memories turn into stories worth retelling.
                  </p>
                </motion.header>
                {/* main content  */}
                <section className="relative w-full md:px-8 md:py-8">
                     <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-2 md:p-12 flex flex-col md:flex-row gap-8"
                    >
                        {/* Left Side — Form */}
                        <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 , ease:"easeInOut"}}
                        viewport={{once:false, amount:.2}}
                        className="flex-1"
                        >
                        <h2 className="text-3xl font-bold text-center md:text-left mb-2 text-[#0a1a3c]">
                           
                        </h2>
                        <p className="text-gray-600 mb-6 text-center md:text-left font-semibold">
                            Do you have a question? A complaint? Or need help choosing the right
                            product? Feel free to contact us below.
                        </p>

                        <form  onSubmit={handleSubmit(doSubmit)}
                        className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5 text-black">
                            <motion.input
                                whileFocus={{ scale: 1.03 }}
                                {...register("name")}
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            />
                             {errors.name && (
                                <p className="text-sm text-red-600">{errors.name.message}</p>
                            )}
                            <motion.input
                                whileFocus={{ scale: 1.03 }}
                                {...register("address")}
                                type="text"
                                placeholder="Enter Address"
                                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            />
                            {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-5 text-black">
                            <motion.input
                                whileFocus={{ scale: 1.03 }}
                                {...register("email")}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
                            <div className="flex border border-gray-300 rounded-full overflow-hidden">
                                <select className="px-3 bg-gray-100 text-gray-700 outline-none">
                                    <option value="+91">+91</option>
                                    <option value="+971">+971</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                </select>
                                <motion.input
                                whileFocus={{ scale: 1.03 }}
                                {...register("phone")}
                                type="tel"
                                placeholder="Enter your contact number"
                                className="flex-1 px-4 py-3 outline-none text-black"
                                />
                                {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
                            </div>
                            </div>

                            <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            {...register("message")}
                            rows="4"
                            placeholder="Enter your message"
                            className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            ></motion.textarea>
                            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}

                            <div className="text-center md:text-left">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className={`self-start border border-indigo-600 text-white font-semibold px-12 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 hover:scale-105 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_10px_rgba(0,0,0,0.6)] 
                                ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                }`}
                                
                            >
                             {loading ? "Sending..." : "Send"}
                            </motion.button>
                            </div>
                        </form>
                        </motion.div>

                        {/* Right Side — Contact Info */}
                        <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease:"easeInOut"}}
                        viewport={{once:false, amount:.2}}
                        className="bg-[#0a1a3c] text-white rounded-3xl p-8 flex flex-col justify-between w-full md:w-96"
                        >
                        <div>
                            <h3 className="text-xl font-semibold mb-6">
                            Hi! Connect with us through.
                            </h3>

                            <div className="space-y-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#11224d] p-4 rounded-xl flex items-center gap-3"
                            >
                                <Instagram size={20} />
                                <div>
                                <p className="text-sm">instagram:</p>
                                <a href={instagramUrl}><p className="font-semibold">The Unseen Bundelkhand</p></a>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#11224d] p-4 rounded-xl flex items-center gap-3"
                            >
                                <MessageCircle size={20} />
                                <div>
                                <p className="text-sm">SMS / WhatsApp:</p>
                                <a onClick={() => openWhatsApp("918888888888", "Hello! OMM")} ><p className="font-semibold">+91 9297863623</p></a>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#11224d] p-4 rounded-xl flex items-center gap-3"
                            >
                                <Mail size={20} />
                                <div>
                                <p className="text-sm">Email:</p>
                                <a href={`mailto:${mailTo}`}><p className="font-semibold">omprakasht5689@gmail.com</p></a>
                                </div>
                            </motion.div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-sm mb-3 text-gray-300">Connect with us</p>
                            <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin, Globe].map((Icon, i) => (
                            <motion.a
                                key={i}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                href={socialLinks[i]}           // 🔥 correct URL for each icon
                                target="_blank"                 // opens in new tab
                                rel="noopener noreferrer"       // security best practice
                                className="p-2 bg-[#11224d] rounded-lg hover:bg-blue-700 transition-all duration-300"
                            >
                                <Icon size={18} />
                            </motion.a>
                            ))}
                            
                            </div>
                        </div>
                        </motion.div>
                    </motion.div>
                </section>
            </div>
     
    </main>
  );
};

export default ContactUs;
