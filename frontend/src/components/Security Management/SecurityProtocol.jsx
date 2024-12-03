import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import NotificationIcon from "../assets/notification-bing.png";
import AvatarImage from "../assets/Avatar.png";
import CreateProtocol from "./CreateProtocol";
import EditProtocol from "./EditProtocol";
import ViewProtocol from "./ViewProtocol";
import DeleteProtocol from "./DeleteProtocol";
import axiosInstance from "../Common/axiosInstance";
import { useNavigate } from "react-router-dom";
// import NoNotification from '../Dashboard/Notification/NoNotification';
// import NotificationModal from '../Dashboard/Notification/NotificationModal';// Import DeleteProtocol modal
import moment from "moment";
import HeaderBaner from "../Dashboard/Header/HeaderBaner";
import "../Dashboard/Maintenance/scrollbar.css";

const initialData = [
  {
    id: 1,
    title: "Physical Security",
    description: "Implementing surveillance cameras in public spaces.",
    date: "11/01/2024",
    time: "3:45 PM",
  },
  {
    id: 2,
    title: "Cybersecurity",
    description: "Securing critical infrastructure, government systems.",
    date: "12/01/2024",
    time: "6:40 AM",
  },
  {
    id: 3,
    title: "Legal Measures",
    description: "Enforcing and updating laws and regulations.",
    date: "13/01/2024",
    time: "1:00 PM",
  },
  {
    id: 4,
    title: "Social Engagement",
    description: "Fostering collaboration between law enforcement.",
    date: "14/01/2024",
    time: "6:20 PM",
  },
  {
    id: 5,
    title: "Education and Training",
    description: "Implementing surveillance cameras in public spaces.",
    date: "15/01/2024",
    time: "3:45 PM",
  },
  {
    id: 6,
    title: "Physical Security",
    description: "Developing comprehensive plans for responding.",
    date: "16/01/2024",
    time: "1:00 PM",
  },
  {
    id: 7,
    title: "Ethical Considerations",
    description: "Implementing surveillance cameras in public spaces.",
    date: "17/01/2024",
    time: "6:40 AM",
  },
  {
    id: 8,
    title: "Physical Security",
    description: "Securing critical infrastructure, government systems.",
    date: "18/01/2024",
    time: "3:45 PM",
  },
  {
    id: 9,
    title: "Privacy Protection",
    description: "Enforcing and updating laws and regulations.",
    date: "19/01/2024",
    time: "4:45 AM",
  },
  {
    id: 10,
    title: "Legal Measures",
    description: "Implementing surveillance cameras in public spaces.",
    date: "20/01/2024",
    time: "3:45 PM",
  },
];

const SecurityProtocol = () => {
  const [data, setData] = useState(initialData); // Use state for data
  const [isCreateProtocolOpen, setIsCreateProtocolOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add state for Delete Protocol modal
  const [selectedProtocolForView, setSelectedProtocolForView] = useState(null);
  const [selectedProtocolForDelete, setSelectedProtocolForDelete] =
    useState(null); // State for protocol to delete
  const [SecurityProtocols, setSecurityProtocols] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const openCreateProtocolModal = () => setIsCreateProtocolOpen(true);
  const closeCreateProtocolModal = () => setIsCreateProtocolOpen(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const openEditModal = (item) => {
    setSelectedProtocolForView(item);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const openViewModal = (item) => {
    setSelectedProtocolForView(item);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => setIsViewModalOpen(false);

  const openDeleteModal = (item) => {
    setSelectedProtocolForDelete(item); // Set the protocol to delete
    setIsDeleteModalOpen(true); // Open the Delete Protocol modal
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = (id) => {
    // Logic to delete the protocol from the data
    setSecurityProtocols(SecurityProtocols.filter((item) => item._id !== id)); // Update the state to remove the deleted protocol

    // Close the delete modal after the protocol is deleted
    closeDeleteModal();
  };
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

  // Function to handle profile click and navigate to the EditProfile page
  const handleProfileClick = () => {
    navigate("/edit-profile"); // This will navigate to the EditProfile page
  };

  // Fetch Security Protocols from the API
  const fetchSecurityProtocols = async () => {
    try {
      const response = await axiosInstance.get("/v2/securityprotocol/");
      console.log(response.data);
      if (response.status === 200) {
        setSecurityProtocols(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Security Protocols:", error);
    }
  };

  useEffect(() => {
    fetchSecurityProtocols();
  }, []);

  return (
    <div className="flex bg-gray-100  w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] 2xl:ml-[320px]  text-muted d-none d-sm-flex ">
            <Link
              to="/dashboard"
              className="text-[#A7A7A7] text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
            Security Protocols
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

          <HeaderBaner />
        </header>

        {/*          
          <div className="flex items-center justify-end me-5 space-x-4 sm:space-x-6">
        
        <button
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border ml-3 border-gray-300"
          onClick={() => setIsModalOpen(true)} 
        >
          <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
        </button> */}

        {/* <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
          
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

        {/* Content */}
        <div className="bg-[#FFFFFF] rounded-lg lg:ml-[320px] shadow-md lg:w-[1590px] mt-5">
          <div className="flex justify-between items-center mb-6 p-2 pt-4 ps-3">
            <h1 className="text-xl font-semibold text-gray-800">
              Security Protocols
            </h1>
            <button
              onClick={openCreateProtocolModal}
              className="bg-orange-500 hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
            >
              Create Protocol
            </button>
          </div>
          <div className="overflow-x-auto   h-[700px]   rounded-2xl 2xl:ml-5 ml-2 mr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="Content"> 
          <table className="bg-white  2xl:w-[1560px] border-gray-200 rounded-lg shadow-md w-full">
            <thead
              className=""
              style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
            >
              <tr className="text-left text-sm font-semibold">
                <th className="p-3 ps-3 whitespace-nowrap text-[#202224] ">Title</th>
                <th className="p-3 ps-5 whitespace-nowrap  sm:table-cell">Description</th>
                <th className="p-3 text-center whitespace-nowrap  md:table-cell">Date</th>
                <th className="p-3 text-center whitespace-nowrap  lg:table-cell">Time</th>
                <th className="p-3 text-center whitespace-nowrap  xl:table-cell">Action</th>
              </tr>
            </thead>

            <tbody>
              {SecurityProtocols.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-3 pt-2   text-left ps-3 whitespace-nowrap text-gray-700 font-medium">
                    {item.Title}
                  </td>
                  <td className="p-3 pt-2   text-left ps-5 whitespace-nowrap sm:table-cell text-gray-600">
                    {item.Description}
                  </td>
                  <td className="p-3 pt-2   text-center whitespace-nowrap md:table-cell text-gray-600">
                    {!!item.Date ? moment(item.Date).format("DD/MM/YYYY") : " "}
                  </td>
                  <td className="p-3 pt-2  text-center whitespace-nowrap lg:table-cell text-gray-600">
                    {item.Time}
                  </td>
                  <td className="p-3 pt-2 flex justify-center">
                    <div className="flex   space-x-2 sm:space-y-0">
                      <button
                        className="bg-blue-50 text-[#39973D] rounded-2 p-2 sm:w-10 sm:h-10"
                        onClick={() => openEditModal(item)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="bg-blue-50 text-[#5678E9] rounded-2 p-2 sm:w-10 sm:h-10"
                        onClick={() => openViewModal(item)} 
                      >
                        <i className="fa-solid fa-eye w-2 me-2"></i>
                      </button>
                      <button
                        className="bg-blue-50 text-red-600 rounded-2 p-2 sm:w-10 sm:h-10"
                        onClick={() => openDeleteModal(item)} 
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>
        </div>

        {/* Modals */}
        {isCreateProtocolOpen && (
          <CreateProtocol
            isOpen={isCreateProtocolOpen}
            onClose={closeCreateProtocolModal}
            fetchSecurityProtocols={fetchSecurityProtocols}
          />
        )}
        {isEditModalOpen && selectedProtocolForView && (
          <EditProtocol
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            protocol={selectedProtocolForView}
            onSave={(updatedData) => {
              console.log(updatedData);
              closeEditModal();
            }}
            fetchSecurityProtocols={fetchSecurityProtocols}
          />
        )}
        {isViewModalOpen && selectedProtocolForView && (
          <ViewProtocol
            isOpen={isViewModalOpen}
            onClose={closeViewModal}
            protocol={selectedProtocolForView}
          />
        )}
        {isDeleteModalOpen && selectedProtocolForDelete && (
          <DeleteProtocol
            isOpen={isDeleteModalOpen}
            onCancel={closeDeleteModal}
            protocol={selectedProtocolForDelete}
            onDelete={() => handleDelete(selectedProtocolForDelete.id)} // Pass the ID of the protocol to delete
            fetchSecurityProtocols={fetchSecurityProtocols}
          />
        )}
      </div>
    </div>
  );
};

export default SecurityProtocol;
