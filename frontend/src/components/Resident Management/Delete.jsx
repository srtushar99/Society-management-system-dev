import React from "react";

const Delete = ({ isOpen ,  onCancel, onDelete }) => {
  if (!isOpen) return null;  

  return (
    <div className="fixed inset-0 flex items-center justify-center p-2 z-50">
      <div className="bg-white max-w-md p-6 rounded-lg ">
        <h2 className="text-2xl font-bold mb-4">Do you want to vacate the finlay flat?</h2>
      
        <p>Are you sure you want to delate all details?</p>
        <div className="flex gap-4 mt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 w-[180px] bg-[#FFFFFF] rounded-lg border border-black"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 w-[180px]  rounded-lg  bg-[#E74C3C] text-white "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
