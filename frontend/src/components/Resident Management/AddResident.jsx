import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // Close icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const AddResident = ({ isOpen, onClose, complainData, onSave }) => {
  // States to hold form values
  const [formData, setFormData] = useState({
    status: "",
    agreement: false, // Added state for agreement checkbox
  });

  const isFormValid = formData.status && formData.agreement;

  useEffect(() => {
    if (isOpen && complainData) {
      setFormData(complainData);
    }
  }, [isOpen, complainData]);

  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      if (onSave) {
        onSave(formData); // Call onSave if provided
      }
      onClose(); // Close the modal
      navigate("/owner"); // Redirect to the Owner page
    }
  };

  const handleClose = () => {
    onClose(); // Close modal
    navigate("/Resident-Manegement"); // Redirect to dashboard or previous page
  };

  if (!isOpen) return null; // Don't render if modal is not open

  return (

    
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Resident Status</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Status */}
          <div>
            <div className="flex gap-6 w-full">
              {/* Occupied Status */}
              <label className="flex items-center border rounded w-[180px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="status"
                  value="Occupied"
                  checked={formData.status === "Occupied"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.status === "Occupied"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#4CAF50]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.status === "Occupied"
                      ? "text-[#202224]"
                      : "text-[#D3D3D3]"
                  }`}
                >
                  Occupied
                </span>
              </label>

              {/* Vacate Status */}
              <label className="flex items-center border rounded w-[180px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="status"
                  value="Vacate"
                  checked={formData.status === "Vacate"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.status === "Vacate"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#FFEB3B]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.status === "Vacate"
                      ? "text-[#202224]"
                      : "text-[#D3D3D3]"
                  }`}
                >
                  Vacate
                </span>
              </label>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              className="w-4 h-4 mr-2"
            />
            <label className="text-sm text-gray-600">
              By submitting, you agree to select{" "}
              <span className="font-bold">{formData.status}</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 w-full">
            <button
              type="button"
              className=" px-4 w-[180px] py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={handleClose} // Close modal
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`w-[180px] px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
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

export default AddResident;
