import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";

const About = () => {
  const images = [
    `${import.meta.env.BASE_URL}jhansi3.jpg`,
    `${import.meta.env.BASE_URL}orchha.jpg`,
    `${import.meta.env.BASE_URL}gwalior.jpg`,
  ];
  const aboutData = [
  {
    id: 1,
    title: "Origin of the Name",
    description:
      "The name Bundelkhand derives from the Bundela Rajput clan, who rose to prominence in the 11th century. The Bundelas ruled much of central India and gave the region its distinctive cultural and political identity.",
  },
  {
    id: 2,
    title: "Rise of the Bundela Kingdoms",
    description:
      "The Bundelas established Orchha as their capital in the 16th century under Raja Rudra Pratap Singh. They built magnificent forts, palaces, and temples — blending Rajput valor with intricate Mughal-inspired architecture.",
  },
  {
    id: 3,
    title: "Centers of Art and Devotion",
    description:
      "Bundelkhand flourished as a cradle of art, faith, and craftsmanship. From the erotic sculptures of Khajuraho (built by the Chandela dynasty) to the sacred ghats of Chitrakoot, it became a land where spirituality met artistry.",
  },
  {
    id: 4,
    title: "Struggle and Resistance",
    description:
      "The region became a symbol of resistance and patriotism, especially during the 1857 First War of Independence, when Rani Laxmi Bai of Jhansi led her heroic defense against British rule — a story now etched in Indian history.",
  },
  {
    id: 5,
    title: "Cultural Crossroads",
    description:
      "Situated between northern and central India, Bundelkhand absorbed influences from Rajput, Mughal, and Maratha cultures — reflected in its language, cuisine, festivals, and fort architecture.",
  },
];

  const [index, setIndex] = useState(0);

  // auto change top image
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);
  return (
    <main className="min-h-screen w-full flex flex-col items-center  text-gray-900 py-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full ">
        {/* header */}
        <motion.header
          className="mb-8 "
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{once:false,amount:.2}}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Echoes of Bundelkhand
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-800  mx-auto md:mx-0">
          Bundelkhand isn’t just a chapter in history — it’s a living saga of courage, art, and timeless pride.
          </p>
        </motion.header>

        {/* main content */}
        <section className="relatable  w-full md:px-8 md:py-8 grid grid-cols-1 md:grid-cols-2">
          <div className="relative md:flex lg:inline justify-center">
            {/* left side - image */}
            
              <motion.div
                className=" hidden md:flex relative  justify-center lg:justify-end"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
              >
                

                {/* --- container with glassmorphism --- */}
                <div className=" flex md:items-center lg:items-top justify-center bg-sky-100/20 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-2xl p-4 shadow-lg border border-black/10 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.1),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.4)]">
                  

                  {/* top changing image */}
                  <div className=" ">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={images[index]}
                        src={images[index]}
                        alt="rotating destination"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: .8 }}
                        className="md:w-[28vw] md:h-[32vh] lg:w-[18vw] lg:h-[44vh] rounded-xl shadow-2xl"
                      />
                    </AnimatePresence>
                  </div>
                  {/* bottom static image */}
                  <div className="absolute md:hidden lg:flex top-64 -left-32 bg-slate-200 p-4 rounded-xl overflow-hidden border border-black/20 shadow-2xl shadow-[inset_4px_4px_6px_rgba(50,0,0,0.2),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.4)]">
                    <img
                    src={`${import.meta.env.BASE_URL}lakshmibai.jpg`}
                    alt="destination 1"
                    className="w-[18vw] h-[44vh] rounded-xl shadow-xl object-cover position-left"
                  />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* right side - list content */}
            
          
          <div className="md:px-8">
            <motion.ul
              className="flex flex-col gap-6 mt-6 lg:mt-0"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {aboutData.map((item) => (
                <motion.li
                  key={item.id}
                  className="flex gap-2 max-w-xl p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 
                  shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05),_inset_-2px_-2px_6px_rgba(0,0,0,0.6),_0_6px_12px_rgba(0,0,0,0.5)] 
                  hover:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05),_inset_-2px_-2px_6px_rgba(0,0,0,0.6),_0_4px_12px_rgba(0,0,0,0.7)]
                  transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >

                  <h1 className="text-lg font-bold text-orange-400">{item.id}.</h1>
                  <p className="text-base md:text-lg leading-relaxed">
                    <span className="font-semibold">{item.title} — </span>
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

        </section>
      </div>
    </main>
  );
};

export default About;
