import React, { useState, useEffect, useRef } from "react";
import { X, FileImage, Download, Upload } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import AvatarImage from '../assets/Avatar.png';
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from '../Common/axiosInstance';
import moment from 'moment';
import axios from 'axios';
dayjs.extend(customParseFormat);

const EditGuard = ({ isOpen, onClose, guard, fetchSecurityGuard }) => {
  const [guardName, setGuardName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [shift, setShift] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null);
  const [changephoto, setChangephoto] = useState(null);
  const [aadharCard, setAadharCard] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [isaadharCard, setaadharCard] = useState(false);
  const [isphoto, setphoto] = useState(false);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const nameRegex = /^[A-Za-z\s]+$/;
  // const MailOrPhoneRegex = /^[6789][0-9]{0,9}$/;
  const timeRegex = /^(?:[01]?\d|2[0-3]):[0-5]\d (AM|PM)$/;

  const isFormValid =
    guardName &&
    number &&
    date &&
    time &&
    shift &&
    gender &&
    aadharCard &&
    nameRegex.test(guardName) &&
    // nameRegex.test(MailOrPhone) &&
    timeRegex.test(time);

  const navigate = useNavigate();


   // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const formData = new FormData();
        formData.append("full_name", guardName);
        formData.append("MailOrPhone", number);
        formData.append("date", moment(date).format('DD/MM/YYYY'));
        formData.append("time", time);
        formData.append("shift", shift);
        formData.append("gender", gender);

        if (!isphoto) {
          formData.append("profileimage", guard.profileimage); 
        }else{
          formData.append("profileimage", changephoto); 
        }
        if (!isaadharCard) {
          formData.append("adhar_card", guard.adhar_card); 
        }else{
          formData.append("adhar_card", aadharCard.file);
        }


        const response = await axiosInstance.put(`/v2/security/updatesecurity/${guard._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if(!!response.data){
          fetchSecurityGuard(); 
          onClose(); 
        }else {
          const errorData = await response.json();
          console.error("Error saving:", errorData.message || "Something went wrong.");
        }
      } catch (err) {
        console.error(error);
      }
    }
  };
  

  const processUploadBill = async (url) => {
    const extractedFileName = url.substring(url.lastIndexOf("/") + 1);
    try {
      const response = await axios.head(url);
      const fileSizeBytes = response.headers["content-length"];
      const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
      setFileName(extractedFileName);
      setFileSize(`${fileSizeMB} MB`);
    } catch (error) {
      console.error("Error fetching file metadata:", error.message);
      setFileName(extractedFileName);
      setFileSize("Unknown");
    }
  };

  useEffect(() => {
    if (guard && guard.adhar_card) {
      processUploadBill(guard.adhar_card);
    }
  }, [guard]);

  useEffect(() => {
    if (isOpen && guard) {
      setGuardName(guard.full_name || "");
      setNumber(guard.MailOrPhone || "");
      setDate(guard.date ? new Date(guard.date) : null);
      setTime(guard.time || "");
      setShift(guard.shift || "");
      setGender(guard.gender || "");
      setPhoto(guard.profileimage || "");
      setAadharCard(
        guard.adhar_card
          ? {
              name: fileName,
              size: fileSize,
            }
          : null
      );
    }
  }, [isOpen, guard, fileName, fileSize]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
      setChangephoto(file);
      setphoto(true);
    }
  };

  const handleAadharCardChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        setaadharCard(true);
        setAadharCard({
          file,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        });
      } else {
        alert("File size should be less than 10MB");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleAadharCardChange({ target: { files: [file] } });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetchSecurityGuard({
  //     guardName,
  //     number,
  //     date,
  //     time,
  //     shift,
  //     gender,
  //     photo,
  //     aadharCard,
  //   });
  //   onClose();
  // };

 
  if (!isOpen || !guard) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-[#202224]">Edit Security</span>
          <button onClick={onClose}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Upload */}
          <div className="flex items-center mb-4 space-x-4">
            <div className="relative">
              <img
                src={photo}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <input
                // ref={fileInputRef}
                id="photoInput"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <button
              type="button"
              // onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:underline text-sm"
              onClick={() => document.getElementById("photoInput").click()}
            >
              Add Photo
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={guardName}
              onChange={(e) => setGuardName(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg"
              placeholder="Enter Full Name"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg"
              placeholder="+91"
            />
          </div>

          {/* Gender and Shift */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender<span className="text-red-500">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift<span className="text-red-500">*</span>
              </label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
              >
                <option value="Day">Day</option>
                <option value="Night">Night</option>
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift Date<span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={date}
                onChange={setDate}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift Time<span className="text-red-500">*</span>
              </label>
              <TimePicker
                value={time ? dayjs(time, "HH:mm A") : null}
                format="h:mm A"
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                onChange={(value) => setTime(value ? value.format("h:mm A") : "")}
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
              {aadharCard ? (
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm text-gray-600">{aadharCard.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAadharCard(null);
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
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#FF5C37] text-white rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGuard;
