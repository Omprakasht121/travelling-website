import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  User, X, Edit3, Heart, LogOut, SquareActivity, Circle, 
  UserCog, Settings, Edit, MapPin, ShoppingBag, User2Icon, 
  ChevronLeft, Loader2, CheckCircle2, AlertCircle 
} from 'lucide-react';

const UserProfileModal = ({
  isOpen,
  onClose,
  user,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  onEditProfileClick, // this can now be used to trigger internal view
  onWishlistClick,
  wishlistCount = 0,
}) => {
  const { t } = useTranslation();
  const [view, setView] = useState('main'); // main, details, password
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  // Form States
  const [profileData, setProfileData] = useState({ name: user?.name || '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  const resetStatus = () => setStatus({ type: '', text: '' });

  const handleBack = () => {
    setView('main');
    resetStatus();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetStatus();

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({ name: profileData.name })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || t('user.updateError'));

      setStatus({ type: 'success', text: t('user.updateSuccess') });
      // Update local storage/user state if needed, here we just show success
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setStatus({ type: 'error', text: t('user.passwordMismatch') });
      return;
    }

    setLoading(true);
    resetStatus();

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || t('user.updateError'));

      setStatus({ type: 'success', text: t('user.updateSuccess') });
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = () => {
    if (!status.text) return null;
    return (
      <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 text-sm ${
        status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
        {status.text}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setView('main'); onClose(); }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {view !== 'main' && (
                  <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                )}
                <h2 className="text-xl font-semibold text-gray-800">
                  {view === 'details' ? t('user.personalDetails') : 
                   view === 'password' ? t('user.changePassword') : 
                   user ? t('user.myProfile') : t('user.welcome')}
                </h2>
              </div>
              <button onClick={() => { setView('main'); onClose(); }} className="text-gray-500 hover:text-gray-800 transition-colors rounded-full p-1">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {user ? (
                <AnimatePresence mode="wait">
                  {view === 'main' && (
                    <motion.div
                      key="main"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="flex flex-col items-center mb-8">
                        <div className="relative w-32 h-32 mb-4">
                          <img
                            src={user.profilePic || 'https://placehold.co/128x128/E0E0E0/B0B0B0?text=User'}
                            alt={user.name}
                            className="h-full w-full rounded-full object-cover border-4 border-white shadow-md"
                          />
                          <button
                            onClick={() => setView('details')}
                            className="absolute bottom-1 right-1 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-all transform hover:scale-110"
                          >
                            <Edit3 size={16} />
                          </button>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{t('user.welcome')} {user.name}</h3>
                      </div>

                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-sm font-medium">
                          <div className="flex gap-2 items-center">
                            <SquareActivity size={18} className="text-gray-600" />
                            <span>{t('user.status')}</span>
                          </div>
                          <div className="flex gap-1.5 items-center">
                            <Circle size={10} fill="#22c55e" className="text-green-500" />
                            <span className="text-green-600">{t('user.active')}</span>
                          </div>
                        </div>

                        <button
                          onClick={onWishlistClick}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <Heart className="text-red-500" size={20} />
                            <span className="font-semibold text-gray-700">{t('user.myWishlist')}</span>
                          </div>
                          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                            {wishlistCount}
                          </span>
                        </button>

                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('user.services')}</p>
                            <ul className="space-y-1">
                              <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                <MapPin size={18} className="text-gray-400" /> Destinations
                              </li>
                              <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                <ShoppingBag size={18} className="text-gray-400" /> Shops & Mall
                              </li>
                              <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                <User2Icon size={18} className="text-gray-400" /> Creators
                              </li>
                            </ul>
                          </div>

                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('user.personalize')}</p>
                            <ul className="space-y-1">
                              <li onClick={() => setView('details')} className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                <UserCog size={18} className="text-gray-400" /> {t('user.personalDetails')}
                              </li>
                              <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                <Settings size={18} className="text-gray-400" /> {t('user.settings')}
                              </li>
                              <li onClick={() => setView('password')} className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                <Edit size={18} className="text-gray-400" /> {t('user.changePassword')}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {view === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {renderStatus()}
                      <form onSubmit={handleUpdateProfile} className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">{t('user.name')}</label>
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">{t('user.email')}</label>
                          <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-orange-700 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                        >
                          {loading && <Loader2 size={18} className="animate-spin" />}
                          {t('user.update')}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {view === 'password' && (
                    <motion.div
                      key="password"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {renderStatus()}
                      <form onSubmit={handleChangePassword} className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">{t('user.currentPassword')}</label>
                          <input
                            type="password"
                            value={passwordData.oldPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">{t('user.newPassword')}</label>
                          <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">{t('user.confirmPassword')}</label>
                          <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-black disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                        >
                          {loading && <Loader2 size={18} className="animate-spin" />}
                          {t('user.changePassword')}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-md mb-6">
                    <User size={64} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{t('user.welcome')}!</h3>
                  <p className="text-gray-500 text-center mb-8">
                    Sign in or create an account to save your favorites.
                  </p>
                  <div className="w-full space-y-4">
                    <button onClick={onLoginClick} className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-orange-700 transition-all transform hover:scale-[1.02]">
                      Sign In
                    </button>
                    <button onClick={onRegisterClick} className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-black transition-all transform hover:scale-[1.02]">
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
            </div>

            {user && view === 'main' && (
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={onLogoutClick}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-100 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogOut size={18} />
                  <span>{t('user.logout')}</span>
                </button>
              </div>
            )}
            
            <div className="py-4 text-center text-xs text-gray-400">
              © Copyright by <span className="font-semibold text-gray-600">OMM</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


export default UserProfileModal;