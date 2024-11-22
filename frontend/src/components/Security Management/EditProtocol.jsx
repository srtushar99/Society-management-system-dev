import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timeIcon from "../../components/assets/Vector.png"; // Import your custom time icon
import axiosInstance from '../Common/axiosInstance';
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS
import moment from 'moment';

dayjs.extend(customParseFormat);

const EditProtocol = ({ isOpen, onClose, protocol, onSave, fetchSecurityProtocols }) => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [date, setDate] = useState(null); // Initialize date as null
  const [Time, setTime] = useState(""); // Initialize time as empty string
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State for calendar visibility

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);

  const navigate = useNavigate();

  const titleRegex = /^[A-Za-z\s]*$/;
  const descriptionRegex = /^[A-Za-z\s]*$/;
  const timeRegex = /^(?:[01]?\d|2[0-3]):[0-5]\d (AM|PM)$/;

  const isFormValid =
    Title &&
    Description &&
    date &&
    Time &&
    titleRegex.test(Title) &&
    descriptionRegex.test(Description) &&
    timeRegex.test(Time);

    const ClearAllData = () => {
      setTitle("");
      setDescription("");
      setTime("");
      setDate(null);
    };

  // Effect for setting initial state when the modal is opened
  useEffect(() => {
    if (isOpen && protocol) {
      setTitle(protocol.Title || "");
      setDescription(protocol.Description || "");
      setDate(protocol.Date ? new Date(protocol.Date) : null); // Convert string date to Date object
      setTime(protocol.Time || "12:00"); // Set the default time if not available
    }
  }, [isOpen, protocol]);

  // Handle form inputs
  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (titleRegex.test(value)) {
      setTitle(value);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (descriptionRegex.test(value)) {
      setDescription(value);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    setIsCalendarOpen(false); // Close calendar after selecting a date
  };

  const handleTimeChange = (value) => {
    const formattedDate = dayjs(value);
    const hour = formattedDate.hour();
    const ampm = hour < 12 ? "AM" : "PM"; 
    const timeString = formattedDate.format("HH:mm");
    setTime(`${timeString} ${ampm}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const Date = moment(date).format('YYYY-MM-DD');
      const ProtocolsData = {
        Title,
        Description,
        Date,
        Time
      };

      try {
        const response = await axiosInstance.put(`/v2/securityprotocol/update/${protocol._id}`, ProtocolsData);
        if(!!response.data){
          fetchSecurityProtocols(); 
          onClose(); 
          ClearAllData();
        }else {
          const errorData = await response.json();
          console.error("Error saving number:", errorData.message || "Something went wrong.");
        }
      } catch (err) {
        console.error(error);
      }
    }
  };

  const handleClose = () => {
    onClose();
    navigate("/securityprotocol"); // Adjust to your desired page route
  };

  // Calendar visibility toggle
  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle calendar visibility
  };

  // Close calendar when clicking outside the modal or calendar
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsCalendarOpen(false); // Close calendar if clicked outside
      }
    }
  };

  // Add event listener for clicks outside the modal
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" ref={modalRef}>
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Edit Protocol</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Protocol Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              value={Title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Enter Description"
              value={Description}
              onChange={handleDescriptionChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] h-22 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Protocol Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative" ref={datePickerRef}>
                <DatePicker
                  selected={date}
                  onChange={handleDateChange} // Update the date state
                  className="w-[170px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  autoComplete="off"
                  open={isCalendarOpen} // Control the visibility of the calendar
                />
                {/* Calendar Icon */}
                <i
                  className="fa-solid fa-calendar-days absolute right-10 text-[#202224] cursor-pointer"
                  onClick={handleCalendarIconClick} // Toggle calendar visibility on icon click
                />
              </div>
            </div>

            <div className="w-1/2 relative">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Protocol Time<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <TimePicker
                  value={Time ? dayjs(Time, "HH:mm") : null}
                  format="HH:mm"
                  suffixIcon={<img src={timeIcon} alt="Time Icon" />} // Custom time icon
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  popupClassName="custom-time-picker-popup" // Optional: Use this for additional styling
                  onChange={handleTimeChange} // Update time state
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-[#202224] rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#FE512E] to-[#F09619]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProtocol;
