import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInAnonymously, 
  // signInWithCustomToken, // No longer needed
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

// --- YOUR FIREBASE CONFIG ---
// This is your personal project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmNPJF784xl3Kfhgw71q6d-kIlbl1ZkIs",
  authDomain: "travelling-website-b44c6.firebaseapp.com",
  projectId: "travelling-website-b44c6",
  storageBucket: "travelling-website-b44c6.firebasestorage.app",
  messagingSenderId: "535758912126",
  appId: "1:535758912126:web:6a343678bfbe328a01b62f",
  measurementId: "G-VP4C0X5SL4"
};
// Note: We are no longer using the global __app_id or __initial_auth_token

// Initialize Firebase
// const app = initializeApp(firebaseConfig); // <-- Moved this inside useEffect
// const analytics = getAnalytics(app); // <-- Analytics not used in this file


const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  // Modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // --- Firebase & Auth State ---
  // const [app, setApp] = useState(null); // Not strictly needed in state
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // --- Wishlist State ---
  const [wishlist, setWishlist] = useState([]);

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

  // --- EFFECT 1: Initialize Firebase & Auth ---
  useEffect(() => {
    if (!firebaseConfig.apiKey) {
      console.error("Firebase config is missing!");
      return;
    }
    
    // Initialize Firebase inside useEffect
    const appInstance = initializeApp(firebaseConfig);
    const authInstance = getAuth(appInstance);
    const dbInstance = getFirestore(appInstance);
    
    // setApp(appInstance); // <-- Not needed unless passed in context
    setAuth(authInstance);
    setDb(dbInstance);

    // Sign in anonymously
    const authCheck = async () => {
      try {
        // We removed the __initial_auth_token logic
        // We will *only* sign in anonymously for this context
        await signInAnonymously(authInstance);
        console.log("Signed in anonymously");
      } catch (error) {
        console.error("Firebase anonymous sign-in error:", error);
        // THIS IS THE MOST LIKELY ERROR NOW - see my note below
      }
    };

    authCheck();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        console.log("Auth state changed, user ID:", user.uid);
        setUserId(user.uid);
      } else {
        console.log("Auth state changed, user is null");
        setUserId(null); // User is signed out
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []); // Empty dependency array, runs once on mount

  // --- EFFECT 2: Fetch Wishlist on Auth Ready ---
  useEffect(() => {
    // Guard clause: Don't run until DB and User are ready
    if (!isAuthReady || !db || !userId) {
      setWishlist([]); // Clear wishlist if user logs out
      return;
    }

    // --- CHANGED PATH ---
    // Using a standard path for your project, not the platform-specific one
    const wishlistColPath = `users/${userId}/wishlist`;
    console.log("Setting up wishlist listener for path:", wishlistColPath);
    const wishlistColRef = collection(db, wishlistColPath);

    // Set up real-time listener
    const unsubscribe = onSnapshot(wishlistColRef, (snapshot) => {
      const userWishlist = [];
      snapshot.forEach((doc) => {
        userWishlist.push({ id: doc.id, ...doc.data() });
      });
      console.log("Wishlist updated:", userWishlist);
      setWishlist(userWishlist);
    }, (error) => {
        console.error("Error listening to wishlist:", error);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [db, userId, isAuthReady]); // Re-run if any of these change

  // --- Centralized login function ---
  const login = (data) => {
    // data is assumed to be res.data from your API
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
    // Note: onAuthStateChanged will handle setting the userId from Firebase
    // If you are using your own email/password auth, you would
    // call signInWithEmailAndPassword() here and NOT signInAnonymously()
  };

  // --- Centralized logout function ---
  const logout = async () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    setUserData(null);
    if (auth) {
      await signOut(auth); // Sign out from Firebase
      // After signing out, we need to sign back in anonymously
      // to keep a valid userId for non-logged-in users
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error("Firebase anonymous re-sign-in error after logout:", error);
      }
    }
  };

  // --- Wishlist Functions ---
  const addToWishlist = async (itemData) => {
    if (!db || !userId) {
      console.log("Cannot add to wishlist, no DB or UserID");
      return; 
    }
    if (!itemData.id) {
        console.error("Item data must have an 'id' to be added to the wishlist");
        return;
    }
    // --- CHANGED PATH ---
    // We use the item's ID as the document ID for easy lookup
    const docPath = `users/${userId}/wishlist/${itemData.id}`;
    const docRef = doc(db, docPath);
    try {
      await setDoc(docRef, itemData);
      console.log("Added to wishlist:", itemData);
    } catch (e) {
      console.error("Error adding to wishlist: ", e);
    }
  };

  const removeFromWishlist = async (itemId) => {
    if (!db || !userId) {
      console.log("Cannot remove from wishlist, no DB or UserID");
      return;
    }
     // --- CHANGED PATH ---
    const docPath = `users/${userId}/wishlist/${itemId}`;
    const docRef = doc(db, docPath);
    try {
      await deleteDoc(docRef);
      console.log("Removed from wishlist, item ID:", itemId);
    } catch (e) {
      console.error("Error removing from wishlist: ", e);
    }
  };

  // --- Modal request functions ---
  const requestAuth = (action) => {
    setPendingAction(action);
    setShowLogin(true);
  };
  const requestRegisterAuth = (action) => {
    setPendingAction(action);
    setShowRegister(true);
  };

  return (
    <AuthModalContext.Provider
      value={{
        // Auth Modals
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister,
        pendingAction,
        setPendingAction,
        requestAuth,
        requestRegisterAuth,

        // User Data & Auth
        userData,
        isAuthReady,
        userId, // Expose userId if you need it
        login,
        logout,

        // Wishlist
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