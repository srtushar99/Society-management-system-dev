import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import NotificationIcon from "../../assets/notification-bing.png";
// import AvatarImage from "../../assets/Avatar.png";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import Sidebar from "../../Sidebar/Sidebar";
import axiosInstance from "../../Common/axiosInstance";
import { useNavigate } from "react-router-dom";
// import NoNotification from "../../Dashboard/Notification/NoNotification";
// import NotificationModal from "../../Dashboard/Notification/NotificationModal";

import HeaderBaner from "../../Dashboard/Header/HeaderBaner";

const Note = (card) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  // const navigate = useNavigate(); // Initialize navigate function
  const [cards, setCards] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // const cards = [
  //   { id: 1, title: "Rent or Mortgage", description: "A visual representation of your spending categories visual representation. " },
  //   { id: 2, title: "Housing Costs", description: "A visual representation of your spending categories visual representation. " },
  //   { id: 3, title: "Property Taxes", description: "A visual representation of your spending categories visual representation. " },
  //   { id: 4, title: "Maintenance Fees", description: "A visual representation of your spending categories visual representation. " },
  //   { id: 5, title: "Rent or Transportation", description: "A visual representation of your spending categories visual representation. " },
  //   { id: 6, title: "Breakdown", description: "A visual representation of your spending categories visual representation. " },
  //   { id: 7, title: "Expense Tracker", description: "A visual representation of your spending categories visual representation. " },
  //   { id: 8, title: "Personal Expenses", description: "A visual representation of your spending categories visual representation. " },
  // ];

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
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

  const closeEditNoteModal = () => {
    setIsEditNoteOpen(false);
    setSelectedNote(null);
  };

  // Fetch Note from the API
  const fetchNote = async () => {
    try {
      const response = await axiosInstance.get("/v2/note/");
      setCards(response.data.notes);
    } catch (error) {
      console.error("Error fetching Note:", error);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);
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

  return (
    <div className="flex  w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
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
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base">
              {" "}
              &gt;{" "}
            </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Note
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
          onClick={() => setIsModalOpen(true)} // Open the modal
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
          onClearAll={handleClearAll} // Pass the clear function
        />
      )} */}

        {/* Note Section */}
        <main className="flex-1 rounded border lg:ml-[290px]    bg-gray-100">
          <div className="w-[95%] lg:ml-[40px] px-7 py-10 p-4 mt-5 rounded bg-[#FFFFFF]">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">Note</h1>
              {/* Create Note Button */}
              <button
                onClick={handleCreateNoteClick} // Trigger modal opening
                className="bg-orange-500 hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
              >
                Create Note
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-3">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative"
                >
                  <div className="bg-[#5678E9] text-white p-3 pb-2 flex justify-between items-center">
                    <span className="font-semibold">
                      {!!card.Title ? card.Title : " "}
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
                    <div className="bg-white shadow-lg rounded-md absolute top-12 left-[85%] transform -translate-x-[50%] w-[80px]">
                      <button
                        className="w-full text-center px-4 py-2 text-sm text-gray-700 "
                        onClick={() => handleEditNoteClick(card)} // Open EditNote modal
                      >
                        Edit
                      </button>
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="text-sm text-[#4F4F4F] mb-2">
                      Description:
                    </h3>
                    <div className="max-h-[70px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      <span className="text-md text-[#202224] break-words leading-6">
                        {!!card.Description
                          ? card.Description
                          : "No description available"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* CreateNote Modal */}
      <CreateNote
        isOpen={isCreateNoteOpen}
        onClose={closeCreateNoteModal}
        fetchNote={fetchNote}
      />

      {/* EditNote Modal */}
      <EditNote
        isOpen={isEditNoteOpen}
        onClose={closeEditNoteModal}
        noteData={selectedNote}
        fetchNote={fetchNote}
      />
    </div>
  );
};

export default Note;
