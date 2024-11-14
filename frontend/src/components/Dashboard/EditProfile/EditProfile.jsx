import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import "tailwindcss/tailwind.css"; 
import Sidebar from "../../Sidebar/Sidebar";
import NotificationIcon from "../../assets/notification-bing.png";
import AvatarImage from "../../assets/Avatar.png";
import pngwingImage from "../../assets/Frame 1000006013.png";
import ProfileImage from "../../assets/Ellipse 1101.png";
import editIcon from "../../assets/edit.png";
import HeaderBaner  from "../../Dashboard/Header/HeaderBaner";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("Arlene");
  const [lastName, setLastName] = useState("McCoy");
  const [phoneNumber, setPhoneNumber] = useState("+91 99130 44537");
  const [email, setEmail] = useState("ArleneMcCoy25@gmail.com");
  const [society, setSociety] = useState("Shantigram residency");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Gujarat");
  const [city, setCity] = useState("Baroda");

  const navigate = useNavigate(); 

  // Disable editing flag
  const isEditingDisabled = true;  // Set this to true to disable editing fields

  // Inline background image style
  const backgroundStyle = {
    display: "block",
    position: "absolute",
    top: "60px",
    marginLeft: "290px",
    width: "100%",
    height: "300px",
    backgroundImage: `url(${pngwingImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="container-fluid bg-light min-h-screen">
      <Sidebar />
      
      {/* Background image */}
      <div style={backgroundStyle}></div>

      <header className="flex justify-between items-center px-6 bg-white ml-[290px] h-[60px] shadow-md">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-gray-600">
          <Link to="/dashboard" className="text-[#A7A7A7] no-underline font-semibold">Home</Link>
          <span className="text-gray-400"> &gt; </span>
          <span className="font-semibold text-[#5678E9]">Edit Profile</span>
        </div>

        {/* Notifications and Profile Section */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border border-gray-300">
            <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3 cursor-pointer">
            <img src={AvatarImage} alt="User Avatar" width="40" height="40" className="rounded-full" />
            <div className="hidden sm:block flex-col items-start mt-2">
              <span className="font-medium text-sm">Moni Roy</span>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
       <HeaderBaner/>
      </header>

      {/* Edit Profile Section */}
      <div className="flex items-center mt-10 md:mt-20 lg:mt-28 ms-[560px]">
        <p className="text-2xl font-semibold">Profile</p>
        <button
          className="flex items-center text-white rounded-md px-2 ms-[590px] py-2 mb-2"
          style={{ background: "linear-gradient(90deg, #FE512E 0%, #F09619 100%)", zIndex: "1000" }}
          onClick={() => navigate('/update-profile')}  // Handle navigation to the update profile page if needed
        >
          <img src={editIcon} alt="edit" className="mr-2 h-4 w-4" />
          Edit Profile
        </button>
      </div>

      {/* Profile Edit Form */}
      <div className="w-full max-w-[800px] mx-auto bg-white p-6 shadow-md relative border-2 rounded-2">
        <div className="flex">
          <div className="relative flex justify-start items-start pe-12 pt-2 ps-4">
            <img
              src={ProfileImage}
              alt="Profile"
              className="rounded-full h-[120px] object-cover border-4 border-gray-200 shadow-md"
            />
            <button className="absolute sm:bottom-28 right-0 lg:mb-[55px] w-5 bg-white rounded-full shadow-md" style={{ transform: "translate(-240%, -100%)" }}>
              <i className="fa-solid fa-pen"></i>
            </button>
            <div className="absolute bottom-[100px] sm:bottom-[130px] left-1/2 transform -translate-x-1/2 text-center flex space-x-2">
              <p>{firstName}</p>
              <p>{lastName}</p>
            </div>
          </div>

          <form className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full max-w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isEditingDisabled}  // Disable input field
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full max-w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isEditingDisabled}  // Disable input field
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
                  Phone Number <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full max-w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isEditingDisabled}  // Disable input field
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full max-w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isEditingDisabled}  // Disable input field
                />
              </div>

              {/* Society */}
              <div>
                <label htmlFor="society" className="block text-sm font-medium mb-2">
                  Society
                </label>
                <input
                  type="text"
                  id="society"
                  className="w-full max-w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter society name"
                  value={society}
                  onChange={(e) => setSociety(e.target.value)}
                  disabled={isEditingDisabled}  // Disable input field
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="w-full max-w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={isEditingDisabled}  // Disable input field
                />
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-2">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="w-full max-w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={isEditingDisabled}  // Disable input field
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full max-w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={isEditingDisabled}  // Disable input field
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
