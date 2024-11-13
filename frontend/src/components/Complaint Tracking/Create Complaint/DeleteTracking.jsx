import React from 'react';

const DeleteTracking = ({ isOpen, protocol, onDelete, onCancel }) => {
  // If the modal isn't open, return null (don't render anything)
  if (!isOpen) return null;

  const handleDelete = () => {
    if (protocol && onDelete) {
      onDelete(protocol); // Call the onDelete function passed from parent
    }
    onCancel(); // Close the modal after deletion
  };

  const handleCancel = () => {
    onCancel(); // Close the modal without deleting
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md sm:max-w-[90%] md:max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Delete Complain</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleCancel} // Close the modal
          >
            <span className="text-xl">X</span>
          </button>
        </div>

        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Are you sure you want to delete this complaint?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            onClick={handleCancel}
            className="w-full sm:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="w-full sm:w-[48%] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTracking;
