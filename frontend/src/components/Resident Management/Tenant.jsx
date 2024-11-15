import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderBaner from "../Dashboard/Header/HeaderBaner"; // Assuming you have this component
import Sidebar from "../Sidebar/Sidebar";
import VehicleForm from "./VehicleForm";
import MemberForm from "./MemberForm";

const Tenant = () => {
  const [activeButton, setActiveButton] = useState("tenant");

  const [formData, setFormData] = useState({
    fullName: "",
    ownerName: "",
    phoneNumber: "",
    ownerPhone: "",
    address: "",
    age: "",
    gender: "",
    wing: "",
    unit: "",
    relation: "",
   
    // State to hold details of members dynamically
  });

  const isFormValid =
  formData.fullName &&
  formData.phoneNumber &&
  formData.age &&
  formData.gender &&
  formData.wing &&
  formData.unit &&
  formData.relation &&
 
  formData.ownerName &&
  formData.ownerPhone &&
  formData.address 
 



  
  const [photo, setPhoto] = useState(null);

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/Resident-Management");
  };


  // Handle file upload for photo (image)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload PNG, JPG, or GIF.");
        return;
      }

      if (file.size > maxSize) {
        alert("File size is too large. Maximum allowed size is 10MB.");
        return;
      }

      console.log(`File uploaded for ${e.target.name}`);
    }
  };

  // Handle photo change (show image preview)
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
    if (name === "ownerName") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return; 
      }
    }

    if (name === "fullName") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return; 
      }
    }


    if (name === "phoneNumber") {
 
      if (!/^[6-9]\d{0,9}$/.test(value)) {
        return; 
      }
    }

    if (name === "ownerPhone") {

      if (!/^[6-9]\d{0,9}$/.test(value)) {
        return; 
      }
    }
    
    if (name === "age") {
      if (!/^\d{0,2}$/.test(value)) {
        return; 
      }
    }

  
    if (name === "wing") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return; 
      }
    }


    if (name === "unit") {
      if (!/^\d*$/.test(value)) {
        return; 
      }
    }

    if (name === "relation") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return; 
      }
    }


    if (name === "gender") {
    }

 
    if (name === "age") {
      if (!/^\d*$/.test(value)) {
        return; 
      }
    }

    // Update the form data
    setFormData((prevData) => ({
        ...prevData,
        [name]: value, 
      }));
    };
  
  
  const handleButtonClick = (buttonType) => {
    console.log(hii)
    setActiveButton(buttonType);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
  };

  return (
    <div className="flex bg-gray-100 w-full h-screen">
      <Sidebar />
      <div className="flex-1  flex flex-col ">
        <header
          className="flex justify-between lg:ml-[290px] items-center lg:px-5 bg-[#FFFFFF] h-[100px] shadow-md"
          style={{ padding: "35px 10px" }}
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <Link
              to="/securityprotocol"
              className="text-[#A7A7A7] no-underline font-semibold ms-4 md:ml-20"
            >
              Home
            </Link>
            <span className="text-gray-400"> &gt; </span>
            <Link
              to="/Resident-Manegement"
              className="no-underline font-semibold text-[#A7A7A7]"
            >
              Resident Management
            </Link>
            <span className="text-gray-400 "> &gt; </span>
            <span className="font-semibold text-[#5678E9]">Tenant Form</span>
          </div>
          <HeaderBaner />
        </header>


        <div className="lg:mt-[10px] ml-[300px] bg">
          <div className="mt-10 lg:ml-[16px] px-4 sm:px-8 ">
            <Link
              to="/owner"
              className={`w-full lg:h-[50px] sm:w-[150px] px-4 py-3 rounded-top no-underline ${
                activeButton === "owner"
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#202224]"
              }`}
         
            >
              Owner
            </Link>
            <Link
              to="/tenant"
              className={`w-full lg:h-[50px] sm:w-[150px]  px-4 py-3 rounded-top no-underline ${
                activeButton === "tenant"
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#202224]"
              }`}
 
            >
              Tenant
            </Link>
          </div>
        </div>
      
      
        <div className=" w-[1500px]  mt-2 mb-5 ml-[340px]  ">
          <div
            onSubmit={handleSubmit}
            className="flex bg-white  w-[1500px] mb-2 rounded-e-md mx-auto p-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Owner Full Name */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium">
                  Owner Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange} // Handle input change
                  placeholder="Enter Owner Full Name"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>
              {/* Owner Phone */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium">
                  Owner Phone<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleInputChange} // Handle input change
                  placeholder="+91"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Owner Address */}
              <div className="flex-1">
        <label className="block text-gray-700 font-medium">
          Owner Address<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="address" // Bind to the 'address' field in formData
          value={formData.address} // Correctly bind to formData.address
          onChange={handleInputChange} // Call handleInputChange on change
          placeholder="Enter Address"
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </div>
            </div>
          </div>

          <form
            className="space-y-4 bg-white rounded p-3 pt-1"
            onSubmit={handleSubmit}
          >
            {/* Section for Photo, Full Name, Phone Number, and Email on the same line */}
            <div className="flex items-center  gap-6 ml-2">
              {/* Photo Section */}

              <div className="flex flex-col items-center">
                <div className="">
                  <div className="border bg-white rounded-full w-[50px] h-[50px] flex justify-center items-center">
                    {photo ? (
                      <img
                        src={photo}
                        alt="Owner"
                        className="w-[50px] h-[50px] object-cover rounded-full"
                      />
                    ) : (
                      <i className="fa-solid fa-camera text-[#FFFFFF]"></i>
                    )}
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-blue-500 no-underline"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Add Photo
                  </button>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              {/* Full Name, Phone Number, and Email */}
              <div className="flex gap-6">
                {/* Full Name Field */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-[430px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="Enter Full Name"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-[450px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="+91"
                  />
                </div>

                {/* Email Address Field */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className="mt-1 block w-[420px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
            </div>

            {/* Rest of the form (Age, Gender, Wing, Unit, Relation) */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-4 ml-[100px]">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Age<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="Enter Age"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Wing Field */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Wing<span className="text-red-500">*</span> 
                  </label>
                  <input
                    type="text"
                    name="wing"
                    value={formData.wing}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="Enter Wing"
                  />
                </div>

                {/* Unit Field */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Unit<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="Enter Unit"
                  />
                </div>

                {/* Relation Field */}
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Relation<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="relation"
                    value={formData.relation}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="Enter Relation"
                  />
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="flex flex-wrap gap-2">
              {[
                "Upload Aadhar Card (Front Side)",
                "Upload Aadhar Card (Back Side)",
                "Address Proof (Vera Bill OR Light Bill)",
                "Rent Agreement",
              ].map((item, index) => (
                <div key={index} className="flex-1 min-w-[250px] h-[]">
                  <label className="block text-sm font-medium text-gray-700">
                    {item}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor={`file-upload-${index}`}
                          className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id={`file-upload-${index}`}
                            name={`file-upload-${index}`}
                            type="file"
                            className="sr-only"
                            onChange={handleFileUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className=" gap-4">
            

            <MemberForm/>  
            <VehicleForm/>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-end">
            <button
              type="button"
              className="w-20 sm:w-[] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`w-20 sm:w-[20] px-3 py-2 rounded-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                  : "bg-[#F6F8FB] text-[#202224]"
              }`}
              disabled={!isFormValid}
            >
              {isFormValid ? "Save" : "Create"}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tenant;
