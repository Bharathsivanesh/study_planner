// src/components/AuthButton.js
import React from "react";

const AuthButton = ({ label, onClick, type = "submit" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition duration-300"
    >
      {label}
    </button>
  );
};

export default AuthButton;
