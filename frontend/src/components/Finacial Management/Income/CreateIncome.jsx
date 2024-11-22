import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS
import axiosInstance from '../../Common/axiosInstance';
import moment from 'moment';

const CreateIncome = ({ isOpen, onClose, fetchOtherIncome }) => {
  // State for the input fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Date, setDate] = useState(null); // Default date is null
  const [DueDate, setDueDate] = useState(null);
  const [amount, setAmount] = useState(""); // Add amount state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDuedateCalendarOpen, setIsDuedateCalendarOpen] = useState(false);

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);

  // Regex for title, description, and amount validation
  const titleRegex = /^[A-Za-z\s]+$/;
  const descriptionRegex = /^[A-Za-z\s]+$/;
  const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Validate number with optional decimal places

  const isFormValid =
    title &&
    description &&
    Date &&
    amount &&
    DueDate &&
    titleRegex.test(title) &&
    descriptionRegex.test(description) &&
    amountRegex.test(amount);

  const navigate = useNavigate();

  
  const ClearAllData = () => {
    setTitle("");
    setDescription("");
    setDate(null);
    setDueDate(null);
    setAmount("");
    setIsCalendarOpen(false);
    setIsDuedateCalendarOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   if (isFormValid) {
    const date = moment(Date).format("DD/MM/YYYY");
    const dueDate = moment(DueDate).format("DD/MM/YYYY");
      const OtherIncomeData = {
        title,
        description,
        date,
        dueDate,
        amount
      };
      try {
        // Send data to the backend API using axios
        const response = await axiosInstance.post(
          "/v2/income/addincome",
          OtherIncomeData
        );
        if (response.status===200) {
          console.log("Successfully saved:", response.data);
          fetchOtherIncome();
          onClose(); 
          ClearAllData();
        } else {
          const errorData = await response.json();
          console.error("Error saving number:", errorData.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error creating Other Income:", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  const handleClose = () => {
    if (onClose) onClose(); // Close the modal
    navigate("/otherincome"); // Redirect to announcements page
  };

  const ColseData = () => {
    handleClose();
    ClearAllData();
  };

  const handleDateChange = (date) => {
    setDate(date);
    setIsCalendarOpen(false); // Close calendar after selecting the date
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
    setIsDuedateCalendarOpen(false); // Close calendar after selecting the date
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle calendar visibility
  };

  const handleDuedateCalendarIconClick = () => {
    setIsDuedateCalendarOpen(!isDuedateCalendarOpen); // Toggle calendar visibility
  };

  const handleClickOutside = (e) => {
    // Check if the click was outside the modal and the calendar
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        // Close calendar if clicked outside the calendar
        setIsCalendarOpen(false);
        setIsDuedateCalendarOpen(false);
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
    <div
      ref={modalRef}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4"
    >
      <div className="bg-white max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Create Other Income</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
               Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                if (titleRegex.test(value) || value === "") {
                  setTitle(value);
                }
              }}
              className="w-80 % px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          <div className="flex gap-2">
                <div className="w-50% ">
                  <label className="block  text-left font-medium text-gray-700 mb-1">
                    Date<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <DatePicker
                      selected={Date}
                      onChange={handleDateChange}
                      className="w-[150px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] "
                      placeholderText="Select a date"
                      dateFormat="MM/dd/yyyy"
                      autoComplete="off"
                      open={isCalendarOpen}
                    />
                    {/* Calendar Icon */}
                    <i
                      className="fa-solid fa-calendar-days absolute ml-[130px] text-[#202224] cursor-pointer"
                      onClick={handleCalendarIconClick}
                    />
                  </div>
                </div>
                <div className=" relative ml-4">
                  <label className="block text-left font-medium text-gray-700 mb-1">
                    Due Date<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <DatePicker
                      selected={DueDate}
                      onChange={handleDueDateChange} // Update the date state
                      className="w-[150px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] "
                      placeholderText="Select a date"
                      dateFormat="MM/dd/yyyy"
                      autoComplete="off"
                      open={isDuedateCalendarOpen} // Control the visibility of the calendar
                    />
                    {/* Calendar Icon */}
                    <i
                      className="fa-solid fa-calendar-days absolute ml-[130px] text-[#202224] cursor-pointer"
                      onClick={handleDuedateCalendarIconClick} // Toggle calendar visibility on icon click
                    />
                  </div>
                </div>
              </div>


          {/* Description */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => {
                const value = e.target.value;
                if (descriptionRegex.test(value) || value === "") {
                  setDescription(value);
                }
              }}
              className="w-80 px-3 py-2 border border-gray-300 rounded-lg text-[#202224] resize-none"
            />
          </div>

          {/* Date */}
          
          {/* Amount */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Amount<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (amountRegex.test(value) || value === "") {
                  setAmount(value);
                }
              }}
              className="w-80 px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="w-full sm:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={ColseData}
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
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIncome;
