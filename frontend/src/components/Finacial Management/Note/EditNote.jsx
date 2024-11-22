import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import DatePicker from "react-datepicker";
import axiosInstance from '../../Common/axiosInstance';
import moment from 'moment';

const EditNote = ({ isOpen, onClose, noteData, fetchNote }) => {
  // States to hold form values
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 

  // Regular expressions for validation
  const titleRegex = /^[A-Za-z\s]*$/; // Only alphabets and spaces

  // Check if the form is valid
  const isFormValid =
    Title &&
    Description &&
    date &&
    titleRegex.test(Title)

    const ClearAllData = () => {
      setTitle("");
      setDescription("");
      setDate(null);
      setIsCalendarOpen(false);
    };

  const handleClose = () => {
    onClose(); 
    navigate("/notes"); 
  };


    const ColseData = () => {
      handleClose();
      ClearAllData();
    };

  const navigate = useNavigate();

 
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
    setIsCalendarOpen(false); 
  };

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isFormValid) {
  //     onSave({ title, description, date }); 
  //     onClose(); 
  //   }
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
       const Date = moment(date).toISOString();
      // const Date = new Date(date);
      const NewnoteData = {
        Title,
        Description,
        Date
      };
      try {
        const response = await axiosInstance.put(`/v2/note/updatenote/${noteData._id}`,NewnoteData);
        if(!!response.data){
          fetchNote(); 
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

  
  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen); 
  };

  useEffect(() => {
    if (isOpen && noteData) {
      setTitle(!!noteData.Title ? noteData.Title :" ");
      setDescription(!!noteData.Description ? noteData.Description : "");
      setDate(!!noteData.Date ? noteData.Date : null);
    }
  }, [isOpen, noteData]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Edit Note</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              value={Title}
              onChange={handleTitleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Description"
              value={Description}
              onChange={handleDescriptionChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] h-22 resize-none"
            />
          </div>

          {/* Date */}
          <div className="relative">
            <label className="block text-left font-medium text-gray-700 mb-1">
              Date<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <DatePicker
                selected={date}
                onChange={handleDateChange} 
                className="w-[400px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                placeholderText="Select a date"
                dateFormat="MM/dd/yyyy"
                autoComplete="off"
                open={isCalendarOpen} // Control the visibility of the calendar
              />
              {/* Calendar Icon */}
              <i
                className="fa-solid fa-calendar-days absolute w right-3 text-[#202224] cursor-pointer"
                onClick={handleCalendarIconClick} // Toggle calendar visibility on icon click
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={ColseData} 
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

export default EditNote;
