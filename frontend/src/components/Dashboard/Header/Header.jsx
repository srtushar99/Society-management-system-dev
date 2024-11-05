import React, { useState } from 'react';
import { Search } from 'lucide-react';
import NotificationIcon from '../../assets/notification-bing.png';
import AvatarImage from '../../assets/Avatar.png';
import NotificationModal from '../Notification/NotificationModal';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
    {
      title: "Maintenance (A- 101)",
      timing: "Tuesday 11:41 AM",
      message: (
        <>
          Evelyn Harper gave a <span style={{ color: '#5678E9' }}>Maintenance of 1000</span>.
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
  ];

  const handleClearAll = () => {
    navigate('/no-notifications'); // Redirect to No Notifications page
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="relative" style={{ marginLeft: "350px" }}>
        <Search className="absolute left-3 rounded top-1/2 transform -translate-y-1/2 h-5 w-5" />
        <input
          type="text"
          placeholder="Search Here"
          className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border border-gray-300"
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-3">
          <img
            src={AvatarImage}
            alt="Moni Roy"
            width="40"
            height="40"
            className="rounded-full"
          />
          <div className="flex flex-col items-start">
            <span className="font-medium text-sm">Moni Roy</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        </div>
      </div>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notifications={notifications}
        onClearAll={handleClearAll} // Pass the clear function
      />
    </header>
  );
};

export default Header;
