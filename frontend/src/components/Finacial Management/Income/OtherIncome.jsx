import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from "react-router-dom";

// import CreateAnnouncement from './CreateAnnouncement';
import EditIncome from "./EditIncome";
import DeleteIncome from "./Delete"; 
import ViewIncome from "./ViewIncome";
import "../../Sidebar/sidebar.css"; 
import CreateIncome from "./CreateIncome";
import HeaderBaner  from "../../Dashboard/Header/HeaderBaner";

const OtherIncome = () => {
  const [activeButton, setActiveButton] = useState("otherIncome");
  const [openDropdown, setOpenDropdown] = useState(null); // Track which card dropdown is open
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeOption, setActiveOption] = useState(null); 
  const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState(false); 
  const [noteToDelete, setNoteToDelete] = useState(null); 
  const [isSecurityProtocolOpen, setIsSecurityProtocolOpen] = useState(false); 

  const cards = [
    {
      id: 1,
      title: "Ganesh Chaturthi",
      AmountMember: "1500",
      TotalMember: "12",
      date: "01/07/2024",
      DueDate: "10/07/2024",
      description:
        "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.",
    },
    {
      id: 2,
      title: "Navratri",
      AmountMember: "1500",
      TotalMember: "12",
      date: "01/07/2024",
      DueDate: "10/07/2024",
      description:
        "The celebration of Navratri involves the installation of clay idols of Durga in Resident.",
    },
    {
      id: 3,
      title: "Diwali",
      AmountMember: "1500",
      TotalMember: "12",
      date: "01/07/2024",
      DueDate: "10/07/2024",
      description:
        "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.",
    },
    {
      id: 4,
      title: "Ganesh Chaturthi",
      AmountMember: "1500",
      TotalMember: "12",
      date: "01/07/2024",
      DueDate: "10/07/2024",
      description:
        "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.",
    },
  ];

  // Refs for the dropdowns
  const dropdownRefs = useRef([]);

  // Toggle dropdown menu visibility
  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  // Handle Edit, View, Delete click event
  const handleOptionClick = (option, card) => {
    setActiveOption(option); // Set the active option clicked (Edit/View/Delete)
    if (option === "edit") {
      handleEditNoteClick(card); // Open Edit modal
    }
    if (option === "delete") {
      setNoteToDelete(card); // Set the note to delete
      setIsDeleteNoteOpen(true); // Open Delete modal
    }
    if (option === "view") {
      setIsSecurityProtocolOpen(true); // Open SecurityProtocol modal
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


  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
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

  // Close the DeleteNote modal
  const closeDeleteNoteModal = () => {
    setIsDeleteNoteOpen(false); // Close the delete modal
    setNoteToDelete(null); // Clear the note to delete
  };

  // Handle Delete Confirmation
  const handleDeleteNote = (note) => {
    setCards(cards.filter((card) => card.id !== note.id)); // Remove the deleted card from the list
    closeDeleteNoteModal(); // Close the modal after deletion
  };

  // Close the SecurityProtocol modal
  const closeSecurityProtocolModal = () => {
    setIsSecurityProtocolOpen(false); // Close the SecurityProtocol modal
  };

  // Close the dropdown menu if clicked outside
  const handleClickOutside = (event) => {
    if (
      dropdownRefs.current &&
      !dropdownRefs.current.some((ref) => ref && ref.contains(event.target))
    ) {
      setOpenDropdown(null);
    }
  };

  // Attach and detach event listener
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-w-full h-full bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col  ">
        {/* Header */}
        <header className="flex justify-between  lg:ml-[290px] items-center px-5 bg-white h-[60px] shadow-md">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-gray-600 ml-20 md:ml-20">
            <Link
              to="/dashboard"
              className="text-[#A7A7A7] no-underline font-semibold"
            >
              Home
            </Link>
            <span className="text-gray-400"> &gt; </span>
            <Link
              to="/memberlist"
              className="text-[#A7A7A7] no-underline font-semibold"
            >
              Maintenance
            </Link>
            <span className="text-gray-400"> &gt; </span>
            <span className="font-semibold text-[#5678E9]">Other Income</span>
          </div>

          {/* Notifications and Profile Section */}
       <HeaderBaner/>
        </header>

        
        <main className="flex-1 rounded border lg:ml-[290px] lg:w-700px bg-gray-100">      
        <div className="lg:mt-[10px] bg">
            <div className="mt-10 lg:ml-[16px] px-4 sm:px-8 ">
              <Link
                to="/income"
                className={`w-full lg:h-[50px] sm:w-[150px] px-4 py-3 rounded-top no-underline ${
                  activeButton === "maintenance"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                }`}
                onClick={() => setActiveButton("maintenance")}
              >
                Maintenance
              </Link>
              <Link
                to="/otherincome"
                className={`w-full lg:h-[50px] sm:w-[150px] text-[] px-4 py-3 rounded-top no-underline ${
                  activeButton === "otherIncome"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                }`}
                onClick={() => setActiveButton("otherIncome")}
              >
                Other Income
              </Link>
            </div>
          </div>

          <div className="w-[95%] sm:ml-[20px] lg:ml-[40px] px-7 py-10 p-4 mt-3 rounded bg-[#FFFFFF]">
            <div className="flex justify-between items-center mb-6">
              <h1 className="lg:text-3xl  font-semibold text-gray-800">
              Other Income
              </h1>
           
              <button
                onClick={handleCreateNoteClick} // Trigger modal opening
                className="bg-orange-500  text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
              >
                Create Other Income
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="bg-white rounded-lg shadow-md relative"
                >
                  <div className="bg-[#5678E9] text-white p-3 pb-2 flex justify-between items-center">
                    <span className="font-semibold">{card.title}</span>
                    <div className="flex items-center gap-2">
                      <i
                        className="border rounded p-2 bg-white text-[#5678E9] fa-solid fa-ellipsis-vertical cursor-pointer"
                        onClick={() => toggleDropdown(index)} // Toggle dropdown visibility
                      ></i>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {openDropdown === index && (
                    <div
                      className="bg-white shadow-lg rounded-md absolute top-12 left-[85%] transform -translate-x-[50%] w-[80px]"
                      ref={(el) => (dropdownRefs.current[index] = el)} // Attach the ref
                    >
                      <button
                        className={`w-full text-center px-4 py-2 text-sm ${
                          activeOption === "edit"
                            ? "text-[#202224]"
                            : "text-[#A7A7A7]"
                        }`}
                        onClick={() => handleOptionClick("edit", card)}
                      >
                        Edit
                      </button>
                      <Link to='/memberlist'
                        className={`w-full text-center px-4 py-2 text-sm  no-underline ${
                          activeOption === "view"
                            ? "text-[#202224]"
                            : "text-[#A7A7A7]"
                        }`}
                        onClick={() => handleOptionClick("view", card)}
                      >
                        View
                      </Link>
                      <button
                        className={`w-full text-center px-4 py-2 text-sm ${
                          activeOption === "delete"
                            ? "text-[#202224]"
                            : "text-[#A7A7A7]"
                        }`}
                        onClick={() => handleOptionClick("delete", card)}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  <div className="d-flex ps-3 pt-2 bg-[#FFFFFF] ">
                    <h3 className="text-sm font-medium text-gray-600 ">
                      Amount Per Member
                    </h3>
                    <span className="text-sm text-[#5678E9] text-center lg:ml-[140px] flex ps-2 p-1 pe-1 lg:w-[60px] h-7 border rounded-3xl bg-blue-200">
                      ₹{card.AmountMember}
                    </span>
                  </div>
                  <div className="d-flex  ps-3 pt-2 bg-[#FFFFFF]">
                    <h3 className=" text-sm font-medium text-gray-600 ">
                      Total Member
                    </h3>
                    <span className="text-sm font-bold text-[#202224] lg:ml-[220px]">
                      {card.TotalMember}
                    </span>
                  </div>
                  <div className="d-flex  ps-3 pt-2 bg-[#FFFFFF]">
                    <h3 className="text-sm font-medium text-gray-600 ">Date</h3>
                    <span className="text-sm font-bold text-[#202224]  lg:ml-[230px] ">
                      {card.date}
                    </span>
                  </div>
                  <div className="d-flex  ps-3 pt-2 bg-[#FFFFFF]">
                    <h3 className="text-sm font-medium text-gray-600 ">
                      Due Date
                    </h3>
                    <span className="text-sm font-bold text-[#202224]  lg:ml-[200px] ">
                      {card.DueDate}
                    </span>
                  </div>
                  <div className=" ps-3 pt-2 bg-[#FFFFFF]">
                    <h3 className="text-sm font-medium text-gray-600 ">
                      Description
                    </h3>
                    <p className="text-sm font-bold text-[#202224]">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal Components */}
      <CreateIncome
        isOpen={isCreateNoteOpen}
        onClose={closeCreateNoteModal}
       
      />

      <EditIncome
        isOpen={isEditNoteOpen}
        onClose={closeEditNoteModal}
        noteData={selectedNote}
      />
      <DeleteIncome
        isOpen={isDeleteNoteOpen}
        contact={noteToDelete}
        onDelete={handleDeleteNote}
        onCancel={closeDeleteNoteModal}
      />

      {/* SecurityProtocol Modal */}
      {isSecurityProtocolOpen && (
        <ViewIncome
          isOpen={isSecurityProtocolOpen}
          onClose={closeSecurityProtocolModal}
          income={selectedNote} 
        />
      )}
    </div>
  );
};

export default OtherIncome;
