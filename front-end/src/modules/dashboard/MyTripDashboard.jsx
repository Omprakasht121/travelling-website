import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Navigation, 
  Share2, 
  Trash2, 
  ArrowRight, 
  Plus,
  Sparkles,
  Clock,
  ChevronRight,
  TrendingUp,
  ExternalLink,
  Edit2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthModal } from '../../context/AuthModalContext';
import Breadcrumb from '../../shared/component/Breadcrumb';
import WishlistButton from '../../shared/component/WishlistButton';
import ShareTripModal from '../../shared/modals/ShareTripModal';
import toast from 'react-hot-toast';

const MyTripDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    userData, 
    myTrips, 
    wishlist, 
    deleteTripFromFirebase,
    removeFromWishlist,
    createSharedTrip 
  } = useAuthModal();

  const [activeTripIndex, setActiveTripIndex] = useState(0);
  const currentTrip = myTrips[activeTripIndex];
  
  // --- Share Modal State ---
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const stats = useMemo(() => {
    if (!currentTrip) return null;
    const totalPlaces = currentTrip.days.reduce((acc, day) => acc + (day.places?.length || 0), 0);
    return {
      days: currentTrip.days.length,
      places: totalPlaces,
      date: new Date(currentTrip.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      budget: currentTrip.preferences?.budget || "Flexible"
    };
  }, [currentTrip]);

  const generateMapsUrl = () => {
    if (!currentTrip) return "#";
    const allPlaces = currentTrip.days.flatMap(d => d.places);
    if (allPlaces.length === 0) return "#";
    
    const destination = encodeURIComponent(allPlaces[allPlaces.length - 1]);
    const waypoints = allPlaces.slice(0, -1).map(p => encodeURIComponent(p)).join('|');
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}&waypoints=${waypoints}`;
  };

  const handleShare = async () => {
     if (!currentTrip) return;
     
     toast.promise(createSharedTrip(currentTrip), {
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 transition-colors duration-500">
      
      {/* --- DASHBOARD HEADER --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-24 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <Breadcrumb />
          <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800"
              >
                <Sparkles className="w-3 h-3" /> Personalized Explorer
              </motion.div>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                My Trip <span className="text-blue-600">✨</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                {userData ? `Welcome back, ${userData.name}. Your journey is ready.` : "Your personalized travel space."}
              </p>
            </div>

            {currentTrip && (
              <div className="flex flex-wrap gap-4">
                 <button 
                  onClick={handleShare}
                  className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700"
                 >
                   <Share2 className="w-4 h-4" /> Share
                 </button>
                 <a 
                  href={generateMapsUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm flex items-center gap-2 hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20"
                 >
                   <Navigation className="w-4 h-4" /> Open Maps
                 </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT COLUMN: ITINERARY --- */}
          <div className="lg:col-span-8 space-y-12">
            
            <AnimatePresence mode="wait">
              {!currentTrip ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-900 rounded-[40px] p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">No active trip yet</h2>
                    <p className="text-slate-500 max-w-xs mx-auto font-medium">Generate a personalized itinerary using our AI Planner to see it here.</p>
                  </div>
                  <button 
                    onClick={() => navigate('/ai-planner')}
                    className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                  >
                    Start Planning 🚀
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key={currentTrip.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-12"
                >
                  {/* Trip Selection Area */}
                  {myTrips.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                      {myTrips.map((t, idx) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTripIndex(idx)}
                          className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all border ${
                            activeTripIndex === idx 
                              ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20" 
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-blue-400"
                          }`}
                        >
                          {t.tripTitle}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Summary Card */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      { l: "Duration", v: `${stats.days} Days`, i: Calendar },
                      { l: "Stops", v: stats.places, i: MapPin },
                      { l: "Budget", v: `₹${stats.budget}`, i: TrendingUp },
                      { l: "Created", v: stats.date, i: Clock }
                    ].map((s, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                          <s.i className="w-5 h-5 text-blue-600 truncate" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.l}</p>
                          <p className="text-lg font-black text-slate-900 dark:text-white truncate">{s.v}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Timeline */}
                  <div className="space-y-12">
                    {currentTrip.days.map((day, idx) => (
                      <div key={idx} className="relative pl-10 sm:pl-16">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-slate-200 dark:via-slate-800 to-transparent rounded-full" />
                        <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-blue-600 shadow-lg shadow-blue-500/50" />
                        
                        <div className="space-y-8">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                               <p className="text-blue-600 text-xs font-black uppercase tracking-[0.3em]">Day {day.dayNumber}</p>
                               <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{day.theme || "Exploration"}</h3>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {day.places.map((place, pIdx) => (
                              <div key={pIdx} className="bg-white dark:bg-slate-900 p-5 rounded-[28px] border border-slate-100 dark:border-slate-800 group hover:shadow-xl transition-all flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center font-black text-blue-600">
                                    {pIdx + 1}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{place}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Activity {pIdx + 1}</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => console.log("Details for:", place)}
                                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 transition"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-10 flex justify-center">
                     <button 
                      onClick={() => deleteTripFromFirebase(currentTrip.id)}
                      className="flex items-center gap-2 text-red-500/50 hover:text-red-500 text-xs font-black uppercase tracking-widest transition-all"
                     >
                       <Trash2 className="w-4 h-4" /> Delete this Trip
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- RIGHT COLUMN: WISHLIST --- */}
          <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24">
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                     <Heart className="w-5 h-5 text-red-500" /> Saved Places
                   </h3>
                   <span className="text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                     {wishlist.length} Items
                   </span>
                </div>

                <div className="space-y-4">
                   <AnimatePresence mode="popLayout">
                     {wishlist.length === 0 ? (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center bg-white dark:bg-slate-900 rounded-[32px] border border-dashed border-slate-200 dark:border-slate-800">
                          <p className="text-slate-400 text-sm font-medium">No saved places yet.</p>
                       </motion.div>
                     ) : (
                       wishlist.map(item => (
                         <motion.div 
                          key={item.id} 
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="bg-white dark:bg-slate-900 p-3 rounded-[24px] border border-slate-100 dark:border-slate-800 flex items-center gap-4 group"
                         >
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                               <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{item.name}</h4>
                               <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.category || "Place"}</p>
                            </div>
                            <button 
                              onClick={() => removeFromWishlist(item.id)}
                              className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition"
                            >
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </motion.div>
                       ))
                     )}
                   </AnimatePresence>
                </div>
             </div>

             {/* Upgrade Card */}
             <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10 space-y-4">
                   <h4 className="text-xl font-black tracking-tight leading-tight">Want to explore more cities?</h4>
                   <p className="text-white/70 text-xs font-medium">Our AI can plan trips across Jhansi, Orchha, and Datia instantly.</p>
                   <button 
                    onClick={() => navigate('/ai-planner')}
                    className="w-full py-3 bg-white text-indigo-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition shadow-lg shadow-indigo-900/20"
                   >
                     New Trip 🪄
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>
      <ShareTripModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        shareUrl={shareUrl}
        tripTitle={currentTrip?.tripTitle}
      />
    </div>
  );
};

export default MyTripDashboard;
