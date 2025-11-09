import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const homes = [
  {
    id: 1,
    title: "Flat in Greater Noida",
    price: "₹3,700 for 2 nights",
    rating: "★ 5.0",
    img: "https://a0.muscache.com/im/pictures/miso/Hosting-1234.jpg?im_w=720",
  },
  {
    id: 2,
    title: "Apartment in Greater Noida",
    price: "₹6,848 for 2 nights",
    rating: "★ 5.0",
    img: "https://a0.muscache.com/im/pictures/miso/Hosting-2345.jpg?im_w=720",
  },
  {
    id: 3,
    title: "Flat in Greater Noida",
    price: "₹3,600 for 2 nights",
    rating: "★ 5.0",
    img: "https://a0.muscache.com/im/pictures/miso/Hosting-3456.jpg?im_w=720",
  },
  {
    id: 4,
    title: "Flat in Greater Noida",
    price: "₹6,094 for 2 nights",
    rating: "★ 5.0",
    img: "https://a0.muscache.com/im/pictures/miso/Hosting-4567.jpg?im_w=720",
  },
  {
    id: 5,
    title: "Flat in Greater Noida",
    price: "₹7,415 for 2 nights",
    rating: "★ 4.96",
    img: "https://a0.muscache.com/im/pictures/miso/Hosting-5678.jpg?im_w=720",
  },
  {
    id: 6,
    title: "Home in Noida",
    price: "₹14,083 for 2 nights",
    rating: "★ 4.99",
    img: "https://a0.muscache.com/im/pictures/miso/Hosting-6789.jpg?im_w=720",
  },
  {
    id: 7,
    title: "Apartment in Greater Noida",
    price: "₹12,998 for 2 nights",
    rating: "★ 4.87",
    img: "https://a0.muscache.com/im/pictures/miso/Hosting-7890.jpg?im_w=720",
  },
];

export default function PopularHomes() {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to toggle button states
  const checkScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 5
    );
  };

  // Scroll left/right
  const scrollLeft = () => {
    containerRef.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollTo({
      left: containerRef.current.scrollWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => container.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="relative px-4 md:px-8 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">
          Popular homes in Gautam Buddha Nagar
        </h2>
      </div>

      {/* Slider container */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md transition-all duration-200 ${
            canScrollLeft
              ? "opacity-100 hover:scale-105"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Cards */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar"
        >
          {homes.map((home) => (
            <div
              key={home.id}
              className="min-w-[250px] md:min-w-[300px] rounded-xl overflow-hidden shadow hover:shadow-lg bg-white"
            >
              <img
                src={home.img}
                alt={home.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm md:text-base font-medium">
                  {home.title}
                </h3>
                <p className="text-sm text-gray-600">{home.price}</p>
                <p className="text-sm text-gray-800">{home.rating}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md transition-all duration-200 ${
            canScrollRight
              ? "opacity-100 hover:scale-105"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
