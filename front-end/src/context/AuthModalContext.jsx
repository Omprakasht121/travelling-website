import { createContext, useContext, useState, useEffect } from "react";
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

  // --- Wishlist State ---
  const [wishlist, setWishlist] = useState([]);

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

  // --- Centralized login function ---
  const login = (data) => {
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
  };

  // --- Centralized logout function ---
  const logout = async () => {
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
  };

  // --- Wishlist Actions ---
  const addToWishlist = async (itemData) => {
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
  };

  const removeFromWishlist = async (itemId) => {
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
  };

  // --- Modal request functions ---
  const requestAuth = (action) => {
    setPendingAction(() => action);
    setShowLogin(true);
  };
  const requestRegisterAuth = (action) => {
    setPendingAction(() => action);
    setShowRegister(true);
  };

  return (
    <AuthModalContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);