import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import DatePicker from "react-datepicker";
import axiosInstance from '../Common/axiosInstance';
import moment from 'moment';

const Editfacility = ({ isOpen, onClose, FacilityData, fetchFacility }) => {
  // States to hold form values
  const [Facility_name, setFacility_name] = useState(""); // Facility Name
  const [Description, setDescription] = useState(""); // Description
  const [date, setDate] = useState(null); // Schedule Service Date
  const [Remind_Before, setRemind_Before] = useState(""); // Remind Before (dropdown)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z\s]*$/; // Only alphabets and spaces

  // Check if the form is valid
  const isFormValid =
    Facility_name &&
    Description &&
    date &&
    Remind_Before &&
    nameRegex.test(Facility_name);

  const ClearAllData = () => {
    setFacility_name("");
    setDescription("");
    setDate(null);
    setRemind_Before(""); 
    setIsCalendarOpen(false);
  };

  const handleClose = () => {
    onClose(); 
    navigate("/Facility-Management"); 
  };

  const ColseData = () => {
    handleClose();
    ClearAllData();
  };

  const navigate = useNavigate();

  const handleFacilityNameChange = (e) => {
    const value = e.target.value;
    if (nameRegex.test(value)) {
      setFacility_name(value);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRemindBeforeChange = (e) => {
    setRemind_Before(e.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
    setIsCalendarOpen(false); 
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const Date = moment(date).toISOString();
      const newFacilityData = {
        Facility_name,
        Description,
        Date,
        Remind_Before
      };
      try {
        const response = await axiosInstance.put(`/v2/facility/updatefacility/${FacilityData._id}`, newFacilityData);
        if (response.data) {
          fetchFacility(); 
          onClose(); 
        } else {
          console.error("Error saving data:", response.message || "Something went wrong.");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen); 
  };

  useEffect(() => {
    if (isOpen && FacilityData) {
      setFacility_name(FacilityData.Facility_name || " ");
      setDescription(FacilityData.Description || " ");
      setDate(FacilityData.Date ? new Date(FacilityData.Date) : null); // Ensure date is in correct format
      setRemind_Before(FacilityData.Remind_Before || " ");
    }
  }, [isOpen, FacilityData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Edit Facility</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Facility Name */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Facility Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Facility Name"
              value={Facility_name}
              onChange={handleFacilityNameChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Description"
              value={Description}
              onChange={handleDescriptionChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] h-22 resize-none"
            />
          </div>

          {/* Schedule Service Date */}
          <div className="relative">
            <label className="block text-left font-medium text-gray-700 mb-1">
              Schedule Service Date<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <DatePicker
                selected={date}
                onChange={handleDateChange} 
                className="w-[400px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                placeholderText="Select a date"
                dateFormat="MM/dd/yyyy"
                autoComplete="off"
                open={isCalendarOpen} // Control the visibility of the calendar
              />
              {/* Calendar Icon */}
              <i
                className="fa-solid fa-calendar-days absolute right-3 text-[#202224] cursor-pointer"
                onClick={handleCalendarIconClick} // Toggle calendar visibility on icon click
              />
            </div>
          </div>

          {/* Remind Before */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Remind Before<span className="text-red-500">*</span>
            </label>
            <select
              value={Remind_Before}
              onChange={handleRemindBeforeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            >
              <option value="1 day">1 Day</option>
              <option value="2 days">2 Days</option>
              <option value="1 week">1 Week</option>
              <option value="1 month">1 Month</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={ColseData} 
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#FE512E] to-[#F09619]"
              disabled={!isFormValid} // Disable the button if form is invalid
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editfacility;
