import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import NotificationImage from "../../assets/ellipse 1092.png";
import MoneysImage from "../../assets/moneys.png";
import DoneImage from "../../assets/done.png";
import NoNotification from "./NoNotification"; 
import UpdateMaintenance from "./UpdateMaintenance"; 

const NotificationModal = ({ isOpen, onClose, notifications }) => {
  const [isNoNotificationOpen, setIsNoNotificationOpen] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(
    notifications.map(() => "Pending") // Initialize all notifications as 'Pending'
  );
  const [isUpdateMaintenanceOpen, setIsUpdateMaintenanceOpen] = useState(false); 
  const navigate = useNavigate(); 

  const handleStatusChange = (index, status) => {
    const newStatus = [...notificationStatus];
    newStatus[index] = status;
    setNotificationStatus(newStatus);

    if (notifications[index].index === 3 && status === "Accepted") {
      setIsUpdateMaintenanceOpen(true); 
    }
  };

  const handleClearAll = () => {
    if (notifications.length === 0) {
      setIsNoNotificationOpen(true);
      navigate("/no-notifications");
    } else {
      onClose();
    }
  };
  
  if (!isOpen || notifications.length === 0) {
    return (
      <NoNotification
        isOpen={isNoNotificationOpen}
        notifications={notifications}
        onClose={onClose}
      />
    );
  }

  return (
    <div
      className={`2xl:fixed sm:w-[] inset-0 flex item-end justify-end sm:justify-center sm:mt-20 2xl:mt-0 z-50 ${isOpen ? "block" : "hidden"}`}
    >
      <div
        className="bg-white rounded-[15px_0_0_0] shadow-lg p-10 2xl:w-[500px] sm:w-[100px] md:w-[540px] max-h-[140vh] ml-0 mt-10 2xl:mt-0 md:top-[79px] md:left-[1177px]"
        style={{ position: "absolute" }}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center ml-3 mb-2 sm:mb-3">
          <h2 className="text-xl sm:text-lg md:text-xl font-semibold">Notifications</h2>
          <button
            className="text-[#5678E9] text-sm font-semibold"
            onClick={handleClearAll} // Clear all notifications and close the modal
          >
            Clear All
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col">
          {notifications.map((notification, index) => (
            <div key={index} className="border-b py-2 sm:py-3 flex items-start">
              {/* Different notification images based on index */}
              {index === 0 && (
                <div className="h-15 w-15 sm:h-8 sm:w-10 rounded-full flex items-center justify-center mr-3">
                  <img
                    src={NotificationImage}
                    alt="Notification"
                    className="h-10 w-10 sm:h-8 sm:w-8"
                  />
                </div>
              )}
              {index === 2 && (
                <div className="h-15 w-10 sm:h-8 sm:w-8 rounded-full flex items-center justify-center mr-3">
                  <i className="fa-solid fa-g text-[#5678E9] h-7 w-7 sm:h-6 sm:w-6"></i>
                </div>
              )}
              {(index === 1 || index === 3) && (
                <div className="h-15 w-10 sm:h-8 sm:w-8 rounded-full flex items-center justify-center mr-3">
                  <img
                    src={MoneysImage}
                    alt="Maintenance"
                    className="h-7 w-7 sm:h-6 sm:w-6"
                  />
                </div>
              )}

              <div className="flex-1">
                <p className="font-medium sm:text-sm md:text-base">
                  {notification.title}
                </p>
                <span
                  className="text-[#A7A7A7] sm:text-xs md:text-sm"
                  style={{ fontSize: "12px" }}
                >
                  {notification.timing}
                </span>
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
                  <p className="text-gray-600 sm:text-xs md:text-sm">
                    {notification.message}
                  </p>
                )}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex space-x-2">
                    {index !== 3 && (
                      <>
                        <button
                          className={`px-3 py-1 rounded-md text-sm sm:text-xs md:text-sm ${
                            notificationStatus[index] === "Accepted"
                              ? "bg-[#5678E9] text-white"
                              : "bg-transparent text-[#202224]"
                          }`}
                          style={{
                            backgroundColor:
                              notificationStatus[index] === "Accepted"
                                ? "#5678E9"
                                : "transparent",
                            color:
                              notificationStatus[index] === "Accepted"
                                ? "white"
                                : "#202224",
                          }}
                          onClick={() => handleStatusChange(index, "Accepted")} 
                        >
                          Accept
                        </button>

                        <button
                          className={`px-3 py-1 rounded-md text-sm sm:text-xs md:text-sm ${
                            notificationStatus[index] === "Declined"
                              ? "bg-[#5678E9] text-white"
                              : "bg-transparent text-[#202224]"
                          }`}
                          style={{
                            backgroundColor:
                              notificationStatus[index] === "Declined"
                                ? "#5678E9"
                                : "transparent",
                            color:
                              notificationStatus[index] === "Declined"
                                ? "white"
                                : "#202224",
                          }}
                          onClick={() => handleStatusChange(index, "Declined")}
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {notification.title === "Maintenance" && (
                      <button
                        className="px-3 py-1 rounded-md border border-[#D3D3D3] text-[#202224] text-sm sm:text-xs md:text-sm"
                        onClick={() => handleStatusChange(index, "In Progress")}
                      >
                        Mark as In Progress
                      </button>
                    )}

                    {notification.title === "Payment Reminder" && (
                      <button
                        className="text-white px-3 py-1 rounded-md text-sm sm:text-xs md:text-sm"
                        style={{ backgroundColor: "#D97706" }}
                        onClick={() => handleStatusChange(index, "Paid")}
                      >
                        Mark as Paid
                      </button>
                    )}
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">
                      {notification.timeAgo}
                    </span>
                    {notificationStatus[index] === "Accepted" && (
                      <img
                        src={DoneImage}
                        alt="Done"
                        className="h-4 w-4 ml-1 sm:h-3 sm:w-3"
                        style={{
                          filter:
                            "invert(41%) sepia(78%) saturate(1800%) hue-rotate(183deg) brightness(102%) contrast(88%)",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {notifications.length === 0 && (
        <NoNotification
          isOpen={isNoNotificationOpen}
          onClose={() => setIsNoNotificationOpen(false)} 
        />
      )}

      {isUpdateMaintenanceOpen && (
        <UpdateMaintenance
          isOpen={isUpdateMaintenanceOpen}
          onClose={() => setIsUpdateMaintenanceOpen(false)} 
        />
      )}
    </div>
  );
};

export default NotificationModal;
