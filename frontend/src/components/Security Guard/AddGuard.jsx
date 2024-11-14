import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import timeIcon from "../../components/assets/Vector.png"; // Import your custom time icon

const AddGuard = ({ isOpen, onClose }) => {
  // State for the input fields
  const [guardName, setGuardName] = useState(""); 
  const [number, setNumber] = useState(""); 
  const [shiftDate, setShiftDate] = useState(""); 
  const [shiftTime, setShiftTime] = useState(null); // Use null as the initial state for shiftTime
  const [selectShift, setSelectShift] = useState(""); 
  const [gender, setGender] = useState(""); 
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [Photo, setPhoto] = useState(null); // State to store the uploaded photo

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);
  
  // Regex for validation
  const nameRegex = /^[A-Za-z\s]+$/; 
  const numberRegex = /^[0-9]+$/; 
  const shiftTimeRegex = /^[0-9]{2}:[0-9]{2}$/; 

  // Form validation
  const isFormValid =
    guardName &&
    number &&
    shiftDate &&
    shiftTime &&
    selectShift &&
    gender &&
    nameRegex.test(guardName) &&
    numberRegex.test(number) &&
    shiftTimeRegex.test(shiftTime);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form Submitted", {
        guardName,
        number,
        shiftDate,
        shiftTime,
        selectShift,
        gender,
        Photo, // Include the photo data in the form submission
      });
      // Handle form submission logic here
    } else {
      console.log("Form is invalid");
    }
  };

  const handleDateChange = (date) => {
    setShiftDate(date);
    setIsCalendarOpen(false); 
  };

  const handleTimeChange = (value) => {
    const formattedTime = value ? value.format("HH:mm") : null; // Handle time change to format HH:mm
    setShiftTime(formattedTime); // Store the time as a string in HH:mm format
  };

  const handleClose = () => {
    if (onClose) onClose(); 
    navigate("/security-guard"); 
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen); 
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Set the photo as the base64 encoded string
      };
      reader.readAsDataURL(file); // Read the selected file as a Data URL
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4"
    >
      <div className="bg-white max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">
            Add Security
          </span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Photo Upload */}
          <div>
            <div className="d-flex">
              {/* Circle container for the photo */}
              <div className="border bg-[#F4F4F4]  rounded-full w-[50px] h-[50px]  flex justify-center items-center">
                {photo ? (
                  <img
                    src={photo}
                    alt="Guard"
                    className="w-[50px] h-[50px] object-cover rounded-full"
                  />
                ) : (
                    <i class="fa-solid fa-camera text-[#FFFFFF]"></i>
                )}
              </div>
              {/* Button to upload photo */}
              <button 
                type="button" 
                className="ml-5 text-blue-500 no-underline" 
                onClick={() => document.getElementById('fileInput').click()}>
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

          {/* Guard Name */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Guard Name"
              value={guardName}
              onChange={(e) => {
                const value = e.target.value;
                if (nameRegex.test(value) || value === "") {
                  setGuardName(value);
                }
              }}
              className="w-[400px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Guard Number */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="+91"
              value={number}
              onChange={(e) => {
                const value = e.target.value;
                if (numberRegex.test(value) || value === "") {
                  setNumber(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          <div className="d-flex">
            <div>
              <label className="block text-left font-medium text-[#202224] mb-1">
                Gender<span className="text-red-500">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-[190px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Shift Date */}
            <div>
              <label className="block ml-6 text-left font-medium text-[#202224] mb-1">
                Shift<span className="text-red-500">*</span>
              </label>
              <select
                value={selectShift}
                onChange={(e) => setSelectShift(e.target.value)}
                className="w-[190px] ml-5 px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              >
                <option value="">Select Shift</option>
                <option value="Morning">Day</option>
            
                <option value="Night">Night</option>
              </select>
            </div>
          </div>

          {/* Shift Time */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Shift Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative" ref={datePickerRef}>
                <DatePicker
                  selected={shiftDate}
                  onChange={handleDateChange} 
                  className="w-[170px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  autoComplete="off"
                  open={isCalendarOpen} 
                />
                <i
                  className="fa-solid fa-calendar-days absolute right-10 text-[#202224] cursor-pointer"
                  onClick={handleCalendarIconClick} 
                />
              </div>
            </div>

            <div className="w-1/2 relative">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Shift Time<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <TimePicker
                  value={shiftTime ? dayjs(shiftTime, "HH:mm") : null} // Pass the correct time format
                  format="HH:mm"
                  suffixIcon={<img src={timeIcon} alt="Time Icon" />}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  popupClassName="custom-time-picker-popup"
                  onChange={handleTimeChange} 
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="w-full sm:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${isFormValid ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "bg-[#F6F8FB] text-[#202224]"}`}
              disabled={!isFormValid}
            >
              {isFormValid ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuard;
