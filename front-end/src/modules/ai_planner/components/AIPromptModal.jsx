import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MapPin, IndianRupee, Calendar, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AVAILABLE_REGIONS } from "../AIPlannerPage";

const AIPromptModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    regions: "Jhansi", // Default to Jhansi
    budget: "",
    days: "2",
  });
  const navigate = useNavigate();

  // ✅ Trigger modal after 3 seconds, if not skipped before
  useEffect(() => {
    const hasSkipped = localStorage.getItem("unseen_trip_prompt_skipped");
    if (!hasSkipped) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSkip = () => {
    localStorage.setItem("unseen_trip_prompt_skipped", "true");
    setIsOpen(false);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    // Navigate to planner with initial data
    navigate("/ai-planner", { state: { initialData: formData } });
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md"
            onClick={handleSkip}
          />

          {/* Modal Card */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md pointer-events-auto overflow-hidden bg-slate-900/95 border border-white/10 rounded-[24px] shadow-2xl"
            >
              {/* Subtle Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative p-8 sm:p-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 shadow-[inset_0_0_12px_rgba(52,211,153,0.2)] border border-emerald-400/20">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">
                    Plan Your Bundelkhand Trip <br /> in 30 Seconds ✨
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base max-w-[280px]">
                    Get a personalized itinerary based on your time and budget.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleGenerate} className="space-y-4">
                  {/* Destination */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-800 rounded-lg">
                      <MapPin className="w-4 h-4 text-slate-400" />
                    </div>
                    <select
                      value={formData.regions}
                      onChange={(e) => setFormData({ ...formData, regions: e.target.value })}
                      className="w-full pl-14 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none"
                    >
                      {AVAILABLE_REGIONS.map((region) => (
                        <option key={region} value={region} className="bg-slate-900">
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget & Days Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-800 rounded-lg">
                        <IndianRupee className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="number"
                        placeholder="Budget (₹)"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full pl-14 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 bg-slate-800 rounded-lg">
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="number"
                        placeholder="Days"
                        min="1"
                        max="7"
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                        className="w-full pl-14 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="submit"
                    className="group relative w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Generate My Trip 🚀</span>
                  </button>

                  {/* Skip Action */}
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="w-full text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors py-2"
                  >
                    Skip for now
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIPromptModal;
