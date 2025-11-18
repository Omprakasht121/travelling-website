import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Edit3, Heart, LogOut, Activity, ActivitySquareIcon, ActivityIcon, SquareActivity, Circle, UserCog, BookOpen, Settings, HelpCircle, Mail, Settings2, Edit2, Edit3Icon, Edit, FlashlightIcon, LocateFixed, LocateIcon, MapPin, ShoppingBag, User2Icon } from 'lucide-react';


const UserProfileModal= ({
  isOpen,
  onClose,
  user,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onEditProfileClick,
  onWishlistClick,
  wishlistCount = 0,
}) => {
  // Example user data structure:
  // user = { name: "Aarav Sharma", profilePic: "https://placehold.co/100x100" }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {user ? 'My Profile' : 'Account'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 transition-colors rounded-full p-1"
                aria-label="Close profile panel"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Content */}
            <div className=" p-6 flex flex-col items-center">
              {user ? (
                // --- LOGGED IN VIEW ---
                <>
                  <div className='flex flex-col w-full h-full'>
                    <div className='  w-full h-full flex flex-col justify-center items-center'>
                    <div className="relative w-32 h-32  mb-4 flex items-center justify-center">
                    <img
                      src={user.profilePic || 'https://placehold.co/128x128/E0E0E0/B0B0B0?text=User'}
                      alt={user.name}
                      className=" h-full w-full rounded-full object-cover border-4 border-white shadow-md"
                      onError={(e) => { e.target.src = 'https://placehold.co/128x128/E0E0E0/B0B0B0?text=User'; }}
                    />
                    <button
                      onClick={onEditProfileClick}
                      className="absolute bottom-1 right-1 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-all transform hover:scale-110"
                      aria-label="Edit photo"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                 

                  <h3 className="text-2xl font-bold text-gray-900">Welcome {user.name}</h3>
                  <p className="hidden text-gray-500 mb-8">{user.email || 'No email provided'}</p>
                  </div>
                 <div className='flex flex-col pt-12 gap-4'>
                    <div className='flex justify-between items-center'>
                    <div className='flex gap-1 justify-between'>
                        <SquareActivity/>
                        <p>Account Status</p>
                    </div>
                    <div className='flex gap-1'>
                      <Circle className='bg-green-500 rounded-full border'/>
                      <p>Active</p>
                    </div>

                  </div>
                  <button
                    onClick={onWishlistClick}
                    className="w-full flex items-center justify-between  bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="text-red-500" />
                      <span className="font-medium text-gray-700">My Wishlist</span>
                    </div>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {wishlistCount}
                    </span>
                  </button>
                  
                   {/* TOP section  */}
                   <ul className='font-semibold border-t border-gray-500/80 pt-2'>
                    SERVICES
                    <li className='px-4 flex gap-4 p-2'>
                      <MapPin className="text-gray-500" /> Destinations
                    </li>
                    <li className='px-4 flex gap-4 '>
                      <ShoppingBag className="text-gray-500" /> Shops & Mall
                    </li>
                    <li className='px-4 flex gap-4 py-2'>
                      <User2Icon className="text-gray-500" /> Creators
                    </li>
                   </ul> 
                   {/* Personalize Section */}
                   <ul className='font-semibold border-t border-gray-500/80 pt-2'>
                    PERSONALIZE
                    <li className='px-4 flex gap-4 p-2'>
                      <UserCog className="text-gray-500" /> Personal Details
                    </li>
                    <li className='px-4 flex gap-4 '>
                      <Settings className="text-gray-500" /> Setting
                    </li>
                    <li className='px-4 flex gap-4 py-2'>
                      <Edit className="text-gray-500" />Change Password
                    </li>
                   </ul>

                   {/* help section  */}
                   <ul className='hidden font-semibold border-t border-gray-500/80 pt-2'>
                    NEED HELP ?
                    <li className='px-4 flex gap-4 p-2'>
                      <BookOpen className="text-gray-500" /> Tips & Tricks
                    </li>
                    <li className='px-4 flex gap-4 '>
                      <HelpCircle className="text-gray-500" /> Frequently Asked Questions
                    </li>
                    <li className='px-4 flex gap-4 py-2'>
                      <Mail className="text-gray-500" /> Contact Us
                    </li>
                   </ul>
                 </div>
                  </div>
                </>
              ) : (
                // --- LOGGED OUT VIEW ---
                <>
                  <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-md mb-4">
                    <User size={64} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome!</h3>
                  <p className="text-gray-500 text-center mb-8">
                    Sign in or create an account to save your favorites.
                  </p>

                  <button
                    onClick={onLoginClick}
                    className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all transform hover:scale-105 mb-4"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onRegisterClick}
                    className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-gray-900 transition-all transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Footer (Logout Button) */}
            {user && (
              <div className=" border-t border-gray-200">
                <button
                  onClick={onLogoutClick}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-red-600 font-medium rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
            <div className=" absolute bottom-0 border-t border-gray-700 pt-2 mb-2 text-center w-full text-sm text-gray-900">
          © Copyright by <span className="text-gray-900">OMM</span>
        </div>
          </motion.div>
        </>
      )}
      
    </AnimatePresence>
  );
};

export default UserProfileModal;