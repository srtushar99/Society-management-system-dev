import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timeIcon from "../../assets/Vector.png";
import axiosInstance from "../../Common/axiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

dayjs.extend(customParseFormat);

const CreateAnnouncement = ({ isOpen, onClose, fetchAnnouncement }) => {
  const [Announcement_Title, setAnnouncement_Title] = useState("");
  const [Description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [Announcement_Time, setAnnouncement_Time] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);

  const titleRegex = /^[A-Za-z\s]+$/;
  const descriptionRegex = /^[A-Za-z\s]+$/;
  const timeRegex = /^(?:[01]?\d|2[0-3]):[0-5]\d (AM|PM)$/;

  const isFormValid =
    Announcement_Title &&
    Description &&
    date &&
    Announcement_Time &&
    titleRegex.test(Announcement_Title) &&
    descriptionRegex.test(Description) &&
    timeRegex.test(Announcement_Time);

  const navigate = useNavigate();

  const ClearAllData = () => {
    setAnnouncement_Title("");
    setDescription("");
    setDate(null);
    setAnnouncement_Time("");
    setIsCalendarOpen(false);
  };

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/announcements");
  };

  const ColseData = () => {
    handleClose();
    ClearAllData();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const [hour, minute] = Announcement_Time.split(":");
      const combinedDateTime = dayjs(date)
        .hour(parseInt(hour))
        .minute(parseInt(minute));
      const ChangeDateFormat = new Date(combinedDateTime);
      const Announcement_Date = moment(ChangeDateFormat).format("YYYY-MM-DD");

      const announcementData = {
        Announcement_Title,
        Description,
        Announcement_Date,
        Announcement_Time,
      };

      try {
        // Send data to the backend API using axios
        const response = await axiosInstance.post(
          "/v2/annoucement/addannouncement",
          announcementData
        );
        if (response.status === 201) {
          console.log("Successfully saved:", response.data);
          fetchAnnouncement();
          onClose();
          ClearAllData();
        } else {
          const errorData = await response.json();
          console.error(
            "Error saving number:",
            errorData.message || "Something went wrong."
          );
        }
      } catch (error) {
        console.error("Error creating announcement:", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    setIsCalendarOpen(false);
  };

  const handleTimeChange = (value) => {
    const formattedDate = dayjs(value);
    const hour = formattedDate.hour();
    const ampm = hour < 12 ? "AM" : "PM";
    const timeString = formattedDate.format("HH:mm");
    setAnnouncement_Time(`${timeString} ${ampm}`);
    // const [hours, minute] = `${timeString} ${ampm}`.split(':');
    // const Converthours = parseInt(hours, 10);
    // const minutes = parseInt(minute.slice(0, 2), 10);
    // const period = Converthours >= 12 ? 'PM' : 'AM';
    // const adjustedHour = Converthours % 12 || 12;
    // console.log(`${String(adjustedHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`);
    // setAnnouncement_Time(`${String(adjustedHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`);
  };

  const [selectedOption, setSelectedOption] = useState("Event");
  const [IsOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setIsOpen(false); // Close the dropdown after selecting
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
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
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4"
    >
      <div className="bg-white w-full max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">
            Add Announcement
          </span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div>
              <label className="block text-left font-medium text-[#202224] mb-1">
                Announcement Type <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <div
                  className="w-full px-3 py-2 border bg-[#FFFFFF] rounded-lg text-[#202224] cursor-pointer flex items-center justify-between"
                  onClick={() => setIsOpen(!IsOpen)}
                >
                  {selectedOption}
                  <i className="fa-solid fa-chevron-down text-[#202224] ml-auto"></i>
                </div>

                {IsOpen && (
                  <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg">
                    <label className="flex items-center px-3 py-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Event"
                        checked={selectedOption === "Event"}
                        onChange={() => handleSelectChange("Event")}
                        className="mr-2"
                      />
                      Event
                    </label>
                    <label className="flex items-center px-3 py-2 cursor-pointer">
                      <input
                        type="radio"
                        value="activity"
                        checked={selectedOption === "Activity"}
                        onChange={() => handleSelectChange("Activity")}
                        className="mr-2"
                      />
                      Activity
                    </label>
                  </div>
                )}
              </div>
            </div>
            {/* Announcement Title Input */}
            <div className="mt-2">
              {" "}
              <label className="block text-left font-medium text-[#202224] mb-1">
                Announcement Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                value={Announcement_Title}
                onChange={(e) => {
                  const value = e.target.value;
                  if (titleRegex.test(value) || value === "") {
                    setAnnouncement_Title(value);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              type="text"
              placeholder="Enter Description"
              value={Description}
              onChange={(e) => {
                const value = e.target.value;
                if (descriptionRegex.test(value) || value === "") {
                  setDescription(value);
                }
              }}
              className="w-full  px-3 py-2 border border-gray-300 rounded-lg text-[#202224] resize-none"
            />
          </div>

          {/* Date and Time */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Announcement Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative" ref={datePickerRef}>
                <DatePicker
                  selected={date}
                  onChange={handleDateChange}
                  className="w-[170px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholderText="Select a date"
                  dateFormat="MM/dd/yyyy"
                  autoComplete="off"
                  open={isCalendarOpen}
                />
                <i
                  className="fa-solid fa-calendar-days absolute right-10 text-[#202224] cursor-pointer"
                  onClick={handleCalendarIconClick}
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block text-left font-medium text-gray-700 mb-1">
                Announcement Time<span className="text-red-500">*</span>
              </label>
              <TimePicker
                value={
                  Announcement_Time ? dayjs(Announcement_Time, "HH:mm") : null
                }
                onChange={handleTimeChange}
                format="HH:mm"
                suffixIcon={<img src={timeIcon} alt="Time Icon" />} // Custom time icon
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              className="w-full sm:w-[48%] px-4 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={ColseData}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`w-full sm:w-[48%] px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
              disabled={!isFormValid}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncement;
