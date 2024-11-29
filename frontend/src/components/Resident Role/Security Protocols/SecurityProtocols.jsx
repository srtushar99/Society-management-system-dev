import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar"; // Ensure Sidebar is imported
import AvatarImage from "../../assets/Avatar.png";
import HeaderBaner from "../../Dashboard/Header/HeaderBaner";
import { useNavigate } from "react-router-dom";
import ResidentSidebar from "../Resident Sidebar/ResidentSidebar";

const securityprotocol = [
  {
    title: "Cameron Williamson",
    description: "A visual representation your spending categories.",
    date: "11/02/2024",
    time: "2:45 PM",
  },
  {
    title: "Darrell Steward",
    description: "Securing critical government systems.",
    date: "12/02/2024",
    time: "3:00 PM",
  },
  {
    title: "Courtney Henry",
    description: "Implementing surveillance in public spaces.",
    date: "13/02/2024",
    time: "4:30 PM",
  },
  {
    title: "Kathryn Murphy",
    description: "Tailor the dashboard to your unique financial.",
    date: "14/02/2024",
    time: "6:45 PM",
  },
  {
    title: "Kathryn Murphy",
    description: "Expenses will make sense for you.",
    date: "15/02/2024",
    time: "2:45 PM",
  },
  {
    title: "Arlene McCoy",
    description: "Helping you identify where your money is going",
    date: "16/02/2024",
    time: "5:45 PM",
  },
  {
    title: "Eleanor Pena",
    description: "Simply navigate through the different sections.",
    date: "17/02/2024",
    time: "4:45 PM",
  },
  {
    title: "Brooklyn Simmons",
    description: "Expenses will become a way that makes sense.",
    date: "18/02/2024",
    time: "3:45 PM",
  },
  {
    title: "Wade Warren",
    description: "Implementing surveillance in public spaces.",
    date: "19/02/2024",
    time: "9:45 PM",
  },
  {
    title: "Jane Cooper",
    description: "Expenses will become a way that makes sense.",
    date: "20/02/2024",
    time: "3:45 PM",
  },
  {
    title: "Esther Howard",
    description: "A visual representation of your spending categories.",
    date: "21/02/2024",
    time: "9:45 PM",
  },
];

const SecurityProtocols = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

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

  const handleProfileClick = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="flex bg-gray-100 w-full h-full">
      <ResidentSidebar />
      <div className="flex-1 flex flex-col">
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-80">
            <Link
              to="/dashboard"
              className="text-muted text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-muted mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Security Protocols
            </span>
          </div>
          <HeaderBaner />
        </header>

        <div className="ps-6 pe-6 mt-3 w-full">
          <div className="rounded-lg lg:ml-[300px] shadow-md lg:w-[1570px] bg-[#FFFFFF]">
            <h1 className="p-3 fs-6 font-semibold text-gray-800 mt-2">
              Security Protocols
            </h1>
            <div />
            <div className="overflow-x-auto h-[500px]  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="Content">
                <table className="2xl:w-[1560px] border border-gray-200 rounded-table">
                  <thead
                    className="relative"
                    style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
                  >
                    <tr className="text-left text-sm font-semibold">
                      <th className="ps-4 text-[#202224] ">Title</th>
                      <th className="ps-5 text-[#202224] ">Description</th>
                      <th className=" text-center p-2 ">Date</th>
                      <th className=" text-center ">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {securityprotocol.map((security, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="p-2 pt-3 pb-2 flex items-center whitespace-nowrap">
                          <span className="text-[#4F4F4F] inline">
                            {security.title}
                          </span>
                        </td>
                        <td className="text-[#4F4F4F] text-left whitespace-nowrap">
                          <span className="text-[#4F4F4F] ">
                            {security.description}
                          </span>
                        </td>
                        <td className="text-[#4F4F4F] text-center">
                          <span className="text-[#4F4F4F]  text-sm sm:text-base">
                            {security.time}{" "}
                            <span className="inline">{security.amPm}</span>
                          </span>
                        </td>

                        <td className="pt-3 text-[#4F4F4F] ">
                          {security.date}
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

export default SecurityProtocols;
