import React from 'react';
import axiosInstance from '../Common/axiosInstance';

const DeleteGuard = ({ isOpen, onCancel, Guard, onDelete, fetchSecurityGuard }) => {
  // If the modal isn't open, return null (don't render anything)
  if (!isOpen) return null;

  // const handleDelete = () => {
  //   if (Guard) {
  //     onDelete(Guard.id); // Assuming `protocol` has an `id` property
  //   }
  //   onCancel(); // Close the modal after deletion
  // };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/v2/security/deletesecurity/${Guard._id}`);
      if (response.status === 200) {
        onDelete(Guard); 
        onCancel();
        fetchSecurityGuard();
      }
    } catch (error) {
      console.error('Error deleting Guard:', error);
    }
  };

  const handleCancel = () => {
    onCancel(); // Close the modal without deleting
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Delete Security</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleCancel} // Close the modal
          >
            <span className="text-xl">X</span>
          </button>
        </div>

        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Are you sure you want to delete this Security Guard?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteGuard;