import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTripContext } from "../../context/TripContext";
import { useAuthModal } from "../../context/AuthModalContext";

export default function AddToTripModal({ isOpen, onClose, contentItem, category }) {
  const { userData, requestAuth } = useAuthModal();
  const { trips, activeTrip, addLocation, createNewTrip } = useTripContext();
  const [selectedTrip, setSelectedTrip] = useState(activeTrip?._id || trips[0]?._id);
  const [dayNumber, setDayNumber] = useState(1);
  const [newTripTitle, setNewTripTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async () => {
    if (!userData) {
      onClose();
      requestAuth(() => {}); // request login then do nothing
      return;
    }

    let tripIdToUse = selectedTrip || (trips.length > 0 ? trips[0]._id : null);

    // Create a new trip if needed
    if (isCreating && newTripTitle.trim()) {
      const trip = await createNewTrip(newTripTitle);
      tripIdToUse = trip._id;
    }

    if (!tripIdToUse) return;

    await addLocation(tripIdToUse, contentItem._id, category, parseInt(dayNumber));
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <Calendar className="text-orange-600" />
              Add to Trip
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition bg-gray-100 dark:bg-gray-800 rounded-full p-2"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Displaying Item Context */}
            <div className="flex gap-4 items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
              <img 
                src={contentItem.mainImage?.url} 
                alt={contentItem.title} 
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm line-clamp-1">{contentItem.title}</h3>
                <p className="text-xs text-gray-500 capitalize">{category}</p>
              </div>
            </div>

            {trips.length > 0 && !isCreating ? (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Select Trip</label>
                <select
                  value={selectedTrip}
                  onChange={(e) => setSelectedTrip(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500 font-medium text-gray-800 dark:text-gray-200 outline-none"
                >
                  {trips.map(t => (
                    <option key={t._id} value={t._id}>{t.title}</option>
                  ))}
                </select>
                <button
                  onClick={() => setIsCreating(true)}
                  className="text-orange-600 font-semibold text-xs mt-1 hover:underline"
                >
                  + Or create a new trip
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">New Trip Name</label>
                <input
                  type="text"
                  placeholder="e.g. Weekend in Orchha"
                  value={newTripTitle}
                  onChange={(e) => setNewTripTitle(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none text-gray-800 dark:text-gray-200 font-medium"
                />
                {trips.length > 0 && (
                  <button
                    onClick={() => setIsCreating(false)}
                    className="text-gray-500 font-semibold text-xs mt-1 hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Day of Trip</label>
              <select
                value={dayNumber}
                onChange={(e) => setDayNumber(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none font-medium text-gray-800 dark:text-gray-200"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <option key={num} value={num}>Day {num}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAdd}
              disabled={isCreating && !newTripTitle.trim()}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold py-3.5 rounded-full shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
            >
              Add to Itinerary
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
