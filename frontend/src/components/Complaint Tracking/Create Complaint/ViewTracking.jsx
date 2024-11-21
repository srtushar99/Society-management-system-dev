import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AvatarImage from '../../assets/Avatar.png' 
import AIcon from "../../assets/A.png";
import BIcon from "../../assets/B.png";
import CIcon from "../../assets/C.png";
import DIcon from "../../assets/D.png";
import EIcon from "../../assets/E.png";
import FIcon from "../../assets/F.png";
import GIcon from "../../assets/G.png";
import HIcon from "../../assets/H.png";
import IIcon from "../../assets/I.png";// Import useNavigate for redirection
import moment from 'moment';

const ViewTracking = ({ isOpen, onClose, protocol }) => {
  if (!protocol) return null; // Ensure complaint exists

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate(); // Hook to handle redirection

  // Function to determine badge colors for priority and status

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
  const handleClose = () => {
    onClose(); // Close modal
    navigate("/createcomplaint"); // Redirect to dashboard
  };

  const Badge = ({ children, className }) => (
    <span
      className={`px-2 py-2  pe-10 text-xs font-semibold ${className}`} // Added px-4 to give consistent padding
      style={{ 
        borderRadius: "15px", 
       // Ensure it's displayed as an inline-block
        minWidth: "80px", // Set a minimum width to ensure consistency
        textAlign: "center" // Center text within the badge
      }}
    >
      {children}
    </span>
  );
  



  const handleCancelClose = () => {
    setIsConfirmationOpen(false); // Close confirmation modal without closing the main modal
  };
 
  const unitImageSrc = unitImages[protocol.unit] || "/fallback-avatar.png"; 

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
              src={AvatarImage}
              alt={protocol.Complainername}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg text-gray-900">{protocol.Complainer_name}</h2>
              <p className="text-gray-500 text-sm">{moment(protocol.createdAt).format("MMM D, YYYY")}</p>
          
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-500 text-sm mb-1">Request Name</h3>
              <p className="font-medium text-gray-900">{protocol.Complaint_name}</p>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm mb-1">Description</h3>
              <p className="font-medium text-gray-900">{protocol.Description}</p>
            </div>

            {/* Wing, Unit, Priority, Status on the same line */}
            <div className="grid grid-cols-4 gap-x-1 gap-y-1">
              <div>
                <h3 className="text-gray-500 text-sm mb-1">Wing</h3>
                {/* <img
                  src={unitImageSrc}
                  alt="Unit Icon"
                  className="w-6 ml-2 h-6 rounded-full object-cover"
                /> */}
                <p className="font-medium text-gray-900">{protocol.Wing}</p>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1">Unit</h3>
                <p className="font-medium text-gray-900">{protocol.Unit || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1 ml-2">Priority</h3>
                <Badge
                      className={
                        protocol.Priority === "High"
                          ? "bg-[#E74C3C] text-white" // High priority: Red background, white text
                          : protocol.Priority === "Medium"
                          ? "bg-[#5678E9] text-white" // Medium priority: Blue background, white text
                          : "bg-[#39973D] text-white"
                      }
                    >
                      {protocol.Priority}
                    </Badge>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1 ml-2"  >Status</h3>
            
                <Badge
                    className={
                      protocol.Status === 'Open'
                        ? 'bg-[#5678E91A] text-blue-800'
                        : protocol.Status === 'Pending'
                        ? 'bg-[#FFC3131A] text-warning'
                        : 'bg-[#39973D1A] text-green-800'
                    }
                  >
                    {protocol.Status}
                  </Badge>
               
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default ViewTracking;
