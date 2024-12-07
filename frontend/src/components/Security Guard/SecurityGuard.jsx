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
import "../Dashboard/Maintenance/scrollbar.css";


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
  const [data, setData] = useState(initialData); 
  const [isCreateProtocolOpen, setIsCreateProtocolOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [selectedProtocolForView, setSelectedProtocolForView] = useState(null);
  const [selectedProtocolForDelete, setSelectedProtocolForDelete] = useState(null); 
  const [SecurityGaurd, setSecurityGaurd] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

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
    setSelectedProtocolForDelete(item); 
    setIsDeleteModalOpen(true); 
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = (id) => {
    setSecurityGaurd(SecurityGaurd.filter((item) => item._id !== id));
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
      <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] 2xl:ml-[320px]  text-muted d-none d-sm-flex ">
            <Link
              to="/dashboard"
              className="text-[#A7A7A7] text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
            Security Guard
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

        {/* Content */}
        <div className="bg-[#FFFFFF] rounded-lg lg:ml-[320px] shadow-md lg:w-[1590px] mt-5">
          <div className="flex justify-between items-center mb-6 p-2 pt-4 ps-3">
            <span className="2xl:text-3xl whitespace-nowrap font-semibold text-gray-800">
              Security Guard Details
            </span>
            <button
              onClick={openCreateProtocolModal}
              className="bg-orange-500 hover:bg-orange-600 text-[#FFFFFF] 2xl:px-4 px-2 py-2 rounded-lg flex items-center"
            >
               <img src={plus} alt="Add" className="mr-2 h-4 w-4" />
             Add Security
            </button>
          </div>
            <div className="overflow-x-auto  h-[700px] scrollbar-thin rounded-2xl 2xl:ml-5 ml-2 mr-2 scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="Content">   
          <table className="bg-white border border-gray-200 rounded-lg shadow-md lg:w-[1550px]">
            <thead
              className="w-full"
              style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
            >
              <tr className="text-left text-sm font-semibold">
                <th className="p-3   whitespace-nowrap text-[#202224]">Security Guard Name</th>
                <th className="p-3   whitespace-nowrap  sm:table-cell">
                 Phone Number
                </th>
                <th className="p-3   text-center whitespace-nowrap sm:table-cell">Select Shift</th>
                <th className="p-3   text-center whitespace-nowrap lg:table-cell">Shift Date</th>
                <th className="p-3   text-center whitespace-nowrap  lg:table-cell">Shift Time</th>
                <th className="p-3   text-center whitespace-nowrap lg:table-cell">Gender</th>
                <th className="p-3   text-center whitespace-nowrap lg:table-cell">Action</th>
              </tr>
            </thead>

            <tbody>
              {SecurityGaurd.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-3 py-3 flex items-center space-x-3">
                    <img
                      src={!!item.profileimage ? item.profileimage : AvatarImage}
                      alt={item.full_name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{item.full_name}</span>
                  </td>
                  <td className="p-3 pt-2 text-left   sm:table-cell text-gray-600">
                    {item.MailOrPhone}
                  </td>

                  <td className="p-3 pt-2 text-center whitespace-nowrap  rounded-2xl   sm:table-cell text-gray-600">
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
                 
                  <td className="p-3 pt-2 text-center whitespace-nowrap   lg:table-cell text-gray-600">
                
                      {!!item.date ? moment(item.date).format('DD/MM/YYYY') : " "}
                 
                  </td>
                  <td className="p-3 pt-2  text-center ps-1 whitespace-nowrap  md:table-cell ">
                    <span className="bg-[#F6F8FB] p-2 text-[#4F4F4F] rounded-2xl w-[30px] h-[60px]  ml-10">
                  {item.time}

                    </span>
                  </td>
                  <td className="p-3 pt-2  text-center whitespace-nowrap md:table-cell text-gray-600">
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

                  <td className="p-3  ">
                    <div className="flex  justify-center space-x-2  sm:space-y-0">
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
        </div>

        {/* Modals */}
        {isCreateProtocolOpen && (
          <AddGuard
            isOpen={isCreateProtocolOpen}
            onClose={closeCreateProtocolModal}
            fetchSecurityGuard={fetchSecurityGuard}
          />
        )}
        {isEditModalOpen && selectedProtocolForView && (
          <EditGuard
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            guard={selectedProtocolForView}
            fetchSecurityGuard={fetchSecurityGuard}
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
            onDelete={() => handleDelete(selectedProtocolForDelete._id)} // Pass the ID of the protocol to delete
            fetchSecurityGuard={fetchSecurityGuard}
          />
        )}
      </div>
    </div>
  );
};

export default SecurityGaurd;
