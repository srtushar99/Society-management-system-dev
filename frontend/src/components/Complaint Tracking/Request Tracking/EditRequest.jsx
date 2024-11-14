import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // Close icon
import { useNavigate } from "react-router-dom";
import AIcon from "../../assets/A.png";
import BIcon from "../../assets/B.png";
import CIcon from "../../assets/C.png";
import DIcon from "../../assets/D.png";
import EIcon from "../../assets/E.png";
import FIcon from "../../assets/F.png";
import GIcon from "../../assets/G.png";
import HIcon from "../../assets/H.png";
import IIcon from "../../assets/I.png"; // Import useNavigate for redirection
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditRequest = ({ isOpen, onClose, protocol, onSave }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  // Rename state to avoid name conflict with the prop
  const [formData, setFormData] = useState({
    Requestername: "", // Changed
    Requestname: "",  // Changed
    unit: "",
    priority: "",
    status: "",
    Date: new Date(), // Default to the current date
  });

  // Check if the form is valid
  const isFormValid =
    formData.Requestername &&  // Changed
    formData.Requestname &&    // Changed
    formData.unit &&
    formData.Date;

  const unitImages = {
    1001: [AIcon],
    1002: [BIcon],
    1003: [CIcon],
    1004: [DIcon],
    2001: [EIcon],
    2002: [FIcon],
    2003: [GIcon],
    2004: [HIcon],
    3001: [IIcon],
    3002: [AIcon],
    3003: [BIcon],
  };

  useEffect(() => {
    if (isOpen && protocol) {
      // Safely set form data if the protocol prop is provided
      setFormData(protocol);
    }
  }, [isOpen, protocol]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate alphabet-only fields
    if (
      name === "Requestername" ||  // Changed
      name === "Requestname"  // Changed
    ) {
      const regex = /^[A-Za-z\s]*$/;
      if (regex.test(value) || value === "") {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }

    // Validate numeric unit
    if (name === "unit") {
      const regex = /^[0-9]*$/;
      if (regex.test(value) || value === "") {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }

    // Update other fields without restriction
    if (
      name !== "Requestername" &&   // Changed
      name !== "Requestname" &&     // Changed
      name !== "unit"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      Date: date, // Update the date in the state when selected
    }));
    setIsCalendarOpen(false); // Close the calendar after date selection
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSave(formData); // Pass the form data to the onSave function
      onClose(); // Close modal
    }
  };

  const handleClose = () => {
    onClose(); // Close modal
    navigate("/requesttracking"); // Redirect to dashboard
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Edit Request</span> {/* Changed "Complaint" to "Request" */}
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Requester Name */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Requester Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Requestername" // Changed
              value={formData.Requestername} // Changed
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Request Name */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Request Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Requestname" // Changed
              value={formData.Requestname} // Changed
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          <div className="relative">
            <label className="block text-left font-medium text-gray-700 mb-1">
              Request Date
            </label>
            <DatePicker
              selected={formData.Date}
              onChange={handleDateChange}
              className="w-[400px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              dateFormat="dd/MM/yyyy"
              required
              open={isCalendarOpen} // Control calendar visibility with the state
            />
            
              <i
              className="fa-solid fa-calendar-days absolute top-9 right-3 text-[#202224] cursor-pointer"
              onClick={handleCalendarIconClick}
            />
          </div>

          
          {/* Wing and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-left font-medium text-gray-700 mb-1">
                Wing<span className="text-red-500">*</span>
              </label>
              <p className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]">
                <img
                  src={unitImages[formData.unit]}
                  alt={formData.unit}
                  width="25"
                  height="25"
                  className="rounded-lg"
                />
              </p>
            </div>
            <div>
              <label className="block text-left font-medium text-gray-700 mb-1">
                Unit<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Priority<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6 w-full">
              {/* High Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#FE512E] rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={formData.priority === "High"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.priority === "High"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#D3D3D3]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.priority === "High" ? "text-[#202224]" : "text-[#D3D3D3]"
                  }`}
                >
                  High
                </span>
              </label>

              {/* Medium Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#FFEB3B] rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={formData.priority === "Medium"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.priority === "Medium"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#D3D3D3]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.priority === "Medium" ? "text-[#202224]" : "text-[#D3D3D3]"
                  }`}
                >
                  Medium
                </span>
              </label>

              {/* Low Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#4CAF50] rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={formData.priority === "Low"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.priority === "Low"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#D3D3D3]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.priority === "Low" ? "text-[#202224]" : "text-[#D3D3D3]"
                  }`}
                >
                  Low
                </span>
              </label>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Status<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6 w-full">
              {/* Open Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="status"
                  value="Open"
                  checked={formData.status === "Open"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.status === "Open"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#4CAF50]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.status === "Open" ? "text-[#202224]" : "text-[#D3D3D3]"
                  }`}
                >
                  Open
                </span>
              </label>

              {/* Pending Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="status"
                  value="Pending"
                  checked={formData.status === "Pending"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.status === "Pending"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#FFEB3B]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.status === "Pending" ? "text-[#202224]" : "text-[#D3D3D3]"
                  }`}
                >
                  Pending
                </span>
              </label>

              {/* Solve Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="status"
                  value="Solve"
                  checked={formData.status === "Solve"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.status === "Solve"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#F44336]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.status === "Solve" ? "text-[#202224]" : "text-[#D3D3D3]"
                  }`}
                >
                  Solve
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 w-full">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={handleClose} // Close modal
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg w-full ${
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

export default EditRequest;
