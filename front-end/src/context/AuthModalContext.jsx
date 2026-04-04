import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  collection, 
  onSnapshot,
  setDoc,
  deleteDoc
} from "firebase/firestore";

// --- FIREBASE CONFIG FROM ENVIRONMENT VARIABLES ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// --- INITIALIZE FIREBASE AT TOP LEVEL (STABLE) ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  // Modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // --- UserData from localStorage (initial load) ---
  const [userData, setUserData] = useState(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      return {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        profilePic: localStorage.getItem("profilePic"),
      };
    }
    return null;
  });

  // --- Wishlist & Trips State ---
  const [wishlist, setWishlist] = useState([]);
  const [myTrips, setMyTrips] = useState([]);

  // --- Firebase UID & Readiness ---
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // --- Derive a Stable ID (Use email if logged in, fallback to userId) ---
  const stableWishlistId = userData?.email 
    ? userData.email.replace(/\./g, '_') // Sanitize email for path (no dots)
    : userId;

  // --- EFFECT 1: Handle Firebase Authentication ---
  useEffect(() => {
    console.log("AuthModalContext: Starting Auth Listener");
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Firebase ID Confirmed:", user.uid);
        setUserId(user.uid);
        setIsAuthReady(true);
      } else {
        console.log("No Firebase session, attempting silent anonymous login...");
        setUserId(null);
        setIsAuthReady(false);
        // This will trigger another onAuthStateChanged when finished
        signInAnonymously(auth).catch(err => {
           console.error("CRITICAL: Check Firebase Console > Authentication > Sign-in method > Anonymous (MUST BE ENABLED):", err);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // --- EFFECT 2: Sync Wishlist with Firestore ---
  useEffect(() => {
    // Only fetch if database and ID are ready
    if (!isAuthReady || !stableWishlistId) {
      setWishlist([]); 
      return;
    }

    // --- PERMANENT PATH: Keyed by user email or ID ---
    const wishlistColPath = `wishlist/${stableWishlistId}/items`;
    console.log("Wishlist: Monitoring path:", wishlistColPath);
    const wishlistColRef = collection(db, wishlistColPath);

    const unsubscribe = onSnapshot(wishlistColRef, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      console.log("Wishlist: Sync complete (", items.length, " items)");
      setWishlist(items);
    }, (error) => {
        console.error("Wishlist sync error:", error);
    });

    return () => unsubscribe();
  }, [stableWishlistId, isAuthReady]);

  // --- EFFECT 3: Sync Trips with Firestore ---
  useEffect(() => {
    if (!isAuthReady || !stableWishlistId) {
      setMyTrips([]); 
      return;
    }

    const tripsColPath = `trips/${stableWishlistId}/items`;
    console.log("Trips: Monitoring path:", tripsColPath);
    const tripsColRef = collection(db, tripsColPath);

    const unsubscribe = onSnapshot(tripsColRef, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      // Sort by creation date descending
      items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log("Trips: Sync complete (", items.length, " items)");
      setMyTrips(items);
    }, (error) => {
        console.error("Trips sync error:", error);
    });

    return () => unsubscribe();
  }, [stableWishlistId, isAuthReady]);

  // --- Centralized login function ---
  const login = useCallback((data) => {
    localStorage.setItem("userToken", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("name", data.name);
    localStorage.setItem("profilePic", data.profilePic);

    const newUserData = {
      name: data.name,
      email: data.email,
      profilePic: data.profilePic,
    };
    setUserData(newUserData);
    toast.success(`Welcome, ${data.name || "User"}! 🎉`);
  }, []);

  // --- Centralized logout function ---
  const logout = useCallback(async () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    setUserData(null);
    toast("Logged out", { icon: "👋" });
    
    try {
      await signOut(auth);
      // Firebase onAuthStateChanged will handle the anonymous re-sign-in automatically
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  // --- Wishlist Actions ---
  const addToWishlist = useCallback(async (itemData) => {
    if (!stableWishlistId) return console.warn("Cannot add: No stable ID");
    
    // --- PERMANENT PATH: Keyed by user email or ID ---
    const docPath = `wishlist/${stableWishlistId}/items/${itemData.id}`;
    const docRef = doc(db, docPath);
    
    try {
      await setDoc(docRef, itemData);
      toast.success("Saved to Wishlist!");
    } catch (e) {
      console.error("Error adding to wishlist: ", e);
      toast.error("Failed to save.");
    }
  }, [stableWishlistId]);

  const removeFromWishlist = useCallback(async (itemId) => {
    if (!stableWishlistId) return console.warn("Cannot remove: No stable ID");
    
    // --- PERMANENT PATH: Keyed by user email or ID ---
    const docPath = `wishlist/${stableWishlistId}/items/${itemId}`;
    const docRef = doc(db, docPath);
    
    try {
      await deleteDoc(docRef);
      toast("Removed from wishlist", { icon: "💔" });
    } catch (e) {
      console.error("Error removing from wishlist: ", e);
    }
  }, [stableWishlistId]);

  // --- Trip Saving ---
  const addTripToFirebase = useCallback(async (tripData) => {
    if (!stableWishlistId) {
      toast.error("Please login to save your trip.");
      return;
    }

    const tripId = `trip_${Date.now()}`;
    const docPath = `trips/${stableWishlistId}/items/${tripId}`;
    const docRef = doc(db, docPath);

    try {
      await setDoc(docRef, {
        ...tripData,
        id: tripId,
        userId: stableWishlistId,
        createdAt: new Date().toISOString()
      });
      toast.success("Trip saved successfully! 🗺️");
      return true;
    } catch (e) {
      console.error("Error saving trip: ", e);
      toast.error("Failed to save trip.");
      return false;
    }
  }, [stableWishlistId]);

  const deleteTripFromFirebase = useCallback(async (tripId) => {
    if (!stableWishlistId) return;
    
    const docPath = `trips/${stableWishlistId}/items/${tripId}`;
    const docRef = doc(db, docPath);
    
    try {
      await deleteDoc(docRef);
      toast("Trip deleted", { icon: "🗑️" });
    } catch (e) {
      console.error("Error deleting trip: ", e);
      toast.error("Failed to delete trip.");
    }
  }, [stableWishlistId]);

  // --- Public Sharing ---
  const createSharedTrip = useCallback(async (tripData) => {
    const shareId = `share_${Math.random().toString(36).substr(2, 9)}`;
    const docRef = doc(db, "shared_trips", shareId);

    try {
      await setDoc(docRef, {
        ...tripData,
        shareId,
        sharedAt: new Date().toISOString(),
        isPublic: true
      });
      return shareId;
    } catch (e) {
      console.error("Error creating shared trip: ", e);
      toast.error("Failed to generate share link.");
      return null;
    }
  }, []);

  // --- Modal request functions ---
  const requestAuth = useCallback((action) => {
    setPendingAction(() => action);
    setShowLogin(true);
  }, []);

  const requestRegisterAuth = useCallback((action) => {
    setPendingAction(() => action);
    setShowRegister(true);
  }, []);

  // --- MEMOIZED CONTEXT VALUE: Production Performance Fix ---
  const contextValue = useMemo(() => ({
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    pendingAction,
    setPendingAction,
    requestAuth,
    requestRegisterAuth,
    
    userData,
    isAuthReady,
    userId,
    login,
    logout,

    wishlist,
    addToWishlist,
    removeFromWishlist,
    myTrips,
    addTripToFirebase,
    deleteTripFromFirebase,
    createSharedTrip,
  }), [
    showLogin, 
    showRegister, 
    pendingAction, 
    requestAuth, 
    requestRegisterAuth, 
    userData, 
    isAuthReady, 
    userId, 
    login, 
    logout, 
    wishlist, 
    addToWishlist, 
    removeFromWishlist,
    myTrips,
    addTripToFirebase,
    deleteTripFromFirebase,
    createSharedTrip,
  ]);

  return (
    <AuthModalContext.Provider value={contextValue}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);