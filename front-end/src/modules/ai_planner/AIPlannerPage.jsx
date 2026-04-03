import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, CheckCircle2, User, Loader2, Navigation } from "lucide-react";
import { generateAITrip } from "../../shared/services/api-client";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Footer from "../landing_page/pages/Footer";

const AVAILABLE_REGIONS = [
  "Jhansi",
  "Orchha",
  "Mauranipur",
  "Banda",
  "Chitrakoot",
  "Datia",
];

const AIPlannerPage = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    days: 2,
    regions: ["Jhansi"],
    preferences: "",
  });

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");

  const handleRegionToggle = (region) => {
    setFormData((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  };

  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (formData.regions.length === 0) {
      setError("Please select at least one region.");
      return;
    }
    
    setLoading(true);
    setError("");
    setItinerary(null);

    try {
      const result = await generateAITrip(formData);
      if (result.success && result.itinerary) {
        setItinerary(result.itinerary);
      } else {
        setError("Failed to generate itinerary. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while talking to the AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      
      {/* Simple Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-4 sm:px-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition group"
        >
          <div className="p-2 border border-gray-200 dark:border-gray-700 rounded-full group-hover:border-blue-500 transition">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span>Back to Home</span>
        </button>
      </header>

      <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-64px)]">
        
        {/* --- LEFT PANE: CONTROLS --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 h-fit sticky top-28"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
              <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Trip Planner</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Design your perfect Bundelkhand journey.</p>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            
            {/* Days Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Calendar className="h-4 w-4" /> Trip Duration
              </label>
              <select
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Day" : "Days"}
                  </option>
                ))}
              </select>
            </div>

            {/* Regions Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4" /> Regions to Visit
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_REGIONS.map((region) => {
                  const isSelected = formData.regions.includes(region);
                  return (
                    <button
                      type="button"
                      key={region}
                      onClick={() => handleRegionToggle(region)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {region}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4" /> Your Preferences
              </label>
              <textarea
                value={formData.preferences}
                onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                placeholder="E.g., I want budget stays, lots of local street food, and minimal walking. We are traveling with kids."
                rows={4}
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none placeholder:text-gray-400"
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] active:scale-95 shadow-blue-500/30"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Drafting with AI...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Magic Itinerary
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* --- RIGHT PANE: TIMELINE --- */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!itinerary && !loading && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center p-12 bg-white/50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700"
              >
                <Navigation className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Ready for an adventure?</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
                  Fill out your preferences on the left, and our Hybrid AI will instantly construct a realistic day-by-day itinerary tailored just for you.
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full p-12 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-blue-500 blur-xl opacity-30 animate-pulse rounded-full" />
                  <Sparkles className="h-16 w-16 text-blue-600 dark:text-blue-400 animate-bounce relative z-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Consulting the Locals...</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
                  Scanning verified database entries and generating intelligent recommendations to build your perfect trip.
                </p>
              </motion.div>
            )}

            {itinerary && !loading && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 pb-12"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 mix-blend-overlay rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                  <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-100 text-sm font-semibold mb-4 backdrop-blur-sm">
                      {itinerary.days.length} Days • {formData.regions.join(", ")}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{itinerary.tripTitle}</h2>
                    <p className="text-blue-100 text-lg opacity-90 max-w-2xl blur-[0.3px] hover:blur-none transition-all duration-300">
                      A personalized journey blending curated history, verified stays, and AI-powered local food secrets.
                    </p>
                  </div>
                </div>

                {/* Day Cards */}
                {itinerary.days.map((day, dIndex) => (
                  <motion.div
                    key={`day-${day.dayNumber}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: dIndex * 0.15 + 0.2 }}
                    className="relative ml-4 sm:ml-8"
                  >
                    {/* Timeline Line */}
                    <div className="absolute left-[-24px] sm:left-[-32px] top-6 bottom-[-24px] w-0.5 bg-gradient-to-b from-blue-300 to-transparent dark:from-blue-800" />
                    
                    {/* Day Dot */}
                    <div className="absolute left-[-29px] sm:left-[-37px] top-6 w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)] outline outline-4 outline-gray-50 dark:outline-gray-900" />

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 pt-4 flex items-center gap-3">
                      <span className="text-blue-600 dark:text-blue-400">Day {day.dayNumber}</span>
                      <span className="text-gray-300 dark:text-gray-600 font-normal">|</span>
                      <span className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl">{day.theme}</span>
                    </h3>

                    <div className="flex flex-col gap-4">
                      {day.activities.map((act, aIndex) => (
                        <motion.div
                          key={`act-${aIndex}`}
                          whileHover={{ scale: 1.01 }}
                          className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 sm:gap-6 group"
                        >
                          {/* Time & Category */}
                          <div className="flex sm:flex-col items-center sm:items-start justify-between sm:w-32 shrink-0">
                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-md">
                              {act.timeOfDay}
                            </span>
                            <span className="mt-2 text-xs font-semibold text-blue-500 uppercase tracking-widest hidden sm:block">
                              {act.category}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                              <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                {act.placeName}
                              </h4>
                              
                              {/* Magic Badges */}
                              {act.isLlmSuggestion ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50">
                                  <Sparkles className="h-3 w-3" /> AI Suggestion
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                                  <CheckCircle2 className="h-3 w-3" /> Verified Place
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                              {act.whyGoHere}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIPlannerPage;
