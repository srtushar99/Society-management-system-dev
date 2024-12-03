import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from "react-router-dom";

// import CreateAnnouncement from './CreateAnnouncement';
import EditIncome from "./EditIncome";
import DeleteIncome from "./Delete";
import ViewIncome from "./ViewIncome";
import "../../Sidebar/sidebar.css";
import CreateIncome from "./CreateIncome";
import HeaderBaner from "../../Dashboard/Header/HeaderBaner";
import axiosInstance from "../../Common/axiosInstance";
import moment from "moment";
import "../../Dashboard/Maintenance/scrollbar.css";

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
  const [OtherIncome, setOtherIncome] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

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

  const handleOptionClick = (option, card) => {
    setActiveOption(option);
    if (option === "edit") {
      handleEditNoteClick(card);
    }
    if (option === "delete") {
      setNoteToDelete(card);
      setIsDeleteNoteOpen(true);
    }
    if (option === "view") {
      setIsSecurityProtocolOpen(true);
    }
  };

  const handleCreateNoteClick = () => {
    setIsCreateNoteOpen(true);
  };

  const closeCreateNoteModal = () => {
    setIsCreateNoteOpen(false);
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleEditNoteClick = (note) => {
    setSelectedNote(note);
    setIsEditNoteOpen(true);
  };

  const closeEditNoteModal = () => {
    setIsEditNoteOpen(false);
    setSelectedNote(null);
  };

  const closeDeleteNoteModal = () => {
    setIsDeleteNoteOpen(false);
    setNoteToDelete(null);
  };

  const handleDeleteNote = (note) => {
    setOtherIncome(OtherIncome.filter((card) => card._id !== note.id));
    closeDeleteNoteModal();
  };

  const closeSecurityProtocolModal = () => {
    setIsSecurityProtocolOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRefs.current &&
      !dropdownRefs.current.some((ref) => ref && ref.contains(event.target))
    ) {
      setOpenDropdown(null);
    }
  };

  // Fetch Other Income from the API
  const fetchOtherIncome = async () => {
    try {
      const response = await axiosInstance.get("/v2/income/");
      console.log(response.data.Income);
      if (response.status === 200) {
        setOtherIncome(response.data.Income);
      }
    } catch (error) {
      console.error("Error fetching Other Income:", error);
    }
  };

  useEffect(() => {
    fetchOtherIncome();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-w-full h-full bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col  ">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] 2xl:ml-[320px]  text-muted d-none d-sm-flex ">
            <Link
              to="/dashboard"
              className="text-[#A7A7A7]  text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base">
              {" "}
              &gt;{" "}
            </span>
            <Link
              to="/memberlist"
              className="text-[#A7A7A7]  text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Maintenanance
            </Link>
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base">
              {" "}
              &gt;{" "}
            </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Other Income
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

        <main className="flex-1 rounded border lg:ml-[290px] lg:w-700px bg-gray-100">
          <div className="lg:mt-[10px] ">
            <div className="mt-10 lg:ml-[16px] px-4 sm:px-8 ">
              <Link
                to="/income"
                className={` lg:h-[50px] 2xl:px-5 px-14 py-3 rounded-top no-underline ${
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
                className={` lg:h-[50px] 2xl:px-5 px-10  py-3 rounded-top no-underline ${
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

          <div className="2xl:w-[1560px] sm:ml-[20px] 2xl:ml-[40px] px-7 py-10 p-3 mt-3 rounded bg-[#FFFFFF]">
            <div className="flex justify-between  items-center mb-6">
              <span className="text-xl  whitespace-nowrap font-semibold text-gray-800">
                Other Income
              </span>
              <button
                onClick={handleCreateNoteClick} // Trigger modal opening
                className="bg-orange-500 whitespace-nowrap text-[#FFFFFF] px-1 py-2 rounded-lg flex items-center"
              >
                Create Other Income
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {OtherIncome.map((card, index) => (
                <div
                  key={card._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative"
                >
                  <div className="bg-[#5678E9] text-white p-3 pb-2 flex justify-between items-center">
                    <span className="font-semibold">
                      {!!card.title ? card.title : ""}
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
                      <Link
                        to="/memberlist"
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
                      ₹{!!card.amount ? card.amount : " "}
                    </span>
                  </div>
                  <div className="d-flex  ps-3 pt-2 bg-[#FFFFFF]">
                    <h3 className=" text-sm font-medium text-gray-600 ">
                      Total Member
                    </h3>
                    <span className="text-sm font-bold text-[#202224] lg:ml-[220px]">
                      {!!card.member ? card.member : ""}
                    </span>
                  </div>
                  <div className="d-flex   ps-3 pt-2 bg-[#FFFFFF]">
                    <h3 className="text-sm font-medium text-gray-600 ">Date</h3>
                    <span className="text-sm font-bold text-[#202224]  lg:ml-[230px] ">
                      {!!card.date
                        ? moment(card.date).format("DD/MM/YYYY")
                        : ""}
                    </span>
                  </div>
                  <div className="d-flex  ps-3 pt-2 bg-[#FFFFFF]">
                    <h3 className="text-sm font-medium text-gray-600 ">
                      Due Date
                    </h3>
                    <span className="text-sm font-bold text-[#202224]  lg:ml-[200px] ">
                      {!!card.dueDate
                        ? moment(card.dueDate).format("DD/MM/YYYY")
                        : " "}
                    </span>
                  </div>
                  <div className=" p-4 pt-2 ps-3  bg-[#FFFFFF]">
                    <h3 className="text-sm text-[#4F4F4F] ">Description:</h3>
                    <div className="max-h-[70px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      <span className="text-sm text-[#202224] break-words">
                        {!!card.description
                          ? card.description
                          : "No description available"}
                      </span>
                    </div>
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
        fetchOtherIncome={fetchOtherIncome}
      />

      <EditIncome
        isOpen={isEditNoteOpen}
        onClose={closeEditNoteModal}
        noteData={selectedNote}
        fetchOtherIncome={fetchOtherIncome}
      />
      <DeleteIncome
        isOpen={isDeleteNoteOpen}
        contact={noteToDelete}
        onDelete={handleDeleteNote}
        onCancel={closeDeleteNoteModal}
        fetchOtherIncome={fetchOtherIncome}
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
