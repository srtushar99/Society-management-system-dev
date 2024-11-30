import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import select from "./images/select.png";
import multiple from "./images/Multichoice polls.png";
import ranking from "./images/ranking.png";
import rating from "./images/rating.png";
import numeric from "./images/Frame.png";
import text from "./images/Text polls.png";
import icon from "./images/Icon.png";

const options = [
  { value: "multichoice", label: "Multichoice Polls", icon: multiple },
  { value: "ranking", label: "Ranking Polls", icon: ranking },
  { value: "rating", label: "Rating Polls", icon: rating },
  { value: "numeric", label: "Numeric Polls", icon: numeric },
  { value: "text", label: "Text Polls", icon: text },
];

const AddPolls = ({ isOpen, onClose, fetchPolls }) => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [pollType, setPollType] = useState("single");
  const [pollCategory, setPollCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Form validation
  const isFormValid = question && option1 && option2;

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/Polls");
  };

  const handleSelect = (value) => {
    setPollCategory(value);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Regex validation function for alphabetic characters only
  const handleAlphaInput = (setter) => (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/; // Allows only letters and spaces
    if (regex.test(value)) {
      setter(value); // Set the value if valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const pollData = { question, options: [option1, option2], pollType };

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
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4"
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
          <div className=" flex flex-col gap-2">
            {/* Poll Category Select Dropdown */}
            <div className="relative w-full" ref={dropdownRef}>
              <label className="block text-left font-medium text-[#202224] ">
                Polls<span className="text-red-500">*</span>
              </label>
              <div
                className="relative w-full rounded-lg bg-white cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="p-2 border rounded-lg text-[#202224] flex items-center justify-between">
                  {pollCategory ? (
                    <div className="flex items-center text-[#A7A7A7]">
                      <img
                        src={
                          options.find(
                            (option) => option.value === pollCategory
                          )?.icon
                        }
                        alt={pollCategory}
                        className="w-5 h-5 mr-3"
                      />
                      {
                        options.find((option) => option.value === pollCategory)
                          ?.label
                      }
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <img
                        src={select} 
                        alt="Select Poll"
                        className="w-4 h-4 mr-3 "
                      />
                      <span className="text-[#A7A7A7]">Select Poll</span>
                    </div>
                  )}
                  <img
                    src={icon}
                    alt="dropdown-icon"
                    className="w-4 h-2 ml-auto "
                  />
                </div>
                {isDropdownOpen && (
                  <ul className="z-10 p-3 bg-white  overflow-x-auto h-[120px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 border-gray-300 rounded-lg w-full shadow-lg ">
                    {options.map((option) => (
                      <li
                        key={option.value}
                        className="flex items-center cursor-pointer "
                        onClick={() => handleSelect(option.value)}
                      >
                        <input
                          type="radio"
                          checked={pollCategory === option.value}
                          onChange={() => handleSelect(option.value)}
                          className="mr-2 border border-[#A7A7A7] "
                        />
                        <img
                          src={option.icon}
                          alt={option.label}
                          className="w-5 h-5 mr-3 ml-3"
                        />
                        <span className="text-[#A7A7A7] mb-1">{option.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Poll Question */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Question<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ask a Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Option 1 */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Option 1<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Add"
              value={option1}
              onChange={handleAlphaInput(setOption1)} // Validate alphabetic input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Option 2 */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Option 2<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Add"
              value={option2}
              onChange={handleAlphaInput(setOption2)} // Validate alphabetic input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Poll Type Selection */}

          {/* Buttons */}
          <div className="flex  sm:flex-row gap-4 pt-2">
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
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPolls;
