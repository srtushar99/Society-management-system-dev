import React, { useState, useEffect, useRef } from "react";
import { X, Trash2 } from "lucide-react"; // Make sure Trash2 is imported
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS

dayjs.extend(customParseFormat);

const EditExpense = ({ isOpen, onClose, expense, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null); // Initialize date as null
  const [amount, setAmount] = useState(""); // Initialize amount as empty string
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State for calendar visibility
  const [bill, setBill] = useState(null); // State for the uploaded bill
  const [billName, setBillName] = useState(""); // State for the bill name

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);
  const fileInputRef = useRef(null); // Reference for file input

  const navigate = useNavigate();

  const titleRegex = /^[A-Za-z\s]*$/;
  const descriptionRegex = /^[A-Za-z\s]*$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Regex to validate numeric values with optional decimals

  const isFormValid =
    title &&
    description &&
    date &&
    amount &&
    titleRegex.test(title) &&
    descriptionRegex.test(description) &&
    dateRegex.test(date) &&
    amountRegex.test(amount) &&
    bill; // Ensure bill is selected

  // Effect for setting initial state when the modal is opened
  useEffect(() => {
    if (isOpen && expense) {
      setTitle(expense.title || "");
      setDescription(expense.description || "");
      setDate(expense.date ? new Date(expense.date) : null); // Convert string date to Date object
      setAmount(expense.amount || "1000"); // Set the initial amount if provided
      setBill(expense.bill || null); // Set initial bill if available
      setBillName(expense.billName || ""); // Set the bill name if available
    }
  }, [isOpen, expense]);

  // Handle form inputs
  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (titleRegex.test(value)) {
      setTitle(value);
    }
  };

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

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (amountRegex.test(value) || value === "") {
      setAmount(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBill(file);
      setBillName(file.name); // Set the name of the uploaded file
    }
  };

  const handleDeleteBill = () => {
    setBill(null);
    setBillName(""); // Reset bill name
    fileInputRef.current.value = ""; // Reset the file input field
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSave({ title, description, date, amount, bill });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    navigate("/expense");
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
          <span className="text-2xl font-bold text-[#202224]">Edit Expense</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Expense Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

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

          <div className="flex gap-4">
            {/* Date Picker */}
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative" ref={datePickerRef}>
                <DatePicker
                  selected={date}
                  onChange={handleDateChange} // Close calendar after selecting a date
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
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

            {/* Amount Input */}
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Amount<span className="text-red-500">*</span>
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
          </div>

          {/* File Upload Section */}
          <div style={{ position: "relative" }}>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Upload Bill<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg  py-4">
              <div className="text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  id="fileInput"
                  ref={fileInputRef} // Assign ref to the input field
                />
                <label htmlFor="fileInput" className="text-blue-500 cursor-pointer">
                  <i className="fa fa-upload mb-2 text-2xl"></i>
                  <p>Upload a file or drag and drop</p>
                  <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>
            </div>
            {bill && (
              <div className="flex items-center mt-2" style={{ position: "absolute", top: "50%", left: "5%" }}>
                <p className="text-sm text-success py-4 pt-5 ps-4 mx-5 me-2">{billName}</p>
                <button
                  type="button"
                  onClick={handleDeleteBill}
                  className="text-gray-600 hover:text-gray-800"
                  style={{ fontSize: "28px" }}
                >
                  <Trash2 className="h-4 w-4 mt-2" />
                </button>
              </div>
            )}
          </div>

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

export default EditExpense;
