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
    // userData,      // <-- We should check userId instead
    userId,         // <-- Get the userId
    isAuthReady,    // <-- Get auth readiness
    requestAuth,    // To ask for login
    wishlist,       // The array of wishlist items
    addToWishlist,
    removeFromWishlist
  } = useAuthModal();

  // Check if the item is in the wishlist
  const isLiked = React.useMemo(() => {
    if (!itemData?.id) return false;
    return wishlist.some(item => item.id === itemData.id);
  }, [wishlist, itemData]);

  const handleLike = (e) => {
    e.preventDefault(); // Prevent parent link navigation
    e.stopPropagation();

    if (!itemData?.id) {
        console.error("WishlistButton: No itemData.id provided.");
        return;
    }

    // 1. Check if auth is ready and we have a userId
    //    We check !userId instead of !userData to allow anonymous likes
    if (!isAuthReady || !userId) {
      console.log("WishlistButton: No userId, requesting auth.");
      requestAuth(null); // Open login modal
      return;
    }

    // 2. Add or remove from wishlist
    if (isLiked) {
      removeFromWishlist(itemData.id);
    } else {
      addToWishlist(itemData);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleLike}
      className="relative p-2 rounded-full transition-colors"
      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`h-6 w-6 transition-colors duration-300 ${
          isLiked
            ? "fill-red-500 text-red-500"
            : "text-slate-300"
        }`}
      />
    </motion.button>
  );
};

export default WishlistButton;