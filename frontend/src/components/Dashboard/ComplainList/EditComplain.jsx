import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // Close icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axiosInstance from '../../Common/axiosInstance';

const EditComplain = ({ isOpen, complaint, onClose, fetchComplaint }) => {
  // States to hold form values
  const [formData, setFormData] = useState({
    Complainer_name: "",
    Complaint_name: "",
    Description: "",
    Wing: "",
    Unit: "",
    Priority: "",
    Status: "",
  });

  const isFormValid =
    formData.Complainer_name &&
    formData.Complaint_name &&
    formData.Description &&
    formData.Unit;


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log(formData);
      
      try {
        const response = await axiosInstance.put(`/v2/complaint/updatecomplaint/${complaint._id}`, formData);
        if(!!response.data){
          fetchComplaint(); 
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
    onClose(); // Close modal
    navigate("/dashboard"); // Redirect to dashboard
  };

  useEffect(() => {
    if (isOpen && complaint) {
      setFormData(complaint);
    }
  }, [isOpen, complaint]);


  if (!isOpen) return null; // Don't render if modal is not open

  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">
            Edit Complaint
          </span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Complainer Name */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Complainer Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Complainer_name"
              value={formData.Complainer_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Complaint Name */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Complaint Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Complaint_name"
              value={formData.Complaint_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Wing and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-left font-medium text-gray-700 mb-1">
                Wing<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="Wing"
                value={formData.Wing}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              />
            </div>
            <div>
              <label className="block text-left font-medium text-gray-700 mb-1">
                Unit<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="Unit"
                value={formData.Unit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Priority<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6 w-full">
              {/* High Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#FE512E] rounded-[10px]">
                <input
                  type="radio"
                  name="Priority"
                  value="High"
                  checked={formData.Priority === "High"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.Priority === "High"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#D3D3D3]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.Priority === "High"
                      ? "text-[#202224]"
                      : "text-[#D3D3D3]"
                  }`}
                >
                  High
                </span>
              </label>

              {/* Medium Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#FFEB3B] rounded-[10px]">
                <input
                  type="radio"
                  name="Priority"
                  value="Medium"
                  checked={formData.Priority === "Medium"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.Priority === "Medium"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#D3D3D3]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.Priority === "Medium"
                      ? "text-[#202224]"
                      : "text-[#D3D3D3]"
                  }`}
                >
                  Medium
                </span>
              </label>

              {/* Low Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#4CAF50] rounded-[10px]">
                <input
                  type="radio"
                  name="Priority"
                  value="Low"
                  checked={formData.Priority === "Low"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.Priority === "Low"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#D3D3D3]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.Priority === "Low"
                      ? "text-[#202224]"
                      : "text-[#D3D3D3]"
                  }`}
                >
                  Low
                </span>
              </label>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Status<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6 w-full">
              {/* Open Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="Status"
                  value="Open"
                  checked={formData.Status === "Open"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.Status === "Open"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#4CAF50]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.Status === "Open"
                      ? "text-[#202224]"
                      : "text-[#D3D3D3]"
                  }`}
                >
                  Open
                </span>
              </label>

              {/* Pending Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="Status"
                  value="Pending"
                  checked={formData.Status === "Pending"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.Status === "Pending"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#FFEB3B]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.Status === "Pending"
                      ? "text-[#202224]"
                      : "text-[#D3D3D3]"
                  }`}
                >
                  Pending
                </span>
              </label>

              {/* Solve Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="Status"
                  value="Solve"
                  checked={formData.Status === "Solve"}
                  onChange={handleChange}
                  className={`w-4 h-4 border-2 ${
                    formData.Status === "Solve"
                      ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                      : "border-[#F44336]"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    formData.Status === "Solve"
                      ? "text-[#202224]"
                      : "text-[#D3D3D3]"
                  }`}
                >
                  Solve
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 w-full">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={handleClose} // Close modal
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg w-full ${
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

export default EditComplain;