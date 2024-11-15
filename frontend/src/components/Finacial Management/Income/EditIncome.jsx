import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axiosInstance from '../../Common/axiosInstance';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS

dayjs.extend(customParseFormat);

const EditIncome = ({ isOpen, onClose, noteData, fetchOtherIncome }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Date, setDate] = useState(null); // Initialize date as null
  const [DueDate, setdueDate] = useState(null);
  const [amount, setAmount] = useState(""); // Initialize amount as empty string
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State for calendar visibility
  const [isdueCalendarOpen, setIsdueCalendarOpen] = useState(false); // State for calendar visibility

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);

  const navigate = useNavigate();

  const titleRegex = /^[A-Za-z\s]*$/;
  const descriptionRegex = /^[A-Za-z\s]*$/;
  const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/; 

  const isFormValid =
    title &&
    description &&
    Date &&
    DueDate &&
    amount && 
    titleRegex.test(title) &&
    descriptionRegex.test(description) &&
    amountRegex.test(amount);

  // Effect for setting initial state when the modal is opened
  useEffect(() => {
    if (isOpen && noteData) {
      setTitle(noteData.title || "");
      setDescription(noteData.description || "");
      setDate(noteData.date || null); // Convert string date to Date object
      setdueDate(noteData.dueDate || null);
      setAmount(noteData.amount || "1500"); // Set amount from noteData
    }
  }, [isOpen, noteData]);



  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (descriptionRegex.test(value)) {
      setDescription(value);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    setIsCalendarOpen(false); // Close calendar after selecting a date
  };

  const handledueDateChange = (date) => {
    setdueDate(date);
    setIsdueCalendarOpen(false); // Close calendar after selecting a date
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
                if (amountRegex.test(value) || value === "") {
                  setAmount(value);
                }
  };

   // Handle form submission
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
        const response = await axiosInstance.put(`/v2/income/update/${noteData._id}`,OtherIncomeData);
        if(!!response.data){
          fetchOtherIncome(); 
          onClose(); 
        }else {
          const errorData = await response.json();
          console.error("Error saving number:", errorData.message || "Something went wrong.");
        }
      } catch (err) {
        console.error(error);
      }
    }
  };

  const handleClose = () => {
    onClose();
    navigate("/otherincome");
  };

  // Calendar visibility toggle
  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle calendar visibility
  };

  const handledueCalendarIconClick = () => {
    setIsdueCalendarOpen(!isCalendarOpen); // Toggle calendar visibility
  };

  // Close calendar when clicking outside the modal or calendar
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsCalendarOpen(false); // Close calendar if clicked outside
        setIsdueCalendarOpen(false); 
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
          <span className="text-2xl font-bold text-[#202224]">Edit Ganesh Chaturthi</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Amount Field */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Amount<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                 Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative" ref={datePickerRef}>
                <DatePicker
                  selected={Date}
                  onChange={handleDateChange} // Update the date state
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

            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Due Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative" ref={datePickerRef}>
                <DatePicker
                  selected={DueDate}
                  onChange={handledueDateChange} // Update the date state
                  className="w-[170px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  autoComplete="off"
                  open={isdueCalendarOpen} // Control the visibility of the calendar
                />
                {/* Calendar Icon */}
                <i
                  className="fa-solid fa-calendar-days absolute right-10 text-[#202224] cursor-pointer"
                  onClick={handledueCalendarIconClick} // Toggle calendar visibility on icon click
                />
              </div>
            </div>
          </div>
          {/* Description Field */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] h-22 resize-none"
            />
          </div>

          {/* Date Field */}
          

          {/* Action Buttons */}
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
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIncome;
