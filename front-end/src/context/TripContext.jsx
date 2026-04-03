import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getTrips, createTrip, getTrip, addLocationToTrip } from "../shared/services/api-client";
import { useAuthModal } from "./AuthModalContext";

const TripContext = createContext();

export const useTripContext = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const { userData } = useAuthModal(); // using Auth modal to determine if logged in
  const [trips, setTrips] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch trips when user logs in
  useEffect(() => {
    if (userData) {
      fetchUserTrips();
    } else {
      setTrips([]);
      setActiveTrip(null);
    }
  }, [userData]);

  const fetchUserTrips = async () => {
    try {
      setLoading(true);
      const data = await getTrips();
      setTrips(data);
      if (data.length > 0 && !activeTrip) {
        setActiveTrip(data[0]); // default active trip
      }
    } catch (err) {
      console.error("Failed to fetch trips", err);
    } finally {
      setLoading(false);
    }
  };

  const createNewTrip = async (title) => {
    try {
      setLoading(true);
      const newTrip = await createTrip({ title });
      setTrips([newTrip, ...trips]);
      setActiveTrip(newTrip);
      toast.success("Trip created!");
      return newTrip;
    } catch (err) {
      toast.error("Failed to create trip");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const selectActiveTrip = async (tripId) => {
    try {
      setLoading(true);
      const fullTrip = await getTrip(tripId);
      setActiveTrip(fullTrip);
    } catch (err) {
      toast.error("Failed to load trip details");
    } finally {
      setLoading(false);
    }
  };

  const addLocation = async (tripId, contentId, category, dayNumber) => {
    try {
      const updatedTrip = await addLocationToTrip(tripId, contentId, category, dayNumber);
      
      // Update trips list
      setTrips(trips.map(t => t._id === tripId ? { ...t, days: updatedTrip.days } : t));
      
      // Update active trip
      if (activeTrip && activeTrip._id === tripId) {
        setActiveTrip(updatedTrip);
      }
      
      toast.success("Added to itinerary!");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Failed to add location");
      }
    }
  };

  return (
    <TripContext.Provider value={{
      trips,
      activeTrip,
      loading,
      fetchUserTrips,
      createNewTrip,
      selectActiveTrip,
      addLocation,
      setActiveTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};
