import React, { useState, useRef, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from 'moment';
import axiosInstance from '../../Common/axiosInstance';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

dayjs.extend(customParseFormat);

const AddExpense = ({ isOpen, onClose, fetchExpense }) => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [Amount, setAmount] = useState("");
  const [bill, setBill] = useState(null);
  const [billName, setBillName] = useState("");  // State to store the bill name
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for the file input element

  const titleRegex = /^[A-Za-z\s]+$/;
  const descriptionRegex = /^[A-Za-z\s]+$/;
  const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/ds8dsepcr/upload";

  const isFormValid =
    Title &&
    Description &&
    date &&
    Amount &&
    titleRegex.test(Title) &&
    descriptionRegex.test(Description) &&
    amountRegex.test(Amount) &&
    bill;

  const navigate = useNavigate();


  const ClearAllData = () => {
    setTitle("");
    setDescription("");
    setDate(null);
    setAmount("");
    setBill(null);
    setBillName("");
  };

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/expense");
  };

   const onclickClose= () => {
    handleClose();
    ClearAllData();
   }

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isFormValid) {
    try {
      const formData = new FormData();
      formData.append("Title", Title);
      formData.append("Description", Description);
      formData.append("Date", moment(date).toISOString());
      formData.append("Amount", Amount);
      formData.append("Original_FileName", billName);
      if (bill) {
        formData.append("Upload_Bill", bill); // Append the file directly
      }

      const response = await axiosInstance.post("/v2/expenses/addexpenses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        console.log("Expense saved successfully:", response.data);
        fetchExpense();
        onClose();
        ClearAllData();
      }
    } catch (error) {
      console.error("Error creating expense:", error.response || error.message);
    }
  } else {
    console.log("Form is invalid");
  }
};

  const handleDateChange = (date) => {
    setDate(date);
    setIsCalendarOpen(false);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (amountRegex.test(value) || value === "") {
      setAmount(value);
    }
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
            setBill(file);
            setBillName(file.name); // Set the file name
        } else {
            alert("File size should be less than 10MB");
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }
};


  // Handle deleting the file and resetting the input
  const handleDeleteBill = () => {
    setBill(null);
    setBillName(""); // Reset the file name
    fileInputRef.current.value = ""; // Reset the file input field
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
          setIsCalendarOpen(false);
        }
      }
    };

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
      <div className="bg-white w-full max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Add Expense Details</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              value={Title}
              onChange={(e) => {
                const value = e.target.value;
                if (titleRegex.test(value) || value === "") {
                  setTitle(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Description"
              value={Description}
              onChange={(e) => {
                const value = e.target.value;
                if (descriptionRegex.test(value) || value === "") {
                  setDescription(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] resize-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative" ref={datePickerRef}>
                <DatePicker
                  selected={date}
                  onChange={handleDateChange}
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

            <div className="w-full sm:w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Amount<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <span className="text-xl text-[#202224] ml-3">₹</span>
                <input
                  type="text"
                  value={Amount}
                  onChange={handleAmountChange}
                  className="w-full px-3 py-2 text-[#202224] rounded-lg pl-6"
                  placeholder="0000"
                />
              </div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Upload Bill<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg py-8">
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

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="w-full sm:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={onclickClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${
                isFormValid ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "bg-[#F6F8FB] text-[#202224]"
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

export default AddExpense;
