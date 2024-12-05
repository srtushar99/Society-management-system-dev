import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import text from "../images/Text polls.png";

const TextPolls = ({ isOpen, onClose, fetchPolls }) => {
  const [answer, setAnswer] = useState("");
  const [pollType, setPollType] = useState("single");
  const [pollCategory] = useState("numeric");

  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Form validation: Ensure only alphabetic characters and spaces in the answer
  const isFormValid = /^[A-Za-z\s]+$/.test(answer) && answer.trim() !== "";

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/Polls");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const pollData = {
          answer, // Use answer instead of question
          pollType,
        };

        const response = await axios.post("/v2/polls/addpoll", pollData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 201) {
          console.log("Poll created successfully:", response.data);
          fetchPolls(); // Refresh poll list
          onClose();
        }
      } catch (error) {
        console.error("Error creating poll:", error.response || error.message);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 p-4"
    >
      <div className="bg-white w-[400px] max-w-lg mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Create Poll</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Poll Category Display */}
          <div className="w-full px-3 py-2 border border-[#202224] rounded-lg text-[#202224] flex items-center">
            <img
              src={text}
              alt="Numeric Poll"
              className="w-5 h-5 mr-3 text-[#202224]"
            />
            <span className="text-[#202224]">Text Polls</span>
            <i className="fa-solid fa-chevron-down text-[#202224] ml-auto"></i>
          </div>

          {/* Answer Field */}
          <div className="mt-4">
            <label className="block text-left font-medium text-[#202224] mb-1">
              Answer<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 h-20 border border-gray-300 rounded-lg text-[#202224] resize-none"
              pattern="^[A-Za-z\s]+$"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="w-full 2xl:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full 2xl:w-[48%] px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
              disabled={!isFormValid}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextPolls;
