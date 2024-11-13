import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Notification from "./Notification"; // Import Notification component

const CreateFacility = ({ isOpen, onClose }) => {
  // State for the input fields
  const [facilityName, setFacilityName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [remindBefore, setRemindBefore] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // Show notification after form submission
  const [notificationData, setNotificationData] = useState(null); // To store notification data

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const descriptionRegex = /^[A-Za-z\s]+$/;

  // Check if all fields are filled and valid
  const isFormValid =
    facilityName &&
    description &&
    date &&
    remindBefore &&
    nameRegex.test(facilityName) &&
    descriptionRegex.test(description);

  const ClearAllData = () => {
    setFacilityName("");
    setDescription("");
    setDate(null);
    setRemindBefore("");
    setIsCalendarOpen(false);
  };

  const navigate = useNavigate(); // Initialize navigate function

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const noteData = {
        facilityName,
        description,
        date: formattedDate,
        remindBefore
      };

      try {
        // Simulating success (no axios here, replace with actual API call if needed)
        console.log("Successfully saved:", noteData);

        // Set the notification data
        setNotificationData({
          title: "Facility Created Successfully",
          time: moment().format("MM/DD/YYYY hh:mm A"),
          timeAgo: "Just now",
          name: facilityName,
          scheduleDate: moment(date).format("MM/DD/YYYY")
        });

        // Display success notification
        setShowNotification(true);

         // Hide the notification after 5 seconds
         setTimeout(() => {
           setShowNotification(false); // Hide the notification
          //  navigate("/dashboard"); // Redirect to the notifications page
         }, 5000); // 5000ms = 5 seconds

        // Clear form fields after successful submission
        ClearAllData();
      } catch (error) {
        console.error("Error creating facility:", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/Facility-Management"); // Redirect to the dashboard when modal is closed
  };

  const handleDateChange = (date) => {
    setDate(date);
    setIsCalendarOpen(false);
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Create Facility</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose}
          >
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
              value={facilityName}
              onChange={(e) => {
                const value = e.target.value;
                if (nameRegex.test(value) || value === "") {
                  setFacilityName(value);
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
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => {
                const value = e.target.value;
                if (descriptionRegex.test(value) || value === "") {
                  setDescription(value);
                }
              }}
              className="w-full h-16 px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Schedule Service Date */}
          <div className="relative">
            <label className="block text-left font-medium text-gray-700 mb-1">
              Schedule Service Date
            </label>
            <div className="flex items-center">
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                className="w-[400px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                placeholderText="Select a date"
                dateFormat="MM/dd/yyyy"
                autoComplete="off"
                open={isCalendarOpen}
              />
              <i
                className="fa-solid fa-calendar-days absolute right-3 text-[#202224] cursor-pointer"
                onClick={handleCalendarIconClick}
              />
            </div>
          </div>

          {/* Remind Before */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Remind Before
            </label>
            <select
              value={remindBefore}
              onChange={(e) => setRemindBefore(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            >
              <option value="">Select option</option>
              <option value="1 day">1 Day</option>
              <option value="3 days">3 Days</option>
              <option value="1 week">1 Week</option>
              <option value="2 weeks">2 Weeks</option>
            </select>
          </div>

          {/* Buttons */}
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

export default CreateFacility;
