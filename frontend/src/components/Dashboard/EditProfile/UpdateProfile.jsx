import React, { useState } from "react"; // Import useState hook
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import Sidebar from "../../Sidebar/Sidebar";
import NotificationIcon from "../../assets/notification-bing.png";
import AvatarImage from "../../assets/Avatar.png";
import pngwingImage from "../../assets/Frame 1000006013.png";
import ProfileImage from "../../assets/Ellipse 1101.png";

import { Link } from "react-router-dom";
import HeaderBaner  from "../../Dashboard/Header/HeaderBaner";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("Arlene");
  const [lastName, setLastName] = useState("McCoy");
  const [phoneNumber, setPhoneNumber] = useState("+91 99130 44537");
  const [email, setEmail] = useState("ArleneMcCoy25@gmail.com");
  const [society, setSociety] = useState("Shantigram residency");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Gujarat");
  const [city, setCity] = useState("Baroda");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", {
      firstName,
      lastName,
      phoneNumber,
      email,
      society,
      country,
      state,
      city,
    });
  };

  const backgroundStyle = {
    display: "block",
    position: "absolute",
    top: "60px",
    marginLeft: "290px",
    width: "1630px",
    height: "300px",
    backgroundImage: `url(${pngwingImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // zIndex: 999,
  };

  const preventNumericInput = (e) => {
    // Only allow alphabetic characters and spaces
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="container-fluid bg-light min-h-screen">
      <Sidebar />

      {/* Background image div with inline styles */}
      <div style={backgroundStyle}></div>

      <header className="flex justify-between items-center px-6 bg-white ml-[290px] h-[60px] shadow-md">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-gray-600">
          {/* Home Link */}
          <Link to="/dashboard" className="text-[#A7A7A7] no-underline font-semibold">Home</Link>
          <span className="text-gray-400"> &gt; </span>
          <span className="font-semibold  text-[#5678E9]">Edit Profile</span>
        </div>

        {/* Notifications and Profile Section */}
       <HeaderBaner/>
      </header>
      {/* Right side form heading and button */}
      <div className="flex items-center mt-[100px] ms-[600px]">
        <p className="text-2xl font-semibold text-[rgba(32, 34, 36, 1)]">Edit Profile</p>
      </div>

      <div className="w-[800px] ms-[600px] h-[450px] bg-white border p-6 shadow-md relative rounded">
        <div className="flex">
         
          <div className="relative flex justify-start items-start pe-12 pt-2 ps-4">
            <img
              src={ProfileImage} // Profile Image
              alt="Profile"
              className="rounded-full h-[120px] object-cover border-4 border-gray-200 shadow-md"
            />
           
            <button
              className="absolute bottom-0 right-0 mb-80 w-5 bg-white rounded-full shadow-md"
              style={{
                transform: "translate(-240%, 140%)",
              }}
            >
              <i className="fa-solid fa-pen"></i>{" "}
             
            </button>
            
            <div className="absolute bottom-[230px] left-1/2 transform -translate-x-1/2 text-center flex space-x-2">
              <p className="">{firstName}</p>
              <p className="">{lastName}</p>
            </div>
          </div>

          {/* Form for updating profile */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyPress={preventNumericInput} // Prevent numeric input
                  pattern="^[A-Za-z\s]+$" // Only letters and spaces
                  title="Only letters and spaces are allowed"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyPress={preventNumericInput} // Prevent numeric input
                  pattern="^[A-Za-z\s]+$" // Only letters and spaces
                  title="Only letters and spaces are allowed"
                  required
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
                  Phone Number <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  pattern="^[6-9]\d{9}$" // Pattern for 10 digits starting with 6,7,8, or 9
                  maxLength="10"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="society" className="block text-sm font-medium mb-2">
                  Society <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="text"
                  id="society"
                  className="w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter society name"
                  value={society}
                  onChange={(e) => setSociety(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">
                  Country <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  className="w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  onKeyPress={preventNumericInput} // Prevent numeric input
                  pattern="^[A-Za-z\s]+$"
                  title="Only letters and spaces are allowed"
                  required
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-2">
                  State <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  className="w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  onKeyPress={preventNumericInput} // Prevent numeric input
                  pattern="^[A-Za-z\s]+$"
                  title="Only letters and spaces are allowed"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  City <span style={{ color: "#FE512E" }}>*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-[250px] p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={preventNumericInput} // Prevent numeric input
                  pattern="^[A-Za-z\s]+$"
                  title="Only letters and spaces are allowed"
                  required
                />
              </div>
            </div>
        
            <button
              className="flex items-center text-white rounded-md px-2 ms-[420px] mt-5 py-2 mb-2"
              style={{
                background: "linear-gradient(90deg, #FE512E 0%, #F09619 100%)",
              }}
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;