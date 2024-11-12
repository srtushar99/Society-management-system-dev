import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const ViewComplain = ({ complaint, onClose }) => {
  if (!complaint) return null; // Ensure complaint exists

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate(); // Hook to handle redirection

  // Function to determine badge colors for priority and status
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Solve':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };


  const handleClose = () => {
    onClose(); // Close modal
    navigate("/dashboard"); // Redirect to dashboard
  };


  const handleConfirmClose = () => {
    setIsConfirmationOpen(false); // Close confirmation modal
    navigate('/dashboard'); // Redirect to the dashboard
  };

  const handleCancelClose = () => {
    setIsConfirmationOpen(false); // Close confirmation modal without closing the main modal
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-[450px] max-w-3xl mx-auto p-6 rounded-lg shadow-lg overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 ">
            <h1 className="text-2xl font-bold text-gray-900">View Complain</h1>
            <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src={complaint.complainer.avatar || '/fallback-avatar.png'}
              alt={complaint.complainer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg text-gray-900">{complaint.complainer.name}</h2>
              <p className="text-gray-500 text-sm">{complaint.date}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-500 text-sm mb-1">Complaint Name</h3>
              <p className="font-medium text-gray-900">{complaint.complaintName}</p>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm mb-1">Description</h3>
              <p className="font-medium text-gray-900">{complaint.description}</p>
            </div>

            {/* Wing, Unit, Priority, Status on the same line */}
            <div className="grid grid-cols-4 gap-x-1 gap-y-1">
              <div>
                <h3 className="text-gray-500 text-sm mb-1">Wing</h3>
                <p className="font-medium text-gray-900">{complaint.wing || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1">Unit</h3>
                <p className="font-medium text-gray-900">{complaint.unit || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1">Priority</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority}
                </span>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1">Status</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-60">
          <div className="bg-white w-[350px] mx-auto p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Are you sure you want to close?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Yes, Close
              </button>
              <button
                onClick={handleCancelClose}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewComplain;
