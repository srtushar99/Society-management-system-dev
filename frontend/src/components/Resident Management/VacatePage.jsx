import React, { useState } from "react";
import Delete from "./Delete"; 
import { useNavigate } from "react-router-dom";

const VacatePage = ({ isOpen, onClose }) => {
  const [wing, setWing] = useState('');
  const [unit, setUnit] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); 
  const navigate = useNavigate(); 
  const isFormValid = wing && unit;

  if (!isOpen) return null;

  const handleSave = () => {
    // Show the delete modal upon saving
    setIsDeleteOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteOpen(false); // Close the delete modal
  };

  const handleDeleteConfirm = () => {
    console.log(`Wing: ${wing}, Unit: ${unit} has been vacated.`);
    setIsDeleteOpen(false); 
    onClose(); 
    navigate("/Resident-Manegement"); 
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Resident Status</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="wing" className="block text-left font-medium text-gray-700 mb-1">
                Wing<span className="text-red-500">*</span>
              </label>
              <select
                name="wing"
                id="wing"
                value={wing}
                onChange={(e) => setWing(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Wing</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div>
              <label htmlFor="unit" className="block text-left font-medium text-gray-700 mb-1">
                Unit<span className="text-red-500">*</span>
              </label>
              <select
                name="unit"
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Unit</option>
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-21 w-full">
            <button
              type="button"
              className="px-4 w-[180px] py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className={`w-[180px] px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
              disabled={!isFormValid}
              onClick={handleSave}  // Call handleSave on click
            >
              Save
            </button>
          </div>

        </div>

        {/* Render Delete modal if isDeleteOpen is true */}
        <Delete
          isOpen={isDeleteOpen}
          wing={wing}
          unit={unit}
          onCancel={handleDeleteCancel}
          onDelete={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default VacatePage;