import React, { useState } from "react";
import { Link } from "react-router-dom";
import gallary from "../../assets/gallery.png";
import HeaderBaner from "../../Dashboard/Header/HeaderBaner";
import profile from "../../assets/Group 1000004173.png";
import "../../Sidebar/sidebar.css";
import ResidentSidebar from "../Resident Sidebar/ResidentSidebar";

const staticMembers = [
  {
    memberName: "Arlene McCoy",

    Number: "9876543210",
    email: "rachit@example.com",
    age: "28",
    gender: "male",
    relation: "Self",
  },
  {
    memberName: "Aditi",
    Number: "9876543211",
    email: "aditi@example.com",
    age: "25",
    gender: "female",
    relation: "Spouse",
  },
  {
    memberName: "Arjun",
    Number: "9876543212",
    email: "arjun@example.com",
    age: "5",
    gender: "male",
    relation: "Son",
  },
  {
    memberName: "Meera",
    Number: "9876543213",
    email: "meera@example.com",
    age: "3",
    gender: "female",
    relation: "Daughter",
  },
];

const Pending = [
  {
    Name: "Maintenance",
    status: "Pending",
    BillDate: "11/01/2024",
    pendingDate: "11/01/2024",
    amount: "1000.00",
    penlatyamount: "250.00",
    Total: "1,250",
  },
  {
    Name: "Maintenance",
    status: "Pending",
    BillDate: "11/01/2024",
    pendingDate: "11/01/2024",
    amount: "1000.00",
    penlatyamount: "250.00",
    Total: "1,250",
  },
  {
    Name: "Maintenance",
    status: "Pending",
    BillDate: "11/01/2024",
    pendingDate: "11/01/2024",
    amount: "1000.00",
    penlatyamount: "250.00",
    Total: "1,250",
  },
];

const Due = [
  {
    Name: "Maintenance",
    status: "Pending",
    Date: "11/01/2024",
    amount: "1000.00",
    Dueamount: "250.00",
  },
  {
    Name: "Maintenance",
    status: "Pending",
    Date: "11/01/2024",
    amount: "1000.00",
    Dueamount: "250.00",
  },
];

const staticVehicles = [
  {
    vehicleType: "4-wheeler",
    vehicleName: "Toyota Camry",
    vehicleNumber: "ABC1234",
  },
  {
    vehicleType: "2-wheeler",
    vehicleName: "Honda Activa",
    vehicleNumber: "XYZ5678",
  },
  {
    vehicleType: "4-wheeler",
    vehicleName: "Ford Mustang",
    vehicleNumber: "LMN9101",
  },
  {
    vehicleType: "4-wheeler",
    vehicleName: "Ford Mustang",
    vehicleNumber: "LMN9101",
  },
];

const Anouncement = [
  {
    Name: "Community Initiatives",
    Date: "01/02/2024",
    Time: "10:15 AM",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.",
  },
  {
    Name: "Community Initiatives",
    Date: "01/02/2024",
    Time: "10:15 AM",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.",
  },
  {
    Name: "Community Initiatives",
    Date: "01/02/2024",
    Time: "10:15 AM",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.",
  },
  {
    Name: "Community Initiatives",
    Date: "01/02/2024",
    Time: "10:15 AM",
    description:
      "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in.",
  },
];

const PersonalTenant = () => {
  const [activeButton, setActiveButton] = useState("TenantDetail");
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State for toggling the search input

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  // Toggle search input visibility
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="d-flex w-100 h-100 bg-light">
      <ResidentSidebar />
      <div className="flex-grow-1 d-flex flex-column lg:ml-[290px]">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-10">
            <Link
              to="/dashboard"
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

          {/* Notifications and Profile Section */}
          <HeaderBaner />
        </header>

        <main className="flex-grow-1 rounded border bg-light    ">
          <div className="2xl:mt-[10px] 2xl:ml-[30px] ">
            <div className="mt-5 2xl:px-3 ">
              <Link
                to="/PersonalDetail"
                className={`w-full lg:h-[50px] sm:w-[200px] no-underline px-[70px] py-3 rounded-t-md transition-all ${
                  activeButton === "PersonalDetail"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                }`}
              >
                Owner
              </Link>

              <Link
                to="/TenantDetail"
                className={`w-full lg:h-[50px] sm:w-[200px] px-[70px] py-3 rounded-t-md no-underline transition-all ${
                  activeButton === "TenantDetail"
                    ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-[#FFFFFF]"
                    : "bg-[#FFFFFF] text-[#202224]"
                }`}
              >
                Tenant
              </Link>
            </div>
          </div>

          <div className="2xl:w-[1550px] 2xl:ml-[40px] mt-3 bg-white rounded-lg flex justify-start  p-[20px] opacity-100  top-[181px] left-[310px] gap-[10px]">
            <div className="mr-10">
              <p className="text-[#202224] " style={{ fontSize: "18px" }}>
                Owner Name
              </p>
              <span className="text-[#A7A7A7]">Arlene McCoy</span>
            </div>
            <div className="mr-10">
              <p className="text-[#202224] " style={{ fontSize: "18px" }}>
                {" "}
                Owner Phone
              </p>
              <span className="text-[#A7A7A7]">+91 9575225165</span>
            </div>
            <div>
              <p className="text-[#202224] " style={{ fontSize: "18px" }}>
                Owner Address
              </p>
              <span className="text-[#A7A7A7]">
                C-101,Dhara Arcade, Mota Varacha Surat.
              </span>
            </div>
          </div>
          <div className="2xl:w-[1550px] sm:w-[200px] 2xl:ml-[40px] mt-1 bg-white rounded">
            <div className="p-4">
              <div className="sm:flex">
                {/* Profile Image */}
                <div className="rounded-full flex">
                  <img
                    src={profile}
                    alt="Profile Image"
                    className="2xl:w-[150px] w-[70px] h-[70px] 2xl:h-[150px] object-cover"
                  />
                  <div className="flex flex-col ml-20">
                    <span className="text-xl text-[#202224] 2xl:flex-nowrap">
                      Full Name
                    </span>
                    <span className="text-gray-700">Arlene McCoy</span>
                  </div>
                </div>

                {/* Contact Information Section */}

                <div className="2xl:flex  2xl:ml-12">
                  <div className="flex flex-col">
                    <span className="text-xl text-[#202224]">Phone Number</span>
                    <span className="text-gray-700">+91 99130 44537</span>
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-xl text-[#202224]">
                      Email Address
                    </span>
                    <span className="text-gray-700">
                      ArleneMcCoy25@gmail.com
                    </span>
                  </div>
                  <div className="2xl:flex">
                    <div className="flex flex-col mt-2 2xl:ml-12">
                      <span className="text-xl text-[#202224]">Gender</span>
                      <span className="text-gray-700">Male</span>
                    </div>
                  {/* <div className="flex mt-4 2xl:ml-12"> */}
                    <div className="flex flex-col">
                      <span className="text-xl text-[#202224]">Age</span>
                      <span className="text-gray-700">20</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xl text-[#202224]">Relation</span>
                      <span className="text-gray-700">Father</span>
                    </div>
                  </div>
                  </div>
                  <div className="2xl:flex flex">
                  <div className="flex flex-col">
                    <span className="text-xl text-[#202224]">Wing</span>
                    <span className="text-gray-700">A</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl text-[#202224]">Unit</span>
                    <span className="text-gray-700">1001</span>
                  </div>
                </div>
            
                {/* </div> */}
                <div className="flex p-2 mt-4">
                  <div className="">
                    {/* First File */}
                    <div className="bg-white rounded-lg shadow-md p-1">
                      <a
                        href="link-to-view-file-or-action"
                        className="flex items-center w-full no-underline"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <img
                            src={gallary}
                            className="h-6 w-6 text-gray-500"
                          />
                        </div>
                        <div className="ml-4">
                          <span className="text-[#202224]">
                            Syncfusion Essential Adharcard Front Side.JPG
                          </span>
                          <p className="text-gray-600">3.5 MB</p>
                        </div>
                      </a>
                    </div>

                    {/* Second File */}
                    <div className="bg-white rounded-lg mt-2 shadow-md p-1">
                      <a
                        href="link-to-view-file-or-action"
                        className="flex items-center w-full no-underline"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <img
                            src={gallary}
                            className="h-6 w-6 text-gray-500"
                          />
                        </div>
                        <div className="ml-4">
                          <span className="text-[#202224]">
                            Syncfusion Essential Adharcard Back Side.JPG
                          </span>
                          <p className="text-gray-600">3.2 MB</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" 2xl:w-[1550px] 2xl:ml-[40px] mt-3 bg-white p-4 rounded">
            <span className="">Member : (04)</span>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              {staticMembers.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm ">
                    <div
                      className="card-header text-white "
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <span className="">{card.memberName || ""}</span>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Email</span>
                        <span className="">{card.email || ""}</span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Number</span>
                        <span className="">{card.Number || ""}</span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Age</span>
                        <span className="">{card.age || ""}</span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Gender</span>
                        <span className="">{card.gender || ""}</span>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Relation</span>
                        <span className="">{card.relation || ""}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" 2xl:w-[1550px] 2xl:ml-[40px] mt-3 bg-white p-4 rounded">
            <span className="">Vehicle : (04)</span>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              {staticVehicles.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm">
                    <div
                      className="card-header text-white d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <span className="">{card.vehicleType || ""}</span>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Email</span>
                        <span className="">{card.vehicleName || ""}</span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Number</span>
                        <span className="">{card.vehicleNumber || ""}</span>
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
                <p className="text-gray-500 text-sm">Penalty Amount</p>
                <p className="font-bold text-lg text-red-500">₹ 500</p>
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
                <p className="font-bold text-lg text-red-500">₹ 500</p>
              </div>
            </div>
          </div>
          <div className=" 2xl:w-[1550px] 2xl:ml-[40px] mt-3 bg-white p-4 rounded">
            <span className="text-[rgba(32, 34, 36, 1)] fs-6 font-bold">
              Pending Maintanance
            </span>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              {Pending.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm ">
                    <div
                      className="card-header text-white p-3 "
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <div class="flex justify-between items-center">
                        <span class="">{card.Name || ""}</span>
                        <span class="bg-[#FFFFFF1A] p-1 ps-3 pe-3 rounded-2xl">
                          {card.status || ""}
                        </span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Bill Date</span>
                        <span className="">{card.BillDate || ""}</span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Pending Date
                        </span>
                        <span className="">{card.pendingDate || ""}</span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Maintanance Amount
                        </span>
                        <span className="text-[#E74C3C]">
                          {card.amount || ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Maintenance Penalty Amount
                        </span>
                        <span className="text-[#E74C3C]">
                          {card.penlatyamount || ""}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Grand Total</span>
                        <span className="text-[#39973D]">
                          <span>{card.Total ? `₹${card.Total}` : ""}</span>
                        </span>
                      </div>
                      <div>
                        <button
                          className="w-full rounded-lg h-12 fs-[18px] font-bold text-[#FFFFFF]"
                          style={{
                            background:
                              "linear-gradient(90deg, #FE512E 0%, #F09619 100%)",
                          }}
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
              {Due.map((card) => (
                <div key={card._id} className="col mb-3 ">
                  <div className="card shadow-sm ">
                    <div
                      className="card-header text-white p-3"
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <div class="flex justify-between items-center">
                        <span class="">{card.Name || ""}</span>
                        <span class="bg-[#FFFFFF1A] p-1 ps-3 pe-3 rounded-2xl">
                          {card.status || ""}
                        </span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Date</span>
                        <span className="">{card.Date || ""}</span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">Amount</span>
                        <span className="text-[#E74C3C]">
                          {card.amount || ""}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Due Maintenance Amount
                        </span>
                        <span className="text-[#E74C3C]">
                          {card.Dueamount || ""}
                        </span>
                      </div>

                      <div>
                        <button
                          className="w-full rounded-lg h-12 font-bold text-[#FFFFFF] "
                          style={{
                            background:
                              "linear-gradient(90deg, #FE512E 0%, #F09619 100%)",
                          }}
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
              {Anouncement.map((card) => (
                <div key={card._id} className="col mb-3">
                  <div className="card shadow-sm ">
                    <div
                      className="card-header text-white p-3"
                      style={{ backgroundColor: "#5678E9" }}
                    >
                      <div class="flex justify-between items-center">
                        <span class="">{card.Name || ""}</span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Announcement Date
                        </span>
                        <span className="">{card.Date || ""}</span>
                      </div>

                      <div className="d-flex justify-content-between ">
                        <span className="text-[#4F4F4F] mb-2">
                          Announcement Time
                        </span>
                        <span className="">{card.Time || ""}</span>
                      </div>

                      <div className=" ">
                        <span className="text-[#4F4F4F] mb-3">Description</span>
                        <p className="mt-1">{card.description || ""}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalTenant;
