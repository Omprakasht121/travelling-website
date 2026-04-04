import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Loader2,
  Navigation,
  ChevronRight,
  TrendingUp,
  LayoutDashboard
} from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Footer from "../landing_page/pages/Footer";

// --- FIREBASE CONFIG (SAME AS CONTEXT) ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PublicTripView = () => {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const docRef = doc(db, "shared_trips", shareId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setTrip(docSnap.data());
        } else {
          setError("Trip not found 🏜️");
        }
      } catch (err) {
        console.error("Fetch shared trip error:", err);
        setError("Something went wrong 🏜️");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
           <MapPin className="w-12 h-12 text-slate-300" />
        </div>
        <div className="space-y-2">
           <h2 className="text-2xl font-black text-slate-900 dark:text-white">Adventure Not Found</h2>
           <p className="text-slate-500 font-medium max-w-xs">{error || "This shared link might be invalid or expired."}</p>
        </div>
        <button 
           onClick={() => navigate('/')}
           className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:scale-105 transition-all"
        >
          Explore Bundelkhand
        </button>
      </div>
    );
  }

  const { itinerary } = trip;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans pb-24">
      
      {/* Header Bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
           </div>
           <span className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">Public Itinerary</span>
        </div>
        <button 
           onClick={() => navigate('/ai-planner')}
           className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs hover:scale-105 transition-all shadow-lg"
        >
          Plan Yours ✨
        </button>
      </header>

      <main className="pt-32 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-12"
        >
          {/* Masthead */}
          <div className="hero bg-slate-950 rounded-[48px] p-10 sm:p-20 text-white relative overflow-hidden shadow-3xl shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse" />
            <div className="relative z-10 space-y-8">
               <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/5 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                     {itinerary.days.length} Day Journey
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/10 text-blue-400 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                     Via Shared Link
                  </span>
               </div>
               <h2 className="text-4xl sm:text-7xl font-black tracking-tighter leading-none">{itinerary.tripTitle}</h2>
               <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
                 Discover this verified route curated for an unforgettable Bundelkhand experience.
               </p>
            </div>
          </div>

          {/* Timeline View */}
          <div className="space-y-20 pt-6">
            {itinerary.days.map((day, dIdx) => (
               <div key={dIdx} className="relative pl-10 sm:pl-16">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-slate-200 dark:via-slate-800 to-transparent rounded-full" />
                  <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-blue-600 shadow-xl shadow-blue-500/50" />

                  <div className="space-y-10">
                     <div className="space-y-2">
                        <div className="text-blue-600 text-xs font-black uppercase tracking-[0.3em]">Day {day.dayNumber}</div>
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{day.theme}</h3>
                     </div>

                     <div className="grid grid-cols-1 gap-6">
                        {day.activities.map((act, aIdx) => (
                           <div 
                              key={aIdx}
                              className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all group"
                           >
                              <div className="w-full sm:w-44 h-44 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                                 <img 
                                    src={act.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"} 
                                    alt={act.placeName} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                 />
                              </div>
                              <div className="flex-1 space-y-4">
                                 <div className="flex items-center justify-between">
                                    <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{act.placeName}</h4>
                                    <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                       <Clock className="w-3 h-3" /> {act.timeOfDay}
                                    </div>
                                 </div>
                                 <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                    {act.whyGoHere}
                                 </p>
                                 <div className="flex items-center gap-3">
                                    <span className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-700">
                                       {act.category}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="pt-20 pb-32 text-center space-y-8">
             <TrendingUp className="w-8 h-8 text-blue-600 mx-auto" />
             <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Like what you see?</h3>
                <p className="text-slate-500 font-medium">Plan your own personalized itinerary across Bundelkhand.</p>
             </div>
             <button 
               onClick={() => navigate('/ai-planner')}
               className="px-12 py-5 bg-blue-600 text-white rounded-[24px] font-black text-xl shadow-2xl flex items-center gap-3 mx-auto hover:bg-blue-500 transition-all hover:scale-105"
             >
               Plan Trip Now <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicTripView;
