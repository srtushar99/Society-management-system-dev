import React from 'react';
import { X } from 'lucide-react'; // Import the X icon from lucide-react
import NoNotificationImage from '../../assets/4884169-ai 1.png'; // Path to the No Notification Image
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router v6

const NoNotification = ({ isOpen, notifications, onClose }) => {
  const navigate = useNavigate(); 

  
  if (!isOpen || notifications.length > 0) return null;

  // Handle redirection when the close button is clicked
  const handleRedirect = () => {
    // Close the modal (optional)
    onClose();
    // Navigate to dashboard or desired route
    navigate('/dashboard'); // Adjust route as needed
  };

  return (
    // Background overlay (use a slightly transparent background to let the user see the page behind)
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 z-50">
      <div
        className="bg-white rounded-[15px_0_0_0] shadow-lg p-4 w-[540px] max-h-[90vh]"
        style={{
          position: 'absolute',
          top: '79px', // Adjust top position as needed
          left: '1177px', // Adjust left position as needed
        }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">No Notifications</h2>
          <button
            className="text-[#5678E9] text-sm font-semibold"
            onClick={handleRedirect} // Redirect to dashboard when X is clicked
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-8 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="relative w-64 h-64">
            <img
              src={NoNotificationImage} // Path to the no notifications image
              alt="No notifications illustration"
              className="object-contain w-full h-full"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-700">You have no notifications!</h3>
        </div>
      </div>
    </div>
  );
};

export default NoNotification;
