import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS

const AddMaintenance = ({ isOpen, onClose ,maintenance}) => {
  // State for the input fields
  const [amount, setAmount] = useState(""); // Maintenance Amount
  const [penaltyAmount, setPenaltyAmount] = useState(0); // Penalty Amount
  const [dueDate, setDueDate] = useState(null); // Due Date state
  const [penaltyDays, setPenaltyDays] = useState(0); // Days after due date to apply penalty
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State to toggle calendar visibility

  const datePickerRef = useRef(null); // Reference for the DatePicker component
  const calendarContainerRef = useRef(null); // Reference for the calendar container

  // Regular expressions for validation
  const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Accepts numeric values (e.g., 1000, 1000.00)
  const penaltyAmountRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Accepts numeric values for penalty
  const penaltyDaysRegex = /^[0-9]+$/; // Only integers for penalty days

  // Check if all fields are filled and valid
  const isFormValid =
    amount &&
    penaltyAmount &&
    dueDate &&
    penaltyDays &&
    amountRegex.test(amount) &&
    penaltyAmountRegex.test(penaltyAmount) &&
    penaltyDaysRegex.test(penaltyDays);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form Submitted", { amount, dueDate, penaltyAmount, penaltyDays });
    } else {
      console.log("Form is invalid");
    }
  };

  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/income");
  };

  // Handle date change (to calculate penalty)
  const handleDateChange = (date) => {
    setDueDate(date);
    setIsCalendarOpen(false); // Close the calendar after selecting a date
    calculatePenalty(date, penaltyDays); // Recalculate penalty with the selected due date and penalty days
  };

  // Handle penalty days change
  const handlePenaltyDaysChange = (e) => {
    const days = parseInt(e.target.value, 10);
    setPenaltyDays(days);
    if (dueDate) {
      calculatePenalty(dueDate, days); // Recalculate penalty whenever penalty days changes
    }
  };

  // Handle calendar icon click
  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  // Close calendar if clicked outside
  const handleClickOutside = (event) => {
    if (
      calendarContainerRef.current &&
      !calendarContainerRef.current.contains(event.target) &&
      !datePickerRef.current.contains(event.target)
    ) {
      setIsCalendarOpen(false); // Close calendar if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener to close calendar when clicking outside
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Calculate penalty based on the due date and penalty days
  const calculatePenalty = (date, days) => {
    if (date && days >= 0) {
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - date); // Get time difference in milliseconds
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      // Example penalty calculation (penalty per day after the due date)
      const penaltyPerDay = 50; // You can change this to the actual penalty value per day
      if (diffDays > days) {
        setPenaltyAmount((diffDays - days) * penaltyPerDay); // Apply penalty only after the selected penalty days
      } else {
        setPenaltyAmount(0); // No penalty if within the selected number of days
      }
    }
  };

  // Restrict amount input to only numeric values and limit decimal points to 2
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (amountRegex.test(value) || value === "") {
      setAmount(value); // Update amount if it matches the regex
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Add Maintenance Detail</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose} // Close modal and redirect to dashboard
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Maintenance Amount */}
          <div className="flex gap-4">
            <div className="w-1/2 relative">
            
              <label className="block text-left font-medium text-[#202224] mb-1">
                Maintenance Amount
              </label>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <span className="text-xl text-[#202224] ml-3">₹</span>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange} // Restrict input to numeric values
                  className="w-full px-3 py-2 text-[#202224] rounded-lg pl-6"
                  placeholder="0000"
                />
              </div>
            </div>

            {/* Penalty Amount */}
            <div className="w-1/2 relative">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Penalty Amount
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <span className="text-xl text-[#202224] ml-3">₹</span>
                <input
                  type="text"
                  value={penaltyAmount}
                  readOnly // Make this field read-only
                  className="w-full px-3 py-2 text-[#202224] rounded-lg pl-6"
                  placeholder="0000"
                />
              </div>
            </div>
          </div>

          {/* Maintenance Due Date */}
          <div className="relative" ref={calendarContainerRef}>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Maintenance Due Date
            </label>
            <div className="flex items-center">
              <DatePicker
                ref={datePickerRef}
                selected={dueDate}
                onChange={handleDateChange}
                className="w-[400px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                placeholderText="Select due date"
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

          {/* Penalty Days Selection */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Penalty Applied After Days of Due Date
            </label>
            <select
              value={penaltyDays}
              onChange={handlePenaltyDaysChange}
              defaultValue="Select Penalty Applied After Day Selection"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            >
              <option className="text-[#A7A7A7]">Select Penalty Applied After Day Selection</option>

              <option value="1">1 Day</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
              <option value="4">4 Days</option>
              <option value="5">5 Days</option>
              <option value="10">10 Days</option>
              <option value="15">15 Days</option>
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
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${isFormValid
                ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]" // Apply gradient if form is valid
                : "bg-[#F6F8FB] text-[#202224]" // Default color if form is not valid
                }`}
              disabled={!isFormValid}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaintenance;
