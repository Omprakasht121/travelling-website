import React from 'react';
import { motion } from 'framer-motion';

/**
 * A premium, full-screen loading state for Route Transitions.
 * Uses Framer Motion for smooth animations.
 */
const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Branded Logo/Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="mb-8"
      >
        <div className="h-20 w-20 rounded-2xl bg-orange-600 flex items-center justify-center shadow-2xl shadow-orange-200">
             <span className="text-3xl font-black text-white italic">UB</span>
        </div>
      </motion.div>

      {/* Modern Progress Line */}
      <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ left: '-100%' }}
          animate={{ left: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-orange-600 w-1/2 rounded-full shadow-[0_0_10px_rgba(234,88,12,0.5)]"
        />
      </div>

      {/* Subtle Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
      >
        Exploring the Bundelkhand...
      </motion.p>
    </div>
  );
};

export default PageLoader;
