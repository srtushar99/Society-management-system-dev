import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import NotificationIcon from "../assets/notification-bing.png";
import AvatarImage from "../assets/Avatar.png";
// Import EditNote component
import Sidebar from "../Sidebar/Sidebar";
import CreateFacility from "./CreateFacility";
import Editfacility from "./Editfacility";
import axiosInstance from '../Common/axiosInstance';
import moment from 'moment';

const Facilities = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which card dropdown is open
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false); // Manage CreateNote modal visibility
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false); // Manage EditNote modal visibility
  const [selectedNote, setSelectedNote] = useState(null); // Store selected note for editing
  const [facility, setFacility] = useState([]);


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


   // Fetch Facility from the API
   const fetchFacility = async () => {
    try {
        const response = await axiosInstance.get('/v2/facility/');
        // console.log(response.data.facilities);
        if(response.status === 200){
          setFacility(response.data.facilities); 
        }
      } catch (error) {
        console.error('Error fetching Facility:', error);
      }
    };

    useEffect(() => {
      fetchFacility();
    }, []);


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
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border border-gray-300">
              <img
                src={NotificationIcon}
                alt="Notifications"
                className="h-6 w-6"
              />
            </button>
            <div className="flex items-center space-x-3 cursor-pointer">
              <img
                src={AvatarImage}
                alt="Moni Roy"
                width="40"
                height="40"
                className="rounded-full"
              />
              <div className="hidden sm:flex flex-col items-start">
                <span className="font-medium text-sm mt-2">Moni Roy</span>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
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
              {facility.map((card, index) => (
                <div
                  key={!!card._id ? card._id : " "}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative"
                >
                  <div className="bg-[#5678E9] text-white p-3 pb-2 flex justify-between items-center">
                    <span className="font-semibold">
                      {!!card.Facility_name ? card.Facility_name : ""}
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
                        {!!card.Date ? moment(card.Date).format('DD/MM/YYYY') : " "}
                      </span>
                    </div>

                    <h3 className="text-sm font-medium text-gray-600 mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-gray-500">
                      {!!card.Description ? card.Description : ""}
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
        fetchFacility={fetchFacility}
      />

      {/* EditFacility Modal */}
      <Editfacility
        isOpen={isEditNoteOpen}
        onClose={closeEditNoteModal}
        FacilityData={selectedNote}
        fetchFacility={fetchFacility}
      />
    </div>
  );
};

export default Facilities;
