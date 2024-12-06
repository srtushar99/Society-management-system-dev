import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderBaner from "../Dashboard/Header/HeaderBaner"; // Assuming you have this component
import Sidebar from "../Sidebar/Sidebar";
import { Upload, X } from "lucide-react";
import axiosInstance from '../Common/axiosInstance';

const TenantPage = () => {
 
  const [adharcard, setadhar_card] = useState(null);
  // const [isDragging, setIsDragging] = useState(false);
  //  const [profile_image, setprofileimage] = useState(null);
  const [uploadprofileimage, setuploadprofileimage] = useState(null);


  const [frontAadhar, setFrontAadhar] = useState(null);
  const [backAadhar, setBackAadhar] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [rentAgreement, setRentAgreement] = useState(null);

  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const rentInputRef = useRef(null);


  const [activeButton, setActiveButton] = useState("tenantpage");
  const [TenantData, setTenantData] = useState({
    ownerName: "",
    ownerPhone: "",
    address: "",
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    age: "",
    gender: "",
    wing: "",
    unit: "",
    relation: "",
    memberDetails: [],
    vehicleDetails: [],
  });
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const isFormValid =
  
    TenantData.ownerName &&
    TenantData.ownerPhone &&
    TenantData.address &&
    TenantData.fullName &&
    TenantData.phoneNumber &&
    TenantData.age &&
    TenantData.gender &&
    TenantData.emailAddress &&
    TenantData.wing &&
    TenantData.unit &&
    TenantData.relation &&
    TenantData.memberDetails.every(
      (member) =>
        member.Full_name &&
        member.Phone_number &&
        member.Email_address &&
        member.Age &&
        member.Gender &&
        member.Relation
    ) &&
    TenantData.vehicleDetails.every(
      (vehicle) =>
        vehicle.vehicle_type && vehicle.vehicle_name && vehicle.vehicle_number
    );

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    // Validation for specific fields
    if (
      name === "fullName" ||
      name === "wing" ||
      name === "relation" ||
      name === "ownerName"
    ) {
      const regex = /^[A-Za-z\s]*$/; // Allow letters and spaces, including empty
      if (!regex.test(value)) return;
    }

    if (name === "phoneNumber" || name === "ownerPhone") {
      const regex = /^[6-9]\d{0,9}$/;
      if (!regex.test(value) && value !== "") return;
    }

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/;
    if (value !== "" && !emailRegex.test(value)) return; 
    }
    

    if (name === "age") {
      const regex = /^(?:[1-9][0-9]?|1[01])$/; // Allows only numbers 1-99
      if (value !== "" && !regex.test(value)) return; // Allow empty
    }

    if (index !== null) {
      const newMemberDetails = [...TenantData.memberDetails];
      newMemberDetails[index] = {
        ...newMemberDetails[index],
        [name]: value,
      };
      setTenantData({ ...TenantData, memberDetails: newMemberDetails });
      return;
    }

    setTenantData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setuploadprofileimage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMemberCountChange = (e) => {
    const newMemberCount = parseInt(e.target.value, 10);
    const newMemberDetails = [...TenantData.memberDetails].slice(
      0,
      newMemberCount
    );

    while (newMemberDetails.length < newMemberCount) {
      newMemberDetails.push({
        Full_name: "",
        Phone_number: "",
        Email_address: "",
        Age: "",
        Gender: "",
        Relation: "",
      });
    }

    setTenantData({
      ...TenantData,
      memberCount: newMemberCount,
      memberDetails: newMemberDetails,
    });
  };

  const handleVehicleCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    const updatedVehicleDetails = [...TenantData.vehicleDetails].slice(0, count);
    while (updatedVehicleDetails.length < count) {
      updatedVehicleDetails.push({
        vehicle_type: "",
        vehicle_name: "",
        vehicle_number: "",
      });
    }
    setTenantData((prevState) => ({
      ...prevState,
      vehicleCount: count,
      vehicleDetails: updatedVehicleDetails,
    }));
  };

 
  const handleVehicleDetailChange = (index, name, value) => {
    // Validation for vehicle details
    if (name === "vehicle_name") {
      const regex = /^[A-Za-z\s]+$/; // Only letters and spaces
      if (!regex.test(value)) return;
    }

    if (name === "vehicle_number") {
      const regex = /^[A-Za-z0-9]+$/; // Alphanumeric for vehicle number
      if (!regex.test(value)) return;
    }

    const updatedVehicleDetails = [...TenantData.vehicleDetails];
    updatedVehicleDetails[index] = {
      ...updatedVehicleDetails[index],
      [name]: value,
    };
    setTenantData({ ...TenantData, vehicleDetails: updatedVehicleDetails });
  };

  const handleMemberDetailChange = (index, name, value) => {
    // Validation for member details
    if (name === "Full_name" || name === "Relation") {
      const regex = /^[A-Za-z\s]*$/; // Allow letters and spaces, including empty
      if (!regex.test(value)) return;
    }

    if (name === "Phone_number") {
      const regex = /^[6-9]\d{0,9}$/; // Starts with 6,7,8,9 and allows up to 10 digits
      if (!regex.test(value) && value !== "") return; // Allow empty
    }

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (value !== "" && !emailRegex.test(value)) return; // Allow empty
    }

    if (name === "Age") {
      const regex = /^(?:[1-9][0-9]?|1[01])$/; // Allows only numbers 1-99
      if (value !== "" && !regex.test(value)) return; // Allow empty
    }


    const updatedMemberDetails = [...TenantData.memberDetails];
    updatedMemberDetails[index][name] = value;
    setTenantData({ ...TenantData, memberDetails: updatedMemberDetails });
  };

  // Handle file upload for photo (image)
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const validTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  //     const maxSize = 10 * 1024 * 1024; // 10MB

  //     if (!validTypes.includes(file.type)) {
  //       alert("Invalid file type. Please upload PNG, JPG, or GIF.");
  //       return;
  //     }

  //     if (file.size > maxSize) {
  //       alert("File size is too large. Maximum allowed size is 10MB.");
  //       return;
  //     }

  //     console.log(`File uploaded for ${e.target.name}`);
  //   }
  // };

  // Handle photo change (show image preview)
  const ClearAllData = () => {

    setprofileimage(null);
    setuploadprofileimage(null);
    setadhar_card(null);

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const formData = new FormData();
        formData.append("Full_name", TenantData.fullName);
        formData.append("Phone_number", TenantData.phoneNumber);
        formData.append("Email_address", TenantData.emailAddress);
        formData.append("Age", Number(TenantData.age));
        formData.append("Gender", TenantData.gender);
        formData.append("Wing", TenantData.wing);
        formData.append("Unit", TenantData.unit);
        formData.append("Relation", TenantData.relation);
        formData.append("Member_Counting", JSON.stringify(TenantData.memberDetails));
        formData.append("Vehicle_Counting", JSON.stringify(TenantData.vehicleDetails));
        formData.append("Owner_Full_name", TenantData.ownerName);
        formData.append("Owner_Phone", TenantData.ownerPhone);
        formData.append("Owner_Address", TenantData.address);

        if (uploadprofileimage) {
          formData.append("profileImage", uploadprofileimage); 
        }
        if (backAadhar) {
          formData.append("Adhar_back", backAadhar); 
        }
        if (addressProof) {
          formData.append("Address_proof", addressProof); 
        }
        if (rentAgreement) {
          formData.append("Rent_Agreement", rentAgreement); 
        }
        if (frontAadhar) {
          formData.append("Adhar_front", frontAadhar); 
        }
       // Log the FormData to inspect its contents
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

        const response = await axiosInstance.post("/v2/resident/addtenant", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201) {
          navigate("/Resident-Manegement");
        }
      } catch (error) {
        console.error("Error creating Tenant:", error.response || error.message);
      }
    } else {
      console.log("Form is invalid");
    }
  };


  const handleFrontAadharChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { 
        setFrontAadhar(file);
      } else {
        alert("File size should be less than 10MB");
        if (frontInputRef.current) {
          frontInputRef.current.value = '';
        }
      }
    }
  };

  const handleBackAadharChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { 
        setBackAadhar(file);
      } else {
        alert("File size should be less than 10MB");
        if (backInputRef.current) {
          backInputRef.current.value = '';
        }
      }
    }
  };

  const handleAddressProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { 
        setAddressProof(file);
      } else {
        alert("File size should be less than 10MB");
        if (addressInputRef.current) {
          addressInputRef.current.value = '';
        }
      }
    }
  };

  const handleRentAgreementChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { 
        setRentAgreement(file);
      } else {
        alert("File size should be less than 10MB");
        if (rentInputRef.current) {
          rentInputRef.current.value = '';
        }
      }
    }
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
              to="/dashboard"
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
            <span className="text-gray-400"> &gt; </span>
            <Link
              to="/owner"
              className="no-underline font-semibold text-[#A7A7A7]"
            >
              Owner Form
            </Link>
            <span className="text-gray-400 "> &gt; </span>
            <span className="font-semibold text-[#5678E9]">Tenant Form</span>
          </div>
          <HeaderBaner />
        </header>

        <div className="lg:mt-[10px] ml-[300px] bg">
          <div className="mt-10 lg:ml-[16px] px-4 sm:px-8 ">
            <Link
              to="/ownerpage"
              className={`w-full lg:h-[50px] sm:w-[150px] px-4 py-3 rounded-top no-underline ${
                activeButton === "ownerpage"
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#202224]"
              }`}
            >
              Owner
            </Link>
            <Link
              to="/tenantpage"
              className={`w-full lg:h-[50px] sm:w-[150px]  px-4 py-3 rounded-top no-underline ${
                activeButton === "tenantpage"
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#202224]"
              }`}
            >
              Tenant
            </Link>
          </div>
        </div>

        <div className=" w-[1500px]  mt-2 mb-5 ml-[340px]  ">
        {/* <form
            className="space-y-4 w-[1500px]  bg-white p-3 pt-1"
            onSubmit={handleSubmit}
          > */}
          <div
            onSubmit={handleSubmit}
            className="flex bg-white  w-[1500px] mb-2 rounded-e-md mx-auto p-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Owner Full Name */}
              {/* Owner Full Name */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium">
                  Owner Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={TenantData.ownerName}
                  onChange={handleInputChange}
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
                  value={TenantData.ownerPhone}
                  onChange={handleInputChange}
                  placeholder="+91"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>
              {/* Owner Email */}
        

              {/* Owner Address */}
              <div className="flex-1">
                <label className="block text-gray-700 font-medium">
                  Owner Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={TenantData.address}
                  onChange={handleInputChange} // Call handleInputChange on change
                  placeholder="Enter Address"
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <form
            className="space-y-4 w-[1500px]  bg-white p-3 pt-1"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-6 ml-2">
              <div className="flex flex-col items-center">
                <div className="border bg-white rounded-full w-[50px] h-[50px] flex justify-center items-center">
                  {/* {photo ? (
                    <img
                      src={photo}
                      alt="Owner"
                      className="w-[50px] h-[50px] object-cover rounded-full"
                    />
                  ) : (
                    <i className="fa-solid fa-camera text-[#FFFFFF]"></i>
                  )} */}
                  {photo ? (
                  <img src={photo} alt="Owner" className="w-[50px] h-[50px] object-cover rounded-full" />
                ) : (
                  <i className="fa-solid fa-camera text-[#FFFFFF]"></i>
                )}
                </div>
                <button
                  type="button"
                  className="mt-3 text-blue-500 no-underline"
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

              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={TenantData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-[430px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="Enter Full Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={TenantData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-[450px] px-3 py-2 border border-gray-300 rounded-lg bg-white text-[#202224] pr-10"
                    placeholder="+91"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type=" email"
                    name="emailAddress"
                    value={TenantData.emailAddress}
                    onChange={handleInputChange}
                    className="mt-1 block w-[420px] px-3 py-2 border border-gray-300 rounded-lg bg-white text-[#202224] pr-10"
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-4 ml-[100px]">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Age<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={TenantData.age}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg bg-white text-[#202224] pr-10"
                    placeholder="Enter Age"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={TenantData.gender}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg bg-white text-[#202224] pr-10"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Wing
                  </label>
                  <input
                    type="text"
                    name="wing"
                    value={TenantData.wing}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg bg-white text-[#202224] pr-10"
                    placeholder="Enter Wing"
                  />
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Unit
                  </label>
                  <input
                    type="text"
                    name="unit"
                    value={TenantData.unit}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="Enter Unit"
                  />
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700">
                    Relation
                  </label>
                  <input
                    type="text"
                    name="relation"
                    value={TenantData.relation}
                    onChange={handleInputChange}
                    className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    placeholder="Enter Relation"
                  />
                </div>
              </div>
            </div>

            


            <div className="flex  col-12 pe-4 mt-4 ">
            <div className="col-3 mx-1">
              <label className="block font-medium text-gray-700 mb-1">
                Upload Aadhar Card (Front side) <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed rounded-lg p-4  text-center">
                <input
                  ref={frontInputRef}
                  type="file"
                  // onChange={(e) => handleFileChange(e, setFrontAadhar)}
                  onChange={handleFrontAadharChange}
                  className="hidden"
                 
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                {frontAadhar ? (
                  <div className="flex items-center justify-between" style={{height:"98px"}}>
                    <span className="text-sm text-success ">{frontAadhar.name}</span>
                    <button
                      type="button"
                      // onClick={() => handleClearFile(setFrontAadhar, frontInputRef)}
                      onClick={() => {
                        setFrontAadhar(null);
                        if (frontInputRef.current) {
                          frontInputRef.current.value = '';
                        }
                      }}
                      className="text-red-500"
                    >
                     <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
             <div className="space-y-2">
        
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div  className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => frontInputRef.current?.click()}
                      className="text-blue-500"
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


            <div className="col-3 mx-1 ">
              <label className="block font-medium text-gray-700 mb-1">
                Upload Aadhar Card (Back side) <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  ref={backInputRef}
                  type="file"
                  // onChange={(e) => handleFileChange(e, setBackAadhar)}
                  onChange={handleBackAadharChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                {backAadhar ? (
                  <div className="flex items-center justify-between"style={{height:"98px"}} >
                    <span className="text-sm text-success">{backAadhar.name}</span>
                    <button
                      type="button"
                      // onClick={() => handleClearFile(setBackAadhar, backInputRef)}
                      onClick={() => {
                        setFrontAadhar(null);
                        if (backInputRef.current) {
                          backInputRef.current.value = '';
                        }
                      }}
                      className="text-red-500"
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
                      onClick={() => backInputRef.current?.click()}
                      className="text-blue-500"
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

            <div className="col-3 mx-1">
              <label className="block font-medium text-gray-700 mb-1">
                Address Proof <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  ref={addressInputRef}
                  type="file"
                  // onChange={(e) => handleFileChange(e, setAddressProof)}
                  onChange={handleAddressProofChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                {addressProof ? (
                  <div className="flex items-center justify-between" style={{height:"98px"}}>
                    <span className="text-sm text-success">{addressProof.name}</span>
                    <button
                      type="button"
                      // onClick={() => handleClearFile(setAddressProof, addressInputRef)}
                      onClick={() => {
                        setAddressProof(null);
                        if (addressInputRef.current) {
                          addressInputRef.current.value = '';
                        }
                      }}
                      className="text-red-500"
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
                      onClick={() => addressInputRef.current?.click()}
                      className="text-blue-500"
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

            <div className="col-3 mx-1">
              <label className="block font-medium text-gray-700 mb-1">
                Rent Agreement <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  ref={rentInputRef}
                  type="file"
                  // onChange={(e) => handleFileChange(e, setRentAgreement)}
                  onChange={handleRentAgreementChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                />
                {rentAgreement ? (
                  <div className="flex items-center justify-between" style={{height:"98px"}}>
                    <span className="text-sm text-success">{rentAgreement.name}</span>
                    <button
                      type="button"
                      // onClick={() => handleClearFile(setRentAgreement, rentInputRef)}
                      onClick={() => {
                        setRentAgreement(null);
                        if (rentInputRef.current) {
                          rentInputRef.current.value = '';
                        }
                      }}
                      className="text-red-500"
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
                      onClick={() => rentInputRef.current?.click()}
                      className="text-blue-500"
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


          </div>

          <div>
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Member Counting: (Other Members)
                  </label>
                  <div>
                    <span>Select Member</span>
                    <select
                      name="memberCount"
                      value={TenantData.memberCount}
                      onChange={handleMemberCountChange}
                      className="mt-1 w-10 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                      {[...Array(6).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {Array.from({ length: TenantData.memberCount }).map(
                  (_, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="Full_name"
                          value={
                            TenantData.memberDetails[index]?.Full_name || ""
                          }
                          onChange={(e) =>
                            handleMemberDetailChange(
                              index,
                              "Full_name",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[# 202224] pr-10"
                          placeholder="Enter Full Name"
                        />
                      </div>

                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="Phone_number"
                          value={TenantData.memberDetails[index]?.Phone_number || ""}
                          onChange={(e) =>
                            handleMemberDetailChange(
                              index,
                              "Phone_number",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                          placeholder="Enter Phone Number"
                        />
                      </div>

                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700">
                          Email Address<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="Email_address"
                          value={TenantData.memberDetails[index]?.Email_address || ""}
                          onChange={(e) =>
                            handleMemberDetailChange(
                              index,
                              "Email_address",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                          placeholder="Enter Email Address"
                        />
                      </div>

                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700">
                          Age<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="Age"
                          value={TenantData.memberDetails[index]?.Age || ""}
                          onChange={(e) =>
                            handleMemberDetailChange(
                              index,
                              "Age",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                          placeholder="Enter Age"
                        />
                      </div>

                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700">
                          Gender<span className="text-red-500">*</span>
                        </label>
                        <select
                          name="Gender"
                          value={TenantData.memberDetails[index]?.Gender || ""}
                          onChange={(e) =>
                            handleMemberDetailChange(
                              index,
                              "Gender",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>


                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700">
                          Relation<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="Relation"
                          value={TenantData.memberDetails[index]?.Relation || ""}
                          onChange={(e) =>
                            handleMemberDetailChange(
                              index,
                              "Relation",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                          placeholder="Enter Relation"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Vehicle Counting: (Other Vehicles)
                  </label>
                  <div>
                    <span>Select Vehicle</span>
                    <select
                      name="vehicleCount"
                      value={TenantData.vehicleCount}
                      onChange={handleVehicleCountChange}
                      className="mt-1 w-10 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                      {[...Array(4).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {Array.from({ length: TenantData.vehicleCount }).map(
                  (_, index) => (
                    <div key={index} className="space-y-4 mt-4">
                      <div className="flex gap-4 items-center">
                        <div className="flex-1 min-w-[200px]">
                          <label className="block text-sm font-medium text-gray-700">
                            Vehicle Type<span className="text-red-500">*</span>
                          </label>
                          <select
                            value={
                              TenantData.vehicleDetails[index]?.vehicle_type || ""
                            }
                            onChange={(e) =>
                              handleVehicleDetailChange(
                                index,
                                "vehicle_type",
                                e.target.value
                              )
                            } // Removed extra space
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                          >
                            <option value="">Select Vehicle Type</option>
                            <option value="Two Wheeler">2-Wheeler</option>
                            <option value="Four Wheeler">4-Wheeler</option>
                          </select>
                        </div>

                        <div className="flex-1 min-w-[200px]">
                          <label className="block text-sm font-medium text-gray-700">
                            Vehicle Name<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={
                              TenantData.vehicleDetails[index]?.vehicle_name || ""
                            }
                            onChange={(e) =>
                              handleVehicleDetailChange(
                                index,
                                "vehicle_name",
                                e.target.value
                              )
                            }
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                            placeholder="Enter Vehicle Name"
                          />
                        </div>

                        <div className="flex-1 min-w-[200px]">
                          <label className="block text-sm font-medium text-gray-700">
                            Vehicle Number
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={
                              TenantData.vehicleDetails[index]?.vehicle_number ||
                              ""
                            }
                            onChange={(e) =>
                              handleVehicleDetailChange(
                                index,
                                "vehicle_number",
                                e.target.value
                              )
                            }
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                            placeholder="Enter Vehicle Number"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-end">
              <button
                type="button"
                className="w-20 sm:w-[] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] hover:bg-gray-50"
                onClick={() => navigate("/Resident-Manegement")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`w-[180px] px-4 py-2 rounded-lg ${
                  isFormValid
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]"
                    : "bg-[#F6F8FB] text-[#202224]"
                }`}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TenantPage;
