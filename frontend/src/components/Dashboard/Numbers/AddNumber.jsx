import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import axiosInstance from '../../Common/axiosInstance';

const AddNumber = ({ isOpen, onClose, fetchImportantNumbers  }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [work, setWork] = useState("");
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z\s]+$/; 
  const phoneRegex = /^[6789]\d{9}$/; 
  const workRegex = /^[A-Za-z\s]+$/; 

  const isFormValid =
    fullName &&
    phoneNumber &&
    work &&
    nameRegex.test(fullName) &&
    phoneRegex.test(phoneNumber) &&
    workRegex.test(work);

    const handleClose = () => {
      onClose(); 
      navigate("/dashboard"); 
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const createNumberObj = {
        fullName,
        phoneNumber,
        work
      };
      try {
        const response = await fetch("https://society-management-system-dev-16.onrender.com/v2/important-numbers/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createNumberObj),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Successfully saved:", data);
          fetchImportantNumbers(); // Fetch the updated list of contacts
          handleClose(); // Close the modal after successful submission
          // navigate("/dashboard"); 
        } else {
          const errorData = await response.json();
          console.error("Error saving number:", errorData.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Network error:", error);
      }

      // try {
      //   const response = await axiosInstance.post(
      //     "/v2/important-numbers/create", 
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(createNumberObj),
      //     }
      //   );
  
      //   if (response.status === 200) {
      //     console.log("Successfully saved:", response.data);
      //     onClose();
      //     navigate("/dashboard");
      //   } else {
      //     console.error("Error saving number:", response.data.message || "Something went wrong.");
      //   }
      // } catch (error) {
      //   console.error("Network error:", error.response?.data || error.message);
      // }
    }
  };


  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length === 1 && !["6", "7", "8", "9"].includes(value)) {
        return; 
      }
      if (value.length <= 10) {
        setPhoneNumber(value); 
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50  z-50 p-4">
      <div className="bg-white w-full max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">
            {isFormValid ? "Add Number" : "Add Important Number"}
          </span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose} 
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
                if (nameRegex.test(value) || value === "") {
                  setFullName(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

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
                maxLength={10} 
              />
            </div>
          </div>

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
                if (workRegex.test(value) || value === "") {
                  setWork(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              className="w-full sm:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={handleClose} 
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]" 
                  : "bg-[#F6F8FB] text-[#202224]" 
              }`}
              disabled={!isFormValid} 
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
