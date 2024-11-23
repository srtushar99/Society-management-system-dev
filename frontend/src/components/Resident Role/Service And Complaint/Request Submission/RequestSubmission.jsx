import React, { useState } from "react";
import { Link } from "react-router-dom";

import HeaderBaner from "../../../Dashboard/Header/HeaderBaner";
import "../../../Sidebar/sidebar.css";
import DeleteRequest from "./DeleteRequest";
import CreateRequest from "./CreateRequest";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";

const RequestSubmission = () => {
  const [activeButton, setActiveButton] = useState("request");
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Add state for search visibility

  // Static data for complaints
  const Request = [
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

  // Handle delete modal
  const handleDeleteClick = (complaint) => {
    setSelectedComplaint(complaint); // Set the selected complaint
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  // Close the delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete modal
    setSelectedComplaint(null); // Clear the selected complaint
  };

  // Open CreateComplaint modal
  const handleCreateNoteClick = () => {
    setIsCreateNoteOpen(true); // Open the CreateComplaint modal
  };

  // Close CreateComplaint modal
  const closeCreateNoteModal = () => {
    setIsCreateNoteOpen(false);
  };

  // Toggle search bar visibility
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="d-flex w-100 h-100 bg-light">
      <ResidentSidebar />
      <div className="flex-grow-1 d-flex flex-column lg:ml-[290px]">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-10">
            <Link
              to="/dashboard"
              className="text-muted text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-muted mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Service And Complaint
            </span>
          </div>

          {/* Search Icon for small devices */}
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

        <main className="flex-grow-1 rounded border bg-light">
          <div className="lg:mt-[30px] mb-2 md:ml-[25px]  xl:ml-[10px] 2xl:ml-[30px]">
            <div className="mt-4 lg:px-4  ">
              <Link
                to="/complain"
                className={`lg:h-[50px] lg:w-[180px] lg:px-4 py-2 p-1 rounded-t-md no-underline transition-all ${
                  activeButton === "complain"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                } text-sm sm:text-base`}
              >
                Complaint Submission
              </Link>
              <Link
                to="/request"
                className={`lg:h-[50px] sm:w-[60px] lg:px-6 py-2 p-1 rounded-t-md no-underline transition-all   ${
                  activeButton === "request"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                } text-sm sm:text-base`}
              >
                Request Submission
              </Link>
            </div>
          </div>
          <div className="2xl:w-[1550px] 2xl:ml-[40px] bg-white p-4 rounded">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className=" text-dark font-weight-bold text-sm sm:text-lg">
                Request
              </h6>
              {/* Create Facility Button */}
              <button
                onClick={handleCreateNoteClick}
                className="bg-orange-500 text-[#FFFFFF] px-2 py-2 rounded-lg flex items-center text-sm sm:text-base"
              >
                Create Request
              </button>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3 ">
              {Request.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm">
                    <div
                      className="card-header text-white d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <span className=" text-sm sm:text-base">
                        {card.Facility_name || ""}
                      </span>
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
                        <p className="card-title text-muted text-sm sm:text-base">
                          Request Date
                        </p>
                        <span className="text-[#202224] text-sm sm:text-base">
                          {card.Date || "No date available"}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <p className="card-title text-muted">Status</p>
                        <span
                          className="bg-[#5678E91A] p-2 rounded-2xl text-[#5678E9]"
                          style={{ width: "60px" }}
                        >
                          Open
                        </span>
                      </div>

                      <p className="card-title text-muted">Description</p>
                      <p className="card-text text-[#202224]">
                        {card.Description || "No description available"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Create Complaint Modal */}
      <CreateRequest isOpen={isCreateNoteOpen} onClose={closeCreateNoteModal} />

      {/* Delete Complaint Modal */}
      {isDeleteModalOpen && selectedComplaint && (
        <DeleteRequest
          isOpen={isDeleteModalOpen}
          complain={selectedComplaint}
          onDelete={() => {
            // Logic for handling the deletion (you could call an API here to delete the complaint)
            closeDeleteModal(); // Close the modal after deletion
          }}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default RequestSubmission;
