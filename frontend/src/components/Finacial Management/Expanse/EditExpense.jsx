import React, { useState, useEffect, useRef } from "react";
import { X, Trash2, Upload } from "lucide-react"; // Make sure Trash2 is imported
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axiosInstance from '../../Common/axiosInstance';
import moment from 'moment';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS

dayjs.extend(customParseFormat);

const EditExpense = ({ isOpen, onClose, expense, fetchExpense }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null); // Initialize date as null
  const [amount, setAmount] = useState(""); // Initialize amount as empty string
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State for calendar visibility
  const [bill, setBill] = useState(null); // State for the uploaded bill
  const [billName, setBillName] = useState(""); // State for the bill name

  const [isbill, setbill] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);
  const fileInputRef = useRef(null); // Reference for file input
  const dropZoneRef = useRef(null);

  const navigate = useNavigate();

  const titleRegex = /^[A-Za-z\s]*$/;
  const descriptionRegex = /^[A-Za-z\s]*$/;
  const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/; // Regex to validate numeric values with optional decimals

  const isFormValid =
    title &&
    description &&
    date &&
    amount &&
    titleRegex.test(title) &&
    descriptionRegex.test(description) &&
    amountRegex.test(amount);


    const processUploadBill = async (url) => {
      const extractedFileName = url.substring(url.lastIndexOf("/") + 1);
      try {
        const response = await axios.head(url);
        const fileSizeBytes = response.headers["content-length"];
        const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
        setFileName(extractedFileName);
        setFileSize(`${fileSizeMB} MB`);
      } catch (error) {
        console.error("Error fetching file metadata:", error.message);
        setFileName(extractedFileName);
        setFileSize("Unknown");
      }
    };


    useEffect(() => {
      if (expense && expense.Upload_Bill) {
        processUploadBill(expense.Upload_Bill);
      }
    }, [expense]);

  // Effect for setting initial state when the modal is opened
  useEffect(() => {
    if (isOpen && expense) {
      setTitle(expense.Title || "");
      setDescription(expense.Description || "");
      setDate(expense.Date ? new Date(expense.Date) : null); // Convert string date to Date object
      setAmount(expense.Amount || "1000"); // Set the initial amount if provided
      // setBill(expense.bill || null); // Set initial bill if available
      setBill(
        expense.Upload_Bill
          ? {
              name: fileName,
              size: fileSize,
            }
          : null
      );
      setBillName(!!expense.Original_FileName ? expense.Original_FileName : ""); // Set the bill name if available
    }
  }, [isOpen, expense, fileName, fileSize]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const formData = new FormData();
        formData.append("Title", title);
        formData.append("Description", description);
        formData.append("Date", moment(date).toISOString());
        formData.append("Amount", amount);
        
        if (!isbill) {
          formData.append("Upload_Bill", expense.Upload_Bill); 
          formData.append("Original_FileName", billName);
        }else{
          formData.append("Upload_Bill", bill.file);
          formData.append("Original_FileName", bill.file.name);
        }


        const response = await axiosInstance.put(`/v2/expenses/updateexpenses/${expense._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if(!!response.data){
          fetchExpense(); 
          onClose(); 
        }else {
          const errorData = await response.json();
          console.error("Error saving:", errorData.message || "Something went wrong.");
        }
      } catch (err) {
        console.error(error);
      }
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


  const handleUploadBillChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
       setbill(true);
       setBill({
          file,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        });
      } else {
        alert("File size should be less than 10MB");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleUploadBillChange({ target: { files: [file] } });
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


          {/* Upload Bill */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
            Upload Bill<span className="text-red-500">*</span>
            </label>
            <div
              ref={dropZoneRef}
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleUploadBillChange}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
              />
              {bill ? (
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm text-gray-600">{bill.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setBill(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Upload a file
                    </button>
                    <span className="text-gray-500">or drag and drop</span>
                    <span className="text-xs text-gray-400">PNG, JPG up to 10MB</span>
                  </div>
                </div>
              )}
            </div>
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
