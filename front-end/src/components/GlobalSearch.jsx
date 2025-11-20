import React, { useState, useEffect, useRef } from "react";
import { Filter, Search, X } from "lucide-react";
import { staticSearchData } from "../modules/Explore_page/Mauranipur-Explore/staticdata/StaticSearchData";
import PreviousMap_ from "postcss/lib/previous-map";

export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(false);

  const containerRef = useRef(null);

  // Highlight matched text
  const highlightMatch = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "ig");
    return text.replace(regex, "<mark>$1</mark>");
  };

    useEffect(() => {
    if (query.trim() === "") {
        setResults([]);
        return;
    }

    setLoading(true);

    const delay = setTimeout(async () => {
        let finalResults = [];

        // 1️⃣ Filter static items
        const staticResults = staticSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
        );

        // 2️⃣ Fetch from backend
        const res = await fetch(`/api/search?query=${query}&category=${category}`);
        const dbResults = await res.json();

        // 3️⃣ Combine both
        finalResults = [...staticResults, ...dbResults];

        setResults(finalResults);
        setLoading(false);

    }, 300);

    return () => clearTimeout(delay);
    }, [query, category]);


  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    }
    if (e.key === "Enter") {
      if (activeIndex >= 0 && results[activeIndex]) {
        window.location.href = `/content/${results[activeIndex].slug}`;
      }
    }
    if (e.key === "Escape") {
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
    }
  };
  
  if (!open) return null; // hide when closed
  return (
    <div className="fixed top-20 md:top-24 left-0 w-full flex justify-center z-50 transition-transform duration-300 easeInOut">
      <div className="w-11/12 md:w-1/2 relative" ref={containerRef}>
        
        {/* Search Input */}
        <div className="flex items-center gap-2 border rounded-xl px-4  bg-white ">
          <Search className="text-gray-500" size={18} />
          <Filter onClick={() => setFilter(prev => !prev)} className="md:hidden text-gray-500" size={18} />
          
          <input
            type="text"
            value={query}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setActiveIndex(-1);
              setQuery(e.target.value);
            }}
            placeholder="Search places, foods, creators..."
            className="w-full h-12 outline-none "
          />

          {query && (
            <button onClick={() => { setQuery(""); setResults([]); }}>
              <X className="text-gray-500" size={18} />
            </button>
          )}
        </div>

        {/* desktop Category Filter */}
        <div className="hidden md:flex gap-2 mt-2">
          {["all", "travel", "food", "creator"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-sm border ${
                category === c
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
        {/* for mobile only  */}
        <div  className={` top-0 left-0 w-full  mt-2 z-30 flex md:hidden items-center justify-start gap-2
          transform transition-transform duration-500 easeInOut
          ${filter ? " translate-y-0 md: translate-y-0 opacity-100 " : "hidden -translate-y-full opacity-0"}
        `}>
          {["all", "travel", "food", "creator"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-sm border ${
                category === c
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dropdown Results */}
        {query && (
          <div className="absolute top-16 md:top-24 w-full bg-white rounded-xl shadow-lg max-h-80 overflow-y-auto">
            {loading && (
              <div className="p-4 text-center text-gray-500 animate-pulse">
                Searching...
              </div>
            )}

            {!loading && results.length === 0 && (
              <div className="p-6 text-center text-gray-600 animate-bounce">
                No results found 🥲
              </div>
            )}

            {!loading &&
  results.map((item, index) => {
    
    if (!item) return null; // safety

    return (
      <div
        key={index}
        className={`p-3 flex items-center gap-3 cursor-pointer border-b ${
          index === activeIndex ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
        onClick={() => {
          window.location.href = `/${item.slug}`;
        }}
      >
        <img
          src={
            item.source === "static"
              ? item.image
                ? (item.image.startsWith("/") ? item.image : `/${item.image}`)
                : "/fallback.jpg"
              : item.mainImage || "/fallback.jpg"
          }
          className="w-12 h-12 object-cover rounded-md"
        />

        <div>
          <p
            className="font-semibold"
            dangerouslySetInnerHTML={{
              __html: highlightMatch(item.title || ""),
            }}
          />
          <p className="text-xs text-gray-500">{item.category || "other"}</p>
        </div>
      </div>
    );
  })}

          </div>
        )}
      </div>
    </div>
  );
}
