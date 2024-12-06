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
import MultipleChoice from "./Add Polls/MultipleChoice";
import Ranking from "./Add Polls/Ranking";
import Rating from "./Add Polls/Rating";
import Numeric from "./Add Polls/Numeric";
import TextPolls from "./Add Polls/TextPolls";

const options = [
  { value: "multichoice", label: "Multichoice Polls", icon: multiple },
  { value: "ranking", label: "Ranking Polls", icon: ranking },
  { value: "rating", label: "Rating Polls", icon: rating },
  { value: "numeric", label: "Numeric Polls", icon: numeric },
  { value: "text", label: "Text Polls", icon: text },
];

const AddPolls = ({ isOpen, onClose, fetchPolls }) => {
  const [question, setQuestion] = useState("");
  const [pollCategory, setPollCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAddPolls, setShowAddPolls] = useState(false);
  const [showRankingPolls, setShowRankingPolls] = useState(false);
  const [showRatingPolls, setShowRatingPolls] = useState(false);
  const [showNumericPolls, setShowNumericPolls] = useState(false);
  const [showtextPolls, setShowTextPolls] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Form validation
  const isFormValid =
    question ||
    pollCategory === "multichoice" ||
    pollCategory === "ranking" ||
    pollCategory === "rating" ||
    pollCategory === "numeric" ||
    pollCategory === "text";

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/Polls");
  };

  const handleSelect = (value) => {
    setPollCategory(value);
    setIsDropdownOpen(false);

    // if (value === "multichoice") {
    //   setQuestion("");
    // }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      if (pollCategory === "multichoice") {
        setShowAddPolls(true);
        return;
      }
      if (pollCategory === "ranking") {
        setShowRankingPolls(true);
        return;
      }
      if (pollCategory === "rating") {
        setShowRatingPolls(true);
        return;
      }

      if (pollCategory === "numeric") {
        setShowNumericPolls(true);
        return;
      }

      if (pollCategory === "text") {
        setShowTextPolls(true);
        return;
      }

      try {
        const pollData = { question, options: [], pollType: pollCategory };

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

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            {/* Poll Category Select Dropdown */}
            <div className="relative w-full" ref={dropdownRef}>
              <label className="block text-left font-medium text-[#202224]">
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
                        className="w-4 h-4 mr-3"    
                      />
                      <span className="text-[#A7A7A7]">Select Poll</span>
                    </div>
                  )}
                  <img
                    src={icon}
                    alt="dropdown-icon"
                    className="w-4 h-2 ml-auto"
                  />
                </div>
                {isDropdownOpen && (
                  <ul className="z-10 p-3 bg-white  border-gray-300 rounded-lg w-full shadow-lg">
                    {options.map((option) => (
                      <li key={option.value} className="flex items-center cursor-pointer" onClick={() => handleSelect(option.value)}>
                        <input type="radio" checked={pollCategory === option.value} onChange={() => handleSelect(option.value)} className="mr-2 border border-[#A7A7A7]" />
                        <img
                          src={option.icon}
                          alt={option.label}
                          className="w-5 h-5 mr-3 ml-3"
                        />
                        <span className={`text-[#A7A7A7] mb-1 ${pollCategory === option.value ? "text-[#202224]": "" }`} >{option.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>


          <div className="flex sm:flex-row gap-4">
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
              } `}
              disabled={!isFormValid}
            >
              Create
            </button>
          </div>
        </form>
      </div>
      {showAddPolls && (
        <MultipleChoice
          isOpen={showAddPolls}
          onClose={() => setShowAddPolls(false)}
        />
      )}
      {showRankingPolls && (
        <Ranking
          isOpen={showRankingPolls}
          onClose={() => setShowRankingPolls(false)}
        />
      )}

      {showRatingPolls && (
        <Rating
          isOpen={showRatingPolls}
          onClose={() => setShowRatingPolls(false)}
        />
      )}
      {showNumericPolls && (
        <Numeric
          isOpen={showNumericPolls}
          onClose={() => setShowNumericPolls(false)}
        />
      )}

      {showtextPolls && (
        <TextPolls
          isOpen={showtextPolls}
          onClose={() => setShowTextPolls(false)}
        />
      )}
    </div>
  );
};

export default AddPolls;
