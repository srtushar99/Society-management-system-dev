import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import PayNow from "./PayNow";

const GetPass = ({ isOpen, onClose, selectedMember, fetchAnnouncement }) => {
  const [membersCount, setMembersCount] = useState(selectedMember || 0); 
  const [totalAmount, setTotalAmount] = useState(membersCount * 1500); 
  const [isFormValid, setIsFormValid] = useState(membersCount > 0); 
  const [isPayNowOpen, setIsPayNowOpen] = useState(false); // State to control the PayNow modal
  const modalRef = useRef(null);
  const perPersonAmount = 1500;

  const handleMembersCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMembersCount(value);

    if (value > 0) {
      setIsFormValid(true);
      setTotalAmount(value * perPersonAmount);
    } else {
      setIsFormValid(false);
      setTotalAmount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      const announcementData = {
        membersCount,
        amount: perPersonAmount,
        totalAmount,
      };

      try {
        const response = await axiosInstance.post(
          "/v2/annoucement/addannouncement", 
          announcementData
        );
        if (response.status === 201) {
          fetchAnnouncement();
          onClose();
        } else {
          console.error("Error saving announcement:", response.data.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error creating announcement:", error);
      }
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handlePayNow = () => {
    setIsPayNowOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPayNowOpen(false); // Close the PayNow modal on successful payment
    console.log("Payment successful!");
    // Do something after payment (like navigating back or resetting form)
    onClose(); // Close the GetPass modal
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 p-4"
    >
      <div className="bg-white w-full sm:max-w-md mx-auto p-6 rounded-lg ">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">
            Detail of the Per Person
          </span>
       
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Display Per Person Amount */}
          <div className="flex justify-between items-center">
            <label className="block text-left font-medium text-[#202224] mb-1">
              Per Person Amount :
            </label>
            <span className="text-[#202224] ">{perPersonAmount}</span>
          </div>

          {/* Input for Number of Members */}
          <div className="flex justify-between">
            <label className=" text-left font-medium text-[#202224] mb-1">
              Total Member<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-between items-center">
              <span className="text-[#202224] ">{membersCount}</span>
            </div>
          </div>

          {/* Display Total Amount */}
          <div className="flex justify-between items-center">
            <label className="block text-left font-medium text-[#202224] mb-1">
              Total Amount :
            </label>
            <span className="text-[#202224] ">₹{totalAmount}</span>
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="w-full sm:w-[48%] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
              onClick={handlePayNow} 
              disabled={!isFormValid}
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>

      {/* Conditionally render the PayNowPage modal */}
      {isPayNowOpen && (
        <PayNow
          totalAmount={totalAmount} 
          onClose={() => setIsPayNowOpen(false)} 
          onPaymentSuccess={handlePaymentSuccess} 
        />
      )}
    </div>
  );
};

export default GetPass;
