import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timeIcon from "../../components/assets/Vector.png"; 
import AvataImage from '../assets/Avatar.png' 
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS

dayjs.extend(customParseFormat);

const EditGuard = ({ isOpen, onClose, guard, onSave }) => {
  const [GuardName, setGuardName] = useState(""); // Changed to GuardName
  const [Number, setNumber] = useState(""); // Changed to Number
  const [Date, setDate] = useState(null); // Changed to Date
  const [Time, setTime] = useState(""); // Changed to Time
  const [Shift, setShift] = useState(""); // Changed to Shift
  const [Gender, setGender] = useState(""); // Changed to Gender
  const [Photo, setPhoto] = useState(null); // State to store photo
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State for calendar visibility

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);

  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z\s]*$/;
  const numberRegex = /^[0-9]*$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^([0-9]{2}):([0-9]{2})$/; // Validates time in HH:mm format

  const isFormValid =
    GuardName &&
    Number &&
    Date &&
    Time &&
    Shift &&
    Gender &&
    nameRegex.test(GuardName) &&
    numberRegex.test(Number) &&
    dateRegex.test(Date) &&
    timeRegex.test(Time);

  // Effect for setting initial state when the modal is opened
  useEffect(() => {
    if (isOpen && guard) {
      setGuardName(guard.GuardName || "Brooklyn Simmons");
      setNumber(guard.Number || "94564 96321");
      setDate(guard.Date ? dayjs(guard.Date).toDate() : null); // Using dayjs for Date parsing
      setTime(guard.Time || "12:00");
      setShift(guard.Shift || "");
      setGender(guard.Gender || "");
      setPhoto(guard.Photo || null); // Set the existing photo if available
    }
  }, [isOpen, guard]);
  // Handle form inputs
  const handleGuardNameChange = (e) => {
    const value = e.target.value;
    if (nameRegex.test(value)) {
      setGuardName(value);
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (numberRegex.test(value)) {
      setNumber(value);
    }
  };

  const handleShiftDateChange = (date) => {
    setDate(date);
    setIsCalendarOpen(false); // Close calendar after selecting a date
  };

  const handleShiftTimeChange = (value) => {
    const timeString = value ? value.format("HH:mm") : ""; // Format time as HH:mm
    setTime(timeString);
  };

  // Handle photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Set the photo URL
      };
      reader.readAsDataURL(file); // Convert image to data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSave({ GuardName, Number, Date, Time, Shift, Gender, photo }); // Pass the updated data including photo
      onClose(); // Close the modal
    }
  };

  const handleClose = () => {
    onClose();
    navigate("/security-guard"); // Adjust to your desired page route
  };

  // Calendar visibility toggle
  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle calendar visibility
  };

  // Close calendar when clicking outside the modal or calendar
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsCalendarOpen(false); // Close calendar if clicked outside
      }
    }
  };

  // Add event listener for clicks outside the modal
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" ref={modalRef}>
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Edit Guard</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Photo upload section */}
          <div>
            <div className="flex items-center">
              {/* Circle container for the photo */}
              <div className="border bg-[#F4F4F4] rounded-full w-[50px] h-[50px] flex justify-center items-center">
                {Photo ? (
                  <img
                    src={AvataImage}
                    alt="Guard"
                    className="w-[50px] h-[50px] object-cover rounded-full"
                  />
                ) : (
                  <i className="fa-solid fa-camera text-[#FFFFFF]"></i> // Show camera icon if no photo
                )}
              </div>
              {/* Button to upload photo */}
              <button
                type="button"
                className="ml-5 text-blue-500 no-underline"
                onClick={() => document.getElementById('fileInput').click()}
              >
                Add Photo
              </button>
            </div>
            {/* Hidden file input */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Guard Name"
              value={GuardName}
              onChange={handleGuardNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={Number}
              onChange={handleNumberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Select Shift & Gender */}
          <div className="flex gap-4 ">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Select Shift<span className="text-red-500">*</span>
              </label>
              <select
                value={Shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              >
                <option value="">Select Shift</option>
                <option value="Morning">Day</option>
                <option value="Night">Night</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Gender<span className="text-red-500">*</span>
              </label>
              <select
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Shift Date & Time */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Shift Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative" ref={datePickerRef}>
                <DatePicker
                  selected={Date}
                  onChange={handleShiftDateChange} // Update the date state
                  className="w-[170px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  autoComplete="off"
                  open={isCalendarOpen} // Control the visibility of the calendar
                />
                {/* Calendar Icon */}
                <i
                  className="fa-solid fa-calendar-days absolute right-10 text-[#202224] cursor-pointer"
                  onClick={handleCalendarIconClick} // Toggle calendar visibility on icon click
                />
              </div>
            </div>

            <div className="w-1/2 relative">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Shift Time<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <TimePicker
                  value={Time ? dayjs(Time, "HH:mm") : null}
                  format="HH:mm"
                  suffixIcon={<img src={timeIcon} alt="Time Icon" />} // Custom time icon
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  popupClassName="custom-time-picker-popup" // Optional: Use this for additional styling
                  onChange={handleShiftTimeChange} // Update time state
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-[#202224] rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#FE512E] to-[#F09619]"
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

export default EditGuard;
