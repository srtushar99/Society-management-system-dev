import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoneImage from "../assets/done.png";
const Notification = ({ isOpen, onClose, notifications }) => {
  const [isNoNotificationOpen, setIsNoNotificationOpen] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState();

  return (
    <div className="lg:fixed sm:w-[] inset-0 flex sm:ml-5 item-end   justify-end  sm:justify-start z-50 bg-opacity-100   sm:mt-3">
      <div
        className=" rounded-[15px_0_0_0] shadow-lg p-10 sm:ml-10  sm:w-[90%] md:w-[540px] max-h-[90vh] ml-10 sm:top-[100px] md:top-[79px]  md:left-[1177px] "
        style={{
          position: "absolute",
        }}
      >
        {/* Modal Header */}
        <div className="flex flex-col items-center w-[600px] p-4 space-y-4 max-w-sm mx-auto  bg-opacity-100    border-gray-200 shadow-md rounded-lg">
          <div className="flex justify-between items-center  mb-2 sm:mb-3">
            <h2 className="text-xl sm:text-lg md:text-xl font-semibold">
              Notifications
            </h2>
            <button
              className="text-[#5678E9] ml-[140px] text-sm font-semibold"
              // Clear all notifications and close the modal
            >
              Clear All
            </button>
          </div>
          {/* Header */}
          <div className="flex justify-between w-full text-gray-700">
            <span className=" text-lg">New Facility Created</span>
          </div>

          {/* Notification Body */}
          <div className="w-full text-gray-800">
            <span className=" text-gray-500">Monday 11:41 AM</span>

            <div className=" justify-between mt-2">
              <span className="">Name:</span>
              <span className="text-gray-600">Parking Facility</span>
            </div>
            <div className=" justify-between mt-2">
              <span className="font-medium">Schedule Date:</span>
              <span className="text-gray-600">01/02/2024</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between w-full mt-4 space-x-4">
            <button className="px-4 py-2 bg-gray-200 text-black border-1 rounded-md  focus:outline-none">
              View
            </button>
            <button className="px-4 py-2 bg-blue-500 text-gray-700 rounded-md focus:outline-none">
              Ignore
            </button>
            <div className="text-sm d-flex text-gray-500 mt-2 ml-3">
              32 minutes ago{" "}
              <img
                src={DoneImage}
                alt="Done"
                className="h-4 w-4 ml-1 sm:h-3 mt-1 sm:w-3"
                style={{ 
                  filter:
                    "invert(41%) sepia(78%) saturate(1800%) hue-rotate(183deg) brightness(102%) contrast(88%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
