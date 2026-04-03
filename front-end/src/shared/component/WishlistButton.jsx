import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';
// Corrected the import path. This is a common issue when files are moved.



/**
 * A "Like" button that syncs with the user's Firestore wishlist.
 * @param {object} props
 * @param {object} props.itemData - The item to add/remove. MUST include at least:
 * { id: 'item-123', name: 'Product Name', link: '/product/item-123', image: 'url/to/image.jpg' }
 */
const WishlistButton = ({ itemData }) => {
  const {
    userId,
    userData, // Check site login status
    isAuthReady,
    requestAuth,
    wishlist,
    addToWishlist,
    removeFromWishlist
  } = useAuthModal();

  const [isProcessing, setIsProcessing] = React.useState(false);

  // Check if the item is in the wishlist
  const isLiked = React.useMemo(() => {
    if (!itemData?.id || !wishlist) return false;
    return wishlist.some(item => item.id === itemData.id);
  }, [wishlist, itemData]);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!itemData?.id) {
        console.error("WishlistButton: No itemData.id provided.");
        return;
    }

    if (isProcessing) return; // Prevent double clicks

    // --- LOGIC: Distinguish between 'Site Login' and 'Firebase Ready' ---
    
    // Case 1: User is not logged into the website account.
    if (!userData) {
      requestAuth(() => handleLike(e)); // Show login modal
      return;
    }

    // Case 2: User IS logged in, but Firebase is still connecting.
    if (!isAuthReady || !userId) {
      console.log("Wishlist: Database still initializing, retrying...");
      setIsProcessing(true);
      // Wait a moment and retry silently (don't show modal!)
      setTimeout(() => {
        setIsProcessing(false);
        handleLike(e);
      }, 800);
      return;
    }

    setIsProcessing(true);
    try {
      if (isLiked) {
        await removeFromWishlist(itemData.id);
      } else {
        await addToWishlist(itemData);
      }
    } catch (error) {
      console.error("WishlistButton Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleLike}
      disabled={isProcessing}
      className={`relative p-2 rounded-full transition-all duration-300 ${
        isProcessing ? "opacity-40 animate-pulse pointer-events-none" : "hover:scale-110"
      }`}
      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`h-6 w-6 transition-all duration-300 ${
          isLiked
            ? "fill-red-500 text-red-500"
            : "text-slate-300 group-hover:text-red-400"
        }`}
      />
    </motion.button>
  );
};

export default WishlistButton;