import React from 'react';

const UpdateMaintenance = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Update Maintenance</h2>
        <p>Update the maintenance details here.</p>
        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose} // Close the modal
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMaintenance;