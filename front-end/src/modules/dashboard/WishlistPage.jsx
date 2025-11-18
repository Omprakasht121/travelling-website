import React from 'react';
 // Adjust path as needed
import { Link } from 'react-router-dom';
import { useAuthModal } from '../../context/AuthModalContext';
import WishlistButton from '../../shared/component/WishlistButton';
 // Adjust path as needed

const WishlistPage = () => {
  // Get the wishlist array directly from our context
  const { wishlist } = useAuthModal();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
        <p className="text-gray-500">You haven't added any items to your wishlist yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* Map over the wishlist array */}
        {wishlist.map((item) => (
          <div key={item.id} className="border rounded-lg shadow-lg overflow-hidden">

            <Link to={item.link || `/product/${item.id}`}>
              <img 
                src={item.image || 'https://placehold.co/300x300'} 
                alt={item.name}
                className="w-full h-64 object-cover" 
              />
            </Link>

            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{item.name || 'Item'}</h3>
                {/* You could add a price here if you saved it in itemData */}
              </div>

              {/* You can re-use the same button to remove items! */}
              <WishlistButton itemData={item} />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;