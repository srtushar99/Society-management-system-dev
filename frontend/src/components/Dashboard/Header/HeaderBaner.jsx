import React, { useState, useEffect } from 'react';

import NotificationIcon from '../../assets/notification-bing.png';
import AvatarImage from '../../assets/Avatar.png';
import NotificationModal from '../Notification/NotificationModal';
import NoNotification from '../Notification/NoNotification'; // Import the NoNotification component
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import Notification from '../../Facilities Management/Notification';
import { jwtDecode } from "jwt-decode";
import axiosInstance from '../../Common/axiosInstance';

const Header = () => {
  const [userById, setUserById] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const notifications = [
    {
      title: "Evelyn Harper (A- 101)",
      timing: "Monday 11:41 AM",
      message: (
        <>
          Evelyn Harper gave a fund of <span style={{ color: '#5678E9' }}>1000 for Navratri</span>.
        </>
      ),
      timeAgo: "32 Minutes ago",
    },
    // {
    //   title: "Maintenance (A- 101)",
    //   timing: "Tuesday 11:41 AM",
    //   message: (
    //     <>
    //       Evelyn Harper gave a <span style={{ color: '#5678E9' }}>Maintenance of 1000</span>.<br />
    //     </>
    //   ),
    //   timeAgo: "2 days ago",
    // },
    {
      title: "Ganesh Chaturthi (A- 101)",
      timing: "Saturday 11:41 AM",
      message: (
        <>
          Per Person Amount: <span style={{ color: '#5678E9' }}>₹ 1500</span>. 
          The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in our residence.
        </>
      ),
      timeAgo: "2 days ago",
    },
    // {
    //   title: "Update Maintenance",
    //   message: "Maintenance Amount: ₹ 1,500 Maintenance Penalty: ₹ 350.",
    //   timeAgo: "32 Minutes ago",
    // },
  ];

  const handleClearAll = () => {
    navigate('/no-notifications'); 
  };

  const isNoNotifications = notifications.length === 0;

  // Function to handle profile click and navigate to the EditProfile page
  const handleProfileClick = () => {
    navigate('/edit-profile'); // This will navigate to the EditProfile page
  };

  const fetchUserById = async (UserToken) => {
    try {
      const response = await axiosInstance.get(
        `/v1/${UserToken.userId}`
      );
      if (response.status === 200) {
        setUserById(response.data.data);
          // navigate("/update-profile");
      }
    } catch (error) {
      console.error("Error fetching UserById:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Society-Management");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        fetchUserById(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <header className="flex items-center v-screen justify-between px-2 bg-white sm:ms-[50px] h-[60px] flex-wrap md:flex-nowrap">
      {/* Search Bar Section */}
    

      {/* Right Section with Notification and Avatar */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        {/* Notification Icon */}
        <button
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border  border-gray-300"
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
        </button>

        {/* Profile Section */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
          {/* Avatar Image */}
          <img
            src={AvatarImage}
            alt="Moni Roy"
            width="40"
            height="40"
            className="rounded-full"
          />
          
          {/* Profile Text visible only on larger screens */}
          <div className="hidden sm:block flex-col items-start mt-2">
            <span className="font-medium text-sm">{!!userById.First_Name ? userById.First_Name +" " + userById.Last_Name : ""}</span>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Modal for Notifications */}
      {isNoNotifications ? (
        <NoNotification
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          notifications={notifications}
          onClearAll={handleClearAll}
        />
      ) : (
        <NotificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          notifications={notifications}
          onClearAll={handleClearAll} // Pass the clear function
        />
      )}
    

    </header>
  );
};

export default Header;
