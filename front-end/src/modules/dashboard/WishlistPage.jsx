import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';
import WishlistButton from '../../shared/component/WishlistButton';
import Breadcrumb from '../../shared/component/Breadcrumb';

const WishlistPage = () => {
  const { t } = useTranslation();
  const { wishlist, removeFromWishlist } = useAuthModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header section with Breadcrumb */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <Breadcrumb />
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {t('wishlist.title')}
              </h1>
              <p className="mt-2 text-gray-500">
                {wishlist.length} {t('wishlist.item')}{wishlist.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            {wishlist.length > 0 && (
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                {t('wishlist.startExploring')} <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <AnimatePresence mode="wait">
          {wishlist.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md mx-auto text-center py-20"
            >
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-orange-600" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('wishlist.title')}</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t('wishlist.emptyMessage')}
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-200 hover:bg-orange-700 hover:scale-[1.02] transition-all transform"
              >
                {t('wishlist.startExploring')}
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 lg:gap-8"
            >
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Link to={item.link || `/product/${item.id}`}>
                      <img
                        src={item.image || 'https://placehold.co/600x750/f9fafb/374151?text=The+Unseen+Bundelkhand'}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </Link>
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white/80 backdrop-blur-md rounded-full p-0.5 shadow-lg">
                        <WishlistButton itemData={item} />
                      </div>
                    </div>
                    {item.category && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-sm">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <Link to={item.link || `/product/${item.id}`}>
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                        {item.name || t('wishlist.item')}
                      </h3>
                    </Link>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Link
                          to={item.link || `/product/${item.id}`}
                          className="text-sm font-bold text-gray-400 hover:text-orange-600 transition-colors flex items-center gap-1"
                        >
                          Visit <ArrowRight size={14} />
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-sm font-bold text-red-300 hover:text-red-500 transition-colors flex items-center gap-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                      <ShoppingBag size={18} className="text-gray-200" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistPage;