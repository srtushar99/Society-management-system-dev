import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import DoneImage from "../assets/done.png";
import F1Img from '../assets/F1.png';
import Ellipsimg from '../assets/Ellipse 1090.png';

const Notification = ({ isOpen, onClose, notifications }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle the Clear All button click
  const handleClearAll = () => {
    onClose(); // Close the notification modal if needed
    navigate("/dashboard"); // Redirect to dashboard after clearing notifications
  };

  // Auto-close the notification after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); // Close the notification pop-up after 5 seconds
        navigate("/dashboard"); // Optionally redirect to the dashboard after closing the pop-up
      }, 5000); // 5000 milliseconds = 5 seconds

      // Cleanup the timer when the component unmounts or when `isOpen` changes
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, navigate]); // Dependency array includes `isOpen` to run effect when it changes

  return (
    <div className="lg:fixed sm:w-[] inset-0 flex sm:ml-5 item-end justify-end sm:justify-start z-100 sm:mt-3">
      <div
        className="rounded-[15px_0_0_0] shadow-lg sm:ml-10 h-[220px] bg-white md:w-[400px] ml-10 sm:top-[100px] md:top-[70px] md:left-[1277px]"
        style={{
          position: "absolute",
        }}
      >
        {/* Modal Header */}
        <div className="flex flex-col items-center w-[500px] p-3 space-y-1 max-w-sm border-gray-200 z-50 rounded-lg">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <h2 className="text-xl sm:text-lg md:text-xl font-semibold">
              Notifications
            </h2>
            <button
              className="text-[#5678E9] ml-[140px] text-sm font-semibold"
              onClick={handleClearAll} // Set the click handler for the "Clear All" button
            >
              Clear All
            </button>
          </div>
          {/* Header */}
          <div className="flex w-full text-gray-700">
            <div className="relative w-8 h-8">
              <img src={Ellipsimg} alt="Ellipse" className="w-12 h-10 absolute" />
              <img
                src={F1Img}
                alt="Facility"
                className="absolute top-3 text-[#E74C3C] left-3 w-3 h-3"
              />
            </div>

            <span className="ml-4 text-lg">New Facility Created</span>
          </div>

          {/* Notification Body */}
          <div className="w-full ml-24 text-gray-800">
            <span className="text-gray-500">Monday 11:41 AM</span>

            <div className="justify-between">
              <span>Name:</span>
              <span className="text-gray-600">Parking Facility</span>
            </div>
            <div className="justify-between">
              <span className="font-medium">Schedule Date:</span>
              <span className="text-gray-600">01/02/2024</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between w-full mt-2">
            <button className="px-3 py-2 lg:ml-[30px] bg-gray-200 border border-[#D3D3D3] text-black rounded-md focus:outline-none">
              View
            </button>
            <button className="px-3 py-2 bg-blue-500 text-gray-700 rounded-md focus:outline-none">
              Ignore
            </button>
            <div className="d-flex text-gray-500 mt-2 ml-10">
              32 minutes ago{" "}
              <img
                src={DoneImage}
                alt="Done"
                className="h-4 w-4 ml-2 sm:h-3 mt-1 sm:w-3"
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
