import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import NotificationIcon from "../../assets/notification-bing.png";
import AvatarImage from "../../assets/Avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "../../assets/User.png";
import TimerIcon from "../../assets/timer.png";
import VerifiedIcon from "../../assets/verified.png";
import WalletIcon from "../../assets/wallet.png";
import MoneysIcon from "../../assets/moneys.png";
import AIcon from "../../assets/A.png";
import BIcon from "../../assets/B.png";
import CIcon from "../../assets/C.png";
import DIcon from "../../assets/D.png";
import EIcon from "../../assets/E.png";
import FIcon from "../../assets/F.png";
import GIcon from "../../assets/G.png";
import HIcon from "../../assets/H.png";
import IIcon from "../../assets/I.png";
import HeaderBaner from "../../Dashboard/Header/HeaderBaner";
import ViewMaintenance from "./ViewMaintenance";
import "../../Dashboard/Maintenance/scrollbar.css";
import Password from "./Password";
import "../../Dashboard/Maintenance/scrollbar.css";

const Income = ({ color }) => {
  const [activeButton, setActiveButton] = useState("maintenance");

  const [isViewMaintenanceOpen, setIsViewMaintenanceOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null); // To hold the selected maintenance data
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const data = [
    {
      name: "Cody Fisher",
      unit: "1001",
      date: "10/02/2024",
      role: "Tenant",
      phone: "92524 34522",
      amount: "₹ 1000",
      penalty: "--",
      status: "Pending",
      payment: "Online",
    },
    {
      name: "Esther Howard",
      unit: "1002",
      date: "11/02/2024",
      role: "Owner",
      phone: "92524 12365",
      amount: "₹ 1000",
      penalty: "250",
      status: "Done",
      payment: "Cash",
    },
    {
      name: "Jenny Wilson",
      unit: "1003",
      date: "12/02/2024",
      role: "Tenant",
      phone: "92589 34522",
      amount: "₹ 1000",
      penalty: "--",
      status: "Pending",
      payment: "Online",
    },
    {
      name: "Robert Fox",
      unit: "1004",
      date: "13/02/2024",
      role: "Owner",
      phone: "92524 12369",
      amount: "₹ 1000",
      penalty: "--",
      status: "Done",
      payment: "Cash",
    },
    {
      name: "Jacob Jones",
      unit: "2001",
      date: "14/02/2024",
      role: "Tenant",
      phone: "92333 34522",
      amount: "₹ 1000",
      penalty: "250",
      status: "Pending",
      payment: "Online",
    },
    {
      name: "Albert Flores",
      unit: "2002",
      date: "15/02/2024",
      role: "Owner",
      phone: "92524 34522",
      amount: "₹ 1000",
      penalty: "--",
      status: "Done",
      payment: "Cash",
    },
    {
      name: "Annette Black",
      unit: "2003",
      date: "16/02/2024",
      role: "Tenant",
      phone: "92258 34522",
      amount: "₹ 1000",
      penalty: "250",
      status: "Pending",
      payment: "Online",
    },
    {
      name: "Jerome Bell",
      unit: "2004",
      date: "17/02/2024",
      role: "Owner",
      phone: "92589 34522",
      amount: "₹ 1000",
      penalty: "--",
      status: "Done",
      payment: "Cash",
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

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true); // Open the Password modal
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false); // Close the Password modal
  };

  const closeViewMaintenanceModal = () => {
    setIsViewMaintenanceOpen(false); // Close the ViewMaintenance modal
  };

  const openViewMaintenanceModal = (maintenance) => {
    setSelectedMaintenance(maintenance); // Set selected maintenance data
    setIsViewMaintenanceOpen(true); // Open the modal
  };

  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-[290px]">
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] 2xl:ml-[40px]  text-muted d-none d-sm-flex ">
            <Link
              to="/Income"
              className="text-[#A7A7A7] no-underline font-semibold"
            >
              Home
            </Link>
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base"> &gt; </span>
            <Link
              to="/memberlist"
              className=" text-[#A7A7A7]  text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Maintenance
            </Link>
            <span className="text-[#202224] fs-5 mx-2"> &gt; </span>

            <span className="font-semibold text-[#5678E9]">
              Financial Management
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
        {/* <div className="flex items-center space-x-2 text-gray-600 ml-4 md:ml-20">
            <Link
              to="/Income"
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

            <span className="font-semibold text-[#5678E9]">
              Financial Management
            </span>
          </div> */}

        <div className="flex flex-col sm:flex-row justify-between items-center 2xl:ml-5  lg:mt-7 2xl:w-[1590px] p-3 bg-white rounded-md">
         <div className="2xl:flex space-x-4">
           {/* First Card */}
           <div
             className="bg-[#FFFFFF] mb-10 p-3"
             style={{
               maxHeight: "70px",
               width: "300px",
               marginLeft: "15px",
               borderRadius: "15px",
               borderRight: "2px solid green",
               borderTop: "2px solid green",
               position: "relative",
             }}
           >
             <div
               style={{
                 width: "5px",
                 height: "46px",
                 backgroundColor: "rgba(57, 151, 61, 0.5)",
                 bottom: "50%",
                 left: "0px",
                 position: "absolute",
                 top: "70%",
               }}
               className="rounded-r-lg lg:mt-10 my-auto"
             ></div>
             <p className="text-gray-500 text-sm">Penalty Amount</p>
             <p className="font-bold text-lg text-[#39973D]">₹ 0</p>
           </div>

           

           {/* Second Card */}
           <div
             className="bg-[#FFFFFF] p-3"
             style={{
               maxHeight: "70px",
               width: "300px",
               borderRadius: "15px",
               borderRight: "2px solid red",
               borderTop: "2px solid red",
               position: "relative",
             }}
           >
             <div
               style={{
                 width: "5px",
                 height: "46px",
                 backgroundColor: "rgba(231, 76, 60, 0.5)",
                 bottom: "50%",
                 left: "0px",
                 position: "absolute",
                 top: "70%",
               }}
               className="rounded-r-lg lg:mt-10 my-auto"
             ></div>
             <p className="text-gray-500 text-sm">Penalty Amount</p>
             <p className="font-bold text-lg text-[#E74C3C]">₹ 0</p>
           </div>
         </div>
         
          <button
            onClick={openPasswordModal}
            className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-md mt-4 sm:mt-0"
          >
            Set Maintenance
          </button>
        </div>

        <div className="lg:mt-[10px]">
          <div className="mt-4 px-4 sm:px-8">
            <button
              onClick={() => handleButtonClick("maintenance")}
              className={`
                 lg:h-[50px]  2xl:px-5 px-14 py-3 rounded-top ${
                   activeButton === "maintenance"
                     ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                     : "bg-[#FFFFFF] text-[#202224]"
                 }`}
            >
              {" "}
              Maintenance{" "}
            </button>
            <Link
              to="/otherincome"
              className={` lg:h-[50px] 2xl:px-5 px-10 py-3 rounded-top no-underline ${
                activeButton === "otherIncome"
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#202224]"
              }`}
            >
              {" "}
              Other Income{" "}
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 2xl:ps-4 pb-5">
          <div className="bg-white  p-3 lg:w-[1590px] rounded border-gray-300">
            <div className="text-2xl font-bold text-gray-800 mb-4">
              Maintenance Details
            </div>
            <div className="overflow-x-auto h-[500px]  rounded-2xl ml-2  mr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="Content">
                <table className="2xl:w-[1530px]  text-sm text-left text-gray-600 rounded-top">
                  <thead style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}>
                    <tr className=" text-gray-600 uppercase text-xs font-semibold">
                      <th className="ps-5 whitespace-nowrap py-2">Name</th>
                      <th className="tex whitespace-nowrap">
                        Unit Number
                      </th>
                      <th className="ps-5 whitespace-nowrap ">
                        Date
                      </th>
                      <th className="2xl:ps-5 whitespace-nowrap ">
                        Role
                      </th>
                      <th className="text-center whitespace-nowrap ">
                        Phone Number
                      </th>
                      <th className="text-center whitespace-nowrap ">
                        Amount
                      </th>
                      <th className="text-center whitespace-nowrap ">
                        Penalty
                      </th>
                      <th className="text-center whitespace-nowrap ">
                        Status
                      </th>
                      <th className="text-center whitespace-nowrap ">
                        Payment
                      </th>
                      <th className="text-start whitespace-nowrap ">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-3 mr-3 py-3 whitespace-nowrap flex items-center space-x-3">
                          <img
                            src={AvatarImage}
                            alt="avatar"
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{row.name}</span>
                        </td>
                        <td className="   whitespace-nowrap lg:table-cell text-gray-600">
                          {unitImages[row.unit]?.map((img, idx) => (
                            <img
                              style={{ display: "inline" }}
                              key={idx}
                              src={img}
                              alt={`Unit ${row.unit}`}
                              className="w-6 h-6 mr-2"
                            />
                          ))}
                          {row.unit}
                        </td>
                        <td className="ps-4 pe-3">{row.date}</td>
                          {/* <div className="flex"> */}
                        <td className="  ">
                          <span
                            className={` ps-2 rounded-lg flex ${
                              row.role === "Tenant"
                                ? "bg-pink-100 text-pink-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                            >
                            {row.role === "Tenant" ? (
                              <FontAwesomeIcon icon={faUser} className="w-3 h-5 mr-2" />
                            ) : (
                              <img src={UserIcon} className="w-3 h-5 mr-2" />
                            )}
                            {row.role}
                          </span>
                        </td>
                        
                        <td className="px-4 py-3 text-center whitespace-nowrap">{row.phone}</td>
                        <td className="px-4 py-3 text-green-600 text-center whitespace-nowrap">
                          {row.amount}
                        </td>
                        <td className="px-4 py-3 text-center text-red-600">
                          {row.penalty}
                        </td>
                        <td className="ps-4 py-3">
                          <span
                            className={`px-2 text-center p-1 rounded-full text-xs w-[40px] flex font-semibold ${
                              row.status === "Pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-green-100 text-green-600"
                            }`}
                            style={{ width: "100px",  }}
                          >
                            {row.status === "Pending" ? (
                              <img
                                src={TimerIcon}
                                className="w-5 h-5 mr-2  text-[#FFC313]"
                              />
                            ) : (
                              <img
                                src={VerifiedIcon}
                                className="w-5 h-5 mr-2 text-[#39973D]"
                              />
                            )}
                            {row.status}
                          </span>
                        </td>
                        <td className="ps-4 py-3">
                          <span
                            style={{ width: "80px", }}
                            className={`px-2 py-1 rounded-full text-xs flex font-semibold ${
                              row.payment === "Online"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {row.payment === "Online" ? (
                              <img
                                src={WalletIcon}
                                className="w-5 h-5 mr-2 text-[#5678E9]"
                              />
                            ) : (
                              <img
                                src={MoneysIcon}
                                className="w-5 h-5 mr-2 text-[#202224]"
                              />
                            )}
                            {row.payment}
                          </span>
                        </td>
                        <td className="px-3 py-3 ">
                          <button
                            onClick={() => openViewMaintenanceModal(row)}
                            className="bg-blue-50 text-[#5678E9] rounded-2 sm:w-10 sm:h-10"
                          >
                            <i className="fa-solid fa-eye w-2 mr-2"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Password Modal */}
        {isPasswordModalOpen && (
          <Password isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
        )}

        {isViewMaintenanceOpen && (
          <ViewMaintenance
            isOpen={isViewMaintenanceOpen}
            onClose={closeViewMaintenanceModal}
            maintenance={selectedMaintenance}
          />
        )}
      </div>
    </div>
  );
};

export default Income;
