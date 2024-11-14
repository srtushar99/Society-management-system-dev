import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // Importing date-fns for formatting
import AvatarImage from "../../assets/Avatar.png";
import UserIcon from "../../assets/User.png";
import AIcon from "../../assets/A.png";
import BIcon from "../../assets/B.png";
import CIcon from "../../assets/C.png";
import DIcon from "../../assets/D.png";
import EIcon from "../../assets/E.png";
import FIcon from "../../assets/F.png";
import GIcon from "../../assets/G.png";
import HIcon from "../../assets/H.png";
import IIcon from "../../assets/I.png";
import WalletIcon from "../../assets/wallet.png";
import MoneysIcon from "../../assets/moneys.png";
import TimerIcon from "../../assets/timer.png";
import VerifiedIcon from "../../assets/verified.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ViewMaintenance = ({ maintenance, onClose, isOpen }) => {
  if (!isOpen || !maintenance) return null;

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();

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
    navigate("/income"); // Redirect to dashboard
  };

  const handleConfirmClose = () => {
    setIsConfirmationOpen(false); // Close confirmation modal
    navigate("/income"); // Redirect to the dashboard
  };

  const handleCancelClose = () => {
    setIsConfirmationOpen(false); // Close confirmation modal without closing the main modal
  };

  // Format the maintenance date (if it exists)
  const formattedDate = maintenance.date
    ? format(new Date(maintenance.date), "MMMM dd, yyyy")
    : "Unknown Date";

  // Get the correct image based on the maintenance.unit
  const unitImageSrc = unitImages[maintenance.unit] || "/fallback-avatar.png"; // Default to fallback image if not found

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-[450px] max-w-3xl mx-auto p-6 rounded-lg shadow-lg overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              View Maintenance Details
            </h1>
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
              src={AvatarImage || "/fallback-avatar.png"}
              alt={maintenance.name || "Unknown"}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg text-gray-900">
                {maintenance.name || "Unknown"}
              </h2>
              <p className="text-gray-500 text-sm">{formattedDate}</p>{" "}
              {/* Display formatted date */}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Wing, Unit, Priority, Status on the same line */}
            <div className="grid grid-cols-4 gap-x-1 gap-y-1">
              <div>
                <h3 className="text-gray-500 text-sm mb-1">Wing</h3>
                {/* Show the unit image */}
                <img
                  src={unitImageSrc}
                  alt="Unit Icon"
                  className="w-6 ml-2 h-6 rounded-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1" >Unit</h3>
                <p className="font-medium text-gray-900  ">
                  {maintenance.unit || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1 ml-4">Priority</h3>

                <span
                  className={`px-3 py-1 rounded-full   text-xs font-semibold flex items-center ${
                    maintenance.role === "Tenant"
                      ? "bg-pink-100 text-pink-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {maintenance.role === "Tenant" ? (
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                  ) : (
                    <img src={UserIcon} className="mr-2 w-3 h-3" /> // Ensuring consistent width and height
                  )}
                  {maintenance.role}
                </span>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1 ml-7">Amount</h3>
                <span className="inline-block px-3 py-1 rounded-full text-sm ml-4 text-[#39973D]">
                  {maintenance.amount || "N/A"}
                </span>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1">Penalty</h3>
                <span
                  className='inline-block px-3 py-1 rounded-full text-sm bg-[#F6F8FB]' >
                  {maintenance.penalty || "N/A"}
                </span>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1 lg:ml-[50%]">Status</h3>
                <span
                          className={`px-2 py-1 rounded-full text-xs w-[40px] lg:ml-[30%] flex font-semibold ${
                            maintenance.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                          style={{ width: "100px", height: "20px" }}
                        >
                          {maintenance.status === "Pending" ? (
                            <img
                              src={TimerIcon}
                              className="mr-2 text-[#FFC313]"
                            />
                          ) : (
                            <img
                              src={VerifiedIcon}
                              className="mr-2 text-[#39973D]"
                            />
                          )}
                          {maintenance.status}
                        </span>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm mb-1 lg:ml-[130px]">Payment</h3>
                <span
                          style={{ width: "80px", height: "20px",marginLeft:"120px" }}
                          className={`px-2 py-1 rounded-full text-xs flex font-semibold ${
                            maintenance.payment === "Online"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {maintenance.payment === "Online" ? (
                            <img
                              src={WalletIcon}
                              className="mr-2  text-[#5678E9]"
                            />
                          ) : (
                            <img
                              src={MoneysIcon}
                              className="mr-2  text-[#202224]"
                            />
                          )}
                          {maintenance.payment}
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Are you sure you want to close?
            </h2>
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

export default ViewMaintenance;
