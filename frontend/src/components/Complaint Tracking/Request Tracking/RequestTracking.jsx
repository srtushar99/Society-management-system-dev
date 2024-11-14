import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import NotificationIcon from "../../assets/notification-bing.png";
import HeaderBaner  from "../../Dashboard/Header/HeaderBaner";

import AvatarImage from "../../assets/Avatar.png";
import AIcon from "../../assets/A.png";
import BIcon from "../../assets/B.png";
import CIcon from "../../assets/C.png";
import DIcon from "../../assets/D.png";
import EIcon from "../../assets/E.png";
import FIcon from "../../assets/F.png";
import GIcon from "../../assets/G.png";
import HIcon from "../../assets/H.png";
import IIcon from "../../assets/I.png";
import CreateRequst from "./CreateRequest";
import EditRequest from "./EditRequest";
import ViewRequest from "./ViewRequest";
import DeleteRequst from "./DeleteRequest";
import axiosInstance from '../../Common/axiosInstance';
import moment from "moment";

const initialData = [
  {
    id: 1,
    Requestername: "Evelyn Harper",
    Requestname: "Unethical Behavior",
    description: "Regular waste collection services.",
    Date:"10/02/2024",
    unit: "1001",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 2,
    Requestername: "Esther Howard",
    Requestname: "Preventive Measures",
    description: "Event and recreational activities.",
    Date:"11/02/2024",
    unit: "1002",
    priority: "Low",
    status: "Open",
  },
  {
    id: 3,
    Requestername: "Jenny Wilson",
    Requestname: "Unethical Behavior",
    description: "Regular waste collection services",
    Date:"12/02/2024",
    unit: "1003",
    priority: "High",
    status: "Solve",
  },
  {
    id: 4,
    Requestername: "Guy Hawkins",
    Requestname: "Preventive Measures",
    description: "Rack the fluctuations in spending.",
    Date:"13/02/2024",
    unit: "1004",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 5,
    Requestername: "Robert Fox",
    Requestname: "Unethical Behavior",
    description: "Expenses will way sense for you.",
    Date:"14/02/2024",
    unit: "2001",
    priority: "Low",
    status: "Open",
  },
  {
    id: 6,
    Requestername: "Jacob Jones",
    Requestname: "Preventive Measures",
    description: "Providing information deliberately.",
    Date:"15/02/2024",
    unit: "2002",
    priority: "High",
    status: "Solve",
  },
  {
    id: 7,
    Requestername: "Cody Fisher",
    Requestname: "Unethical Behavior",
    description: "Expenses will way sense for you.",
    Date:"16/02/2024",
    unit: "2003",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 8,
    Requestername: "Bessie Cooper",
    Requestname: "Preventive Measures",
    description: "Regular waste collection services.",
    Date:"17/02/2024",
    unit: "2004",
    priority: "Low",
    status: "Open",
  },
  {
    id: 9,
    Requestername: "Albert Flores",
    Requestname: "Unethical Behavior",
    description: "Event and recreational activities.",
    Date:"18/02/2024",
    unit: "3001",
    priority: "High",
    status: "Solve",
  },
  {
    id: 10,
    Requestername: "Floyd Miles",
    Requestname: "Preventive Measures",
    description: "Rack the fluctuations in spending.",
    Date:"19/02/2024",
    unit: "3002",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 11,
    Requestername: "Kathryn Murphy",
    Requestname: "Unethical Behavior",
    description: "Expenses will way sense for you.",
    Date:"20/02/2024",
    unit: "3003",
    priority: "Low",
    status: "Open",
  },
];

const unitImages = {
  1001: [AIcon],
  1002: [BIcon],
  1003: [CIcon],
  1004: [DIcon],
  2001: [EIcon],
  2002: [FIcon],
  2003: [GIcon],
  2004: [HIcon],
  3001: [IIcon],
  3002: [AIcon],
  3003: [BIcon],
};

const RequestTracking = () => {
  const [data, setData] = useState(initialData); // Use state for data
  const [isCreateProtocolOpen, setIsCreateProtocolOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add state for Delete Protocol modal
  const [selectedProtocolForView, setSelectedProtocolForView] = useState(null);
  const [selectedProtocolForDelete, setSelectedProtocolForDelete] = useState(null); // State for protocol to delete
  const [RequestTracking, setRequestTracking] = useState([]);

  const openCreateProtocolModal = () => setIsCreateProtocolOpen(true);
  const closeCreateProtocolModal = () => setIsCreateProtocolOpen(false);

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
    setRequestTracking(RequestTracking.filter((item) => item._id !== id)); // Update the state to remove the deleted protocol

    // Close the delete modal after the protocol is deleted
    closeDeleteModal();
  };

  const Badge = ({ children, className }) => (
    <span
      className={`px-4 py-2 text-xs font-semibold ${className}`} // Added px-4 to give consistent padding
      style={{ 
        borderRadius: "15px", 
        display: "inline-block", // Ensure it's displayed as an inline-block
        minWidth: "80px", // Set a minimum width to ensure consistency
        textAlign: "center" // Center text within the badge
      }}
    >
      {children}
    </span>
  );
  


  // Fetch fetch Request Tracking from the API
  const fetchRequestTracking = async () => {
    try {
        const response = await axiosInstance.get('/v2/requests/');
        console.log(response.data);
        if(response.status === 200){
          setRequestTracking(response.data.requests); 
        }
       
    } catch (error) {
        console.error('Error fetching RequestTracking:', error);
    }
};


    useEffect(() => {
      fetchRequestTracking();
    }, []);


  return (
    <div className="flex bg-gray-100  w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <header
          className="flex justify-between   lg:ml-[290px] items-center lg:px-5 bg-white h-[60px] shadow-md "
          style={{ padding: "35px 10px" }}
        >
          <div className="flex items-center space-x-2  text-gray-600">
            <Link
              to="/dashboard"
              className="text-[#A7A7A7] no-underline font-semibold ms-4 md:ml-20 "
            >
              Home
            </Link>
            <span className="text-gray-400 "> &gt; </span>
            <span className="font-semibold text-[#5678E9]">
              Request Tracking
            </span>
          </div>
          
          <HeaderBaner/>
        </header>

        {/* Content */}
        <div className="bg-[#FFFFFF] rounded-lg lg:ml-[320px] shadow-md lg:w-[1560px] mt-5">
          <div className="flex justify-between items-center mb-6 p-2 pt-4 ps-3">
            <h1 className="text-3xl font-semibold text-gray-800">
              Create Complaint
            </h1>
            <button
              onClick={openCreateProtocolModal}
              className="bg-orange-500 hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
            >
              Create Request
            </button>
          </div>
            <div className="overflow-x-auto  h-[700px] scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="bg-white border border-gray-200 rounded-lg shadow-md lg:w-[1550px]">
            <thead
              className="w-full"
              style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
            >
              <tr className="text-left text-sm font-semibold">
                <th className="p-3 ps-5 text-[#202224]">Requster Name</th>
                <th className="p-3 ps-2 hidden sm:table-cell">
                  Request Name
                </th>
                <th className="p-3 ps-5 hidden sm:table-cell">Description</th>
                <th className="p-3 ps-2 hidden sm:table-cell">Date</th>
                <th className="p-3 ps-2 hidden lg:table-cell">Unit Number</th>
                <th className="p-3 ps-5 hidden lg:table-cell">Priority</th>
                <th className="p-3 ps-5 hidden lg:table-cell">Status</th>
                <th className="p-3 ps-5 hidden lg:table-cell">Action</th>
              </tr>
            </thead>

            <tbody>
              {RequestTracking.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img
                      src={AvatarImage}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{item.Requester_name}</span>
                  </td>
                  <td className="p-3 pt-2 hidden sm:table-cell text-gray-600">
                    {item.Request_name}
                  </td>

                  <td className="p-3 pt-2 ps-5 hidden sm:table-cell text-gray-600">
                    {!!item.Description ? item.Description : "No Description"}
                  </td><td className="p-3 pt-2 ps-1 hidden sm:table-cell text-gray-600">
                    {moment(item.Request_date).format("DD/MM/YYYY")}
                  </td>
                  <td className="p-3 pt-2 ps-3 d-flex hidden sm:table-cell text-gray-600">
                    {/* {" "}
                    <img
                      src={unitImages[item.unit]}
                      alt={item.unit}
                      width="25"
                      height="25"
                      className="rounded-full"
                    /> */}
                    {item.Wing + " " + item.Unit}
                  </td>
                  <td className="p-3 pt-2 ps-5 hidden lg:table-cell text-gray-600">
                    <Badge
                      className={
                        item.Priority === "High"
                          ? "bg-[#E74C3C] text-white" // High priority: Red background, white text
                          : item.Priority === "Medium"
                          ? "bg-[#5678E9] text-white" // Medium priority: Blue background, white text
                          : "bg-[#39973D] text-white" // Low priority: Green background, white text
                      }
                    >
                      {item.Priority}
                    </Badge>
                  </td>
                  <td className="p-3 pt-2 ps-3 hidden md:table-cell text-gray-600">
                  <Badge
                    className={
                      item.Status === 'Open'
                        ? 'bg-[#5678E91A] text-blue-800'
                        : item.Status === 'Pending'
                        ? 'bg-[#FFC3131A] text-warning'
                        : 'bg-[#39973D1A] text-green-800'
                    }
                  >
                    {item.Status}
                  </Badge>
                  </td>

                  <td className="p-3 pt-2">
                    <div className="flex flex-wrap sm:flex-nowrap sm:space-x-2 space-y-2 sm:space-y-0">
                      <button
                        className="bg-blue-50 text-[#39973D] rounded-2 p-2 sm:w-10 sm:h-10"
                        onClick={() => openEditModal(item)} /*  */
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="bg-blue-50 text-[#5678E9] rounded-2 p-2 sm:w-10 sm:h-10"
                        onClick={() => openViewModal(item)} // Open View Protocol modal
                      >
                        <i className="fa-solid fa-eye w-2 me-2"></i>
                      </button>
                      <button
                        className="bg-blue-50 text-red-600 rounded-2 p-2 sm:w-10 sm:h-10"
                        onClick={() => openDeleteModal(item)} // Open Delete Protocol modal
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

        {/* Modals */}
        {isCreateProtocolOpen && (
          <CreateRequst
            isOpen={isCreateProtocolOpen}
            onClose={closeCreateProtocolModal}
            fetchRequestTracking={fetchRequestTracking}
          />
        )}
        {isEditModalOpen && selectedProtocolForView && (
          <EditRequest
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            protocol={selectedProtocolForView}
            fetchRequestTracking={fetchRequestTracking}
          />
        )}
        {isViewModalOpen && selectedProtocolForView && (
          <ViewRequest
            isOpen={isViewModalOpen}
            onClose={closeViewModal}
            protocol={selectedProtocolForView}
          />
        )}
        {isDeleteModalOpen && selectedProtocolForDelete && (
          <DeleteRequst
            isOpen={isDeleteModalOpen}
            onCancel={closeDeleteModal}
            protocol={selectedProtocolForDelete}
            onDelete={() => handleDelete(selectedProtocolForDelete.id)} // Pass the ID of the protocol to delete
            fetchRequestTracking={fetchRequestTracking}
          />
        )}
      </div>
    </div>
  );
};

export default RequestTracking;
