import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import multiple from "../images/Multichoice polls.png";
import add from "../images/add-square.png";

const MultipleChoice = ({ isOpen, onClose, fetchPolls }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const isFormValid =
    question &&
    options.every((option) => option.text && /^[A-Za-z ]*$/.test(option.text));

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/Polls");
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleAlphaInput = (index) => (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]*$/;
    if (value === "") {
      setErrorMessage(""); 
      const newOptions = [...options];
      newOptions[index].text = "";
      setOptions(newOptions);
      return; 
    }
    if (regex.test(value)) {
      const isDuplicate = options.some(
        (option, i) => i !== index && option.text.toLowerCase() === value.toLowerCase()
      );
  
      if (isDuplicate) {
        setErrorMessage("This option is already used.");
        return; 
      } else {
        setErrorMessage(""); 
      }
  
      const newOptions = [...options];
      newOptions[index].text = value;
      setOptions(newOptions);
    }
  };

  
  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, { id: options.length + 1, text: "" }]);
    }
  };
 
  const handleDeleteOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    } else {
      console.log("At least two options are required.");
    }
  };


  const handleQuestionChange = (e) => {
    const value = e.target.value;
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
          options: options.map((option) => option.text),
          pollType,
        };

        const response = await axios.post("/v2/polls/addpoll", pollData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 201) {
          console.log("Poll created successfully:", response.data);
          fetchPolls(); 
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

          <div className="w-full px-3 py-2 border border-[#202224] rounded-lg text-[#202224] flex items-center">
            <img
              src={multiple}
              alt="Multiple Choice"
              className="w-5 h-5 mr-3 text-[#202224]"
            />
            <span className="text-[#202224]">Multiple Choice</span>
            <i className="fa-solid fa-chevron-down text-[#202224] ml-auto"></i>
          </div>

      
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

      
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center space-x-2">
              <div className="flex-grow">
                <label className="block text-left font-medium text-[#202224] mb-1">
                  Option {index + 1}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Add option"
                  value={option.text}
                  onChange={handleAlphaInput(index)}
                  className="w-[300px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                />
                 {/* {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>} */}
              </div>

          
              <button
                type="button"
                className="text-red-600 bg-blue-50  rounded-2 p-2 mt-auto"
                onClick={() => handleDeleteOption(index)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}

          {options.length < 5 && (
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
          )}

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

export default MultipleChoice;
