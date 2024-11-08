import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const EditNote = ({ isOpen, onClose, noteData, onSave }) => {
  // States to hold form values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // Regular expressions for validation
  const titleRegex = /^[A-Za-z\s]*$/; // Only alphabets and spaces
  const descriptionRegex = /^[A-Za-z\s]*$/; // Only alphabets and spaces
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Date format (YYYY-MM-DD)

  // Check if the form is valid
  const isFormValid =
    title &&
    description &&
    date &&
    titleRegex.test(title) &&
    descriptionRegex.test(description) &&
    dateRegex.test(date);

 
  useEffect(() => {
    if (isOpen && noteData) {
      setTitle(noteData.title);
      setDescription(noteData.description);
      setDate(noteData.date);
    }
  }, [isOpen, noteData]);


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

 
  const handleDateChange = (e) => {
    const value = e.target.value;
    if (dateRegex.test(value)) {
      setDate(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSave({ title, description, date }); 
      onClose(); 
    }
  };

  // Redirect to dashboard when modal is closed
  const handleClose = () => {
    onClose(); 
    navigate("/notes"); 
  };

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
              value={title}
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
              value={description}
              onChange={handleDescriptionChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] h-22 resize-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
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

export default EditNote;
