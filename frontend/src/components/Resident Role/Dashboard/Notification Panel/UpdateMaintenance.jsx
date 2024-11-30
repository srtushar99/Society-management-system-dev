import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../Common/axiosInstance";
import "react-datepicker/dist/react-datepicker.css";
import GetPass from "./GetPass"; // Import GetPass component

const UpdateMaintenance = ({ isOpen, onClose, fetchAnnouncement }) => {
  const [selectedMember, setSelectedMember] = useState(""); // State for the selected member
  const [isFormValid, setIsFormValid] = useState(false); // Form validity state
  const [isGetPassOpen, setIsGetPassOpen] = useState(false); // State to control Get Pass modal visibility
  const modalRef = useRef(null);
  const perPersonAmount = 1500; // Fixed per person amount
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  const navigate = useNavigate();

  const handleSelectMember = (e) => {
    const value = e.target.value;
    setSelectedMember(value);
    setIsFormValid(value !== ""); // Form is valid if a member is selected

    // Calculate total if a number is selected
    if (value) {
      setTotalAmount(perPersonAmount * parseInt(value)); // Multiply by number of selected members
    } else {
      setTotalAmount(0); // Reset total if no member is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      const announcementData = {
        selectedMember,
        amount: perPersonAmount, // Adding the fixed amount for each member
        totalAmount, // Send total amount in the request
      };

      try {
        // Send data to the backend API using axios
        const response = await axiosInstance.post(
          "/v2/annoucement/addannouncement", // Example API endpoint
          announcementData
        );
        if (response.status === 201) {
          console.log("Successfully saved:", response.data);
          fetchAnnouncement(); // Refresh the announcements
          onClose(); // Close the modal
        } else {
          console.error("Error saving announcement:", response.data.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error creating announcement:", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsFormValid(false);
    }
  };

  const handleGetPassClick = () => {
    setIsGetPassOpen(true); // Open the Get Pass modal
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Detail of the Per Person</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Display Per Person Amount */}
          <div className="flex justify-between items-center">
            <label className="block text-left font-medium text-[#202224] mb-1">Per Person Amount :</label>
            <span className="text-[#202224] bg-[#F4F4F4] p-1 rounded-2xl">{perPersonAmount}</span>
          </div>

          {/* Select Member Dropdown */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">Select Member<span className="text-red-500">*</span></label>
            <select
              value={selectedMember}
              onChange={handleSelectMember}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            >
              <option value="" disabled>Select a member</option>
              {[1, 2, 3].map((number, index) => (
                <option key={index} value={number}>{number}</option>
              ))}
            </select>
          </div>

          {/* Display Total Amount */}
          <div className="flex justify-between items-center">
            <label className="block text-left font-medium text-[#202224] mb-1">Total Amount :</label>
            <span className="text-[#202224] bg-[#F4F4F4] p-1 rounded-2xl">₹{totalAmount}</span>
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row gap-4 pt-2">
            <button type="button" className="w-full sm:w-[48%] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50" onClick={handleClose}>Cancel</button>
            <button type="button" className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${selectedMember ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "bg-[#F6F8FB] text-[#202224]"}`} onClick={handleGetPassClick} disabled={!selectedMember}>Get Pass</button>
          </div>
        </form>
      </div>

      {/* Render Get Pass Modal when isGetPassOpen is true */}
      {isGetPassOpen && (
        <GetPass
          isOpen={isGetPassOpen}
          onClose={() => setIsGetPassOpen(false)} // Close the modal
          selectedMember={selectedMember} // Pass selectedMember as a prop to GetPass
        />
      )}
    </div>
  );
};

export default UpdateMaintenance;
