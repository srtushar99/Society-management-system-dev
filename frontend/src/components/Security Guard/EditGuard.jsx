import React, { useState, useEffect, useRef } from "react";
import { X, FileImage, Download, Upload } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import AvatarImage from '../assets/Avatar.png';
import "react-datepicker/dist/react-datepicker.css";

dayjs.extend(customParseFormat);

const EditGuard = ({ isOpen, onClose, guard, onSave }) => {
  const [guardName, setGuardName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [shift, setShift] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState(null);
  const [aadharCard, setAadharCard] = useState(null);

  const [isDragging, setIsDragging] = useState(false); // For drag-and-drop state

  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && guard) {
      setGuardName(guard.guardName || "Arlene McCoy");
      setNumber(guard.number || "99130 44537");
      setDate(guard.date ? dayjs(guard.date).toDate() : null);
      setTime(guard.time || "3:45 PM");
      setShift(guard.shift || "Day");
      setGender(guard.gender || "Male");
      setPhoto(guard.photo || null);
      setAadharCard(guard.aadharCard || {
        name: "Adharcard Front Side.JPG",
        size: "3.5 MB"
      });
    }
  }, [isOpen, guard]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAadharCardChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        setAadharCard({
          file,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        });
      } else {
        alert("File size should be less than 10MB");
      }
    }
  };

  // Drag-and-drop handlers for the Aadhar Card upload
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleAadharCardChange({ target: { files: [file] } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      guardName,
      number,
      date,
      time,
      shift,
      gender,
      photo,
      aadharCard
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg" ref={modalRef}>
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
                src={photo || AvatarImage}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:underline text-sm"
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
