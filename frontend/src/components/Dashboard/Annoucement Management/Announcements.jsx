import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import NotificationIcon from '../../assets/notification-bing.png'; 
import AvatarImage from '../../assets/Avatar.png'; 
import CreateAnnouncement from './CreateAnnouncement';
import EditAnnouncement from './EditAnnouncement';
import DeleteAnnouncement from './DeleteAnnouncement'; 
import SecurityProtocol from './SecurityProtocol';
import '../../Sidebar/sidebar.css' 
import axiosInstance from '../../Common/axiosInstance'; 
import moment from 'moment';
import HeaderBaner  from "../../Dashboard/Header/HeaderBaner";
const Annoucements = () => {
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false); 
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false); 
  const [selectedNote, setSelectedNote] = useState(null); 
  const [activeOption, setActiveOption] = useState(null); 
  const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState(false); 
  const [noteToDelete, setNoteToDelete] = useState(null); 
  const [isSecurityProtocolOpen, setIsSecurityProtocolOpen] = useState(false); 
  const [cards, setCards] = useState([]);

  // Refs for the dropdowns
  const dropdownRefs = useRef([]);

  // Toggle dropdown menu visibility
  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null); 
    } else {
      setOpenDropdown(index);
    }
  };

  // Handle Edit, View, Delete click event
  const handleOptionClick = (option, card) => {
    setActiveOption(option); // Set the active option clicked (Edit/View/Delete)
    if (option === 'edit') {
      handleEditNoteClick(card); // Open Edit modal
    }
    if (option === 'delete') {
      setNoteToDelete(card); // Set the note to delete
      setIsDeleteNoteOpen(true); // Open Delete modal
    }
    if (option === 'view') {
      handleViewNoteClick(card);
    }
  };

  // Open the CreateNote modal
  const handleCreateNoteClick = () => {
    setIsCreateNoteOpen(true); // Open CreateNote modal
  };

  // Close the CreateNote modal
  const closeCreateNoteModal = () => {
    setIsCreateNoteOpen(false);
  };

  // Open the EditNote modal with selected card data
  const handleEditNoteClick = (note) => {
    setSelectedNote(note); // Set the selected note for editing
    setIsEditNoteOpen(true); // Open the EditNote modal
  };

  const handleViewNoteClick = (note) => {
    setSelectedNote(note); 
    setIsSecurityProtocolOpen(true);
  };

  // Close the EditNote modal
  const closeEditNoteModal = () => {
    setIsEditNoteOpen(false); // Close the modal
    setSelectedNote(null); // Clear selected note data
  };

  // Close the DeleteNote modal
  const closeDeleteNoteModal = () => {
    setIsDeleteNoteOpen(false); // Close the delete modal
    setNoteToDelete(null); // Clear the note to delete
  };

  // Handle Delete Confirmation
  const handleDeleteNote = (note) => {
    setCards(cards.filter((card) => card._id !== note.id)); // Remove the deleted card from the list
    closeDeleteNoteModal(); // Close the modal after deletion
  };

  // Close the SecurityProtocol modal
  const closeSecurityProtocolModal = () => {
    setIsSecurityProtocolOpen(false); // Close the SecurityProtocol modal
  };

  // Close the dropdown menu if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRefs.current && !dropdownRefs.current.some(ref => ref && ref.contains(event.target))) {
      setOpenDropdown(null); 
    }
  };

    // Fetch Announcement from the API
    const fetchAnnouncement = async () => {
      try {
          const response = await axiosInstance.get('/v2/annoucement/');
          console.log(response.data.announcements);
          setCards(response.data.announcements); 
      } catch (error) {
          console.error('Error fetching Announcement:', error);
      }
  };


  // Attach and detach event listener
  useEffect(() => {
    fetchAnnouncement();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-w-full h-full bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col  ">
        {/* Header */}
        <header className="flex justify-between  lg:ml-[290px] items-center px-5 bg-white h-[60px] shadow-md">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 ml-5 text-gray-600">
            <Link to="/dashboard" className="text-[#A7A7A7] no-underline font-semibold">
              Home
            </Link>
            <span className="text-gray-400"> &gt; </span>
            <span className="font-semibold text-[#5678E9]">Announcement</span>
          </div>

          {/* Notifications and Profile Section */}
        <HeaderBaner/>
        </header>

        {/* Announcement Section */}
        <main className="flex-1 rounded border lg:ml-[290px] lg:w-700px bg-gray-100">
          <div className="w-[95%] sm:ml-[20px] lg:ml-[40px] px-7 py-10 p-4 mt-5 rounded bg-[#FFFFFF]">
            <div className="flex justify-between items-center mb-6">
              <h1 className="lg:text-3xl  font-semibold text-gray-800">Announcement</h1>
              {/* Create Announcement Button */}
              <button
                onClick={handleCreateNoteClick} // Trigger modal opening
                className="bg-orange-500 hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
              >
                Create Announcement
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {cards.map((card, index) => (
                <div key={card._id} className="bg-white rounded-lg shadow-md relative">
                  <div className="bg-[#5678E9] text-white p-3 pb-2 flex justify-between items-center">
                    <span className="font-semibold">{!!card.Announcement_Title ? card.Announcement_Title : " "}</span>
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
                      ref={el => (dropdownRefs.current[index] = el)} // Attach the ref
                    >
                      <button
                        className={`w-full text-center px-4 py-2 text-sm ${activeOption === "edit" ? "text-[#202224]" : "text-[#A7A7A7]"}`}
                        onClick={() => handleOptionClick("edit", card)}
                      >
                        Edit
                      </button>
                      <button
                        className={`w-full text-center px-4 py-2 text-sm ${activeOption === "view" ? "text-[#202224]" : "text-[#A7A7A7]"}`}
                        onClick={() => handleOptionClick("view", card)}
                      >
                        View
                      </button>
                      <button
                        className={`w-full text-center px-4 py-2 text-sm ${activeOption === "delete" ? "text-[#202224]" : "text-[#A7A7A7]"}`}
                        onClick={() => handleOptionClick("delete", card)}
                      >
                        Delete
                      </button>
                    </div>
                  )}


                  <div className="p-4 bg-[#FFFFFF]">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm text-[#4F4F4F]">Announcement Date:</h3>
                      <p className="text-sm text-[#4F4F4F]">{!!card.Announcement_Date ? moment(card.Announcement_Date).format('DD/MM/YYYY') : " "}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm text-[#4F4F4F]">Announcement Time:</h3>
                      <p className="text-sm text-[#4F4F4F]">{!!card.Announcement_Time ? card.Announcement_Time : " "}</p>
                    </div>
                    <h3 className="text-sm text-[#4F4F4F] mb-2">Description:</h3>
                    <p className="text-sm text-gray-500">{!!card.Description ? card.Description : " "}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal Components */}
      <CreateAnnouncement isOpen={isCreateNoteOpen} onClose={closeCreateNoteModal} fetchAnnouncement={fetchAnnouncement}/>
      <EditAnnouncement isOpen={isEditNoteOpen} onClose={closeEditNoteModal} noteData={selectedNote} fetchAnnouncement={fetchAnnouncement}/>
      <DeleteAnnouncement isOpen={isDeleteNoteOpen} contact={noteToDelete} onDelete={handleDeleteNote} onCancel={closeDeleteNoteModal} fetchAnnouncement={fetchAnnouncement}/>
      
      {/* SecurityProtocol Modal */}
      {isSecurityProtocolOpen && <SecurityProtocol isOpen={isSecurityProtocolOpen} onClose={closeSecurityProtocolModal} noteData={selectedNote}/>}
    </div>
  );
};

export default Annoucements;
