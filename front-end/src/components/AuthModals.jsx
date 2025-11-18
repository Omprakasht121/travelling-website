import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../context/AuthModalContext";
import LoginModal from "../user/pages/LoginModal";
import RegisterModal from "../user/pages/RegisterModal";
import { useEffect } from "react";

const AuthModals = () => {
  const {
    showLogin,
    setShowLogin,

    showRegister,
    setShowRegister,

    pendingAction,
    setPendingAction,
  } = useAuthModal();

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("AuthModals - showLogin:", showLogin, "showRegister:", showRegister, "pendingAction:", pendingAction);
  // }, [showLogin, showRegister, pendingAction]);
  // // inside AuthModals component body, near the top
 
  // universal login success
  const handleSuccess = () => {
    setShowLogin(false);
    setShowRegister(false);

    if (typeof pendingAction === "function") {
      pendingAction();             // → opens creator modal
    } 
    else if (typeof pendingAction === "string") {
      navigate(pendingAction);     // → navigate to that page
    }

    setPendingAction(null);
  };
 

  return (
    <>
      {showLogin && (
        <LoginModal
  onClose={() => {
    setPendingAction(null);   // IMPORTANT
    setShowLogin(false);
  }}
  openRegister={() => {
    setPendingAction(null);   // also clear when switching
    setShowLogin(false);
    setShowRegister(true);
  }}
  onLoginSuccess={handleSuccess}
/>

      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          openLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onLoginSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default AuthModals;
