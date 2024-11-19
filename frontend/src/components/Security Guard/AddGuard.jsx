import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import timeIcon from "../../components/assets/Vector.png";
import moment from 'moment';
import axiosInstance from '../Common/axiosInstance';
import axios from "axios";

const AddGuard = ({ isOpen, onClose }) => {
  const [full_name, setfull_name] = useState("");
  const [MailOrPhone, setMailOrPhone] = useState("");
  const [shiftDate, setShiftDate] = useState(null);
  const [time, settime] = useState("");
  const [shift, setshift] = useState("");
  const [gender, setGender] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [profile_image, setprofileimage] = useState(null);
  const [uploadprofileimage, setuploadprofileimage] = useState(null);
  const [adharcard, setadhar_card] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  

  const modalRef = useRef(null);
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const nameRegex = /^[A-Za-z\s]+$/;
  // const MailOrPhoneRegex = /^[6789][0-9]{0,9}$/;
  const timeRegex = /^(?:[01]?\d|2[0-3]):[0-5]\d (AM|PM)$/;

  const isFormValid =
    full_name &&
    MailOrPhone &&
    shiftDate &&
    time &&
    shift &&
    gender &&
    adharcard &&
    nameRegex.test(full_name) &&
    // nameRegex.test(MailOrPhone) &&
    timeRegex.test(time);

  const navigate = useNavigate();

  const ClearAllData = () => {
    setfull_name("");
    setMailOrPhone("");
    setShiftDate(null);
    settime("");
    setshift("");
    setGender("");
    setprofileimage(null);
    setuploadprofileimage(null);
    setadhar_card(null);
    setIsCalendarOpen(false);
  };

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/security-guard");
  };

  const ColseData = () => {
    handleClose();
    ClearAllData();
  };

     const cloudinaryUrl = "https://api.cloudinary.com/v1_1/ds8dsepcr/upload"; // Replace with your Cloudinary cloud name

  const cloudinaryUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // File to upload
    formData.append("upload_preset", "first_presetname"); // Cloudinary upload preset
    formData.append("cloud_name", "gds8dsepcr"); // Optional: Specify a folder in Cloudinary
  
    const response = await axios.post(cloudinaryUrl, formData);
    return response.data.secure_url; // This is the dynamically generated URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (isFormValid) {
    //   console.log("Form Submitted", {
    //     full_name,
    //     MailOrPhone,
    //     shiftDate,
    //     time,
    //     shift,
    //     gender,
    //     profileimage,
    //     adhar_card,
    //   });
    // }
    if (isFormValid) {
 // Upload files to Cloudinary
    // const url = "https://res.cloudinary.com/ds8dsepcr/image/upload/v1731518517/"
    const profileimage = uploadprofileimage ? await cloudinaryUpload(uploadprofileimage) : null;
    const adhar_card = adharcard ? await cloudinaryUpload(adharcard) : null;
    const password = "password123";
        const date = moment(shiftDate).format('DD/MM/YYYY');
        // const adhar_card = url + adharcard.name;
        // const profileimage = url+uploadprofileimage.name;
      const GuardData = {
            full_name,
            MailOrPhone,
            date,
            time,
            shift,
            gender,
            profileimage,
            adhar_card,
            password
      };
      console.log(GuardData);

      try {
        // Send data to the backend API using axios
        const response = await axiosInstance.post(
          "/v2/security/addsecurity",
          GuardData
        );
        if (response.status===201) {
          console.log("Successfully saved:", response.data);
          // fetchAnnouncement();
          onClose(); 
          ClearAllData();
        } else {
          const errorData = await response.json();
          console.error("Error saving number:", errorData.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error creating Guard :", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  const handleDateChange = (date) => {
    setShiftDate(date);
    setIsCalendarOpen(false);
  };

  const handleTimeChange = (value) => {
    const formattedDate = dayjs(value);
    const hour = formattedDate.hour();
    const ampm = hour < 12 ? "AM" : "PM"; 
    const timeString = formattedDate.format("HH:mm");
    settime(`${timeString} ${ampm}`);
  };


  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
    }
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setuploadprofileimage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setprofileimage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAadharCardChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { // 10MB limit
        setadhar_card(file);
      } else {
        alert("File size should be less than 10MB");
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        setAadharCard(file);
      } else {
        alert("File size should be less than 10MB");
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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white max-w-lg sm:max-w-md mx-auto p-6 rounded-lg shadow-lg" ref={modalRef}>
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Add Security</span>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Photo Upload */}
          <div>
            <div className="flex items-center">
              <div className="border bg-[#F4F4F4] rounded-full w-[50px] h-[50px] flex justify-center items-center">
                {profile_image ? (
                  <img src={profile_image} alt="Guard" className="w-[50px] h-[50px] object-cover rounded-full" />
                ) : (
                  <i className="fa-solid fa-camera text-[#FFFFFF]"></i>
                )}
              </div>
              <button
                type="button"
                className="ml-5 text-blue-500 no-underline"
                onClick={() => document.getElementById("photoInput").click()}
              >
                Add Photo
              </button>
            </div>
            <input
              id="photoInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Guard Name */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={full_name}
              onChange={(e) => {
                const value = e.target.value;
                if (nameRegex.test(value) || value === "") {
                  setfull_name(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Phone MailOrPhone */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
            MailOrPhone<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={MailOrPhone}
              onChange={(e) => {
                const value = e.target.value;
                // if (nameRegex.test(value) || value === "") {
                if (!!value) {
                  setMailOrPhone(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          {/* Gender and Shift */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Gender<span className="text-red-500">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Shift<span className="text-red-500">*</span>
              </label>
              <select
                value={shift}
                onChange={(e) => setshift(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              >
                <option value="">Select Shift</option>
                <option value="Day">Day</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Shift Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative">
                <DatePicker
                  selected={shiftDate}
                  onChange={handleDateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                  placeholderText="Select Date"
                  dateFormat="dd/MM/yyyy"
                  autoComplete="off"
                  open={isCalendarOpen}
                />
                <i
                  className="fa-solid fa-calendar-days absolute right-3 text-[#202224] cursor-pointer"
                  onClick={handleCalendarIconClick}
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Shift Time<span className="text-red-500">*</span>
              </label>
                {/* <TimePicker
                  value={time ? dayjs(time, "HH:mm") : null}
                  format="HH:mm"
                  suffixIcon={<img src={timeIcon} alt="Time" />}
                  className="w-full border border-gray-300 rounded-lg"
                  popupClassName="custom-time-picker-popup"
                  onChange={handleTimeChange}
                /> */}
                <TimePicker
                value={time ? dayjs(time, "HH:mm") : null}
                onChange={handleTimeChange}
                format="HH:mm"
                suffixIcon={<img src={timeIcon} alt="Time Icon" />} // Custom time icon
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              />
            </div>
          </div>

          {/* Aadhar Card Upload */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
              Upload Aadhar Card<span className="text-red-500">*</span>
            </label>
            <div
              ref={dropZoneRef}
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleAadharCardChange}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
              />
              {adharcard ? (
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm text-gray-600">{adharcard.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setadhar_card(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Upload a file
                    </button>
                    <span className="text-gray-500">or drag and drop</span>
                    <span className="text-xs text-gray-400">PNG, JPG up to 10MB</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={ColseData}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuard;