import React, { useState } from "react";
import axiosInstance from "../../../Common/axiosInstance";

// Image assets for payment methods
import masterCardImage from "./Images/Frame.png";
import visaCardImage from "./Images/Group 1000004336.png";
import cashPaymentImage from "./Images/moneys.png";

// Import the CardDetails modal
import CardDetails from "./CardDetails"; // Ensure this file exists

const PayNow = ({ totalAmount, onClose, onPaymentSuccess }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // Store selected payment method
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false); // State to control CardDetails modal visibility

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value); // Update payment method on selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedPaymentMethod) {
      const paymentData = {
        paymentMethod: selectedPaymentMethod, // Selected payment method
        totalAmount, // Pass total amount for the payment
      };

      try {
        const response = await axiosInstance.post(
          "/v2/payment/makepayment", // Example API endpoint for payment
          paymentData
        );
        if (response.status === 200) {
          console.log("Payment successful:", response.data);
          onPaymentSuccess(); // Notify parent component about successful payment
          onClose(); // Close the modal
        } else {
          console.error(
            "Error processing payment:",
            response.data.message || "Something went wrong."
          );
        }
      } catch (error) {
        console.error("Error making payment:", error);
      }
    } else {
      console.log("No payment method selected");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 p-4">
      <div className="bg-white w-full sm:max-w-md mx-auto p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">
            Payment Method
          </span>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Payment Method Options */}
          <div className="space-y-4">
            {/* MasterCard Option */}
            <div className="flex items-center justify-between border p-2 rounded-lg bg-[#FFFFFF]">
              <div className="flex items-center">
                <img
                  src={masterCardImage}
                  alt="MasterCard"
                  className="w-8 h-8 mr-2 bg-[#F4F4F4] p-1 rounded-lg"
                />
                <label
                  htmlFor="masterCard"
                  className={`font-bold ${
                    selectedPaymentMethod === "MasterCard"
                      ? "text-[#202224]"
                      : "text-[#A7A7A7]"
                  }`}
                >
                  Master Card
                </label>
              </div>
              <input
                type="radio"
                id="masterCard"
                name="paymentMethod"
                value="MasterCard"
                checked={selectedPaymentMethod === "MasterCard"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
            </div>

            {/* Visa Card Option */}
            <div className="flex items-center justify-between border p-2 rounded-lg">
              <div className="flex items-center">
                <img
                  src={visaCardImage}
                  alt="Visa Card"
                  className="w-8 h-8 mr-2 bg-[#F4F4F4] p-1 rounded-lg"
                />
                <label
                  htmlFor="visaCard"
                  className={`font-bold ${
                    selectedPaymentMethod === "VisaCard"
                      ? "text-[#202224]"
                      : "text-[#A7A7A7]"
                  }`}
                >
                  Visa Card
                </label>
              </div>
              <input
                type="radio"
                id="visaCard"
                name="paymentMethod"
                value="VisaCard"
                checked={selectedPaymentMethod === "VisaCard"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
            </div>

            {/* Cash Payment Option */}
            <div className="flex items-center justify-between border rounded-lg p-2">
              <div className="flex items-center">
                <img
                  src={cashPaymentImage}
                  alt="Cash Payment"
                  className="w-8 h-8 mr-2 bg-[#F4F4F4] p-1 rounded-lg"
                />
                <label
                  htmlFor="cashPayment"
                  className={`font-semibold ${
                    selectedPaymentMethod === "Cash"
                      ? "text-[#202224]"
                      : "text-[#A7A7A7]"
                  }`}
                >
                  Cash Payment
                </label>
              </div>
              <input
                type="radio"
                id="cashPayment"
                name="paymentMethod"
                value="Cash"
                checked={selectedPaymentMethod === "Cash"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="w-full sm:w-[48%] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${
                selectedPaymentMethod
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
              onClick={() => setIsCardDetailsOpen(true)} // Open CardDetails modal
              disabled={!selectedPaymentMethod} // Disable button if no payment method selected
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>

      {/* CardDetails Modal */}
      <CardDetails
        isOpen={isCardDetailsOpen}
        onClose={() => setIsCardDetailsOpen(false)}
        onPaymentSuccess={onPaymentSuccess}
        selectedPaymentMethod={selectedPaymentMethod} // Pass selected payment method
      />
    </div>
  );
};

export default PayNow;
