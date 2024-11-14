import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; 

const CreateRequest = ({ isOpen, onClose }) => {  
  // State for the input fields
  const [Requestername, setRequestername] = useState(""); 
  const [Requestname, setRequestname] = useState(""); 
  const [wing, setWing] = useState(""); 
  const [unit, setUnit] = useState(""); 
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Open");
  const [requestDate, setRequestDate] = useState(new Date()); // Initialize with current date
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const modalRef = useRef(null);

  // Regex for validation
  const nameRegex = /^[A-Za-z\s]+$/; // Validate names with only letters and spaces
  const unitRegex = /^[0-9]+$/; // Validate unit with only numbers
  const wingRegex = /^[A-Za-z\s]+$/; // Validate wing with only alphabets

  // Form validation
  const isFormValid =
    Requestername &&
    Requestname &&
    wing &&
    unit &&
    requestDate && // Ensure requestDate is filled
    nameRegex.test(Requestername) &&
    nameRegex.test(Requestname) &&
    wingRegex.test(wing) &&
    unitRegex.test(unit);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form Submitted", {
        Requestername,
        Requestname,
        wing,
        unit,
        priority,
        status,
        requestDate, // Log request date
      });
      // Handle form submission logic here
    } else {
      console.log("Form is invalid");
    }
  };

  const handleClose = () => {
    if (onClose) onClose(); // Close the modal
    navigate("/requesttracking"); // Redirect to complaints tracking page
  };

  const handleClickOutside = (e) => {
    // Check if the click was outside the modal
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      // Close the modal if clicked outside
      handleClose();
    }
  };

  const handleDateChange = (date) => {
    setRequestDate(date); // Update requestDate when the user selects a date
    setIsCalendarOpen(false); // Close the calendar after date selection
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle the visibility of the calendar
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
    <div
      ref={modalRef}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4"
    >
      <div className="bg-white max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Create Request</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
      
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Requester Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Requester Name"
              value={Requestername}
              onChange={(e) => {
                const value = e.target.value;
                if (nameRegex.test(value) || value === "") {
                  setRequestername(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Request Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Request Name"
              value={Requestname}
              onChange={(e) => {
                const value = e.target.value;
                if (nameRegex.test(value) || value === "") {
                  setRequestname(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Request Date */}
          <div className="">
            <label className="block text-left font-medium text-gray-700 mb-1">
              Request Date
            </label>
            <div className="flex items-center relative">
              <DatePicker
                selected={requestDate} // Pass the correct state to DatePicker
                onChange={handleDateChange}
                className="w-[400px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                placeholderText="Select a date"
                dateFormat="dd/MM/yyyy"
                autoComplete="off"
                open={isCalendarOpen}
              />
              <i
                className="fa-solid fa-calendar-days absolute right-3 text-[#202224] cursor-pointer"
                onClick={handleCalendarIconClick}
              />
            </div>
          </div>

          {/* Wing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-left font-medium text-gray-700 mb-1">
                Wing<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={wing}
                onChange={(e) => {
                  const value = e.target.value;
                  if (wingRegex.test(value) || value === "") {
                    setWing(value);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              />
            </div>
            <div>
              <label className="block text-left font-medium text-gray-700 mb-1">
                Unit<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => {
                  const value = e.target.value;
                  if (unitRegex.test(value) || value === "") {
                    setUnit(value);
                  }
                }}
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
                  checked={priority === "High"}
                  onChange={() => setPriority("High")}
                  className={`w-4 h-4 border-2 ${priority === "High" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#D3D3D3]"}`}
                />
                <span className={`ml-2 text-sm ${priority === "High" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>High</span>
              </label>

              {/* Medium Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#FFEB3B] rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={priority === "Medium"}
                  onChange={() => setPriority("Medium")}
                  className={`w-4 h-4 border-2 ${priority === "Medium" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#D3D3D3]"}`}
                />
                <span className={`ml-2 text-sm ${priority === "Medium" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Medium</span>
              </label>

              {/* Low Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#4CAF50] rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={priority === "Low"}
                  onChange={() => setPriority("Low")}
                  className={`w-4 h-4 border-2 ${priority === "Low" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#D3D3D3]"}`}
                />
                <span className={`ml-2 text-sm ${priority === "Low" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Low</span>
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
                  checked={status === "Open"}
                  onChange={() => setStatus("Open")}
                  className={`w-4 h-4 border-2 ${status === "Open" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#4CAF50]"}`}
                />
                <span className={`ml-2 text-sm ${status === "Open" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Open</span>
              </label>

              {/* Pending Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="status"
                  value="Pending"
                  checked={status === "Pending"}
                  onChange={() => setStatus("Pending")}
                  className={`w-4 h-4 border-2 ${status === "Pending" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#FFEB3B]"}`}
                />
                <span className={`ml-2 text-sm ${status === "Pending" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Pending</span>
              </label>

              {/* Solve Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="status"
                  value="Solve"
                  checked={status === "Solve"}
                  onChange={() => setStatus("Solve")}
                  className={`w-4 h-4 border-2 ${status === "Solve" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#F44336]"}`}
                />
                <span className={`ml-2 text-sm ${status === "Solve" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Solve</span>
              </label>
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
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
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

export default CreateRequest;
