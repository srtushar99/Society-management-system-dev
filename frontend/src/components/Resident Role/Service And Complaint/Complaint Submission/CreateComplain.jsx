import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../Common/axiosInstance';

const CreateComplain = ({ isOpen, onClose, fetchComplaint }) => {
  // State for the input fields
  const [Complainer_name, setComplainer_name] = useState("");
  const [Complaint_name, setComplaint_name] = useState("");
  const [Description, setDescription] = useState("");
  const [Wing, setWing] = useState(""); 
  const [Unit, setUnit] = useState(""); 
  const [Priority, setPriority] = useState("High");
  const [Status, setStatus] = useState("Open");

  const modalRef = useRef(null);

  // Regex for validation
  const nameRegex = /^[A-Za-z\s]+$/; 
  const descriptionRegex = /^[A-Za-z\s]+$/; 
  const unitRegex = /^[0-9]+$/; 
  const wingRegex = /^[A-Za-z\s]+$/; 

  // Form validation
  const isFormValid =
    Complainer_name &&
    Complaint_name &&
    Description &&
    Wing &&
    Unit &&
    nameRegex.test(Complainer_name) &&
    nameRegex.test(Complaint_name) &&
    wingRegex.test(Wing) &&
    unitRegex.test(Unit) &&
    descriptionRegex.test(Description);

  const navigate = useNavigate();

  const ClearAllData = () => {
    setComplainer_name("");
    setComplaint_name("");
    setDescription("");
    setWing("");
    setUnit("");
    setPriority("High");
    setStatus("Open");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const ComplaintData = {
       Complainer_name,
       Complaint_name,
       Description,
       Wing,
       Unit,
       Priority,
       Status
      };
      try {
        const response = await axiosInstance.post(
          "/v2/complaint/addcomplaint",
          ComplaintData
        );
        if (response.status === 201) {
          console.log("Successfully saved:", response.data);
          fetchComplaint();
          onClose(); 
          ClearAllData();
        } else {
          const errorData = await response.json();
          console.error("Error saving number:", errorData.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error creating Complaint:", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  const handleClose = () => {
    if (onClose) onClose(); 
    navigate("/complain"); 
    ClearAllData();
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

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
      className="fixed inset-0 2xl:flex 2xl:justify-center  items-center bg-black bg-opacity-50 2x:z-50 p-4"
    >
      <div className="bg-white max-w-lg sm:max-w-md mx-auto mt-20 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between   items-center mb-6">
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
              value={Complainer_name}
              onChange={(e) => {
                const value = e.target.value;
                if (nameRegex.test(value) || value === "") {
                  setComplainer_name(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] text-sm sm:text-base"
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
              value={Complaint_name}
              onChange={(e) => {
                const value = e.target.value;
                if (nameRegex.test(value) || value === "") {
                  setComplaint_name(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] text-sm sm:text-base"
            />
          </div>

          {/* Description */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] resize-none text-sm sm:text-base"
            />
          </div>

          {/* Wing and Unit */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-left font-medium text-gray-700 mb-1">
                Wing<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={Wing}
                onChange={(e) => {
                  const value = e.target.value;
                  if (wingRegex.test(value) || value === "") {
                    setWing(value);
                  }
                }}
                className="w-full sm:w-[200px] 2xl:w-[190px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] text-sm sm:text-base"
              />
            </div>
            <div className="flex-1">
              <label className="block text-left font-medium text-gray-700 mb-1">
                Unit<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={Unit}
                onChange={(e) => {
                  const value = e.target.value;
                  if (unitRegex.test(value) || value === "") {
                    setUnit(value);
                  }
                }}
                className="w-full sm:w-[200px] 2xl:w-[190px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] text-sm sm:text-base"
              />
            </div>
          </div>


          {/* Priority */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Priority<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 w-full">
              {/* High Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#FE512E] rounded-[10px]">
                <input
                  type="radio"
                  name="Priority"
                  value="High"
                  checked={Priority === "High"}
                  onChange={() => setPriority("High")}
                  className={`w-4 h-4 border-2 ${Priority === "High" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#D3D3D3]"}`}
                />
                <span className={`ml-2 text-sm ${Priority === "High" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>High</span>
              </label>

              {/* Medium Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#FFEB3B] rounded-[10px]">
                <input
                  type="radio"
                  name="Priority"
                  value="Medium"
                  checked={Priority === "Medium"}
                  onChange={() => setPriority("Medium")}
                  className={`w-4 h-4 border-2 ${Priority === "Medium" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#D3D3D3]"}`}
                />
                <span className={`ml-2 text-sm ${Priority === "Medium" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Medium</span>
              </label>

              {/* Low Priority */}
              <label className="flex items-center w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border border-[#4CAF50] rounded-[10px]">
                <input
                  type="radio"
                  name="Priority"
                  value="Low"
                  checked={Priority === "Low"}
                  onChange={() => setPriority("Low")}
                  className={`w-4 h-4 border-2 ${Priority === "Low" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#D3D3D3]"}`}
                />
                <span className={`ml-2 text-sm ${Priority === "Low" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Low</span>
              </label>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Status<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 w-full">
              {/* Open Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="Status"
                  value="Open"
                  checked={Status === "Open"}
                  onChange={() => setStatus("Open")}
                  className={`w-4 h-4 border-2 ${Status === "Open" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#4CAF50]"}`}
                />
                <span className={`ml-2 text-sm ${Status === "Open" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Open</span>
              </label>

              {/* Pending Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="Status"
                  value="Pending"
                  checked={Status === "Pending"}
                  onChange={() => setStatus("Pending")}
                  className={`w-4 h-4 border-2 ${Status === "Pending" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#FFEB3B]"}`}
                />
                <span className={`ml-2 text-sm ${Status === "Pending" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Pending</span>
              </label>

              {/* Solve Status */}
              <label className="flex items-center border rounded w-[113px] h-[41px] px-[15px] py-[10px] gap-[10px] border-t border-l border-r border-transparent rounded-tl-[10px] opacity-100">
                <input
                  type="radio"
                  name="Status"
                  value="Solve"
                  checked={Status === "Solve"}
                  onChange={() => setStatus("Solve")}
                  className={`w-4 h-4 border-2 ${Status === "Solve" ? "border-transparent bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "border-[#F44336]"}`}
                />
                <span className={`ml-2 text-sm ${Status === "Solve" ? "text-[#202224]" : "text-[#D3D3D3]"}`}>Solve</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="lg:w-[200px] sm:w-1/2 md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`lg:w-[200px]  sm:w-1/2 md:w-1/3 px-4 py-2 rounded-lg ${isFormValid ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]" : "bg-[#F6F8FB] text-[#202224]"}`}
              disabled={!isFormValid}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComplain;
