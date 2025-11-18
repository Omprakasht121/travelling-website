import React from "react";
import {Register} from "./Register";

const RegisterModal = ({ onClose, openLogin, onLoginSuccess }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div className="relative rounded-xl shadow-xl">

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {/* PASS CALLBACK PROPERLY */}
        <Register
          openLogin={openLogin}
          onLoginSuccess={onLoginSuccess}
        />
      </div>
    </div>
  );
};

export default RegisterModal;
