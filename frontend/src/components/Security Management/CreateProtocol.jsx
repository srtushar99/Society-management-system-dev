import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import "react-datepicker/dist/react-datepicker.css"; 
import moment from 'moment';
import axiosInstance from '../Common/axiosInstance';

const CreateProtocol = ({ isOpen, onClose, fetchSecurityProtocols }) => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  

  // Regular expressions for validation
  const titleRegex = /^[A-Za-z\s]+$/;
  const descriptionRegex = /^[A-Za-z\s]+$/;

  // Check if all fields are filled and valid
  const isFormValid =
    Title &&
    Description &&
    titleRegex.test(Title) &&
    descriptionRegex.test(Description);


    const ClearAllData = () => {
      setTitle("");
      setDescription("");
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const Date = moment().format('YYYY-MM-DD');
      const Time = moment().format('hh:mm A');
      const securityprotocolData = {
        Title,
        Description,
        Date,
        Time
      };

      try {
        // Send data to the backend API using axios
        const response = await axiosInstance.post(
          "/v2/securityprotocol/addsecurityprotocol",
          securityprotocolData
        );
        if (response.status===201) {
          console.log("Successfully saved:", response.data);
          fetchSecurityProtocols();
          onClose(); 
          ClearAllData();
        } else {
          const errorData = await response.json();
          console.error("Error saving number:", errorData.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error creating announcement:", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/securityprotocol");
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Security Protocol</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose} // Close modal and redirect to dashboard
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              value={Title}
              onChange={(e) => {
                const value = e.target.value;
             
                if (titleRegex.test(value) || value === "") {
                  setTitle(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              type="text"
              placeholder="Enter description"
              value={Description}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only alphabetic input for description
                if (descriptionRegex.test(value) || value === "") {
                  setDescription(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] h-20 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              className="w-full sm:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={handleClose} // Close modal and redirect to dashboard
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

export default CreateProtocol;
