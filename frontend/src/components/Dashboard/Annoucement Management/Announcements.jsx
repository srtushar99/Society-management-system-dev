import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import NotificationIcon from "../../assets/notification-bing.png";
import AvatarImage from "../../assets/Avatar.png";
import CreateAnnouncement from "./CreateAnnouncement";
import EditAnnouncement from "./EditAnnouncement";
import DeleteAnnouncement from "./DeleteAnnouncement";
import SecurityProtocol from "./SecurityProtocol";
import "../../Sidebar/sidebar.css";
import axiosInstance from "../../Common/axiosInstance";
import moment from "moment";
// import NotificationModal from "../Notification/NotificationModal";
// import NoNotification from "../Notification/NoNotification"; // Import the NoNotification component
import { useNavigate } from "react-router-dom";

import HeaderBaner from "../../Dashboard/Header/HeaderBaner";
const Annoucements = (card) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeOption, setActiveOption] = useState(null);
  const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isSecurityProtocolOpen, setIsSecurityProtocolOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };
 
  // Refs for the dropdowns
  const dropdownRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

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

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };


  const handleOptionClick = (option, card) => {
    setActiveOption(option); 
    if (option === "edit") {
      handleEditNoteClick(card); 
    }
    if (option === "delete") {
      setNoteToDelete(card); 
      setIsDeleteNoteOpen(true); 
    }
    if (option === "view") {
      handleViewNoteClick(card);
    }
  };



  const handleCreateNoteClick = () => {
    setIsCreateNoteOpen(true);
  };

  const closeCreateNoteModal = () => {
    setIsCreateNoteOpen(false);
  };


  const handleEditNoteClick = (note) => {
    setSelectedNote(note); 
    setIsEditNoteOpen(true); 
  };

  const handleViewNoteClick = (note) => {
    setSelectedNote(note);
    setIsSecurityProtocolOpen(true);
  };

  // Close the EditNote modal
  const closeEditNoteModal = () => {
    setIsEditNoteOpen(false); 
    setSelectedNote(null);
  };

  // Close the DeleteNote modal
  const closeDeleteNoteModal = () => {
    setIsDeleteNoteOpen(false);
    setNoteToDelete(null); 
  };

  // Handle Delete Confirmation
  const handleDeleteNote = (note) => {
    setCards(cards.filter((card) => card._id !== note.id));
    closeDeleteNoteModal();
  };

  // Close the SecurityProtocol modal
  const closeSecurityProtocolModal = () => {
    setIsSecurityProtocolOpen(false); 
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRefs.current &&
      !dropdownRefs.current.some((ref) => ref && ref.contains(event.target))
    ) {
      setOpenDropdown(null);
    }
  };

  // Fetch Announcement from the API
  const fetchAnnouncement = async () => {
    try {
      const response = await axiosInstance.get("/v2/annoucement/");
      console.log(response.data.announcements);
      setCards(response.data.announcements);
    } catch (error) {
      console.error("Error fetching Announcement:", error);
    }
  };

  // Attach and detach event listener
  useEffect(() => {
    fetchAnnouncement();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-w-full h-full bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col  ">
        {/* Header */}
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
            Announcement
            </span>
          </div>

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
                <i className="fas fa-search"></i> 
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
          onClick={() => setIsModalOpen(true)} // Open the modal
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
        

        {/* Announcement Section */}
        <main className=" rounded border lg:ml-[290px]  lg:w-700px bg-gray-100">
          <div className="w-[95%] sm:ml-[20px] lg:ml-[40px] ml-2 px-7 py-10 p-4 mt-5 rounded bg-[#FFFFFF]">
            <div className="flex justify-between items-center mb-6">
              <span className="lg:text-3xl mr-3  font-semibold text-gray-800">
                Announcement
              </span>
              {/* Create Announcement Button */}
              <button
                onClick={handleCreateNoteClick} 
                className="bg-orange-500 whitespace-nowrap hover:bg-orange-600 text-[#FFFFFF] 2xl:px-4 px-1 py-2 rounded-lg flex items-center"
              >
                Create Announcement
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {cards.map((card, index) => (
                <div
                  key={card._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative "
                >
                  <div className="bg-[#5678E9] text-white p-3 pb-2 flex justify-between items-center">
                    <span className="font-semibold">
                      {!!card.Announcement_Title
                        ? card.Announcement_Title
                        : " "}
                    </span>
                    <div className="flex items-center gap-2">
                      <i
                        className="border rounded p-2 bg-white text-[#5678E9] fa-solid fa-ellipsis-vertical cursor-pointer"
                        onClick={() => toggleDropdown(index)} // Toggle dropdown visibility
                      ></i>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {openDropdown === index && (
                    <div
                      className="bg-white shadow-lg rounded-md absolute top-12 left-[85%] transform -translate-x-[50%] w-[80px]"
                      ref={(el) => (dropdownRefs.current[index] = el)} // Attach the ref
                    >
                      <button
                        className={`w-full text-center px-4 py-2 text-sm ${
                          activeOption === "edit"
                            ? "text-[#202224]"
                            : "text-[#A7A7A7]"
                        }`}
                        onClick={() => handleOptionClick("edit", card)}
                      >
                        Edit
                      </button>
                      <button
                        className={`w-full text-center px-4 py-2 text-sm ${
                          activeOption === "view"
                            ? "text-[#202224]"
                            : "text-[#A7A7A7]"
                        }`}
                        onClick={() => handleOptionClick("view", card)}
                      >
                        View
                      </button>
                      <button
                        className={`w-full text-center px-4 py-2 text-sm ${
                          activeOption === "delete"
                            ? "text-[#202224]"
                            : "text-[#A7A7A7]"
                        }`}
                        onClick={() => handleOptionClick("delete", card)}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  <div className="p-4 bg-[#FFFFFF]">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm text-[#4F4F4F]">
                        Announcement Date:
                      </h3>
                      <p className="text-sm text-[#4F4F4F]">
                        {!!card.Announcement_Date
                          ? moment(card.Announcement_Date).format("DD/MM/YYYY")
                          : " "}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm text-[#4F4F4F]">
                        Announcement Time:
                      </h3>
                      <p className="text-sm text-[#4F4F4F]">
                        {!!card.Announcement_Time
                          ? card.Announcement_Time
                          : " "}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm text-[#4F4F4F] ">
                        Description:
                      </h3>
                      <div className="max-h-[70px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <span

                          className="text-sm text-[#202224] break-words"
                        >
                          {!!card.Description
                            ? card.Description
                            : "No description available"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal Components */}
      <CreateAnnouncement
        isOpen={isCreateNoteOpen}
        onClose={closeCreateNoteModal}
        fetchAnnouncement={fetchAnnouncement}
      />
      <EditAnnouncement
        isOpen={isEditNoteOpen}
        onClose={closeEditNoteModal}
        noteData={selectedNote}
        fetchAnnouncement={fetchAnnouncement}
      />
      <DeleteAnnouncement
        isOpen={isDeleteNoteOpen}
        contact={noteToDelete}
        onDelete={handleDeleteNote}
        onCancel={closeDeleteNoteModal}
        fetchAnnouncement={fetchAnnouncement}
      />

      {/* SecurityProtocol Modal */}
      {isSecurityProtocolOpen && (
        <SecurityProtocol
          isOpen={isSecurityProtocolOpen}
          onClose={closeSecurityProtocolModal}
          noteData={selectedNote}
        />
      )}
    </div>
  );
};

export default Annoucements;
