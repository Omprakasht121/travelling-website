import { useAuthModal } from "../../context/AuthModalContext";
import { Login } from "./Login";

const LoginModal = ({ onClose, openRegister, onLoginSuccess }) => {
  const { setPendingAction, setShowLogin } = useAuthModal();

  // close popup
 const handleClose = () => {
  setPendingAction(null);
  setShowLogin(false);
  onClose();
};

return (
  <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center">
    <div className="relative bg-white/10 backdrop-blur-lg p-6 rounded-xl">

      <button onClick={handleClose} className="absolute top-2 right-2 text-white">
        ✕
      </button>

      <Login
        openRegister={openRegister}
        onLoginSuccess={onLoginSuccess}
        onClose={handleClose}
      />
    </div>
  </div>
);

};

export default LoginModal;
