import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gallary from "../../assets/gallery.png";
import HeaderBaner from "../../Dashboard/Header/HeaderBaner";
import profile from "../../assets/Group 1000004173.png";
import "../../Sidebar/sidebar.css";
import ResidentSidebar from "../Resident Sidebar/ResidentSidebar";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../Common/axiosInstance";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import PayNow from "../Payment Portal/Maintenance Invoices/Paynow";


const PersonalOwner = ({ isOpen, onClose }) => {
  const [activeButton, setActiveButton] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State for toggling the search input
  const [residentById, setResidentById] = useState([]);
  const [address_proofSize, setAddress_proofSize] = useState("");
  const [adhar_proofSize, setAdhar_proofSize] = useState("");
  const [adhar_proofName, setAdhar_proofName] = useState("");
  const [address_proofName, setAddress_proofName] = useState("");
  const [announcement, setAnnouncement] = useState([]);
  const [pendingMaintenance, setPendingMaintenance] = useState([]);
  const [dueMaintenance, setDueMaintenance] = useState([]);
  const [totalMaintenance_Amount, setTotalMaintenance_Amount] = useState(0);
  const [totalPenalty_Amount, setTotalPenalty_Amount] = useState(0);
  const [isPayNowOpen, setIsPayNowOpen] = useState(false);
  // const [isOwner, setIsOwner] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  // Toggle search input visibility
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handlePaymentSuccess = () => {
    setIsPayNowOpen(false);
    console.log("Payment successful!");
    onClose();
  };

  const handlePayNow = () => {
    console.log("Pay");
    setIsPayNowOpen(true);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  // Fetch Announcement from the API
  const fetchAnnouncement = async () => {
    try {
      const response = await axiosInstance.get("/v2/annoucement/");
      if (response.status === 200) {
        setAnnouncement(response.data.announcements);
      }
    } catch (error) {
      console.error("Error fetching Announcement:", error);
    }
  };

  const processAddress_proof = async (url) => {
    try {
      const extractedFileName = url.substring(url.lastIndexOf("/") + 1);
      const response = await axios.head(url);
      const fileSizeBytes = response.headers["content-length"];
      const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
      setAddress_proofName(extractedFileName);
      setAddress_proofSize(fileSizeMB);
    } catch (error) {
      console.error("Error fetching file metadata:", error.message);
      setAddress_proofSize("Unknown");
      setAddress_proofName("Unknown");
    }
  };

  const processAdhar_proof = async (url) => {
    try {
      const extractedFileName = url.substring(url.lastIndexOf("/") + 1);
      const response = await axios.head(url);
      const fileSizeBytes = response.headers["content-length"];
      const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
      setAdhar_proofName(extractedFileName);
      setAdhar_proofSize(fileSizeMB);
    } catch (error) {
      console.error("Error fetching file metadata:", error.message);
      setAdhar_proofSize("Unknown");
      setAdhar_proofName("Unknown");
    }
  };

  const fetchGetByIdResident = async (UserToken) => {
    try {
      const response = await axiosInstance.get(
        `/v2/resident/owner/${UserToken.userId}`
      );
      if (response.status === 200) {
        setResidentById(response.data.Resident);
        processAdhar_proof(response.data.Resident.Adhar_front);
        processAddress_proof(response.data.Resident.Address_proof);
        if (response.data.Resident.Resident_Status == "Owner") {
          // setIsOwner(true);
          setActiveButton("PersonalDetail");
          navigate("/PersonalDetail");
        } else {
          // setIsOwner(false);
          navigate("/TenantDetail");
        }
      }
    } catch (error) {
      console.error("Error fetching GetByIdResident:", error);
    }
  };

  const fetchPendingMaintenance = async () => {
    const currentDate = new Date();
    try {
      const response = await axiosInstance.get(
        `/v2/maintenance/getuserandMaintance`
      );
      if (response.status === 200) {
        const allMaintenance = response.data.Maintenance;
        const futureData = allMaintenance.filter(
          (item) => new Date(item.DueDate) >= currentDate
        );
        const dueData = allMaintenance.filter(
          (item) => new Date(item.DueDate) <= currentDate
        );
        const totalMaintenance_Amount = futureData.reduce(
          (sum, item) => sum + (item.Maintenance_Amount || 0),
          0
        );
        const totalPenalty_Amount = futureData.reduce(
          (sum, item) => sum + (item.Penalty_Amount || 0),
          0
        );
        setTotalMaintenance_Amount(totalMaintenance_Amount);
        setTotalPenalty_Amount(totalPenalty_Amount);
        setPendingMaintenance(futureData);
        setDueMaintenance(dueData);
      }
    } catch (error) {
      console.error("Error fetching PendingMaintenance:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Society-Management");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // setUserTokenId(decodedToken);
        fetchGetByIdResident(decodedToken);
        fetchAnnouncement();
        fetchPendingMaintenance();
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <div className="d-flex w-100 h-100 bg-light">
      <ResidentSidebar />
      <div className="flex-grow-1 d-flex flex-column lg:ml-[290px]">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-10">
            <Link
              to="/residentDashboard"
              className="text-muted text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-muted mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Personal Detail
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

        <main className="flex-grow-1 rounded border bg-light">
          <div className="2xl:mt-[10px] 2xl:ml-[30px]">
            <div className="mt-5 2xl:px-3 ">
              {/* {isOwner ? <Link
                to="/PersonalDetail"
                className={`w-full lg:h-[50px] sm:w-[100px] no-underline px-[70px] py-3 rounded-t-md transition-all ${
                  activeButton === "PersonalDetail"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                }`}
              >
                Owner
              </Link>
                 :
              <Link
                to="/TenantDetail"
                className={`w-full lg:h-[50px] sm:w-[200px] px-[70px] py-3 rounded-t-md no-underline transition-all ${
                  activeButton === "TenantDetail"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                }`}
              >
                Tenant
              </Link>} */}

              <Link
                to="/PersonalDetail"
                className={`w-full lg:h-[50px] sm:w-[100px] no-underline px-[70px] py-3 rounded-t-md transition-all ${
                  activeButton === "PersonalDetail"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                }`}
              >
                Owner
              </Link>
            </div>
          </div>
          <div className="d-flex 2xl:w-[1550px] sm:w-[200px] 2xl:ml-[40px] mt-3 bg-white rounded">
            <div className="p-4">
              <div className="sm:flex sm:flex-col 2xl:flex-row">
                {/* Profile Image */}
                <div className="rounded-full flex sm:mb-4 sm:order-1">
                  <img
                    src={
                      !!residentById.profileImage
                        ? residentById.profileImage
                        : profile
                    }
                    alt="Profile Image"
                    className="2xl:w-[160px] border-5 w-[80px] h-[70px] 2xl:h-[150px] rounded-full object-cover"
                  />
                  <div className="flex flex-col 2xl:ml-[50px] ml-10 sm:items-start sm:mt-2">
                    {/* Full Name */}
                    <div className="flex flex-col mb-3">
                      <span className="text-xl text-[#202224] whitespace-nowrap">
                        Full Name
                      </span>
                      <span className="text-[#A7A7A7]">
                        {!!residentById.Full_name
                          ? residentById.Full_name
                          : " "}
                      </span>
                    </div>

                    {/* Wing */}
                    <div className="flex flex-col mt-2 ">
                      <span className="text-xl text-[#202224]">Wing</span>
                      <span className="text-[#A7A7A7]">
                        {!!residentById.Wing ? residentById.Wing : " "}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="2xl:ml-[100px] sm:order-2">
                  <div className="2xl:flex mt-2">
                    {/* Phone Number */}
                    <div className="flex flex-row items-start space-x-10">
                      <div className="flex flex-col">
                        <span className="text-xl text-[#202224]">
                          Phone Number
                        </span>
                        <span className="text-[#A7A7A7]">
                          {!!residentById.Phone_number
                            ? residentById.Phone_number
                            : " "}
                        </span>
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col 2xl:ml-[90px] sm:mt-0">
                      <span className="text-xl text-[#202224]">
                        Email Address
                      </span>
                      <span className="text-[#A7A7A7]">
                        {!!residentById.Email_address
                          ? residentById.Email_address
                          : " "}
                      </span>
                    </div>

                    {/* Gender */}
                    {/* <div>
                      
                    </div> */}
                    
                    <div className="flex flex-col 2xl:ml-[40px] sm:mt-0">
                      <span className="text-xl text-[#202224]">Gender</span>
                      <span className="text-[#A7A7A7]">
                        {!!residentById.Gender ? residentById.Gender : " "}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 sm:grid md:grid-cols-2 lg:grid-cols-4">
                    {/* Age */}
                    <div className="flex flex-col mb-4">
                      <span className="text-xl text-[#202224]">Age</span>
                      <span className="text-[#A7A7A7]">
                        {!!residentById.Age ? residentById.Age : " "}
                      </span>
                    </div>

                    {/* Unit */}
                    <div className="flex flex-col 2xl:ml-[50px] mb-4">
                      <span className="text-xl text-[#202224]">Unit</span>
                      <span className="text-[#A7A7A7]">
                        {!!residentById.Unit ? residentById.Unit : " "}
                      </span>
                    </div>

                    {/* Relation */}
                    <div className="flex flex-col 2xl:ml-[100px] mb-4">
                      <span className="text-xl text-[#202224]">Relation</span>
                      <span className="text-[#A7A7A7]">
                        {!!residentById.Relation ? residentById.Relation : " "}
                      </span>
                    </div>
                  </div>
                </div>

                {/* File Section */}
                <div className="flex p-2 w-[400px] sm:flex-col sm:order-3">
                  <div className="">
                    {/* First File */}
                    <div className="bg-white rounded-lg shadow-md p-1">
                      <a
                        href={
                          !!residentById.Address_proof
                            ? residentById.Address_proof
                            : " "
                        }
                        target="_blank"
                        className="flex items-center w-full no-underline"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <img
                            src={
                              !!residentById.Address_proof
                                ? residentById.Address_proof
                                : " "
                            }
                            className="h-6 w-6 text-gray-500"
                          />
                        </div>
                        <div className="ml-4">
                          <span className="text-[#202224]">
                            {address_proofName}
                          </span>
                          <p className="text-gray-600">{address_proofSize}</p>
                        </div>
                      </a>
                    </div>

                    {/* Second File */}
                    <div className="bg-white rounded-lg mt-2 shadow-md p-1">
                      <a
                        href={
                          !!residentById.Adhar_front
                            ? residentById.Adhar_front
                            : " "
                        }
                        target="_blank"
                        className="flex items-center w-full no-underline"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <img
                            src={
                              !!residentById.Adhar_front
                                ? residentById.Adhar_front
                                : " "
                            }
                            className="h-6 w-6 text-gray-500"
                          />
                        </div>
                        <div className="ml-4">
                          <span className="text-[#202224]">
                            {adhar_proofName}
                          </span>
                          <p className="text-gray-600">{adhar_proofSize}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section (Wing, Age, Unit, Relation) */}

          {/* File Section */}

          <div className=" 2xl:w-[1550px] 2xl:ml-[40px] mt-3 bg-white p-4 rounded">
            <span className="">
              Member :{" "}
              {!!residentById.Member_Counting
                ? "(" + residentById.Member_Counting_Total + ")"
                : "00"}
            </span>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              {residentById.Member_Counting?.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm ">
                    <div
                      className="card-header text-white "
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <span className="">
                        {!!card.Full_name ? card.Full_name : ""}
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Email</span>
                        <span className="">
                          {!!card.Email_address ? card.Email_address : ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Number</span>
                        <span className="">
                          {!!card.Phone_number ? card.Phone_number : ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Age</span>
                        <span className="">{!!card.Age ? card.Age : ""}</span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Gender</span>
                        <span className="">
                          {!!card.Gender ? card.Gender : ""}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Relation</span>
                        <span className="">
                          {!!card.Relation ? card.Relation : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" 2xl:w-[1550px] 2xl:ml-[40px] mt-3 bg-white p-4 rounded">
            <span className="">
              Vehicle :{" "}
              {!!residentById.Vehicle_Counting
                ? "(" + residentById.Vehicle_Counting_Total + ")"
                : "00"}
            </span>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              {residentById.Vehicle_Counting?.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm">
                    <div
                      className="card-header text-white d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <span className="">
                        {!!card.vehicle_type ? card.vehicle_type : ""}
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Vehicle Name
                        </span>
                        <span className="">
                          {!!card.vehicle_name ? card.vehicle_name : ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Vehicle Number
                        </span>
                        <span className="">
                          {!!card.vehicle_number ? card.vehicle_number : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="2xl:flex justify-between items-center lg:ms-7 h-22 2xl:ml-[40px]  2xl:mt-3 lg:w-[1550px] p-3 bg-white rounded-md">
            <p className="text-[#202224] ml-2 fs-6 mt-4 font-bold">
              show Maintenance Details
            </p>
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
                    top: "50%",
                  }}
                  className="rounded-r-lg lg:mt-10 my-auto"
                ></div>
                <p className="text-gray-500 text-sm">Maintenance Amount</p>
                <p className="font-bold text-lg text-red-500">
                  ₹ {totalMaintenance_Amount}
                </p>
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
                    top: "50%",
                  }}
                  className="rounded-r-lg lg:mt-10 my-auto"
                ></div>
                <p className="text-gray-500 text-sm">Penalty Amount</p>
                <p className="font-bold text-lg text-red-500">
                  ₹ {totalPenalty_Amount}
                </p>
              </div>
            </div>
          </div>

          <div className=" 2xl:w-[1550px] 2xl:ml-[40px] mt-3 bg-white p-4 rounded">
            <span className="text-[rgba(32, 34, 36, 1)] fs-6 font-bold">
              Pending Maintanance
            </span>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              {pendingMaintenance?.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm ">
                    <div
                      className="card-header text-white p-3 "
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <div class="flex justify-between items-center">
                        <span class="">{"Maintenance"}</span>
                        <span class="bg-[#FFFFFF1A] p-1 ps-3 pe-3 rounded-2xl">
                          {"Pending"}
                        </span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Bill Date</span>
                        <span className="">
                          {!!card.createdAt
                            ? moment(card.createdAt).format("DD/MM/YYYY")
                            : ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Pending Date
                        </span>
                        <span className="">
                          {!!card.DueDate
                            ? moment(card.DueDate).format("DD/MM/YYYY")
                            : ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Maintanance Amount
                        </span>
                        <span className="text-[#E74C3C]">
                          {!!card.Maintenance_Amount
                            ? card.Maintenance_Amount
                            : ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Maintenance Penalty Amount
                        </span>
                        <span className="text-[#E74C3C]">
                          {!!card.Penalty_Amount ? card.Penalty_Amount : ""}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Grand Total</span>
                        <span className="text-[#39973D]">
                          <span>
                            {!!card.Maintenance_Amount
                              ? `₹${
                                  card.Maintenance_Amount + card.Penalty_Amount
                                }`
                              : ""}
                          </span>
                        </span>
                      </div>
                      <div>
                        <button
                          className="w-full rounded-lg h-12 fs-[18px] font-bold text-[#FFFFFF]"
                          style={{
                            background:
                              "linear-gradient(90deg, #FE512E 0%, #F09619 100%)",
                          }}
                          onClick={handlePayNow}
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" 2xl:w-[1550px] 2xl:ml-[40px] mt-3 bg-white p-4 rounded">
            <span className="text-[rgba(32, 34, 36, 1)] fs-6 font-bold">
              Due Maintanance
            </span>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              {dueMaintenance?.map((card) => (
                <div key={card._id} className="col mb-3 ">
                  <div className="card shadow-sm ">
                    <div
                      className="card-header text-white p-3"
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <div class="flex justify-between items-center">
                        <span class="">{"Maintenance"}</span>
                        <span class="bg-[#FFFFFF1A] p-1 ps-3 pe-3 rounded-2xl">
                          {"Pending"}
                        </span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Date</span>
                        <span className="">
                          {!!card.DueDate
                            ? moment(card.DueDate).format("DD/MM/YYYY")
                            : ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Amount</span>
                        <span className="text-[#E74C3C]">
                          {!!card.Maintenance_Amount
                            ? card.Maintenance_Amount
                            : ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Due Maintenance Amount
                        </span>
                        <span className="text-[#E74C3C]">
                          {!!card.PenaltyDay
                            ? card.PenaltyDay * card.Penalty_Amount
                            : "00"}
                        </span>
                      </div>

                      <div>
                        <button
                          className="w-full rounded-lg h-12 font-bold text-[#FFFFFF] "
                          style={{
                            background:
                              "linear-gradient(90deg, #FE512E 0%, #F09619 100%)",
                          }}
                          onClick={handlePayNow}
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" 2xl:w-[1550px] 2xl:ml-[40px] mt-3 bg-white p-4 rounded">
            <span className="text-[rgba(32, 34, 36, 1)] fs-6 font-bold">
              Announcement Details
            </span>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              {announcement?.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm ">
                    <div
                      className="card-header text-white p-3"
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <div class="flex justify-between items-center">
                        <span class="">
                          {!!card.Announcement_Title
                            ? card.Announcement_Title
                            : ""}
                        </span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Announcement Date
                        </span>
                        <span className="">
                          {!!card.Announcement_Date
                            ? moment(card.Announcement_Date).format(
                                "DD/MM/YYYY"
                              )
                            : ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Announcement Time
                        </span>
                        <span className="">
                          {!!card.Announcement_Time
                            ? card.Announcement_Time
                            : ""}
                        </span>
                      </div>

                      <div className="h-[100px]">
                        <h3 className="text-sm text-[#4F4F4F] mb-2">
                          Description:
                        </h3>
                        <div className="max-h-[80px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                          <span className="text-md text-[#202224] break-words leading-6">
                            {!!card.Description
                              ? card.Description
                              : "No description available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      {isPayNowOpen && (
        <PayNow
          onClose={() => setIsPayNowOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default PersonalOwner;
