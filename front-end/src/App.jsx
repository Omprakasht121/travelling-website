import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./shared/routes/AppRoutes";

import { AuthModalProvider } from "./context/AuthModalContext";
import AuthModals from "./components/AuthModals"; 

function App() {
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
