import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import rating from "../images/rating.png";
import add from "../images/add-square.png";

const Rating = ({ isOpen, onClose, fetchPolls }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const [pollType, setPollType] = useState("single");
  const [pollCategory] = useState("rating");

  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Form validation
  const isFormValid = question && options.some((option) => option.ranked);

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/Polls");
  };

  //   const handleAlphaInput = (index) => (e) => {
  //     const value = e.target.value;
  //     const regex = /^[A-Za-z ]*$/;

  //     // Update option text if input matches regex
  //     if (regex.test(value)) {
  //       const newOptions = [...options];
  //       newOptions[index].text = value;
  //       setOptions(newOptions);
  //     }
  //   };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    // Regex to allow only alphabets (A-Z, a-z) and spaces
    if (/^[A-Za-z\s]*$/.test(value)) {
      setQuestion(value);
    }
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([
        ...options,
        { id: options.length + 1, text: "", ranked: false },
      ]);
    }
  };

  const handleDeleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        const pollData = {
          question,
          options: options.map((option) => option.ranked),
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
      className="fixed inset-0 flex justify-center items-center  bg-opacity-50 z-50 p-4"
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
              src={rating}
              alt="Ranking Poll"
              className="w-5 h-5 mr-3 text-[#202224]"
            />
            <span className="text-[#202224]">Rating Polls</span>
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
            <div
              key={option.id}
              className="flex items-center justify-between space-x-2"
            >
              <div className="flex items-center space-x-2">
                <label
                  htmlFor={`option-${option.id}`}
                  className="text-[#202224]"
                >
                  {option.text}
                </label>

                <div className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="ranking"
                    id={`option-${option.id}-rank-1`}
                    value={1} // Always use rank 1
                    className="mr-2"
                    onChange={() => {
                      const newOptions = [...options];
                      newOptions[index].ranked = true;
                      setOptions(newOptions);
                    }}
                  />
                  <label htmlFor={`option-${option.id}-rank-1`}>
                    {option.id}
                  </label>
                </div>
              </div>

              {/* Delete Option Button */}
              <button
                type="button"
                className="text-red-600 bg-blue-50 rounded-2 p-2 mt-auto"
                onClick={() => handleDeleteOption(index)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}

          {/* Button to add more options */}
          <button
            type="button"
            onClick={handleAddOption}
            className="text-[#FE512E] mt-4"
          >
            <div className="flex items-center">
              <img
                src={add}
                alt=""
                className="bg-gradient-to-r from-[#FE512E] to-[#F09619] w-6 h-6 p-1 rounded-lg"
              />
              <span className="ml-2">Add an Option</span>
            </div>
          </button>

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

export default Rating;
