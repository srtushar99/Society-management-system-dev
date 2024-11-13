import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateTracking = ({ isOpen, onClose }) => {
  // State for the input fields
  const [complainerName, setComplainerName] = useState("");
  const [complaintName, setComplaintName] = useState("");
  const [description, setDescription] = useState("");
  const [wing, setWing] = useState(""); // Corrected state for 'wing'
  const [unit, setUnit] = useState(""); // Corrected state for 'unit'
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Open");

  const modalRef = useRef(null);

  // Regex for validation
  const nameRegex = /^[A-Za-z\s]+$/; // Validate names with only letters and spaces
  const descriptionRegex = /^[A-Za-z\s]+$/; // Validate description with letters and spaces only
  const unitRegex = /^[0-9]+$/; // Validate unit with only numbers
  const wingRegex = /^[A-Za-z\s]+$/; // Validate wing with only alphabets

  // Form validation
  const isFormValid =
    complainerName &&
    complaintName &&
    description &&
    wing &&
    unit &&
    nameRegex.test(complainerName) &&
    nameRegex.test(complaintName) &&
    wingRegex.test(wing) &&
    unitRegex.test(unit) &&
    descriptionRegex.test(description);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form Submitted", {
        complainerName,
        complaintName,
        description,
        wing,
        unit,
        priority,
        status,
      });
      // Handle form submission logic here
    } else {
      console.log("Form is invalid");
    }
  };

  const handleClose = () => {
    if (onClose) onClose(); // Close the modal
    navigate("/complaints-Tracking"); // Redirect to complaints tracking page
  };

  const handleClickOutside = (e) => {
    // Check if the click was outside the modal
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      // Close the modal if clicked outside
      handleClose();
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
    <div
      ref={modalRef}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4"
    >
      <div className="bg-white max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Create Complaint</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Complainer Name */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Complainer Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Complainer Name"
              value={complainerName}
              onChange={(e) => {
                const value = e.target.value;
                if (nameRegex.test(value) || value === "") {
                  setComplainerName(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Complaint Name */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Complaint Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Complaint Name"
              value={complaintName}
              onChange={(e) => {
                const value = e.target.value;
                if (nameRegex.test(value) || value === "") {
                  setComplaintName(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => {
                const value = e.target.value;
                if (descriptionRegex.test(value) || value === "") {
                  setDescription(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] resize-none"
            />
          </div>

          {/* Wing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-left font-medium text-gray-700 mb-1">
                Wing<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={wing}
                onChange={(e) => {
                  const value = e.target.value;
                  if (wingRegex.test(value) || value === "") {
                    setWing(value);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              />
            </div>
            <div>
              <label className="block text-left font-medium text-gray-700 mb-1">
                Unit<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => {
                  const value = e.target.value;
                  if (unitRegex.test(value) || value === "") {
                    setUnit(value);
                  }
                }}
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
                  name="priority"
                  value="High"
                  checked={priority === "High"}
                  onChange={() => setPriority("High")}
                  className={`w-4 h-4 border-2 ${priority === "High" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#D3D3D3]"}`}
                />
                <span className={`ml-2 text-sm ${priority === "High" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>High</span>
              </label>

              {/* Medium Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#FFEB3B] rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={priority === "Medium"}
                  onChange={() => setPriority("Medium")}
                  className={`w-4 h-4 border-2 ${priority === "Medium" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#D3D3D3]"}`}
                />
                <span className={`ml-2 text-sm ${priority === "Medium" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Medium</span>
              </label>

              {/* Low Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#4CAF50] rounded-[10px]">
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={priority === "Low"}
                  onChange={() => setPriority("Low")}
                  className={`w-4 h-4 border-2 ${priority === "Low" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#D3D3D3]"}`}
                />
                <span className={`ml-2 text-sm ${priority === "Low" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Low</span>
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
                  name="status"
                  value="Open"
                  checked={status === "Open"}
                  onChange={() => setStatus("Open")}
                  className={`w-4 h-4 border-2 ${status === "Open" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#4CAF50]"}`}
                />
                <span className={`ml-2 text-sm ${status === "Open" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Open</span>
              </label>

              {/* Pending Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="status"
                  value="Pending"
                  checked={status === "Pending"}
                  onChange={() => setStatus("Pending")}
                  className={`w-4 h-4 border-2 ${status === "Pending" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#FFEB3B]"}`}
                />
                <span className={`ml-2 text-sm ${status === "Pending" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Pending</span>
              </label>

              {/* Solve Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="status"
                  value="Solve"
                  checked={status === "Solve"}
                  onChange={() => setStatus("Solve")}
                  className={`w-4 h-4 border-2 ${status === "Solve" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#F44336]"}`}
                />
                <span className={`ml-2 text-sm ${status === "Solve" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Solve</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="w-full sm:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
              disabled={!isFormValid}
            >
              {isFormValid ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTracking;
