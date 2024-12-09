import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "../../assets/User.png";
import TimerIcon from "../../assets/timer.png";
import VerifiedIcon from "../../assets/verified.png";
import WalletIcon from "../../assets/wallet.png";
import MoneysIcon from "../../assets/moneys.png";
import HeaderBaner from "../../Dashboard/Header/HeaderBaner";
import ViewMaintenance from "./ViewMaintenance";
import "../../Dashboard/Maintenance/scrollbar.css";
import Password from "./Password";
import "../../Dashboard/Maintenance/scrollbar.css";
import axiosInstance from '../../Common/axiosInstance';

const Income = ({ color }) => {
  const [activeButton, setActiveButton] = useState("maintenance");
  const [isViewMaintenanceOpen, setIsViewMaintenanceOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null); // To hold the selected maintenance data
  const [selectedMaintenance_Amount, setSelectedMaintenance_Amount] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [Maintenance, setMaintenance] = useState([]);
  const [totalMaintenanceAmount, setTotalMaintenanceAmount] = useState(0);
  const [totalPenaltyAmount, setTotalPenaltyAmount] = useState(0);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
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

  const openViewMaintenanceModal = (resident, maintenance) => {
    setSelectedMaintenance(resident); // Set selected maintenance data
    setSelectedMaintenance_Amount(maintenance);
    setIsViewMaintenanceOpen(true); // Open the modal
  };



  const fetchMaintenance = async () => {
    try {
        const response = await axiosInstance.get('/v2/maintenance/');
        if(response.status === 200){
          setMaintenance(response.data.Maintenance); 
        }
       
     } catch (error) {
        console.error('Error fetching Maintenance:', error);
    }
  };

  useEffect(() => {
    fetchMaintenance();
  }, []);

  useEffect(() => {
    if (Maintenance.length > 0) {
      let totalMaintenance = 0;
      let totalPenalty = 0;
      Maintenance.map(maintenance => {
        const residentCount = maintenance.ResidentList.length;
        totalMaintenance += maintenance.Maintenance_Amount * residentCount;
        totalPenalty += maintenance.Penalty_Amount * residentCount;
      });
  
      setTotalMaintenanceAmount(totalMaintenance);
      setTotalPenaltyAmount(totalPenalty);
    }
  }, [Maintenance]);


  return (
    <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-[290px]">
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] 2xl:ml-[30px] text-muted d-none d-sm-flex">
            <Link
              to="/Income"
              className="text-[#A7A7A7] text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
          
            <span className="text-[#202224] fs-5 mx-2"> &gt; </span>
  
            <span className="text-[#5678E9] font-weight-semibold text-sm sm:text-base">
            Financial Maintenance
            </span>
          </div>
  
          {/* Search Icon (Visible only on small screens) */}
          <div
            className={`ml-auto d-sm-none p-2 rounded-lg ${
              isSearchVisible ? "border-none" : "border border-[#D3D3D3]"
            }`}
          >
            {!isSearchVisible && (
              <button
                onClick={toggleSearchVisibility}
                className="text-muted bg-transparent border-0"
              >
                <i className="fas fa-search"></i>
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
  
        <div className="flex flex-col sm:flex-row  justify-between items-center 2xl:ml-5 lg:mt-7 2xl:w-[1590px] p-3 bg-white rounded-md">
          <div className="2xl:flex ">
            {/* First Card */}
            <div
              className="bg-[#FFFFFF] mb-10 p-3 2xl:mr-5"
              style={{
                maxHeight: "70px",
                width: "250px",
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
              <p className="text-gray-500 text-sm">Maintenance Amount</p>
              <p className="font-bold text-lg text-[#39973D]">₹ {totalMaintenanceAmount}</p>
            </div>
  
            {/* Second Card */}
            <div
              className="bg-[#FFFFFF] p-3"
              style={{
                maxHeight: "70px",
                width: "250px",
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
              <p className="font-bold text-lg text-[#E74C3C]">₹ {totalPenaltyAmount}</p>
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
          <div className="mt-4 2xl:ps-0 ps-3 sm:px-8">
            <button
              onClick={() => handleButtonClick("maintenance")}
              className={`lg:h-[50px] 2xl:px-5 px-4 py-3 rounded-top ${
                activeButton === "maintenance"
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#202224]"
              }`}
            >
              Maintenance
            </button>
            <Link
              to="/otherincome"
              className={`lg:h-[50px] 2xl:px-5 px-4 py-3 rounded-top no-underline ${
                activeButton === "otherIncome"
                  ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#202224]"
              }`}
            >
              Other Income
            </Link>
          </div>
        </div>
  
        <div className="bg-gray-100 2xl:ps-4 pb-5">
          <div className="bg-white p-3 lg:w-[1590px] rounded border-gray-300">
            <div className="text-2xl font-bold text-gray-800 mb-4">
              Maintenance Details
            </div>
            <div className="overflow-x-auto h-[500px] rounded-2xl ml-2 mr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="Content">
                <table className="2xl:w-[1530px] text-sm text-left text-gray-600 rounded-top">
                  <thead
                    className=""
                    style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
                  >
                    <tr className="text-[#202422] text-xs font-semibold">
                      <th className="ps-4 whitespace-nowrap py-2">Name</th>
                      <th className="tex whitespace-nowrap">Unit Number</th>
                      <th className="ps-5 p-3 whitespace-nowrap">Date</th>
                      <th className="2xl:ps-5 whitespace-nowrap">Role</th>
                      <th className="text-center whitespace-nowrap">
                        Phone Number
                      </th>
                      <th className="text-center whitespace-nowrap">Amount</th>
                      <th className="text-center whitespace-nowrap">Penalty</th>
                      <th className="px-5 whitespace-nowrap">Status</th>
                      <th className=" px-4 whitespace-nowrap">Payment</th>
                      <th className="text-center whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Maintenance?.map((maintenance, index) =>
                      maintenance.ResidentList?.map((resident, idx) => (
                        <tr
                          key={`${index}-${idx}`}
                          className="border-t border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-3 mr-3 py-3 whitespace-nowrap flex items-center space-x-3">
                            <img
                              src={resident.resident.profileImage}
                              alt="avatar"
                              className="w-8 h-8 rounded-full"
                            />
                            <span>{resident.resident.Full_name}</span>
                          </td>
                          <td className="whitespace-nowrap lg:table-cell text-gray-600">
                            <span className={`unit-badge unit-${resident.resident.Wing.toLowerCase()}`}>
                              {!!resident.resident.Wing ? resident.resident.Wing : ""}
                            </span>
                            {resident.resident.Unit}
                          </td>
                          <td className="ps-4 pe-3">
                            {new Date(maintenance.DueDate).toLocaleDateString()}
                          </td>
                          <td className="">
                            <span
                              className={`ps-2 w-[80px] rounded-lg flex ${
                                resident.residentType === "Tenant"
                                  ? "bg-pink-100 text-pink-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {resident.residentType === "Tenant" ? (
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="w-3 h-5 mr-2"
                                />
                              ) : (
                                <img src={UserIcon} className="w-3 h-5 mr-2" />
                              )}
                              {resident.residentType}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center whitespace-nowrap">
                            {resident.resident.Phone_number}
                          </td>
                          <td className="px-4 py-3 text-green-600 text-center whitespace-nowrap">
                            ₹ {maintenance.Maintenance_Amount}
                          </td>
                          <td className="px-4 py-3 text-center text-red-600">
                            ₹ {maintenance.Penalty_Amount}
                          </td>
                          <td className="ps-3 py-3 text-center">
                            <span
                              className={`px-2 text-center p-1 rounded-full text-xs w-[40px] flex font-semibold ${
                                resident.paymentStatus === "Pending"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                              style={{ width: "100px" }}
                            >
                              {resident.paymentStatus === "Pending" ? (
                                <img
                                  src={TimerIcon}
                                  className="w-5 h-5 mr-2 text-[#FFC313]"
                                />
                              ) : (
                                <img
                                  src={VerifiedIcon}
                                  className="w-5 h-5 mr-2 text-[#39973D]"
                                />
                              )}
                              {resident.paymentStatus}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-center">
                            <span
                              style={{ width: "80px" }}
                              className={`px-2 py-1 rounded-full text-xs flex font-semibold ${
                                resident.paymentMode === "Online"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {resident.paymentMode === "Online" ? (
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
                              {resident.paymentMode}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-center">
                            <button
                              onClick={() => openViewMaintenanceModal(resident, maintenance)}
                              className="bg-blue-50 text-[#5678E9] rounded-2 sm:w-10 sm:h-10"
                            >
                              <i className="fa-solid fa-eye w-2 mr-2"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
  
        {/* Password Modal */}
        {isPasswordModalOpen && (
          <Password isOpen={openPasswordModal} onClose={closePasswordModal} fetchMaintenance={fetchMaintenance}/>
        )}
  
        {isViewMaintenanceOpen && (
          <ViewMaintenance
            isOpen={isViewMaintenanceOpen}
            onClose={closeViewMaintenanceModal}
            maintenance={selectedMaintenance}
            Maintenance_Amount={selectedMaintenance_Amount}
          />
        )}
      </div>
    </div>
  );
};

export default Income;
