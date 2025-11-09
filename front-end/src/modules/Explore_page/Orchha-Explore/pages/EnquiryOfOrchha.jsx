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
} from "lucide-react";

const intaUrl = import.meta.env.VITE_INSTAGRAM_URL;
const mailTo = import.meta.env.VITE_GMAIL_URL;


const EnquiryOfOrchha = () => {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-sky-950 to-slate-900 text-white py-4 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full">
                <motion.header
                  className="md:mx-16"
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{once:false, amount:.2}}
                >
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                    Join Us
                  </h1>
                  <p className="mt-2 text-sm md:text-base text-slate-300  mx-auto md:mx-0">
                   Reach out and let’s bring you closer to the heart of Bundelkhand — where travel becomes a connection, and memories turn into stories worth retelling.
                  </p>
                </motion.header>
                {/* main content  */}
                <section className="relative justify-center items-center lg:px-24 py-8">
                     <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-2 md:p-12 flex flex-col md:flex-row gap-8"
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

                        <form className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5 text-black">
                            <motion.input
                                whileFocus={{ scale: 1.03 }}
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            />
                            <motion.input
                                whileFocus={{ scale: 1.03 }}
                                type="text"
                                placeholder="Enter your last name"
                                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            />
                            </div>

                            <div className="grid md:grid-cols-2 gap-5 text-black">
                            <motion.input
                                whileFocus={{ scale: 1.03 }}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex border border-gray-300 rounded-full overflow-hidden">
                                <select className="px-3 bg-gray-100 text-gray-700 outline-none">
                                    <option value="+91">+91</option>
                                    <option value="+971">+971</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                </select>
                                <motion.input
                                whileFocus={{ scale: 1.03 }}
                                type="tel"
                                placeholder="Enter your contact number"
                                className="flex-1 px-4 py-3 outline-none text-black"
                                />
                            </div>
                            </div>

                            <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            rows="4"
                            placeholder="Enter your message"
                            className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            ></motion.textarea>

                            <div className="text-center md:text-left">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="bg-[#0a1a3c] text-white px-8 py-3 rounded-full shadow hover:bg-blue-900 transition-all duration-300"
                            >
                                Send a Message
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
                                <a href={intaUrl}><p className="font-semibold">The Unseen Bundelkhand</p></a>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#11224d] p-4 rounded-xl flex items-center gap-3"
                            >
                                <MessageCircle size={20} />
                                <div>
                                <p className="text-sm">SMS / WhatsApp:</p>
                                <a href={`mailto:${mailTo}`} ><p className="font-semibold">+91 9297863623</p></a>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#11224d] p-4 rounded-xl flex items-center gap-3"
                            >
                                <Mail size={20} />
                                <div>
                                <p className="text-sm">Email:</p>
                                <a href=""><p className="font-semibold">omprakasht5689@gmail.com</p></a>
                                </div>
                            </motion.div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-sm mb-3 text-gray-300">Connect with us</p>
                            <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <motion.a
                                key={i}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                href="#"
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

export default EnquiryOfOrchha;
