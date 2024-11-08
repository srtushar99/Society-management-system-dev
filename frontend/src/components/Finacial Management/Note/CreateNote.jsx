import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const CreateNote = ({ isOpen, onClose }) => {
  // State for the input fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // Regular expressions for validation
  const titleRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces for title
  const descriptionRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces for description

  // Check if all fields are filled and valid
  const isFormValid =
    title &&
    description &&
    date &&
    titleRegex.test(title) &&
    descriptionRegex.test(description);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Perform save action here (you can call API to save data)
      console.log("Form Submitted", { title, description, date });
      // You might also want to reset the form or navigate elsewhere after submit
    } else {
      console.log("Form is invalid");
    }
  };

  // Initialize navigate for redirection
  const navigate = useNavigate();

  // Handle closing the modal and redirecting to the dashboard
  const handleClose = () => {
    if (onClose) onClose(); // Close the modal
    navigate("/notes"); // Redirect to the dashboard
  };

  if (!isOpen) return null; // If modal is not open, return nothing

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Add Note</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose} // Close modal and redirect to dashboard
          >
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
              onChange={(e) => {
                const value = e.target.value;
                // Prevent non-alphabetical input
                if (titleRegex.test(value) || value === "") {
                  setTitle(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                type="text"
                value={description}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only alphabetic input for description
                  if (descriptionRegex.test(value) || value === "") {
                    setDescription(value);
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg text-[#202224]"
              />
            </div>
          </div>

          {/* Date */}
          <div className="relative">
            <label className="block text-left font-medium text-gray-700 mb-1">
              Date<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10" // Add padding-right for icon
              />
              {/* Calendar Icon */}
              {/* <i className="fa-solid fa-calendar-days absolute right-3 text-[]"></i> */}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              className="w-full sm:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={handleClose} // Close modal and redirect to dashboard
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]" // Apply gradient if form is valid
                  : "bg-[#F6F8FB] text-[#202224]" // Default color if form is not valid
              }`}
              disabled={!isFormValid} // Disable the button if form is not valid
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
