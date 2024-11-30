import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import payment method images
import masterCardImage from "./Images/Frame.png";
import visaCardImage from "./Images/Group 1000004336.png";
import cashPaymentImage from "./Images/moneys.png";

const CardDetails = ({ isOpen, onClose, onPaymentSuccess, selectedPaymentMethod }) => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [cvv, setCvv] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const modalRef = useRef(null);

  // Map payment methods to their icons
  const paymentIcons = {
    MasterCard: masterCardImage,
    VisaCard: visaCardImage,
    Cash: cashPaymentImage,
  };

  useEffect(() => {
    const cardNameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    const cardNumberRegex = /^\d{16}$/; // Exactly 16 digits
    const cvvRegex = /^\d{3,4}$/; // 3 or 4 digits

    setIsFormValid(
      cardNameRegex.test(cardName) &&
      cardNumberRegex.test(cardNumber) &&
      expiryDate &&
      cvvRegex.test(cvv)
    );
  }, [cardName, cardNumber, expiryDate, cvv]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const cardData = {
        cardName,
        cardNumber,
        expiryDate: expiryDate.toLocaleDateString("en-US"),
        cvv,
      };
      console.log("Card details saved successfully:", cardData);
      onPaymentSuccess();
      onClose();
    } else {
      console.log("Form is invalid");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-opacity-50 z-50 p-4">
      <div ref={modalRef} className="bg-white  max-w-lg mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Enter Card Details</span>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Cardholder Name */}
          <div className="mb-4">
            <label className="block text-left font-medium text-[#202224] mb-1">
              Card Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Cardholder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              required
            />
          </div>

          {/* Card Number */}
          <div className="relative mb-4">
            <label className="block text-left font-medium text-[#202224] mb-1">
              Card Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              maxLength={16}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-12"
              required
            />
            {selectedPaymentMethod && (
              <img
                src={paymentIcons[selectedPaymentMethod]}
                alt={selectedPaymentMethod}
                className="absolute right-3 top-11 transform -translate-y-1/2 w-5 h-5"
              />
            )}
          </div>

          {/* Expiry Date and CVV */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Expiry Date<span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={expiryDate}
                onChange={(date) => setExpiryDate(date)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                placeholderText="MM/YY"
                dateFormat="MM/yy"
                showMonthYearPicker
              />
            </div>

            {/* CVV */}
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                CVV<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                maxLength={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-1">
            <button
              type="button"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full px-4 py-2 rounded-lg ${isFormValid ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white" : "bg-[#F6F8FB] text-[#202224] cursor-not-allowed"}`}
              disabled={!isFormValid}
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardDetails;
