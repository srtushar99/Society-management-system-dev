import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import NotificationIcon from "../assets/notification-bing.png";
import AvatarImage from "../assets/Avatar.png";
// Import EditNote component
import Sidebar from "../Sidebar/Sidebar";
import CreateFacility from "./CreateFacility";
import Editfacility from "./Editfacility";
import HeaderBaner  from "../Dashboard/Header/HeaderBaner";


const Facilities = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which card dropdown is open
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false); // Manage CreateNote modal visibility
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false); // Manage EditNote modal visibility
  const [selectedNote, setSelectedNote] = useState(null); // Store selected note for editing

  // Static data for cards (without API call)
  const cards = [
    {
      id: 1,
      title: "Parking Facilities",
      date: "01/07/2024",
      description:
        "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.  ",
    },
    {
      id: 2,
      title: "Community Center",
      date: "01/07/2024",
      description:
        " The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.  ",
    },
    {
      id: 3,
      title: "Swimming Pool",
      date: "01/07/2024",
      description:
        "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.  ",
    },
    {
      id: 4,
      title: "Parks and Green Spaces",
      date: "01/07/2024",
      description:
        " The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in. ",
    },
    {
      id: 5,
      title: "Wi-Fi and Connectivity",
      date: "01/07/2024",
      description:
        " The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in. ",
    },
    {
      id: 6,
      title: "Pet-Friendly Facilities",
      date: "01/07/2024",
      description:
        "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in. ",
    },
  ];

  // Toggle dropdown menu visibility
  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null); // Close the dropdown if it's already open
    } else {
      setOpenDropdown(index); // Open the dropdown for the clicked card
    }
  };

  // Open the CreateFacility modal
  const handleCreateNoteClick = () => {
    setIsCreateNoteOpen(true); // Open CreateFacility modal
  };

  // Close the CreateFacility modal
  const closeCreateNoteModal = () => {
    setIsCreateNoteOpen(false);
  };

  // Open the EditFacility modal with selected card data
  const handleEditNoteClick = (note) => {
    setSelectedNote(note); // Set the selected note for editing
    setIsEditNoteOpen(true); // Open the EditFacility modal
  };

  // Close the EditFacility modal
  const closeEditNoteModal = () => {
    setIsEditNoteOpen(false); // Close the modal
    setSelectedNote(null); // Clear selected note data
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between lg:ml-[290px] items-center lg:px-5 bg-white lg:h-[60px] shadow-md">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-gray-600 ml-20 md:ml-20">
            <Link
              to="/dashboard"
              className="text-[#A7A7A7] no-underline font-semibold"
            >
              Home
            </Link>
            <span className="text-gray-400"> &gt; </span>
            <span className="font-semibold text-[#5678E9]">Facility Management</span>
          </div>

          {/* Notifications and Profile Section */}
      <HeaderBaner/>
        </header>

        {/* Facility Management Section */}
        <main className="flex-1 rounded border lg:ml-[290px] bg-gray-100">
          <div className="w-[95%] lg:ml-[40px] px-7 py-10 p-4 mt-5 rounded bg-[#FFFFFF]">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">
                Facility Management
              </h1>
              {/* Create Facility Button */}
              <button
                onClick={handleCreateNoteClick} // Trigger modal opening
                className="bg-orange-500 hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
              >
                Create facility
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
                      {card.title}
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
                        className="w-full text-center px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleEditNoteClick(card)} // Open EditFacility modal
                      >
                        Edit
                      </button>
                    </div>
                  )}

                  <div className="p-2 bg-[#FFFFFF]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-600">
                        Upcoming Schedule Service Date
                      </h3>
                      <span className="text-sm text-[#202224]">
                        {card.date}
                      </span>
                    </div>

                    <h3 className="text-sm font-medium text-gray-600 mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-gray-500">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* CreateFacility Modal */}
      <CreateFacility
        isOpen={isCreateNoteOpen}
        onClose={closeCreateNoteModal}
      />

      {/* EditFacility Modal */}
      <Editfacility
        isOpen={isEditNoteOpen}
        onClose={closeEditNoteModal}
        noteData={selectedNote}
      />
    </div>
  );
};

export default Facilities;
