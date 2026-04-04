import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  User, 
  Loader2, 
  Navigation, 
  ArrowLeft,
  Users,
  Compass,
  Bike,
  Car,
  Bus,
  Wallet,
  Clock,
  Heart,
  Share2,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  LayoutDashboard
} from "lucide-react";
import { generateAITrip } from "../../shared/services/api-client";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../landing_page/pages/Footer";
import { useTripContext } from "../../context/TripContext";
import { useAuthModal } from "../../context/AuthModalContext";
import WishlistButton from "../../shared/component/WishlistButton";
import ShareTripModal from "../../shared/modals/ShareTripModal";
import toast from "react-hot-toast";

export const AVAILABLE_REGIONS = [
  "Jhansi",
  "Orchha",
  "Mauranipur",
  "Banda",
  "Chitrakoot",
  "Datia",
];

const LOADING_MESSAGES = [
  "Crafting your perfect trip...",
  "Finding hidden gems in Bundelkhand...",
  "Optimizing your travel route...",
  "Consulting local guides...",
  "Syncing with verified historical anchors...",
  "Personalizing your itinerary...",
];

const PLACEHOLDER_IMAGES = {
  Nature: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800",
  Temples: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800",
  Adventure: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=800",
  Culture: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800",
  Food: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800",
  Stay: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  Default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"
};

const AILoadingState = () => {
    const [msgIndex, setMsgIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="space-y-12 py-10 lg:py-20">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
            <Sparkles className="w-16 h-16 text-blue-600 animate-bounce relative z-10 mx-auto" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {LOADING_MESSAGES[msgIndex]}
            </h2>
            <p className="text-slate-400 font-medium animate-pulse">Wait a moment while our AI constructs your journey...</p>
          </div>
        </div>
  
        <div className="space-y-8 max-w-2xl mx-auto">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4 px-4 sm:px-0">
              <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse mx-auto sm:mx-0" />
              <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse shrink-0" />
                    <div className="flex-1 space-y-3 pt-2">
                      <div className="h-5 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                      <div className="h-4 w-3/4 bg-slate-50 dark:bg-slate-800/50 rounded-lg animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

const AIPlannerPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    userData, 
    setShowLogin, 
    setPendingAction, 
    addTripToFirebase, 
    createSharedTrip 
  } = useAuthModal();
  const { createNewTrip } = useTripContext();
  
  const [stage, setStage] = useState("refine"); // "refine" | "result"
  const [formData, setFormData] = useState({
    days: 2,
    regions: ["Jhansi"],
    budget: "",
    travelType: "Solo",
    interests: [],
    preferences: "",
  });

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  
  // --- Share Modal State ---
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // ✅ Initialize form from navigation state (received from AIPromptModal)
  useEffect(() => {
    if (location.state?.initialData) {
      setFormData((prev) => ({
        ...prev,
        ...location.state.initialData,
        regions: Array.isArray(location.state.initialData.regions) 
          ? location.state.initialData.regions 
          : [location.state.initialData.regions]
      }));
    }
  }, [location.state]);

  // ✅ Auto-save trip from session after login
  useEffect(() => {
    const performRecovery = async () => {
      const tempTrip = sessionStorage.getItem("tempTrip");
      if (userData && tempTrip) {
        try {
          const tripData = JSON.parse(tempTrip);
          const success = await addTripToFirebase(tripData);
          if (success) {
            sessionStorage.removeItem("tempTrip");
          }
        } catch (e) {
          console.error("Session recovery failed:", e);
        }
      }
    };
    performRecovery();
  }, [userData]);

  const toggleRegion = (region) => {
    setFormData(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? (prev.regions.length > 1 ? prev.regions.filter(r => r !== region) : prev.regions)
        : [...prev.regions, region]
    }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    // On small screens, scroll to results automatically
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    try {
      const result = await generateAITrip(formData);
      if (result.success && result.itinerary) {
        setItinerary(result.itinerary);
        setStage("result");
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

  const handleSaveTrip = async () => {
    if (!itinerary) return;

    const tripData = {
      tripTitle: itinerary.tripTitle,
      days: itinerary.days.map(d => ({
        dayNumber: d.dayNumber,
        theme: d.theme,
        places: d.activities.map(a => a.placeName)
      })),
      preferences: formData,
      itinerary: itinerary // Store full itinerary for restoration
    };

    if (!userData) {
      sessionStorage.setItem("tempTrip", JSON.stringify(tripData));
      toast("Login to save your trip ✨", { icon: "🔒" });
      setShowLogin(true);
      return;
    }

    const success = await addTripToFirebase(tripData);
    if (success) {
      toast.success("Trip saved! Opening your dashboard...", { icon: "📈" });
      setTimeout(() => navigate("/my-trip"), 1500);
    }
  };

  const handleShare = async () => {
    if (!itinerary) return;

    const tripData = {
      tripTitle: itinerary.tripTitle,
      days: itinerary.days,
      preferences: formData,
      itinerary: itinerary
    };

    toast.promise(createSharedTrip(tripData), {
        loading: 'Generating share link...',
        success: (shareId) => {
            if (shareId) {
                const url = `${window.location.origin}/trip/${shareId}`;
                setShareUrl(url);
                setIsShareModalOpen(true);
                return "Link generated! ✨";
            }
            throw new Error("Failed");
        },
        error: 'Failed to generate link'
    });
  };

  const FilterPill = ({ label, icon: Icon, isActive, onClick, color="blue" }) => (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-300 border ${
        isActive 
          ? `bg-${color}-600 border-${color}-500 text-white shadow-lg shadow-${color}-500/20` 
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400"
      }`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
      {label}
    </motion.button>
  );

  const ActivityCard = ({ act }) => {
    const fallbackImage = PLACEHOLDER_IMAGES[act.category] || PLACEHOLDER_IMAGES.Default;
    const finalImage = act.imageUrl || fallbackImage;

    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-slate-900 rounded-[28px] p-4 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-5 hover:shadow-xl transition-all group relative overflow-hidden"
      >
        <div className="w-full sm:w-44 h-44 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800">
           <img 
            src={finalImage} 
            alt={act.placeName}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
           />
           <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1.5">
             <Clock className="w-3 h-3" /> {act.timeOfDay}
           </div>
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{act.placeName}</h4>
                    {act.isLlmSuggestion ? (
                        <Sparkles className="w-4 h-4 text-purple-500" />
                    ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <WishlistButton 
                      itemData={{
                        id: `ai-${act.placeName.toLowerCase().replace(/\s+/g, '-')}`,
                        name: act.placeName,
                        image: finalImage,
                        category: act.category,
                        description: act.whyGoHere
                      }} 
                    />
                </div>
             </div>
             <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
               {act.whyGoHere}
             </p>
          </div>

          <div className="flex items-center justify-between mt-4">
             <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-700">
                    {act.category}
                </span>
             </div>
             <button className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:gap-2 transition-all">
                Details <ChevronRight className="w-3.5 h-3.5" />
             </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans pb-24 lg:pb-0">
      
      {/* Dynamic Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6 lg:px-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Explore</span>
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">Bundelkhand AI</span>
        </div>
        <div className="flex items-center gap-4">
           {stage === "result" && (
             <button onClick={() => setStage("refine")} className="text-blue-600 text-[10px] font-black uppercase tracking-widest">
               Reset
             </button>
           )}
           <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-400" />
           </div>
        </div>
      </header>

      <main className="pt-24 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto min-h-[calc(100vh-64px)]">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* --- LEFT COLUMN: INPUTS (Sticky on LG) --- */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-10 lg:pb-24">
            
            <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800"
                >
                  AI Itinerary Builder
                </motion.div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
                  Design Your <br /> Journey 🗺️
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Select multiple regions and customize your style to generate a verified itinerary.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[28px] p-5 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
              
              {/* Regions Toggle */}
              <div className="space-y-5">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-blue-500" /> Destinations
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {AVAILABLE_REGIONS.map(r => (
                    <FilterPill 
                      key={r}
                      label={r}
                      isActive={formData.regions.includes(r)}
                      onClick={() => toggleRegion(r)}
                    />
                  ))}
                </div>
              </div>

              {/* Days & Budget */}
              <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" /> Duration
                    </label>
                    <div className="flex items-center gap-2">
                       <input 
                        type="number"
                        min="1"
                        max="7"
                        value={formData.days}
                        onChange={(e) => setFormData({...formData, days: e.target.value})}
                        className="w-10 bg-transparent text-xl font-black text-slate-900 dark:text-white outline-none"
                      />
                      <span className="text-base font-bold text-slate-400">Days</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5" /> Budget
                    </label>
                    <div className="flex items-center gap-1">
                      <span className="text-base font-bold text-slate-400">₹</span>
                      <input 
                        type="number"
                        placeholder="5000"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full bg-transparent text-xl font-black text-slate-900 dark:text-white outline-none placeholder:text-slate-200 dark:placeholder:text-slate-800"
                      />
                    </div>
                  </div>
              </div>

              {/* Type & Filters */}
              <div className="space-y-6 pt-2">
                 <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Users className="w-3 h-3" /> Travel Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Solo", "Friends", "Couple"].map(type => (
                        <FilterPill 
                          key={type}
                          label={type}
                          isActive={formData.travelType === type}
                          onClick={() => setFormData({...formData, travelType: type})}
                        />
                      ))}
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Compass className="w-3 h-3" /> Interests
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        {l: "Nature 🌿", v: "Nature"}, 
                        {l: "Temples 🛕", v: "Temples"}, 
                        {l: "Adventure 🏞️", v: "Adventure"}, 
                        {l: "Culture 🎭", v: "Culture"}
                      ].map(item => (
                        <FilterPill 
                          key={item.v} 
                          label={item.l} 
                          isActive={formData.interests.includes(item.v)} 
                          onClick={() => toggleInterest(item.v)} 
                        />
                      ))}
                    </div>
                 </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                onClick={handleGenerate}
                className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[24px] font-black text-xl shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Construct Trip</span> <Sparkles className="w-5 h-5 text-blue-400" /></>}
              </motion.button>

            </div>
          </aside>

          {/* --- RIGHT COLUMN: RESULTS / LOADING / EMPTY --- */}
          <section className="lg:col-span-8 min-h-[60vh]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AILoadingState />
                </motion.div>
              ) : itinerary ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-12 pb-24"
                >
                  {/* Result Masthead */}
                  <div className="bg-slate-950 rounded-[48px] p-8 sm:p-14 text-white shadow-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[120px] -mr-60 -mt-60 animate-pulse" />
                    <div className="relative z-10 space-y-8">
                       <div className="flex flex-wrap gap-3">
                          <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/5 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                            {itinerary.days.length} Day Journey
                          </span>
                          <span className="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/10 text-blue-400 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                            {formData.travelType} Style
                          </span>
                       </div>
                       <h2 className="text-3xl sm:text-5xl font-black tracking-tighter leading-none">{itinerary.tripTitle}</h2>
                       <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
                         Multi-region verified route through {formData.regions.join(" & ")}.
                       </p>
                    </div>
                  </div>

                  {/* Enhanced Timeline */}
                  <div className="space-y-20 pt-6">
                    {itinerary.days.map((day, dIdx) => (
                       <div key={day.dayNumber} className="relative pl-10 sm:pl-16">
                          {/* Timeline vertical bar */}
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-slate-200 dark:via-slate-800 to-transparent rounded-full" />
                          <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]" />

                          <div className="space-y-10">
                             <div className="space-y-2">
                                <div className="text-blue-600 text-xs font-black uppercase tracking-[0.3em]">Day {day.dayNumber}</div>
                                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{day.theme}</h3>
                             </div>

                             <div className="grid grid-cols-1 gap-6">
                                {day.activities.map((act, aIdx) => (
                                   <ActivityCard key={aIdx} act={act} />
                                ))}
                             </div>
                          </div>
                       </div>
                    ))}
                  </div>

                  {/* Bottom Actions for LG (Floating bar is handled below) */}
                  <div className="pt-10 flex flex-col items-center gap-6">
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                         <TrendingUp className="w-3.5 h-3.5" /> End of Optimized Route
                     </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                   key="empty" 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20 opacity-40 px-6"
                >
                  <div className="w-24 h-24 rounded-[32px] bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    <LayoutDashboard className="w-12 h-12 text-slate-300" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Ready when you are</h3>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto">Fill in your preferences on the left and click Construct Trip to build your itinerary.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

        </div>
      </main>

      {/* --- STICKY ACTION BAR (ONLY RESULTS) --- */}
      <AnimatePresence>
         {stage === "result" && !loading && (
            <motion.div
               initial={{ y: 100 }}
               animate={{ y: 0 }}
               exit={{ y: 100 }}
               className="fixed bottom-6 inset-x-4 z-50 flex justify-center"
            >
               <div className="bg-slate-950/95 dark:bg-white/95 backdrop-blur-2xl p-3 rounded-[36px] border border-white/10 shadow-3xl flex items-center gap-3 sm:gap-6 max-w-lg w-full">
                  <button 
                    onClick={handleSaveTrip}
                    className="flex-1 py-4 px-6 rounded-2xl bg-blue-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/20"
                  >
                     <Heart className="w-4 h-4 fill-white" /> Save Trip
                  </button>
                  <div className="flex gap-2">
                    <button 
                        onClick={handleShare}
                        className="p-4 rounded-2xl bg-white/5 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 hover:bg-white/10 transition-all border border-white/5"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => { 
                            window.scrollTo({top:0, behavior:'smooth'}); 
                            setStage("refine"); 
                            setItinerary(null);
                            toast("Starting over!", { icon: "🪄" });
                        }}
                        className="p-4 rounded-2xl bg-white/5 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 hover:bg-white/10 transition-all border border-white/5"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      <Footer />

      <ShareTripModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        shareUrl={shareUrl}
        tripTitle={itinerary?.tripTitle}
      />
    </div>
  );
};

export default AIPlannerPage;
