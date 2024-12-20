import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Sidebar and HeaderBaner components
import Sidebar from "../../../Sidebar/Sidebar";
import HeaderBaner from "../../../Dashboard/Header/HeaderBaner";
import CreateComplain from "./CreateComplain";
import DeleteComplain from "./DeleteComplain";
import "../../../Sidebar/sidebar.css";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";
import moment from "moment";
import axiosInstance from "../../../Common/axiosInstance";

const ComplainSubmission = () => {
  const [activeButton, setActiveButton] = useState("complain");
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State for toggling the search input
  const [complaint, setComplaint] = useState([]);

  // Static data for complaints
  const Complaint = [
    {
      _id: "1",
      Facility_name: "Unethical Behavior",
      Date: "01/07/2024",
      Status: "Opened",
      Description: "Regular waste collection services.",
    },
    {
      _id: "2",
      Facility_name: "Preventive Measures",
      Date: "01/07/2024",
      Status: "Opened",
      Description: "Expenses will way sense for you.",
    },
    {
      _id: "3",
      Facility_name: "Unethical Behavior",
      Date: "01/07/2024",
      Status: "Opened",
      Description: "Providing information deliberately.",
    },
    {
      _id: "4",
      Facility_name: "Preventive Measures",
      Date: "01/07/2024",
      Status: "Opened",
      Description: "Regular waste collection services.",
    },
    {
      _id: "5",
      Facility_name: "Unethical Behavior",
      Date: "01/07/2024",
      Status: "Opened",
      Description: "Regular waste collection services..",
    },
    {
      _id: "6",
      Facility_name: "Preventive Measures",
      Date: "01/07/2024",
      Status: "Opened",
      Description: "Regular waste collection services.",
    },
  ];

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleDeleteClick = (complaint) => {
    setSelectedComplaint(complaint);
    setIsDeleteModalOpen(true);
  };

  
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedComplaint(null);
  };

  const handleDelete = (id) => {
    
    setComplaint(complaint.filter((item) => item._id !== id)); 
    
    closeDeleteModal();
  };

  const handleCreateNoteClick = () => {
    setIsCreateNoteOpen(true);
  };

  const closeCreateNoteModal = () => {
    setIsCreateNoteOpen(false);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };



  
  const fetchComplaint = async () => {
    try {
      const response = await axiosInstance.get(
        "/v2/complaint/find/getusercomplaint"
      );
      console.log(response.data);
      if (response.status === 200) {
        setComplaint(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Important Numbers:", error);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <ResidentSidebar />
      <div className=" flex-1 flex flex-col 2xl:ml-[290px]">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
        
          <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-10">
            <Link
              to="/dashboard"
              className="text-[#A7A7A7] text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-[#202224] mx-2 fs-5 text-sm sm:text-base">
              {" "}
              &gt;{" "}
            </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Service And Complaint
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
        <main className="flex-1 rounded border bg-light">
          <div className="lg:mt-[30px]  mb-2 md:ml-[25px]  xl:ml-[10px] 2xl:ml-[10px]">
            <div className="mt-4 lg:px-4 ">
              <Link
                to="/complain"
                className={`lg:h-[50px]  2xl:px-4 py-3 p-2 rounded-t-md no-underline transition-all ${
                  activeButton === "complain"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                } text-sm sm:text-base`}
              >
                Complaint Submission
              </Link>

              <Link
                to="/request"
                className={`lg:h-[50px] sm:w-[60px] lg:px-6 py-3 p-3 rounded-t-md no-underline transition-all ${
                  activeButton === "request"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                } text-sm sm:text-base`}
              >
                Request Submission
              </Link>
            </div>
          </div>

          <div className=" 2xl:w-[1590px] 2xl:ml-[25px]   bg-white p-4 rounded">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className=" text-dark font-bold">Complaint</h6>
             
              <button
                onClick={handleCreateNoteClick}
                className="bg-orange-500 text-[#FFFFFF]  ml-1 p-2 rounded-lg flex items-center"
              >
                Create Complaint
              </button>
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {complaint.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm">
                    <div
                      className="card-header text-white d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <span className="">{card.Complaint_name}</span>
                      <div className="dropdown">
                        <button
                          className="btn btn-light btn-sm"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v text-primary"></i>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleDeleteClick(card)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-2">
                        <p className="text-[#4F4F4F]">Request Date</p>
                        <span className="text-[#202224]">
                          {!!card.createdAt
                            ? moment(card.createdAt).format("DD/MM/YYYY")
                            : " "}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <p className="card-title text-muted">Status</p>
                        <span
                          className="bg-[#5678E91A] p-2 rounded-2xl text-[#5678E9]"
                          style={{ width: "60px" }}
                        >
                          {card.Status}
                        </span>
                      </div>

                      <div className="h-[100px]">
                        <h3 className="text-sm text-[#4F4F4F] mb-2">
                          Description:
                        </h3>
                        <div className="max-h-[80px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                          <span className="text-md text-[#202224] break-words leading-6">
                            {!!card.Description
                              ? card.Description
                              : "No description available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Create Complaint Modal */}
        <CreateComplain
          isOpen={isCreateNoteOpen}
          onClose={closeCreateNoteModal}
          fetchComplaint={fetchComplaint}
        />

        {/* Delete Complaint Modal */}
        {isDeleteModalOpen && selectedComplaint && (
          <DeleteComplain
            isOpen={isDeleteModalOpen}
            onCancel={closeDeleteModal}
            complain={selectedComplaint}
            onDelete={() => handleDelete(selectedComplaint.id)} // Pass the ID of the protocol to delete
            fetchComplaint={fetchComplaint}
          />
        )}
      </div>
    </div>
  );
};

export default ComplainSubmission;
