import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import numeric from "../images/Frame.png";

const Numeric = ({ isOpen, onClose, fetchPolls }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { id: 1, text: "", minValue: "", maxValue: "", decimalPlaces: "" },
  ]);
  const [pollType, setPollType] = useState("single");
  const [pollCategory] = useState("numeric");

  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Form validation
  const isFormValid =
    question &&
    /^[A-Za-z\s]+$/.test(question) &&
    options.every(
      (option) =>
        option.minValue !== "" &&
        option.maxValue !== "" &&
        option.decimalPlaces !== ""
    );

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/Polls");
  };

  const handleOptionChange = (index, field) => (e) => {
    const value = e.target.value;
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    // Regex to allow only alphabets (A-Z, a-z) and spaces
    if (/^[A-Za-z\s]*$/.test(value)) {
      setQuestion(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const pollData = {
          question,
          options: options.map((option) => ({
            minValue: option.minValue,
            maxValue: option.maxValue,
            decimalPlaces: option.decimalPlaces,
          })),
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
              src={numeric}
              alt="Numeric Poll"
              className="w-5 h-5 mr-3 text-[#202224]"
            />
            <span className="text-[#202224]">Numeric Polls</span>
            <i className="fa-solid fa-chevron-down text-[#202224] ml-auto"></i>
          </div>

          {/* Poll Question */}
          <div className="mt-4">
            <label className="block text-left font-medium text-[#202224] mb-1">
              Question<span className="text-red-500">*</span>
            </label>
           <input
              type="text"
              placeholder="Enter your question"
              value={question}
              onChange={handleQuestionChange}
              className="w-full px-3 h-10 border border-gray-300 rounded-lg text-[#202224]"
              required
            />
          </div>

          {/* Options (Dynamic Fields) */}
          {options.map((option, index) => (
            <div key={option.id} className="space-y-4">
              <div className="flex space-x-2">
                <div className="w-full">
                  <label className="block text-left font-medium text-[#202224] mb-1">
                    Min Value<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={option.minValue}
                    onChange={handleOptionChange(index, "minValue")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                    min="0"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-left font-medium text-[#202224] mb-1">
                    Max Value<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={option.maxValue}
                    onChange={handleOptionChange(index, "maxValue")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-left font-medium text-[#202224] mb-1">
                  Decimal Places<span className="text-red-500">*</span>
                </label>
                <select
                  value={option.decimalPlaces}
                  onChange={handleOptionChange(index, "decimalPlaces")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                  required
                >
                  <option value="">Select Decimal Places</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </div>
          ))}

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

export default Numeric;
