import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const AddNumber = ({ isOpen, onClose }) => {
  // State for the input fields
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [work, setWork] = useState("");

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces
  const phoneRegex = /^[6789]\d{9}$/; // Starts with 6, 7, 8, or 9 and followed by 9 digits
  const workRegex = /^[A-Za-z\s]+$/; 

  // Check if all fields are filled and valid
  const isFormValid =
    fullName &&
    phoneNumber &&
    work &&
    nameRegex.test(fullName) &&
    phoneRegex.test(phoneNumber) &&
    workRegex.test(work);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Perform save action here
      console.log("Form Submitted", { fullName, phoneNumber, work });
    }
  };

  // Handle phone number change and ensure first digit is 6, 7, 8, or 9
  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      if (value.length === 1 && !["6", "7", "8", "9"].includes(value)) {
        return; // If the first digit is not 6, 7, 8, or 9, prevent the input
      }
      if (value.length <= 10) {
        setPhoneNumber(value); // Allow up to 10 digits
      }
    }
  };

  // Initialize navigate for redirection
  const navigate = useNavigate();

  // Handle closing the modal and redirecting to the dashboard
  const handleClose = () => {
    onClose(); // Close the modal
    navigate("/dashboard"); // Redirect to the dashboard
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">
            {isFormValid ? "Add Number" : "Add Important Number"}
          </span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose} // Close modal and redirect to dashboard
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => {
                const value = e.target.value;
                // Prevent non-alphabetical input
                if (nameRegex.test(value) || value === "") {
                  setFullName(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-500">
                +91
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg text-[#202224]"
                maxLength={10} // Limit input to 10 characters
              />
            </div>
          </div>

          {/* Work */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Work<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Work"
              value={work}
              onChange={(e) => {
                const value = e.target.value;
                // Prevent non-alphabetical input
                if (workRegex.test(value) || value === "") {
                  setWork(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              type="button"
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={handleClose} // Close modal and redirect to dashboard
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]" // Apply gradient if form is valid
                  : "bg-[#F6F8FB] text-[#202224]" // Default color if form is not valid
              }`}
              disabled={!isFormValid} // Disable the button if form is not valid
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNumber;
