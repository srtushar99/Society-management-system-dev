import React, { useState, useEffect } from "react";
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
import axiosInstance from "../Common/axiosInstance";

const Resident = () => {
  const [isCreateProtocolOpen, setIsCreateProtocolOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [memberCount, setMemberCount] = useState(1); // Default member count
  const [vehicleCount, setVehicleCount] = useState(1); // Default vehicle count
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [residents, setResidents] = useState([]);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const openCreateProtocolModal = () => setIsCreateProtocolOpen(true);
  const closeCreateProtocolModal = () => setIsCreateProtocolOpen(false);

  const openEditModal = (item) => {
    setSelectedResident(item);
    setMemberCount(item.Member);
    setVehicleCount(item.Vehicle);

    if (item.Resident_status === "Owner") {
      navigate("/editowner", {
        state: {
          existingData: item,
          memberCount: item.Member_Counting_Total,
          vehicleCount: item.Vehicle_Counting_Total,
        },
      });
    } else if (item.Resident_status === "Tenant") {
      navigate("/edittenant", {
        state: {
          existingData: item,
          memberCount: item.Member_Counting_Total,
          vehicleCount: item.Vehicle_Counting_Total,
        },
      });
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

  const fetchResident = async () => {
    try {
      const response = await axiosInstance.get("/v2/resident/allresident");
      if (response.status === 200) {
        setResidents(response.data.Residents);
      }
    } catch (error) {
      console.error("Error fetching fetchResident:", error);
    }
  };

  useEffect(() => {
    fetchResident();
  }, []);

  return (
    <div className="flex bg-gray-100 w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
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
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Resident Management
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

        <div className="bg-[#FFFFFF] rounded-lg lg:ml-[320px] shadow-md lg:w-[1560px] mt-5">
          <div className="flex justify-between items-center mb-6 p-2 pt-4 ps-3">
            <span className="2xl:text-3xl font-semibold text-gray-800">
              Resident Tenant{" "}
              <span className="hidden sm:inline">and Owner Details</span>
              <span className="inline sm:hidden">
                <br />
                and Owner Details
              </span>
            </span>
            <button
              onClick={openCreateProtocolModal}
              className="bg-orange-500 hover:bg-orange-600  text-[#FFFFFF] 2xl:px-4 whitespace-nowrap px-1 py-2 rounded-lg flex items-center"
            >
              <img src={plus} alt="Add" className="mr-2 h-4 w-4" />
              Add New Resident Details
            </button>
          </div>
          <div className="overflow-x-auto h-[700px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="Content">
              <table className="bg-white border border-gray-200 rounded-lg shadow-md lg:w-[1550px]">
                <thead
                  className="w-full"
                  style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
                >
                  <tr className="text-left text-sm font-semibold">
                    <th className="p-3  whitespace-nowrap ps-4   text-[#202224]">
                      Full Name
                    </th>
                    <th className="p-3 text-center whitespace-nowrap text-[#202224]">
                      Unit Number
                    </th>
                    <th className="p-3 text-center whitespace-nowrap ps-5 text-[#202224]">
                      Unit Status
                    </th>
                    <th className="p-3 text-center whitespace-nowrap ps-3 text-[#202224]">
                      Resident Status
                    </th>
                    <th className="p-3 text-center whitespace-nowrap  ps-2  sm:table-cell">
                      Phone Number
                    </th>
                    <th className="p-3 text-center ps-5  sm:table-cell">
                      Member
                    </th>
                    <th className="p-3 text-center ps-2  lg:table-cell">
                      Vehicle
                    </th>
                    <th className="p-3 text-center ps-5  lg:table-cell">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {residents.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3 flex items-center space-x-3">
                        <img
                          src={
                            !!item.profileImage
                              ? item.profileImage
                              : AvatarImage
                          }
                          alt={!!item.Full_name ? item.Full_name : ""}
                          className="w-8 h-8 rounded-full flex"
                        />
                        <span>{!!item.Full_name ? item.Full_name : ""}</span>
                      </td>
                      {/* <td className="p-3 pt-2 ps-3 hidden sm:table-cell text-gray-600">
                      <img
                        src={unitImages[item.UnitNumber]}
                        alt={item.UnitNumber}
                        width="25"
                        height="25"
                        className="rounded-full"
                      />
                      {item.UnitNumber}
                    </td> */}
                      <td className="p-3 pt-2 ps-3 sm:table-cell text-gray-600">
                        <span
                          className={`unit-badge unit-${item.Wing.toLowerCase()}`}
                        >
                          {!!item.Wing ? item.Wing : ""}
                        </span>
                        {!!item.Unit ? item.Unit : ""}
                      </td>

                      <td className="p-3 pt-2 ps-5  sm:table-cell text-gray-600">
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
                          {!!item.UnitStatus ? item.UnitStatus : ""}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 w-[40px] pe-5">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold flex ${
                            item.Resident_status === "--"
                              ? "bg-[#F6F8FB] text-[#202224]"
                              : item.Resident_status === "Tenant"
                              ? "bg-pink-100 text-pink-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {item.Resident_status !== "--" && (
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                          )}
                          {!!item.Resident_status ? item.Resident_status : ""}
                        </span>
                      </td>
                      <td className="p-3 pt-2 lg:table-cell text-gray-600">
                        {!!item.Phone_number ? item.Phone_number : ""}
                      </td>
                      <td className="p-3 pt-2 ps-2  md:table-cell">
                        <span className="bg-[#F6F8FB] p-2 text-[#4F4F4F] rounded-2xl w-[30px] h-[60px] ml-10">
                          {!!item.Member_Counting_Total
                            ? item.Member_Counting_Total
                            : 0}
                        </span>
                      </td>
                      <td className="p-3 pt-2 ps-2  md:table-cell">
                        <span className="bg-[#F6F8FB] p-2 text-[#4F4F4F] rounded-2xl w-[30px] h-[60px] ml-5">
                          {!!item.Vehicle_Counting_Total
                            ? item.Vehicle_Counting_Total
                            : 0}
                        </span>
                      </td>
                      <td className="p-3 pt-2">
                        <div className="flex justify-center flex-wrap sm:flex-nowrap space-x-2  sm:space-y-0">
                          {/* Only show Edit and View buttons for Tenant or Owner */}
                          {item.Resident_status !== "--" && (
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
          selectedResident.Resident_status === "Owner" && (
            <ViewOwner
              isOpen={isViewModalOpen}
              onClose={closeViewModal}
              owner={selectedResident}
            />
          )}

        {isViewModalOpen &&
          selectedResident &&
          selectedResident.Resident_status === "Tenant" && (
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
