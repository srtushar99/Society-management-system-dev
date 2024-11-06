import React from 'react';
import NotificationImage from '../../assets/ellipse 1092.png'; // Replace with your image path
import MoneysImage from '../../assets/moneys.png'; // Replace with your maintenance image path
import DoneImage from '../../assets/done.png'; // Replace with your "done" image path
// import { Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const NotificationModal = ({ isOpen, onClose, notifications, onClearAll }) => {
    const navigate = useNavigate();

    const handleClearAll = () => {
      onClearAll(); // Call the clear all function
      navigate('/no-notifications'); // Redirect to No Notification page
    };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-[15px_0_0_0] shadow-lg p-4 w-[540px] max-h-[90vh]"
        style={{
          position: 'absolute',
          top: '79px',
          left: '1177px',
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button href='/no-notification' 
            className="text-[#5678E9] text-sm font-semibold" 
            onClick={onClearAll}
          >
            Clear All
          </button>
        </div>
        <div className="flex flex-col">
          {notifications.map((notification, index) => (
            <div key={index} className="border-b py-2 flex items-start">
              {index === 0 && (
                <div className="h-10 w-10 rounded-full flex items-center justify-center mr-3">
                  <img src={NotificationImage} alt="Notification" className="h-10 w-10" />

                </div>
              )}
              {index === 2 && (
                <div className="h-10 w-10 rounded-full flex items-center justify-center mr-3">
                  <i className="fa-solid fa-g text-[#5678E9] h-7 w-7"></i>
                </div>
              )}
              {(index === 1 || index === 3) && (
                <div className="h-10 w-10 rounded-full flex items-center justify-center mr-3">
                  <img src={MoneysImage} alt="Maintenance" className="h-7 w-7" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium">{notification.title}</p>
                <span className="text-[#A7A7A7]" style={{ fontSize: "12px" }}>{notification.timing}</span>
                {index === 3 ? (
                  <div className="flex justify-between items-center mt-1 bg-gray-100 p-1 rounded">
                    <div>
                      <p className="text-gray-600">Maintenance Amount :</p>
                      <p className="text-gray-600">Maintenance Penalty :</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-[#39973D]">₹ 1,500</p>
                      <p className="text-[#E74C3C]">₹ 350</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">{notification.message}</p>
                )}
                <div className="flex justify-between items-center mt-2 mb-">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 rounded-md border border-[#D3D3D3] text-[#202224] text-sm">
                      Accept
                    </button>
                    <button className="text-white px-3 py-1 rounded-md text-sm" style={{ backgroundColor: "#5678E9" }}>
                      Decline
                    </button>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">{notification.timeAgo}</span>
                    {index === 0 && ( 
                      <img
                        src={DoneImage}
                        alt="Done"
                        className="h-4 w-4 ml-1"
                        style={{ filter: 'invert(41%) sepia(78%) saturate(1800%) hue-rotate(183deg) brightness(102%) contrast(88%)' }}
                      />
                    )}
                    {index !== 0 && (
                      <img src={DoneImage} alt="Done" className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
