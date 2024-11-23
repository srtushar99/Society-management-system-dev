import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import HeaderBaner from "../Dashboard/Header/HeaderBaner";
import Sidebar from "../Sidebar/Sidebar";
import Avatar from "../assets/Avatar.png";

const staticMembers = [
  {
    memberName: "Arlene McCoy",
    Number: "9876543210",
    email: "rachit@example.com",
    age: "28",
    gender: "male",
    relation: "Self",
  },
  {
    memberName: "Aditi",
    Number: "9876543211",
    email: "aditi@example.com",
    age: "25",
    gender: "female",
    relation: "Spouse",
  },
  {
    memberName: "Arjun",
    Number: "9876543212",
    email: "arjun@example.com",
    age: "5",
    gender: "male",
    relation: "Son",
  },
  {
    memberName: "Meera",
    Number: "9876543213",
    email: "meera@example.com",
    age: "3",
    gender: "female",
    relation: "Daughter",
  },
  {
    memberName: "Rahul",
    Number: "9876543214",
    email: "rahul@example.com",
    age: "30",
    gender: "male",
    relation: "Brother",
  },
  {
    memberName: "Sita",
    Number: "9876543215",
    email: "sita@example.com",
    age: "60",
    gender: "female",
    relation: "Mother",
  },
];

const staticVehicles = [
  {
    vehicleType: "4-wheeler",
    vehicleName: "Toyota Camry",
    vehicleNumber: "ABC1234",
  },
  {
    vehicleType: "2-wheeler",
    vehicleName: "Honda Activa",
    vehicleNumber: "XYZ5678",
  },
  {
    vehicleType: "4-wheeler",
    vehicleName: "Ford Mustang",
    vehicleNumber: "LMN9101",
  },
];

const EditOwner = () => {
  const [activeButton, setActiveButton] = useState("editowner");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    existingData,
    memberCount = 0,
    vehicleCount = 0,  } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: existingData?.Name || "Rachit",
    phoneNumber: existingData?.Number || "97587 85828",
    emailAddress: existingData?.Email || "rachit@gmail.com",
    age: existingData?.Age || "20",
    gender: existingData?.Gender || "male",
    wing: existingData?.Wing || "A",
    unit: existingData?.UnitNumber || "1003",
    relation: existingData?.Relation || "Friend",
    memberCount: memberCount,
    memberDetails: [],
    vehicleCount: vehicleCount,
    vehicleDetails: [],
  });

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (existingData) {
      const memberDetails = Array.isArray(existingData.MemberDetails)
        ? existingData.MemberDetails
        : [];
      const vehicleDetails = Array.isArray(existingData.VehicleDetails)
        ? existingData.VehicleDetails
        : [];

      const initialMemberDetails = Array.from(
        { length: formData.memberCount },
        (_, index) => ({
          memberName:
            memberDetails[index]?.memberName ||
            staticMembers[index]?.memberName ||
            "",
          Number:
            memberDetails[index]?.Number || staticMembers[index]?.Number || "",
          email:
            memberDetails[index]?.email || staticMembers[index]?.email || "",
          age: memberDetails[index]?.age || staticMembers[index]?.age || "",
          gender:
            memberDetails[index]?.gender || staticMembers[index]?.gender || "",
          relation:
            memberDetails[index]?.relation ||
            staticMembers[index]?.relation ||
            "",
        })
      );

      const initialVehicleDetails = Array.from(
        { length: formData.vehicleCount },
        (_, index) => ({
          vehicleType:
            vehicleDetails[index]?.vehicleType ||
            staticVehicles[index]?.vehicleType ||
            "",
          vehicleName:
            vehicleDetails[index]?.vehicleName ||
            staticVehicles[index]?.vehicleName ||
            "",
          vehicleNumber:
            vehicleDetails[index]?.vehicleNumber ||
            staticVehicles[index]?.vehicleNumber ||
            "",
        })
      );

      setFormData((prevData) => ({
        ...prevData,
        memberDetails: initialMemberDetails,
        vehicleDetails: initialVehicleDetails,
      }));
    }
  }, [existingData, formData.memberCount, formData.vehicleCount]);
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

  const handleMemberDetailChange = (index, name, value) => {
    const newMemberDetails = [...formData.memberDetails];
    newMemberDetails[index][name] = value;
    setFormData({ ...formData, memberDetails: newMemberDetails });
  };

  const handleVehicleDetailChange = (index, name, value) => {
    const newVehicleDetails = [...formData.vehicleDetails];
    newVehicleDetails[index][name] = value;
    setFormData({ ...formData, vehicleDetails: newVehicleDetails });
  };
  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    // Validation for specific fields
    if (name === "fullName" || name === "wing" || name === "relation") {
      const regex = /^[A-Za-z\s]*$/; // Allow letters and spaces, including empty
      if (!regex.test(value)) return;
    }

    if (name === "phoneNumber") {
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
      const newMemberDetails = [...formData.memberDetails];
      newMemberDetails[index] = {
        ...newMemberDetails[index],
        [name]: value,
      };
      setFormData({ ...formData, memberDetails: newMemberDetails });
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormValid =
    formData.fullName &&
    formData.phoneNumber &&
    formData.age &&
    formData.gender &&
    formData.emailAddress &&
    formData.wing &&
    formData.unit &&
    formData.relation &&
    formData.memberDetails.every(
      (member) =>
        member.memberName &&
        member.Number &&
        member.email &&
        member.age &&
        member.gender &&
        member.relation
    ) &&
    formData.vehicleDetails.every(
      (vehicle) =>
        vehicle.vehicleType && vehicle.vehicleName && vehicle.vehicleNumber
    );

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  // Function to handle form input changes

  const handleMemberCountChange = (e) => {
    const newMemberCount = parseInt(e.target.value, 10);
    const newMemberDetails = Array.from(
      { length: newMemberCount },
      (_, index) => ({
        memberName: staticMembers[index]?.memberName || "",
        Number: staticMembers[index]?.Number || "",
        email: staticMembers[index]?.email || "",
        age: staticMembers[index]?.age || "",
        gender: staticMembers[index]?.gender || "",
        relation: staticMembers[index]?.relation || "",
      })
    );

    setFormData({
      ...formData,
      memberCount: newMemberCount,
      memberDetails: newMemberDetails,
    });
  };

  const handleVehicleCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    const updatedVehicleDetails = Array.from({ length: count }, (_, index) => ({
      vehicleType: staticVehicles[index]?.vehicleType || "",
      vehicleName: staticVehicles[index]?.vehicleName || "",
      vehicleNumber: staticVehicles[index]?.vehicleNumber || "",
    }));

    setFormData((prevState) => ({
      ...prevState,
      vehicleCount: count,
      vehicleDetails: updatedVehicleDetails,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all required fields correctly.");
      return;
    }
    console.log("Form submitted with :", formData);
  };

  return (
    <div className="flex bg-gray-100 w-full h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
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
            <span className="text-gray-400 "> &gt; </span>
            <span className="font-semibold text-[#5678E9]">Owner Form</span>
          </div>
          <HeaderBaner />
        </header>

        <div className="lg:mt-[10px] ml-[325px]">
          <div className="mt-4 px-4 sm:px-8">
            <button
              onClick={() => {
                handleButtonClick("editowner");
       
              }}
              className={`w- lg:h-[50px] sm:w-[100px] px-4 py-3 rounded-t-md transition-all ${
                activeButton === "editowner"
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#202224]"
              }`}
            >
              Owner
            </button>

            <Link
              to="/edittenant"
              onClick={() => handleButtonClick("edittenant")}
              className={`w-full lg:h-[50px] sm:w-[150px] px-4 py-3 rounded-t-md no-underline transition-all ${
                activeButton === "edittenant"
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#202224]"
              }`}
            >
              Tenant
            </Link>
          </div>
        </div>

        <form
          className="space-y-4 w-[1500px] ml-[350px] bg-white p-3 pt-1"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-6 ml-2">
            <div className="flex flex-col items-center">
              <div className="border bg-white rounded-full w-[50px] h-[50px] flex justify-center items-center">
                {photo ? (
                  <img
                    src={Avatar}
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

            <div className="flex gap-6">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-[430px] px-3 py-2 border border-gray-300 rounded-lg text-[#202 224] pr-10"
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
                  value={formData.phoneNumber}
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
                  value={formData.emailAddress}
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
                  value={formData.age}
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
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg bg-white text-[#202224] pr-10"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700">
                  Wing
                </label>
                <input
                  type="text"
                  name="wing"
                  value={formData.wing}
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
                  value={formData.unit}
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
                  value={formData.relation}
                  onChange={handleInputChange}
                  className="mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                  placeholder="Enter Relation"
                />
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
                    value={formData.memberCount}
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

              {Array.from({ length: formData.memberCount }).map((_, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="memberName"
                      value={formData.memberDetails[index]?.memberName || ""}
                      onChange={(e) =>
                        handleMemberDetailChange(
                          index,
                          "memberName",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                      placeholder="Enter Full Name"
                    />
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="Number"
                      value={formData.memberDetails[index]?.Number || ""}
                      onChange={(e) =>
                        handleMemberDetailChange(
                          index,
                          "Number",
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
                      name="email"
                      value={formData.memberDetails[index]?.email || ""}
                      onChange={(e) =>
                        handleMemberDetailChange(index, "email", e.target.value)
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
                      name="age"
                      value={formData.memberDetails[index]?.age || ""}
                      onChange={(e) =>
                        handleMemberDetailChange(index, "age", e.target.value)
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
                      name="gender"
                      value={formData.memberDetails[index]?.gender || ""}
                      onChange={(e) =>
                        handleMemberDetailChange(
                          index,
                          "gender",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700">
                      Relation<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="relation"
                      value={formData.memberDetails[index]?.relation || ""}
                      onChange={(e) =>
                        handleMemberDetailChange(
                          index,
                          "relation",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224] pr-10"
                      placeholder="Enter Relation"
                    />
                  </div>
                </div>
              ))}
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
                    value={formData.vehicleCount}
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

              {Array.from({ length: formData.vehicleCount }).map((_, index) => (
                <div key={index} className="space-y-4 mt-4">
                  <div className="flex gap-4 items-center">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700">
                        Vehicle Type<span className="text-red-500">*</span>
                      </label>
                      <select
                        value={
                          formData.vehicleDetails[index]?.vehicleType || ""
                        }
                        onChange={(e) =>
                          handleVehicleDetailChange(
                            index,
                            "vehicleType",
                            e.target.value
                          )
                        }
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                      >
                        <option value="">Select Vehicle Type</option>
                        <option value="2-wheeler">2-Wheeler</option>
                        <option value="4-wheeler">4-Wheeler</option>
                      </select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700">
                        Vehicle Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={
                          formData.vehicleDetails[index]?.vehicleName || ""
                        }
                        onChange={(e) =>
                          handleVehicleDetailChange(
                            index,
                            "vehicleName",
                            e.target.value
                          )
                        }
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                        placeholder="Enter Vehicle Name"
                      />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700">
                        Vehicle Number<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={
                          formData.vehicleDetails[index]?.vehicleNumber || ""
                        }
                        onChange={(e) =>
                          handleVehicleDetailChange(
                            index,
                            "vehicleNumber",
                            e.target.value
                          )
                        }
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                        placeholder="Enter Vehicle Number"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
  );
};

export default EditOwner;
