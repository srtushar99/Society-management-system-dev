import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Sidebar/Sidebar"; // Ensure Sidebar is imported
import AvatarImage from "../../../assets/Avatar.png";

import HeaderBaner from "../../../Dashboard/Header/HeaderBaner";
import { useNavigate } from "react-router-dom";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";

const activity = [
  {
    name: "Cody Fisher",
    description: "Event and recreational activities.",
    date: "10/01/2024",
    eventName: "Society Meeting ",
    time: "2:45 PM",
  },
  {
    name: "Esther Howard",
    description: "Securing critica government systems.",
    date: "11/01/2024",
    eventName: "Holi Festival ",
    time: "1:45 PM",
  },
  {
    name: "Jenny Wilson",
    description: "Implementing surveillan public spaces.",
    date: "12/01/2024",
    eventName: "Navratri Festival",
    time: "7:00 PM",
  },
  {
    name: "Robert Fox",
    description: "Event and recreational activities.",
    date: "13/01/2024",
    eventName: "Holi Festival ",
    time: "4:45 PM",
  },
  {
    name: "Albert Flores",
    description: "Expenses will way sense for you.",
    date: "14/01/2024",
    eventName: "Ganesh Chaturthi",
    time: "1:00 PM",
  },
  {
    name: "Floyd Miles",
    description: "Event and recreational activities.",
    date: "15/01/2024",
    eventName: "Society Meeting",
    time: "6:45 PM",
  },
  {
    name: "Albert Flores",
    description: "Implementing surveillan public spaces.",
    date: "16/01/2024",
    eventName: "Holi Festival ",
    time: "7:35 PM",
  },
  {
    name: "Floyd Miles",
    description: "Event and recreational activities.",
    date: "17/01/2024",
    eventName: "Ganesh Chaturthi",
    time: "4:30 PM",
  },
  {
    name: "Cody Fisher",
    description: "Securing critica government systems",
    date: "18/01/2024",
    eventName: "Society Meeting",
    time: "1:30 PM",
  },
  {
    name: "Cody Fisher",
    description: "Event and recreational activities.",
    date: "19/01/2024",
    eventName: "Holi Festival",
    time: "3:45 PM",
  },
  {
    name: "Cody Fisher",
    description: "Event and recreational activities.",
    date: "19/01/2024",
    eventName: "Holi Festival",
    time: "3:45 PM",
  },
];

const Activity = () => {
  const [activeButton, setActiveButton] = useState("activity");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State for toggling the search input

  const notifications = [
    {
      title: "Evelyn Harper (A- 101)",
      timing: "Monday 11:41 AM",
      message: (
        <>
          Evelyn Harper gave a fund of{" "}
          <span style={{ color: "#5678E9" }}>1000 for Navratri</span>.
        </>
      ),
      timeAgo: "32 Minutes ago",
    },
    {
      title: "Maintenance (A- 101)",
      timing: "Tuesday 11:41 AM",
      message: (
        <>
          Evelyn Harper gave a{" "}
          <span style={{ color: "#5678E9" }}>Maintenance of 1000</span>.<br />
        </>
      ),
      timeAgo: "2 days ago",
    },
    {
      title: "Ganesh Chaturthi (A- 101)",
      timing: "Saturday 11:41 AM",
      message: (
        <>
          Per Person Amount: <span style={{ color: "#5678E9" }}>₹ 1500</span>.
          The celebration of Ganesh Chaturthi involves the installation of clay
          idols of Lord Ganesa in our residence.
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
    navigate("/no-notifications");
  };

  const isNoNotifications = notifications.length === 0;

  // Function to handle profile click and navigate to the EditProfile page
  const handleProfileClick = () => {
    navigate("/edit-profile"); // This will navigate to the EditProfile page
  };
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="flex bg-gray-100 w-full h-full">
      <ResidentSidebar />
      <div className="flex-1 flex flex-col">
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-80">
            <Link
              to="/residentDashboard"
              className="text-muted text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-muted mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Event Participation
            </span>
          </div>

          {/* Search Icon (Visible only on small screens) */}
          <div
            className={`d-block ml-auto d-sm-none p-2 rounded-lg ${
              isSearchVisible ? "border-none" : "border border-[#D3D3D3]"
            }`}
          >
            {!isSearchVisible && (
              <button
                onClick={toggleSearchVisibility}
                className="text-muted bg-transparent border-0"
              >
                <i className="fas fa-search"></i> {/* Search Icon */}
              </button>
            )}
            {isSearchVisible && (
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-1 py-1 w-[100px] rounded-md border mt-2"
                />
              </div>
            )}
          </div>
          {/*          
          <div className="flex items-center justify-end me-5 space-x-4 sm:space-x-6">
      
        <button
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border ml-3 border-gray-300"
          onClick={() => setIsModalOpen(true)} 
        >
          <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
         
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
          onClearAll={handleClearAll} 
        />
      )} */}
          <HeaderBaner />
        </header>

        <div className="ps-6 pe-6 w-full">
          <div className="lg:mt-[30px] lg:ml-[280px]  xl:ml-[280px] 2xl:ml-[280px]">
            <div className="mt-4 lg:px-5  ">
              <Link
                to="/EventsParticipation"
                style={{ fontSize: "15px" }}
                className={`lg:h-[30px] 2xl:h-[30px] lg:w-[180px]  py-3 p-3  rounded-t-md no-underline transition-all ${
                  activeButton === "EventsParticipation"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                } text-sm sm:text-base`}
              >
                Event Participate
              </Link>
              <Link
                to="/activity"
                style={{ fontSize: "15px" }}
                className={`lg:h-[50px] 2xl:h-[30px] sm:w-[60px]  py-3 p-3  rounded-t-md no-underline transition-all    ${
                  activeButton === "activity"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                } text-sm sm:text-base`}
              >
                Activity Participate
              </Link>
            </div>
          </div>

          <div className="rounded-lg lg:ml-[300px] shadow-md lg:w-[1570px] bg-white">
            <h1 className="p-3 fs-6 font-semibold text-gray-800 mt-2">
              Events Participation
            </h1>
            <div />
            <div className="overflow-x-auto sm:overflow-y-auto h-[700px] rounded-2xl scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="Content">
                <table className="2xl:w-[1560px]  border border-gray-200  rounded-table ">
                  <thead
                    className=" relative lg:w-[1560px]"
                    style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
                  >
                    <tr className="text-left text-sm  font-semibold ">
                      <th className="2xl:p-3 p-2  text-[#202224]">
                        {" "}
                        Participator Name
                      </th>
                      <th className="2xl:p-3 p-2  text-[#202224]">
                        Description
                      </th>
                      <th className="2xl:p-1 p-2  ps-5  whitespace-nowrap ">Event Time</th>
                      <th className="2xl:p-3 p-2 ps-3  whitespace-nowrap">Event Date</th>
                      <th className="2xl:p-3 p-2  ps-5  whitespace-nowrap">Event Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.map((activity, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="2xl:p-4 p-3 mr-44 pt-3 pb-2 flex items-center whitespace-nowrap ">
                          <img
                            src={AvatarImage}
                            alt="visitor avatar"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <span className="text-gray-700 font-medium">
                            {activity.name}
                          </span>
                        </td>
                        <td className="text-[#4F4F4F] text-left whitespace-nowrap">
                        
                          <div className="break-words text-[#4F4F4F] w-[500px] whitespace-normal">
                            {activity.description}
                            </div>
                    
                        </td>

                        <td className="  text-[#4F4F4F]  text-center">
                          <span className="text-[#4F4F4F] text-sm sm:text-base">
                            {activity.time}{" "}
                            <span className="inline">{activity.amPm}</span>
                          </span>
                        </td>
                        <td className="pt-3  mr-10 text-center  text-[#4F4F4F] ">
                          <span className="text-[#4F4F4F]   ">
                            {activity.date}
                          </span>
                        </td>
                        <td className="pt-3 sm:table-cell whitespace-nowrap text-center text-gray-600">
                          <span className="text-[#4F4F4F]   ">
                            {activity.eventName}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
