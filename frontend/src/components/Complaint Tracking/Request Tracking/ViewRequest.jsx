import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AvatarImage from '../../assets/Avatar.png';
import AIcon from "../../assets/A.png";
import BIcon from "../../assets/B.png";
import CIcon from "../../assets/C.png";
import DIcon from "../../assets/D.png";
import EIcon from "../../assets/E.png";
import FIcon from "../../assets/F.png";
import GIcon from "../../assets/G.png";
import HIcon from "../../assets/H.png";
import IIcon from "../../assets/I.png"; // Import useNavigate for redirection

const ViewRequest = ({ protocol, onClose }) => {
  if (!protocol) return null; // Ensure complaint exists

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate(); // Hook to handle redirection

  // Define images for each unit
  const unitImages = {
    1001: AIcon,
    1002: BIcon,
    1003: CIcon,
    1004: DIcon,
    2001: EIcon,
    2002: FIcon,
    2003: GIcon,
    2004: HIcon,
    3001: IIcon,
    3002: AIcon,
    3003: BIcon,
  };

  // Function to handle closing the modal and redirecting to the requesttracking page
  const handleClose = () => {
    if (onClose) onClose(); // Close the modal
    navigate("/requesttracking"); // Redirect to the requesttracking page
  };

  // Badge component for displaying priority and status
  const Badge = ({ children, className }) => (
    <span
      className={`px-2 py-2 pe-10 text-xs font-semibold ${className}`}
      style={{
        borderRadius: "15px",
        minWidth: "80px",
        textAlign: "center",
      }}
    >
      {children}
    </span>
  );

  const handleConfirmClose = () => {
    setIsConfirmationOpen(false); // Close confirmation modal
  
  };

  const handleCancelClose = () => {
    setIsConfirmationOpen(false); // Close confirmation modal without closing the main modal
  };

  // Set the image for the unit based on protocol.unit
  const unitImageSrc = unitImages[protocol.unit] || "/fallback-avatar.png"; 

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-[450px] max-w-3xl mx-auto p-6 rounded-lg shadow-lg overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 ">
            <h1 className="text-2xl font-bold text-gray-900">View Request</h1>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={handleClose} // On click, close modal and navigate to requesttracking
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src={AvatarImage}
              alt={protocol.Complainername}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg text-gray-900">{protocol.Requestername}</h2>
              <p className="text-gray-500 text-sm">Aug 5, 2024</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-500 text-sm mb-1">Request Name</h3>
              <p className="font-medium text-gray-900">{protocol.Requestname}</p>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm mb-1">Description</h3>
              <p className="font-medium text-gray-900">{protocol.description}</p>
            </div>

            {/* Wing, Unit, Priority, Status on the same line */}
            <div className="grid grid-cols-4 gap-x-1 gap-y-1">
              <div>
                <h3 className="text-gray-500 text-sm mb-1">Wing</h3>
                <img
                  src={unitImageSrc}
                  alt="Unit Icon"
                  className="w-6 ml-2 h-6 rounded-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1">Unit</h3>
                <p className="font-medium text-gray-900">{protocol.unit || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1 ml-2">Priority</h3>
                <Badge
                  className={
                    protocol.priority === "High"
                      ? "bg-[#E74C3C] text-white" // High priority: Red background, white text
                      : protocol.priority === "Medium"
                      ? "bg-[#5678E9] text-white" // Medium priority: Blue background, white text
                      : "bg-[#39973D] text-white"
                  }
                >
                  {protocol.priority}
                </Badge>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1 ml-2">Status</h3>
                <Badge
                  className={
                    protocol.status === "Open"
                      ? "bg-[#5678E91A] text-blue-800"
                      : protocol.status === "Pending"
                      ? "bg-[#FFC3131A] text-warning"
                      : "bg-[#39973D1A] text-green-800"
                  }
                >
                  {protocol.status}
                </Badge>
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

export default ViewRequest;
