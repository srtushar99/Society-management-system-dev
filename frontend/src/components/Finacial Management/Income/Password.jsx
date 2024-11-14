import React, { useState } from "react";
import AddMaintenance from "./AddMaintenance";
import { useNavigate } from "react-router-dom";

const Password = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAddMaintenanceOpen, setIsAddMaintenanceOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Track password visibility
  const navigate = useNavigate(); // Navigate hook

  const correctPassword = "a"; // Replace with actual logic

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const isFormValid = password.length > 0;

  const handleSubmit = () => {
    if (!password) {
      setErrorMessage("Password is required.");
    } else if (password !== correctPassword) {
      setErrorMessage("Incorrect password.");
      setPassword("");
    } else {
      setErrorMessage(null);
      setIsAddMaintenanceOpen(true);
    }
  };

  const handleClose = () => {
    if (onClose) onClose(); // Close the modal
    navigate("/Income"); // Redirect to the Income page
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle the password visibility
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
        <div className="absolute w-[410px] h-[251px] bg-white p-6 gap-4 rounded-[15px_15px_15px_15px] opacity-100 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Set Maintenance Password</h2>

          <div className="flex flex-col mt-4">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md mt-2">
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"} // Toggle between 'password' and 'text' types
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/* Eye-slash icon to toggle password visibility */}
              <i
                className={`fa-solid fa-eye-slash text-gray-400 mx-3 cursor-pointer ${isPasswordVisible ? 'text-blue-500' : ''}`}
                onClick={togglePasswordVisibility} // Toggle the password visibility when clicked
              ></i>
            </div>
          </div>

          {errorMessage && <p className="text-sm text-red-500 mt-2">{errorMessage}</p>}

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleClose} // Call handleClose to both close the modal and redirect
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${isFormValid
                ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                : "bg-[#F6F8FB] text-[#202224]"} `}
              disabled={!isFormValid}
            >
              Continue
            </button>
          </div>
        </div>

        {isAddMaintenanceOpen && (
          <AddMaintenance isOpen={isAddMaintenanceOpen} onClose={() => setIsAddMaintenanceOpen(false)} />
        )}
      </div>
    )
  );
};

export default Password;
