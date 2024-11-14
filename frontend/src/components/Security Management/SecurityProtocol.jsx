import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import NotificationIcon from "../assets/notification-bing.png"; 
import AvatarImage from "../assets/Avatar.png"; 
import CreateProtocol from './CreateProtocol';
import EditProtocol from './EditProtocol';
import ViewProtocol from './ViewProtocol';
import DeleteProtocol from './DeleteProtocol';
import HeaderBaner  from "../Dashboard/Header/HeaderBaner"; // Import DeleteProtocol modal

const initialData = [
  { id: 1, title: 'Physical Security', description: 'Implementing surveillance cameras in public spaces.', date: '11/01/2024', time: '3:45 PM' },
  { id: 2, title: 'Cybersecurity', description: 'Securing critical infrastructure, government systems.', date: '12/01/2024', time: '6:40 AM' },
  { id: 3, title: 'Legal Measures', description: 'Enforcing and updating laws and regulations.', date: '13/01/2024', time: '1:00 PM' },
  { id: 4, title: 'Social Engagement', description: 'Fostering collaboration between law enforcement.', date: '14/01/2024', time: '6:20 PM' },
  { id: 5, title: 'Education and Training', description: 'Implementing surveillance cameras in public spaces.', date: '15/01/2024', time: '3:45 PM' },
  { id: 6, title: 'Physical Security', description: 'Developing comprehensive plans for responding.', date: '16/01/2024', time: '1:00 PM' },
  { id: 7, title: 'Ethical Considerations', description: 'Implementing surveillance cameras in public spaces.', date: '17/01/2024', time: '6:40 AM' },
  { id: 8, title: 'Physical Security', description: 'Securing critical infrastructure, government systems.', date: '18/01/2024', time: '3:45 PM' },
  { id: 9, title: 'Privacy Protection', description: 'Enforcing and updating laws and regulations.', date: '19/01/2024', time: '4:45 AM' },
  { id: 10, title: 'Legal Measures', description: 'Implementing surveillance cameras in public spaces.', date: '20/01/2024', time: '3:45 PM' },
];

const SecurityProtocol = () => {
  const [data, setData] = useState(initialData);  // Use state for data
  const [isCreateProtocolOpen, setIsCreateProtocolOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add state for Delete Protocol modal
  const [selectedProtocolForView, setSelectedProtocolForView] = useState(null);
  const [selectedProtocolForDelete, setSelectedProtocolForDelete] = useState(null); // State for protocol to delete

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
    setData(data.filter(item => item.id !== id)); // Update the state to remove the deleted protocol

    // Close the delete modal after the protocol is deleted
    closeDeleteModal();
  };

  return (
    <div className="flex bg-gray-100  w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <header className="flex justify-between   lg:ml-[290px] items-center lg:px-5 bg-white h-[60px] shadow-md "style={{padding:"35px 10px"}}>
          <div className="flex items-center space-x-2  text-gray-600">
            <Link to="/securityprotocol" className="text-[#A7A7A7] no-underline font-semibold ms-4 md:ml-20 ">
              Home
            </Link>
            <span className="text-gray-400 "> &gt; </span>
            <span className="font-semibold text-[#5678E9]">Security Protocols</span>
          </div>

        <HeaderBaner/>
        </header>

        {/* Content */}
        <div className="bg-[#FFFFFF] rounded-lg lg:ml-[330px] shadow-md lg:w-[1560px] mt-5">
          <div className="flex justify-between items-center mb-6 p-2 pt-4 ps-3">
            <h1 className="text-3xl font-semibold text-gray-800">Security Protocols</h1>
            <button
              onClick={openCreateProtocolModal}
              className="bg-orange-500 hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
            >
              Create Protocol
            </button>
          </div>

          <table className="bg-white border border-gray-200 rounded-lg shadow-md w-full">
          <thead className=''style={{ backgroundColor:"rgba(86, 120, 233, 0.1)" }} >  
        <tr className="text-left text-sm font-semibold">  
          <th className="p-3 text-[#202224] ">Visitor Name</th>  
          <th className="p-3 hidden sm:table-cell">Phone Number</th>  
          <th className="p-3 hidden md:table-cell">Date</th>  
          <th className="p-3 hidden lg:table-cell">Unit Number</th>  
          <th className="p-3 hidden xl:table-cell">Time</th>  
        </tr>  
      </thead>  

            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="p-3 pt-2 text-gray-700 font-medium">{item.title}</td>
                  <td className="p-3 pt-2 hidden sm:table-cell text-gray-600">{item.description}</td>
                  <td className="p-3 pt-2 hidden md:table-cell text-gray-600">{item.date}</td>
                  <td className="p-3 pt-2 hidden lg:table-cell text-gray-600">{item.time}</td>
                  <td className="p-3 pt-2">
                    <div className="flex flex-wrap sm:flex-nowrap sm:space-x-2 space-y-2 sm:space-y-0">
                      <button
                        className="bg-blue-50 text-[#39973D] rounded-2 p-2 sm:w-10 sm:h-10"
                        onClick={() => openEditModal(item)}
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

        {/* Modals */}
        {isCreateProtocolOpen && <CreateProtocol isOpen={isCreateProtocolOpen} onClose={closeCreateProtocolModal} />}
        {isEditModalOpen && selectedProtocolForView && (
          <EditProtocol
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            protocol={selectedProtocolForView}
            onSave={(updatedData) => {
              console.log(updatedData); 
              closeEditModal();
            }}
          />
        )}
        {isViewModalOpen && selectedProtocolForView && (
          <ViewProtocol isOpen={isViewModalOpen} onClose={closeViewModal} protocol={selectedProtocolForView} />
        )}
        {isDeleteModalOpen && selectedProtocolForDelete && (
          <DeleteProtocol
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

export default SecurityProtocol;
