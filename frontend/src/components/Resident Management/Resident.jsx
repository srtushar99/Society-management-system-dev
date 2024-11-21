import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import plus from "../assets/add-square.png";
import HeaderBaner from "../Dashboard/Header/HeaderBaner";
import AvatarImage from "../assets/Avatar.png";
import Avatar from "../assets/Avatar1.png";
import AIcon from "../assets/A.png";
import BIcon from "../assets/B.png";
import CIcon from "../assets/C.png";
import DIcon from "../assets/D.png";
import EIcon from "../assets/E.png";
import FIcon from "../assets/F.png";
import GIcon from "../assets/G.png";
import HIcon from "../assets/H.png";
import IIcon from "../assets/I.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import UserIcon from "../assets/User.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AddResident from "./AddResident";
import EditOwner from "./EditOwner";
import EditTenant from "./EditTenant";
import ViewOwner from "./ViewOwner";
import ViewTenant from "./ViewTenant";

const initialData = [
  {
    id: 1,
    Photo: AvatarImage,
    Name: "Evelyn Harper",
    UnitNumber: "1001",
    UnitStatus: "Occupied",
    ResidentStatus: "Tenant",
    Number: "97587 85828",
    Member: "1",
    Vehicle: "2",
  },
  {
    id: 2,
    Photo: Avatar,
    Name: "-",
    UnitNumber: "1002",
    UnitStatus: "Vacate",
    ResidentStatus: "--",
    Number: "--",
    Member: "-",
    Vehicle: "-",
  },
  {
    id: 3,
    Photo: AvatarImage,
    Name: "Evelyn Harper",
    UnitNumber: "1003",
    UnitStatus: "Occupied",
    ResidentStatus: "Owner",
    Number: "97587 85828",
    Member: "1",
    Vehicle: "3",
  },
  {
    id: 4,
    Photo: AvatarImage,
    Name: "Evelyn Harper",
    UnitNumber: "1004",
    UnitStatus: "Occupied",
    ResidentStatus: "Tenant",
    Number: "97587 85828",
    Member: "4",
    Vehicle: "2",
  },
  {
    id: 5,
    Photo: Avatar,
    Name: "-",
    UnitNumber: "2001",
    UnitStatus: "Vacate",
    ResidentStatus: "--",
    Number: "--",
    Member: "1",
    Vehicle: "-",
  },
  {
    id: 6,
    Photo: AvatarImage,
    Name: "Robert Fox",
    UnitNumber: "2002",
    UnitStatus: "Occupied",
    ResidentStatus: "Tenant",
    Number: "97587 85828",
    Member: "3",
    Vehicle: "2",
  },
  {
    id: 7,
    Photo: AvatarImage,
    Name: "Evelyn Harper",
    UnitNumber: "2003",
    UnitStatus: "Occupied",
    ResidentStatus: "Owner",
    Number: "97587 85828",
    Member: "5",
    Vehicle: "3",
  },
  {
    id: 8,
    Photo: AvatarImage,
    Name: "Evelyn Harper",
    UnitNumber: "3004",
    UnitStatus: "Occupied",
    ResidentStatus: "Tenant",
    Number: "97587 85828",
    Member: "5",
    Vehicle: "3",
  },
  {
    id: 9,
    Photo: Avatar,
    Name: "-",
    UnitNumber: "3001",
    UnitStatus: "Vacate",
    ResidentStatus: "--",
    Number: "--",
    Member: "-",
    Vehicle: "-",
  },
  {
    id: 10,
    Photo: AvatarImage,
    Name: "Evelyn Harper",
    UnitNumber: "3002",
    UnitStatus: "Occupied",
    ResidentStatus: "Owner",
    Number: "97587 85828",
    Member: "3",
    Vehicle: "3",
  },
  {
    id: 11,
    Photo: AvatarImage,
    Name: "Evelyn Harper",
    UnitNumber: "3003",
    UnitStatus: "Occupied",
    ResidentStatus: "Tenant",
    Number: "97587 85828",
    Member: "3",
    Vehicle: "2",
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

const Resident = () => {
  const [data, setData] = useState(initialData);
  const [isCreateProtocolOpen, setIsCreateProtocolOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [memberCount, setMemberCount] = useState(1); // Default member count
  const [vehicleCount, setVehicleCount] = useState(1); // Default vehicle count

  const openCreateProtocolModal = () => setIsCreateProtocolOpen(true);
  const closeCreateProtocolModal = () => setIsCreateProtocolOpen(false);
  const openEditModal = (item) => {
    setSelectedResident(item); 
    setMemberCount(item.Member); 
    setVehicleCount(item.Vehicle); 
  
  
    if (item.ResidentStatus === "Owner") {
      navigate("/editowner", { state: { existingData: item, memberCount: item.Member, vehicleCount: item.Vehicle } });
    } else if (item.ResidentStatus === "Tenant") {
      navigate("/edittenant", { state: { existingData: item, memberCount: item.Member, vehicleCount: item.Vehicle } });
    }
  };


  const openViewModal = (item) => {
    setSelectedResident(item);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => setIsViewModalOpen(false);

  const navigate = useNavigate();

  const Badge = ({ children, className }) => (
    <span
      className={`px-2 py-2 pe-10 text-xs font-semibold ${className}`}
      style={{ borderRadius: "15px", minWidth: "80px", textAlign: "center" }}
    >
      {children}
    </span>
  );

  return (
    <div className="flex bg-gray-100 w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header
          className="flex justify-between lg:ml-[290px] items-center lg:px-5 bg-white h-[60px] shadow-md"
          style={{ padding: "35px 10px" }}
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <Link
              to="/Resident-Manegement"
              className="text-[#A7A7A7] no-underline font-semibold ms-4 md:ml-20"
            >
              Home
            </Link>
            <span className="text-gray-400"> &gt; </span>
            <span className="font-semibold text-[#5678E9]">
              Resident Management
            </span>
          </div>
          <HeaderBaner />
        </header>

        <div className="bg-[#FFFFFF] rounded-lg lg:ml-[320px] shadow-md lg:w-[1560px] mt-5">
          <div className="flex justify-between items-center mb-6 p-2 pt-4 ps-3">
            <h1 className="text-3xl font-semibold text-gray-800">
              Resident Tenant and Owner Details
            </h1>
            <button
              onClick={openCreateProtocolModal}
              className="bg-orange-500 hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
            >
              <img src={plus} alt="Add" className="mr-2 h-4 w-4" />
              Add New Resident Details
            </button>
          </div>
          <div className="overflow-x-auto h-[700px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="bg-white border border-gray-200 rounded-lg shadow-md lg:w-[1550px]">
              <thead
                className="w-full"
                style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
              >
                <tr className="text-left text-sm font-semibold">
                  <th className="p-3 ps-5 text-[#202224]">Full Name</th>
                  <th className="p-3 text-[#202224]">Unit Number</th>
                  <th className="p-3 ps-5 text-[#202224]">Unit Status</th>
                  <th className="p-3 ps-3 text-[#202224]">Resident Status</th>
                  <th className="p-3 ps-2 hidden sm:table-cell">
                    Phone Number
                  </th>
                  <th className="p-3 ps-5 hidden sm:table-cell">Member</th>
                  <th className="p-3 ps-2 hidden lg:table-cell">Vehicle</th>
                  <th className="p-3 ps-5 hidden lg:table-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <img
                        src={item.Name === "-" ? Avatar : AvatarImage}
                        alt="avatar"
                        className="w-8 h-8 rounded-full flex"
                      />
                      <span >{item.Name}</span>
                    </td>
                    <td className="p-3 pt-2 ps-3 hidden sm:table-cell text-gray-600">
                      <img
                        src={unitImages[item.UnitNumber]}
                        alt={item.UnitNumber}
                        width="25"
                        height="25"
                        className="rounded-full"
                      />
                      {item.UnitNumber}
                    </td>
                    <td className="p-3 pt-2 ps-5 hidden sm:table-cell text-gray-600">
                      <Badge
                        className={
                          item.UnitStatus === "Occupied"
                            ? "bg-[#ECFFFF] text-[#14B8A6]"
                            : item.UnitStatus === "Vacate"
                            ? "bg-[#FFF6FF] text-[#9333EA]"
                            : "bg-[#F6F8FB]"
                        }
                      >
                        <i className="fa-solid fa-building"></i>{" "}
                        {item.UnitStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 w-[40px] pe-5">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold flex ${
                          item.ResidentStatus === "--"
                            ? "bg-[#F6F8FB] text-[#202224]"
                            : item.ResidentStatus === "Tenant"
                            ? "bg-pink-100 text-pink-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {item.ResidentStatus !== "--" && (
                          <FontAwesomeIcon icon={faUser} className="mr-2" />
                        )}
                        {item.ResidentStatus}
                      </span>
                    </td>
                    <td className="p-3 pt-2 hidden lg:table-cell text-gray-600">
                      {item.Number}
                    </td>
                    <td className="p-3 pt-2 ps-2 hidden md:table-cell">
                      <span className="bg-[#F6F8FB] p-2 text-[#4F4F4F] rounded-2xl w-[30px] h-[60px] ml-10">
                        {item.Member}
                      </span>
                    </td>
                    <td className="p-3 pt-2 ps-2 hidden md:table-cell">
                      <span className="bg-[#F6F8FB] p-2 text-[#4F4F4F] rounded-2xl w-[30px] h-[60px] ml-5">
                        {item.Vehicle}
                      </span>
                    </td>
                    <td className="p-3 pt-2">
                      <div className="flex flex-wrap sm:flex-nowrap sm:space-x-2 space-y-2 sm:space-y-0">
                        {/* Only show Edit and View buttons for Tenant or Owner */}
                        {item.ResidentStatus !== "--" && (
                          <>
                            <button
                              className="bg-blue-50 text-[#39973D] rounded-2 p-2 sm:w-10 sm:h-10"
                              onClick={() => openEditModal(item)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              className="bg-blue-50 text-[#5678E9] rounded-2 p-2 sm:w-10 sm:h-10"
                              onClick={() => openViewModal(item)}
                            >
                              <i className="fa-solid fa-eye w-2 me-2"></i>
                            </button>
                          </>
                        )}
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
          <AddResident
            isOpen={isCreateProtocolOpen}
            onClose={closeCreateProtocolModal}
          />
        )}

        {isViewModalOpen &&
          selectedResident &&
          selectedResident.ResidentStatus === "Owner" && (
            <ViewOwner
              isOpen={isViewModalOpen}
              onClose={closeViewModal}
              owner={selectedResident}
            />
          )}

        {isViewModalOpen &&
          selectedResident &&
          selectedResident.ResidentStatus === "Tenant" && (
            <ViewTenant
              isOpen={isViewModalOpen}
              onClose={closeViewModal}
              tenant={selectedResident}
            />
          )}
      </div>
    </div>
  );
};

export default Resident;
