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

import ViewMaintenance from "./ViewMaintenance";
import "../../Dashboard/Maintenance/scrollbar.css";
import Password from "./Password";


const Income = ({ color }) => {
  const [activeButton, setActiveButton] = useState("maintenance");
  
  const [isViewMaintenanceOpen, setIsViewMaintenanceOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null); // To hold the selected maintenance data
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [closePasswordModalOpen, setclosePasswordModalOpen] = useState(false);
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
    setclosePasswordModalOpen(false); // Close the Password modal
  };

  const closeAddMaintenanceModal = () => {
    setIsAddMaintenanceOpen(false);
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
        <header className="flex justify-between items-center lg:px-5 bg-white lg:h-[60px] shadow-md">
          <div className="flex items-center space-x-2 text-gray-600 ml-4 md:ml-20">
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
          </div>

          <div className="flex items-center space-x-4">
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
                alt="Profile Avatar"
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

        <div className="flex justify-between items-center lg:ms-7 h-44 lg:mt-7 lg:w-[1560px] p-4 bg-white rounded-md">
          <div className="flex space-x-4">
            <div
              style={{
                width: "8px",
                height: "36px",
                textColor: color,
                marginTop: "16px",
              }}
              className="rounded-r-lg lg:mt-3"
            ></div>
            <div className=" rounded-tr-sm border-red-500 rounded-md p-4">
              <p className="text-gray-500 text-sm">Maintenance Amount</p>
              <p className="font-bold text-[#39973D] text-lg">₹ 0</p>
            </div>
            <div className="bg-[#FFFFFF] rounded-md p-4">
              <p className="text-gray-500 text-sm">Penalty Amount</p>
              <p className="font-bold text-lg text-red-500">₹ 0</p>
            </div>
          </div>
          <button
            onClick={openPasswordModal} 
            className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-md"
          >
            Set Maintenance
          </button>
        </div>

        <div className="lg:mt-[10px]">
          <div className="mt-4 px-4 sm:px-8">
            <button
              onClick={() => handleButtonClick("maintenance")}
              className={`w-full lg:h-[50px] sm:w-[150px] px-4 py-3 rounded-top ${
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
              className={`w-full lg:h-[50px] sm:w-[150px] px-4 py-3 rounded-top no-underline ${
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

        <div className="bg-gray-100 ps-4 pb-5">
          <div className="bg-white hadow-lg p-4 lg:w-[1560px] rounded border-gray-300">
            <div className="text-2xl font-bold text-gray-800 mb-4">
              Maintenance Details
            </div>
            <div className="overflow-x-auto h-[500px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <table className="w-full border-collapse text-sm text-left text-gray-600 rounded-top">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Unit Number</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Phone Number</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Penalty</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 flex items-center space-x-3">
                        <img
                          src={AvatarImage}
                          alt="avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{row.name}</span>
                      </td>
                      <td className="pt-3  hidden lg:table-cell text-gray-600">
                        {unitImages[row.unit]?.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Unit ${row.unit}`}
                            className="w-6 h-6 mr-2"
                          />
                        ))}
                        {row.unit}
                      </td>
                      <td className="px-4 py-3">{row.date}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold flex ${
                            row.role === "Tenant"
                              ? "bg-pink-100 text-pink-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {row.role === "Tenant" ? (
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                          ) : (
                            <img src={UserIcon} className="mr-2" />
                          )}
                          {row.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">{row.phone}</td>
                      <td className="px-4 py-3 text-green-600">{row.amount}</td>
                      <td className="px-4 py-3 text-red-600">{row.penalty}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs w-[40px] flex font-semibold ${
                            row.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                          style={{ width: "100px", height: "20px" }}
                        >
                          {row.status === "Pending" ? (
                            <img
                              src={TimerIcon}
                              className="mr-2 text-[#FFC313]"
                            />
                          ) : (
                            <img
                              src={VerifiedIcon}
                              className="mr-2 text-[#39973D]"
                            />
                          )}
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          style={{ width: "80px", height: "20px" }}
                          className={`px-2 py-1 rounded-full text-xs flex font-semibold ${
                            row.payment === "Online"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {row.payment === "Online" ? (
                            <img
                              src={WalletIcon}
                              className="mr-2 text-[#5678E9]"
                            />
                          ) : (
                            <img
                              src={MoneysIcon}
                              className="mr-2 text-[#202224]"
                            />
                          )}
                          {row.payment}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
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
      

        {/* Password Modal */}
        {isPasswordModalOpen && (
          <Password
            isOpen={isPasswordModalOpen}
            onClose={closePasswordModalOpen}
          />
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
