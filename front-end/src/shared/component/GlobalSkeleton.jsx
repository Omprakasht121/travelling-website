import React from 'react';
import { motion } from 'framer-motion';

/**
 * PRODUCTION-GRADE SKELETON:
 * Mimics the shell of your application (header + content area).
 * Uses a 'shimmer' effect to trick the user's perception of speed.
 */
const GlobalSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Animated Shimmer Overlay */}
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
      />

      {/* Mock Header / Breadcrumb Space */}
      <div className="h-20 bg-white border-b border-slate-200 px-6 sm:px-24 flex items-center">
         <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 sm:px-24 py-12">
        {/* Mock Hero / Title */}
        <div className="h-12 w-[60%] bg-slate-200 rounded-xl mb-6 animate-pulse" />
        <div className="h-6 w-[40%] bg-slate-200/60 rounded-lg mb-12 animate-pulse" />

        {/* Grid of Mock Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
                <div className="aspect-[4/5] bg-slate-200 rounded-2xl mb-4 animate-pulse" />
                <div className="h-5 w-[80%] bg-slate-200 rounded-md mb-2 animate-pulse" />
                <div className="h-4 w-[40%] bg-slate-200/60 rounded-md animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalSkeleton;
