import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotificationIcon from "../assets/notification-bing.png";
import AvatarImage from "../assets/Avatar.png";
// Import EditNote component
import Sidebar from "../Sidebar/Sidebar";
import CreateFacility from "./CreateFacility";
import Editfacility from "./Editfacility";
import axiosInstance from "../Common/axiosInstance";
import moment from "moment";
import HeaderBaner from "../Dashboard/Header/HeaderBaner";

const Facilities = (card) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [facility, setFacility] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

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

  // Fetch Facility from the API
  const fetchFacility = async () => {
    try {
      const response = await axiosInstance.get("/v2/facility/");
      // console.log(response.data.facilities);
      if (response.status === 200) {
        setFacility(response.data.facilities);
      }
    } catch (error) {
      console.error("Error fetching Facility:", error);
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
              Facility Management
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

        {/* Facility Management Section */}
        <main className="flex-1 rounded border lg:ml-[290px] bg-gray-100">
          <div className="w-[95%] lg:ml-[40px] px-7 py-10 p-4 mt-5 rounded bg-[#FFFFFF]">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">
                Facility Management
              </h1>
              {/* Create Facility Button */}
              <button
                onClick={handleCreateNoteClick}
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
                        onClick={() => toggleDropdown(index)}
                      ></i>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {openDropdown === index && (
                    <div className="bg-white shadow-lg rounded-md absolute top-12 left-[85%] transform -translate-x-[50%] w-[80px]">
                      <button
                        className="w-full text-center px-4 py-2 text-sm text-gray-700"
                        onClick={() => handleEditNoteClick(card)}
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
                        {!!card.Date
                          ? moment(card.Date).format("DD/MM/YYYY")
                          : " "}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm text-[#4F4F4F] mb-2">
                        Description
                      </h3>
                      <div className="max-h-[70px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <span className="text-sm text-[#202224]">
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
