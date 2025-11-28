import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./shared/routes/AppRoutes";

import { AuthModalProvider } from "./context/AuthModalContext";
import AuthModals from "./components/AuthModals"; 

// Helper function to check if JWT expired
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};


function App() {

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("token");

    // REMOVE ADMIN TOKEN IF EXPIRED
    if (adminToken && isTokenExpired(adminToken)) {
      localStorage.removeItem("adminToken");
      console.log("Admin session expired");
    }

    // REMOVE USER TOKEN IF EXPIRED
    if (userToken && isTokenExpired(userToken)) {
      localStorage.removeItem("token");
      console.log("User session expired");
    }
  }, []); // runs once when app loads
  return (
    <AuthModalProvider>
      <BrowserRouter>
        <AppRoutes />
        <AuthModals />   {/* Global Modal Renderer */}
      </BrowserRouter>
    </AuthModalProvider>
  );
}

export default App;
