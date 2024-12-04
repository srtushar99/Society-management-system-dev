import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import HeaderBaner from "../../Dashboard/Header/HeaderBaner";
import ResidentSidebar from "../Resident Sidebar/ResidentSidebar";
import axiosInstance from "../../Common/axiosInstance";

const SecurityProtocols = () => {
  const [SecurityProtocols, setSecurityProtocols] = useState([]);

  const notifications = [
    {
      title: "Evelyn Harper (A- 101)",
      timing: "Monday 11:41 AM",
      message: (
        <>
          Evelyn Harper gave a fund of{" "}
          <span style={{ color: "#5678E9" }}>1000 for Navratri</span>.
        </>
      ),
      timeAgo: "32 Minutes ago",
    },
    {
      title: "Maintenance (A- 101)",
      timing: "Tuesday 11:41 AM",
      message: (
        <>
          Evelyn Harper gave a{" "}
          <span style={{ color: "#5678E9" }}>Maintenance of 1000</span>.<br />
        </>
      ),
      timeAgo: "2 days ago",
    },
    {
      title: "Ganesh Chaturthi (A- 101)",
      timing: "Saturday 11:41 AM",
      message: (
        <>
          Per Person Amount: <span style={{ color: "#5678E9" }}>₹ 1500</span>.
          The celebration of Ganesh Chaturthi involves the installation of clay
          idols of Lord Ganesa in our residence.
        </>
      ),
      timeAgo: "2 days ago",
    },
    {
      title: "Update Maintenance",
      message: "Maintenance Amount: ₹ 1,500 Maintenance Penalty: ₹ 350.",
      timeAgo: "32 Minutes ago",
    },
  ];

  // Fetch Security Protocols from the API
  const fetchSecurityProtocols = async () => {
    try {
      const response = await axiosInstance.get("/v2/securityprotocol/");
      console.log(response.data);
      if (response.status === 200) {
        setSecurityProtocols(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching Security Protocols:", error);
    }
  };

  useEffect(() => {
    fetchSecurityProtocols();
  }, []);

  return (
    <div className="flex bg-gray-100 w-full h-full">
      <ResidentSidebar />
      <div className="flex-1 flex flex-col">
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-80">
            <Link
              to="/residentDashboard"
              className="text-muted text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-muted mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Security Protocols
            </span>
          </div>
          <HeaderBaner />
        </header>

        <div className=" mt-5 w-full">
          <div className="rounded-lg 2xl:ml-[310px] shadow-md lg:w-[1590px] bg-[#FFFFFF]">
            <h1 className="p-3 fs-6 font-semibold text-gray-800 mt-2">
              Security Protocols
            </h1>
 
            <div className="overflow-x-auto h-[700px] 2xl:ml-3 rounded-2xl mr-2 rounded-tr-xl scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="Content ">
                <table className="2xl:w-[1560px] rounded-2xl  border-gray-200 ">
                  <thead
                    className="relative"
                    style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
                  >
                    <tr className="text-left text-sm font-semibold ">
                      <th className="ps-4 text-[#202224] ">Title</th>
                      <th className="ps-3 text-[#202224] ">Description</th>
                      <th className=" text-left p-2 ">Date</th>
                      <th className=" text-center ">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SecurityProtocols.map((security, index) => (
                      <tr key={index} className="border-t  border-gray-200">
                        <td className="p-3  text-left   border-b  whitespace-nowrap  align-middle">
                          <span className="text-[#4F4F4F]">
                            {!!security.Title ? security.Title : ""}
                          </span>
                        </td>
                        <td className="text-[#4F4F4F] p-3  text-left  sm:table-cell  border-b border-gray-200">
                          <div className="text-[#4F4F4F] break-words w-[800px] whitespace-normal ">
                            {!!security.Description ? security.Description : ""}
                          </div>
                        </td>
                        <td className="text-[#4F4F4F] text-left whitespace-nowrap border-b pe-3">
                          <span className="text-[#4F4F4F]   text-sm sm:text-base">
                            <span className="inline">
                              {!!security.Time ? security.Time : ""}
                            </span>
                          </span>
                        </td>

                        <td className=" text-[#4F4F4F] border-b">
                          {!!security.Date
                            ? moment(security.Date).format("DD/MM/YYYY")
                            : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityProtocols;
