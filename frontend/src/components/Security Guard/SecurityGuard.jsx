import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import plus from "../assets/add-square.png"; 
import HeaderBaner  from "../Dashboard/Header/HeaderBaner";
import AvatarImage from "../assets/Avatar.png";
import AddGuard from "./AddGuard";
import EditGuard from "./EditGuard";
import ViewGuard from "./ViewGuard";
import DeleteGuard from "./DeleteGuard";
import moment from 'moment';
import axiosInstance from '../Common/axiosInstance';


const initialData = [
  {
    id: 1,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Day",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Male",
  },
  {
    id: 2,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Day",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Female"},
  {
    id: 3,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Night",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Male" },
  {
    id: 4,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Day",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Female"
  },
  {
    id: 5,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Day",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Female"},
  {
    id: 6,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Night",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Male" },
  {
    id: 7,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Day",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Male"
  },
  {
    id: 8,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Day",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Male"},
  {
    id: 9,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Day",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Male"
   
  },
  {
    id: 10,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Day",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Male"
  },
  {
    id: 11,
    Photo :AvatarImage,
    GaurdName: "Brooklyn Simmons",
    Number:"94564 96321",
    Shift:"Day",
    Date: "10/02/2024",
    Time: "2:45 PM",
    Gender:"Male"},
];



const SecurityGaurd = () => {
  const [data, setData] = useState(initialData); // Use state for data
  const [isCreateProtocolOpen, setIsCreateProtocolOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add state for Delete Protocol modal
  const [selectedProtocolForView, setSelectedProtocolForView] = useState(null);
  const [selectedProtocolForDelete, setSelectedProtocolForDelete] = useState(null); // State for protocol to delete
  const [SecurityGaurd, setSecurityGaurd] = useState([]);

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
    setSecurityGaurd(SecurityGaurd.filter((item) => item._id !== id)); // Update the state to remove the deleted protocol

    // Close the delete modal after the protocol is deleted
    closeDeleteModal();
  };

  const Badge = ({ children, className }) => (
    <span
      className={`px-2 py-2 pe-10 text-xs font-semibold ${className}`}
      style={{
        borderRadius: "15px",
        minWidth: "80px",
        textAlign: "center",
      }}
    >
      {children}
    </span>
  );


  // Fetch Security Guard from the API
  const fetchSecurityGuard = async () => {
    try {
        const response = await axiosInstance.get('/v2/security/');
        if(response.status === 200){
          setSecurityGaurd(response.data.Guard); 
        }
       
     } catch (error) {
        console.error('Error fetching SecurityGuard:', error);
    }
  };

  useEffect(() => {
    fetchSecurityGuard();
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

    <HeaderBaner/>
        </header>

        {/* Content */}
        <div className="bg-[#FFFFFF] rounded-lg lg:ml-[320px] shadow-md lg:w-[1560px] mt-5">
          <div className="flex justify-between items-center mb-6 p-2 pt-4 ps-3">
            <h1 className="text-3xl font-semibold text-gray-800">
              Security Guard Details
            </h1>
            <button
              onClick={openCreateProtocolModal}
              className="bg-orange-500 hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
            >
               <img src={plus} alt="Add" className="mr-2 h-4 w-4" />
             Add Security
            </button>
          </div>
            <div className="overflow-x-auto  h-[700px] scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="bg-white border border-gray-200 rounded-lg shadow-md lg:w-[1550px]">
            <thead
              className="w-full"
              style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
            >
              <tr className="text-left text-sm font-semibold">
                <th className="p-3 ps-5 text-[#202224]">Security Guard Name</th>
                <th className="p-3 ps-2 hidden sm:table-cell">
                 Phone Number
                </th>
                <th className="p-3 ps-5 hidden sm:table-cell">Select Shift</th>
                <th className="p-3 ps-2 hidden lg:table-cell">Shift Date</th>
                <th className="p-3 ps-5  hidden lg:table-cell">Shift Time</th>
                <th className="p-3 ps-5 hidden lg:table-cell">Gender</th>
                <th className="p-3 ps-5 hidden lg:table-cell">Action</th>
              </tr>
            </thead>

            <tbody>
              {SecurityGaurd.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img
                      src={!!item.profileimage ? item.profileimage : AvatarImage}
                      alt={item.full_name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{item.full_name}</span>
                  </td>
                  <td className="p-3 pt-2 hidden sm:table-cell text-gray-600">
                    {item.MailOrPhone}
                  </td>

                  <td className="p-3 pt-2 ps-5 hidden sm:table-cell text-gray-600">
                  <Badge
                className={
                  item.shift === 'Day'
                    ? 'bg-[#F4F4F4] text-[#FF9300]' // High priority: Red background, white text
                    : item.shift === 'Night'
                    ? 'bg-[#4F4F4F] text-[#FFFFFF]' 
                    : 'bg-[#39973D] text-white'
                }
              >
              <i class="fa-solid fa-user"></i>  {item.shift}
              </Badge>
                  </td>
                 
                  <td className="p-3 pt-2  hidden lg:table-cell text-gray-600">
                
                      {!!item.date ? moment(item.date).format('DD/MM/YYYY') : " "}
                 
                  </td>
                  <td className="p-3 pt-2 ps-2 hidden md:table-cell ">
                    <span className="bg-[#F6F8FB] p-2 text-[#4F4F4F] rounded-2xl w-[30px] h-[60px]  ml-10">
                  {item.time}

                    </span>
                  </td>
                  <td className="p-3 pt-2 ps-5 hidden md:table-cell text-gray-600">
                  <Badge
              
                className={
                  item.gender === 'Male'
                    ? 'bg-[#21A8E41A] text-[#5678E9]' // High priority: Red background, white text
                    : item.gender === 'Female'
                    ? 'bg-[#FE76A81A] text-[#FE76A8]' 
                    : 'bg-[#39973D] text-white'
                }
              >
              <i class="fa-solid fa-user" ></i>  {item.gender}
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
          <AddGuard
            isOpen={isCreateProtocolOpen}
            onClose={closeCreateProtocolModal}
          />
        )}
        {isEditModalOpen && selectedProtocolForView && (
          <EditGuard
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            guard={selectedProtocolForView}
          />
        )}
        {isViewModalOpen && selectedProtocolForView && (
          <ViewGuard
            isOpen={isViewModalOpen}
            onClose={closeViewModal}
            Guard={selectedProtocolForView}
          />
        )}
        {isDeleteModalOpen && selectedProtocolForDelete && (
          <DeleteGuard
            isOpen={isDeleteModalOpen}
            onCancel={closeDeleteModal}
            Guard={selectedProtocolForDelete}
            onDelete={() => handleDelete(selectedProtocolForDelete.id)} // Pass the ID of the protocol to delete
          />
        )}
      </div>
    </div>
  );
};

export default SecurityGaurd;
