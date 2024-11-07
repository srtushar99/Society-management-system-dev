import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

const EditNumber = ({ isOpen, onClose, contactData, onSave }) => {
  // States to hold form values
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [work, setWork] = useState('');

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z\s]*$/; // Only alphabets and spaces
  const phoneRegex = /^[6789]\d{9}$/; // Starts with 6, 7, 8, or 9 and followed by 9 digits
  const workRegex = /^[A-Za-z\s]*$/; // Only alphabets and spaces

  // Check if the form is valid
  const isFormValid =
    fullName &&
    phoneNumber &&
    work &&
    nameRegex.test(fullName) &&
    phoneRegex.test(phoneNumber) &&
    workRegex.test(work);

  // Pre-fill the form with existing contact data when the modal is opened
  useEffect(() => {
    if (isOpen && contactData) {
      setFullName(contactData.name);
      setPhoneNumber(contactData.phone);
      setWork(contactData.work);
    }
  }, [isOpen, contactData]);

  // Initialize navigate for redirection
  const navigate = useNavigate();

  // Handle phone number change
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      if (value.length === 1 && !['6', '7', '8', '9'].includes(value)) {
        // Prevent input if the first digit is not 6, 7, 8, or 9
        return;
      }
      if (value.length <= 10) {
        setPhoneNumber(value);
      }
    }
  };

  // Handle full name change and restrict to alphabetic characters and spaces only
  const handleFullNameChange = (e) => {
    const value = e.target.value;
    if (nameRegex.test(value)) {
      setFullName(value);
    }
  };

  // Handle work change and restrict to alphabetic characters and spaces only
  const handleWorkChange = (e) => {
    const value = e.target.value;
    if (workRegex.test(value)) {
      setWork(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSave({ name: fullName, phone: phoneNumber, work }); // Pass the updated data to the parent
      onClose(); // Close the modal
    }
  };

  // Redirect to dashboard when modal is closed
  const handleClose = () => {
    onClose();  // First call the passed onClose function
    navigate('/dashboard'); // Redirect to dashboard
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Edit Important Number</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={handleFullNameChange} // Restrict to alphabetic characters and spaces
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                maxLength={10} // Limit input to 10 characters
              />
            </div>
          </div>

          {/* Work */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Work<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Work"
              value={work}
              onChange={handleWorkChange} // Restrict to alphabetic characters and spaces
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={handleClose} // Close and redirect to dashboard
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#FE512E] to-[#F09619]"
               
             // Disable the button if form is not valid
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNumber;
