import React, { useState } from 'react';
import { Search } from 'lucide-react';
import NotificationIcon from '../../assets/notification-bing.png';
import AvatarImage from '../../assets/Avatar.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Notification from '../../Facilities Management/Notification'; // Your notification pop-up

const Header = () => {
  const [notificationModalOpen, setNotificationModalOpen] = useState(false); // State for notification modal
  const [notifications, setNotifications] = useState([  // State for notifications
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
    {
      title: "Maintenance (A- 101)",
      timing: "Tuesday 11:41 AM",
      message: (
        <>
          Evelyn Harper gave a <span style={{ color: '#5678E9' }}>Maintenance of 1000</span>.<br />
        </>
      ),
      timeAgo: "2 days ago",
    },
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
    {
      title: "Update Maintenance",
      message: "Maintenance Amount: ₹ 1,500 Maintenance Penalty: ₹ 350.",
      timeAgo: "32 Minutes ago",
    },
  ]);

  const navigate = useNavigate(); // Initialize the navigate function

  // Handle Clear All button click
  const handleClearAll = () => {
    setNotifications([]);  // Clear the notifications
    navigate('/dashboard');  // Redirect to the dashboard
  };

  // Check if there are no notifications
  const isNoNotifications = notifications.length === 0;

  return (
    <header className="flex items-center v-screen justify-between px-6 bg-white sm:ms-[50px] h-[60px] flex-wrap md:flex-nowrap">
      {/* Search Bar Section */}
      <div className="relative flex-1 md:flex-none md:ml-[290px] md:mr-4">
        <div className="hidden md:block">
          <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 h-5 w-5 " />
          <input
            type="text"
            placeholder="Search Here"
            className="pl-10 pr-4 py-2 w-full sm:w-64 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right Section with Notification and Avatar */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <button
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border ml-3 border-gray-300"
          onClick={() => setNotificationModalOpen(true)} // Open the notification modal
        >
          <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
        </button>

        {/* Profile Section */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <img
            src={AvatarImage}
            alt="Moni Roy"
            width="40"
            height="40"
            className="rounded-full"
          />
          <div className="hidden sm:block flex-col items-start mt-2">
            <span className="font-medium text-sm">Moni Roy</span>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Notification Pop-Up */}
      {/* <Notification
        isOpen={notificationModalOpen} // Pass the modal state to control its visibility
        onClose={() => setNotificationModalOpen(false)} // Close function
        notifications={notifications} // Pass the notifications as props
      /> */}
    </header>
  );
};

export default Header;
