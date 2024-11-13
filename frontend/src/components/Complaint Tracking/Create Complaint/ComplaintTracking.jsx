import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import NotificationIcon from "../../assets/notification-bing.png";

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
import CreateTracking from "./CreateTracking";
import DeleteTracking from "./DeleteTracking";
import ViewTracking from "./ViewTracking";
import EditTracking from "./EditTracking";
import axiosInstance from '../../Common/axiosInstance';

const initialData = [
  {
    id: 1,
    Complainername: "Evelyn Harper",
    Complaintname: "Unethical Behavior",
    description: "Providing false information or deliberately.",
    unit: "1001",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 2,
    Complainername: "Esther Howard",
    Complaintname: "Preventive Measures",
    description: "Regular waste collection services.",
    unit: "1002",
    priority: "Low",
    status: "Open",
  },
  {
    id: 3,
    Complainername: "Jenny Wilson",
    Complaintname: "Unethical Behavior",
    description: "Designated garages for residents and guests.",
    unit: "1003",
    priority: "High",
    status: "Solve",
  },
  {
    id: 4,
    Complainername: "Guy Hawkins",
    Complaintname: "Preventive Measures",
    description: "The celebration of Ganesh Chaturthi involves.",
    unit: "1004",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 5,
    Complainername: "Robert Fox",
    Complaintname: "Unethical Behavior",
    description: "Identify your largest expenditures enabling you.",
    unit: "2001",
    priority: "Low",
    status: "Open",
  },
  {
    id: 6,
    Complainername: "Jacob Jones",
    Complaintname: "Preventive Measures",
    description: "Expenses will way that makes sense for you.",
    unit: "2002",
    priority: "High",
    status: "Solve",
  },
  {
    id: 7,
    Complainername: "Cody Fisher",
    Complaintname: "Unethical Behavior",
    description: "Track the fluctuations in spending over time.",
    unit: "2003",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 8,
    Complainername: "Bessie Cooper",
    Complaintname: "Preventive Measures",
    description: "Event hosting and recreational activities.",
    unit: "2004",
    priority: "Low",
    status: "Open",
  },
  {
    id: 9,
    Complainername: "Albert Flores",
    Complaintname: "Unethical Behavior",
    description: "Providing false information or deliberately.",
    unit: "3001",
    priority: "High",
    status: "Solve",
  },
  {
    id: 10,
    Complainername: "Floyd Miles",
    Complaintname: "Preventive Measures",
    description: "Preferences by categorizing and organizing your expenses.",
    unit: "3002",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 11,
    Complainername: "Kathryn Murphy",
    Complaintname: "Unethical Behavior",
    description: "Providing false information or deliberately.",
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

const ComplaintTracking = () => {
  const [data, setData] = useState(initialData); // Use state for data
  const [isCreateProtocolOpen, setIsCreateProtocolOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add state for Delete Protocol modal
  const [selectedProtocolForView, setSelectedProtocolForView] = useState(null);
  const [selectedProtocolForDelete, setSelectedProtocolForDelete] =
    useState(null); // State for protocol to delete

  const [complaint, setComplaint] = useState([]);
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
    // setData(data.filter((item) => item.id !== id)); // Update the state to remove the deleted protocol
    setComplaint(complaint.filter((item) => item._id !== id)); 
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
  

   // Fetch fetchComplaint from the API
   const fetchComplaint = async () => {
    try {
        const response = await axiosInstance.get('/v2/complaint/');
        console.log(response.data);
        if(response.status === 200){
          setComplaint(response.data.complaints); 
        }
       
    } catch (error) {
        console.error('Error fetching Important Numbers:', error);
    }
};


    useEffect(() => {
      fetchComplaint();
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
              to="/securityprotocol"
              className="text-[#A7A7A7] no-underline font-semibold ms-4 md:ml-20 "
            >
              Home
            </Link>
            <span className="text-gray-400 "> &gt; </span>
            <span className="font-semibold text-[#5678E9]">
              Create Complaint
            </span>
          </div>

          <div className="flex items-center me-5  justify-end space-x-4">
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
              Create Create
            </button>
          </div>
            <div className="overflow-x-auto  h-[700px] scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="bg-white border border-gray-200 rounded-lg shadow-md lg:w-[1550px]">
            <thead
              className="w-full"
              style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
            >
              <tr className="text-left text-sm font-semibold">
                <th className="p-3 ps-5 text-[#202224]">Complainer Name</th>
                <th className="p-3 ps-2 hidden sm:table-cell">
                  Complaint Name
                </th>
                <th className="p-3 ps-5 hidden sm:table-cell">Description</th>
                <th className="p-3 ps-2 hidden lg:table-cell">Unit Number</th>
                <th className="p-3 ps-5 hidden lg:table-cell">Priority</th>
                <th className="p-3 ps-5 hidden lg:table-cell">Status</th>
                <th className="p-3 ps-5 hidden lg:table-cell">Action</th>
              </tr>
            </thead>

            <tbody>
              {complaint.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img
                      src={AvatarImage}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{item.Complainer_name}</span>
                  </td>
                  <td className="p-3 pt-2 hidden sm:table-cell text-gray-600">
                    {item.Complaint_name}
                  </td>

                  <td className="p-3 pt-2 ps-5 hidden sm:table-cell text-gray-600">
                    {item.Description}
                  </td>
                  <td className="p-3 pt-2 ps-3 d-flex hidden sm:table-cell text-gray-600">
                    {" "}
                    <img
                      src={unitImages[item.Unit]}
                      alt={item.Unit}
                      width="25"
                      height="25"
                      className="rounded-full"
                    />
                    {item.Unit}
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
          <CreateTracking
            isOpen={isCreateProtocolOpen}
            onClose={closeCreateProtocolModal}
          />
        )}
        {isEditModalOpen && selectedProtocolForView && (
          <EditTracking
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            protocol={selectedProtocolForView}
          />
        )}
        {isViewModalOpen && selectedProtocolForView && (
          <ViewTracking
            isOpen={isViewModalOpen}
            onClose={closeViewModal}
            protocol={selectedProtocolForView}
          />
        )}
        {isDeleteModalOpen && selectedProtocolForDelete && (
          <DeleteTracking
            isOpen={isDeleteModalOpen}
            onCancel={closeDeleteModal}
            protocol={selectedProtocolForDelete}
            onDelete={() => handleDelete(selectedProtocolForDelete.id)} // Pass the ID of the protocol to delete
          />
        )}
      </div>
    </div>
  );
};

export default ComplaintTracking;
