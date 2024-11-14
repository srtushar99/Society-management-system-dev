import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import useNavigate
import NotificationIcon from "../../assets/notification-bing.png";
import AvatarImage from "../../assets/Avatar.png";
import CreateNote from "./CreateNote"; // Import CreateNote component
import EditNote from "./EditNote"; // Import EditNote component
import Sidebar from "../../Sidebar/Sidebar";
import axiosInstance from '../../Common/axiosInstance';
import { useNavigate } from 'react-router-dom';
import NoNotification from "../../Dashboard/Notification/NoNotification";
import NotificationModal from "../../Dashboard/Notification/NotificationModal";


import HeaderBaner  from "../../Dashboard/Header/HeaderBaner";

const Note = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which card dropdown is open
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false); // Manage CreateNote modal visibility
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false); // Manage EditNote modal visibility
  const [selectedNote, setSelectedNote] = useState(null); // Store selected note for editing
  // const navigate = useNavigate(); // Initialize navigate function
  const [cards, setCards] = useState([]);

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

  // Toggle dropdown menu visibility
  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null); // Close the dropdown if it's already open
    } else {
      setOpenDropdown(index); // Open the dropdown for the clicked card
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

  // Close the EditNote modal
  const closeEditNoteModal = () => {
    setIsEditNoteOpen(false); // Close the modal
    setSelectedNote(null); // Clear selected note data
  };

   // Fetch Note from the API
   const fetchNote = async () => {
    try {
        const response = await axiosInstance.get('/v2/note/');
         setCards(response.data.notes); 
      } catch (error) {
        console.error('Error fetching Note:', error);
      }
    };

    useEffect(() => {
      fetchNote();
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function
  
    const notifications = [
      {
        title: "Evelyn Harper (A- 101)",
        timing: "Monday 11:41 AM",
        message: (
          <>
            Evelyn Harper gave a fund of <span style={{ color: '#5678E9' }}>1000 for Navratri</span>.
          </>
        ),
        timeAgo: "32 Minutes ago",
      },
      {
        title: "Maintenance (A- 101)",
        timing: "Tuesday 11:41 AM",
        message: (
          <>
            Evelyn Harper gave a <span style={{ color: '#5678E9' }}>Maintenance of 1000</span>.<br />
          </>
        ),
        timeAgo: "2 days ago",
      },
      {
        title: "Ganesh Chaturthi (A- 101)",
        timing: "Saturday 11:41 AM",
        message: (
          <>
            Per Person Amount: <span style={{ color: '#5678E9' }}>₹ 1500</span>. 
            The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in our residence.
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
      navigate('/no-notifications'); 
    };
  
    const isNoNotifications = notifications.length === 0;
  
    // Function to handle profile click and navigate to the EditProfile page
    const handleProfileClick = () => {
      navigate('/edit-profile'); // This will navigate to the EditProfile page
    };
  
  return (
    <div className="flex  w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between  lg:ml-[290px] items-center lg:px-5 bg-white lg:h-[60px]  shadow-md ">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-gray-600  md:ml-20">
            <Link to="/notes" className="text-[#A7A7A7] no-underline  font-semibold">
              Home
            </Link>
            <span className="text-gray-400"> &gt; </span>
            <span className="font-semibold text-[#5678E9]">Note</span>
          </div>

          {/* Notifications and Profile Section */}
             {/* Notifications and Profile Section */}
             <div className="flex items-center justify-end me-5 space-x-4 sm:space-x-6">
        {/* Notification Icon */}
        <button
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border ml-3 border-gray-300"
          onClick={() => setIsModalOpen(true)} // Open the modal
        >
          <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
        </button>

        {/* Profile Section */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
          {/* Avatar Image */}
          <img
            src={AvatarImage}
            alt="Moni Roy"
            width="40"
            height="40"
            className="rounded-full"
          />
          
          {/* Profile Text visible only on larger screens */}
          <div className="hidden sm:block flex-col items-start mt-2">
            <span className="font-medium text-sm">Moni Roy</span>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Modal for Notifications */}
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
      )}
         <HeaderBaner/>
        </header>

        

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
                <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                  <div className="bg-[#5678E9] text-white p-3 pb-2 flex justify-between items-center">
                    <span className="font-semibold">{!!card.Title ? card.Title : " "}</span>
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

                  <div className="p-4 bg-[#FFFFFF]">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Description</h3>
                    <p className="text-sm text-gray-500">{!!card.Description ? card.Description : " "}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* CreateNote Modal */}
      <CreateNote isOpen={isCreateNoteOpen} onClose={closeCreateNoteModal} fetchNote={fetchNote}/>

      {/* EditNote Modal */}
      <EditNote isOpen={isEditNoteOpen} onClose={closeEditNoteModal} noteData={selectedNote} fetchNote={fetchNote}/>
    </div>
  );
};

export default Note;
