import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';  // Ensure Sidebar is imported
import AvatarImage from "../assets/Avatar.png";
import AIcon from "../assets/A.png"; 
import BIcon from "../assets/B.png"; 
import CIcon from "../assets/C.png"; 
import DIcon from "../assets/D.png"; 
import EIcon from "../assets/E.png"; 
import FIcon from "../assets/F.png"; 
import GIcon from "../assets/G.png"; 
import HIcon from "../assets/H.png"; 
import IIcon from "../assets/I.png"; 
import HeaderBaner  from "../Dashboard/Header/HeaderBaner";
import moment from 'moment';
import "../Dashboard/Maintenance/scrollbar.css";
import axiosInstance from '../Common/axiosInstance';
import { useNavigate } from 'react-router-dom';
import NoNotification from '../Dashboard/Notification/NoNotification';
import NotificationModal from '../Dashboard/Notification/NotificationModal';

const visitors = [
  { name: 'Evelyn Harper', phone: '97852 12369', img: AIcon, date: '10/01/2024', unit: '1001', time: '3:45 PM' },
  { name: 'Wade Warren',    phone: '97852 25893',   img: BIcon, date: '11/01/2024', unit: '1002', time: '2:45 AM' },
  { name: 'Guy Hawkins',    phone: '975869 55563', img: CIcon, date: '12/01/2024', unit: '1003', time: '3:00 PM' },
  { name: 'Robert Fox',    phone: '97444 96323',   img: DIcon, date: '13/01/2024', unit: '1004', time: '5:30 AM' },
  { name: 'Jacob Jones',    phone: '97123 12583',  img: EIcon, date: '14/01/2024', unit: '2001', time: '12:45 PM' },
  { name: 'Ronald Richards', phone: '97259 12363', img: FIcon, date: '15/01/2024', unit: '2002', time: '3:45 PM' },
  { name: 'Annette Black',  phone: '97569 77763', img: GIcon, date: '16/01/2024', unit: '2003', time: '6:00 AM' },
  { name: 'Jerome Bell',   phone: '97123 25863', img: HIcon, date: '17/01/2024', unit: '2004', time: '3:45 PM' },
  { name: 'Theresa Webb',   phone: '97258 36973', img: IIcon, date: '18/01/2024', unit: '3001', time: '7:00 PM' },
  { name: 'Kathryn Murphy', phone: '97577 66663', img: AIcon, date: '19/01/2024', unit: '3002', time: '6:00 AM' },
  { name: 'Eleanor Pena',   phone: '97259 69963', img: AIcon, date: '20/01/2024', unit: '3003', time: '7:00 PM' },
];
const unitImages = {
  '1001': [AIcon],
  '1002': [BIcon],
  '1003': [CIcon],
  '1004': [DIcon],
  '2001': [EIcon],
  '2002': [FIcon],
  '2003': [GIcon],
  '2004': [HIcon],
  '3001': [IIcon],
  '3002': [AIcon],
  '3003': [BIcon],
};


const VisitorLogs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [VisitorTrackings, setVisitorTrackings] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const navigate = useNavigate(); 

  const notifications = [
    {
      title: "Evelyn Harper (A- 101)",
      timing: "Monday 11:41 AM",
      message: (
        <>
          Evelyn Harper gave a fund of <span style={{ color: '#5678E9' }}>1000 for Navratri</span>.
        </>
      ),
      timeAgo: "32 Minutes ago",
    },
    {
      title: "Maintenance (A- 101)",
      timing: "Tuesday 11:41 AM",
      message: (
        <>
          Evelyn Harper gave a <span style={{ color: '#5678E9' }}>Maintenance of 1000</span>.<br />
        </>
      ),
      timeAgo: "2 days ago",
    },
    {
      title: "Ganesh Chaturthi (A- 101)",
      timing: "Saturday 11:41 AM",
      message: (
        <>
          Per Person Amount: <span style={{ color: '#5678E9' }}>₹ 1500</span>. 
          The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in our residence.
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

  const handleClearAll = () => {
    navigate('/no-notifications'); 
  };

  const isNoNotifications = notifications.length === 0;


  const handleProfileClick = () => {
    navigate('/edit-profile');
  };


  // Fetch Visitor Tracking from the API
  const fetchVisitorTracking = async () => {
    try {
        const response = await axiosInstance.get('/v2/Visitor/');
        if(response.status === 200){
         setVisitorTrackings(response.data.data); 
        }
       
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data);
      } else if (error.request) {
        console.error('No Response from Server:', error.request);
      } else {
        console.error('Unexpected Error:', error.message);
      }
    }
};


useEffect(() => {
  fetchVisitorTracking();
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
              className="text-[#A7A7A7] text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
            Visitor Logs
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

        <div className="2xl:ps-3 w-full">
         
          <div className="rounded-lg lg:ml-[300px] shadow-md lg:w-[1590px] bg-white">
            <h1 className="p-3 text-3xl font-semibold text-gray-800 mt-10">Visitor Logs</h1>
            <div />
            <div className="overflow-x-auto h-[700px] rounded-2xl 2xl:ml-5 ml-2 mr-2  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className='Content'>
            <table className="2xl:w-[1560px]  border border-gray-200  rounded-table ">
              <thead className=" relative lg:w-[1560px]" style={{ backgroundColor:"rgba(86, 120, 233, 0.1)", }} >
                <tr className="text-left text-sm  font-semibold ">
                  <th className="p-3 text-left  whitespace-nowrap text-[#202224]">Visitor Name</th>
                  <th className="p-3 text-center whitespace-nowrap  sm:table-cell">Phone Number</th>
                  <th className="p-3 text-center whitespace-nowrap  md:table-cell">Date</th>
                  <th className="p-3 text-left  whitespace-nowrap  lg:table-cell">Unit Number</th>
                  <th className="p-1 text-center whitespace-nowrap  xl:table-cell">Time</th>
                </tr>
              </thead>
              <tbody>
                {VisitorTrackings.map((visitor, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-3 pt-3 pb-2 flex items-center">
                      {/* <img
                        src={AvatarImage} 
                        alt="visitor avatar"
                        className="w-10 h-10 rounded-full mr-3"
                      /> */}
                      <span className="text-gray-700 text-center whitespace-nowrap  font-medium">{!!visitor.visitor_Name ? visitor.visitor_Name : ""}</span>
                    </td>
                    <td className="pt-3 text-center whitespace-nowrap  sm:table-cell text-gray-600">{!!visitor.number ? visitor.number : ""}</td>
                    <td className="pt-3 text-center whitespace-nowrap   md:table-cell text-gray-600">{!!visitor.date ? moment(visitor.date).format("DD/MM/YYYY") : ""}</td>
                    <td className="pt-3 text-center whitespace-nowrap  lg:table-cell text-gray-600 d-flex ml-10">
                    <span className={` unit-badge unit-${visitor.wing.toLowerCase()}`}>
                        {!!visitor.wing ? visitor.wing : ""}
                      </span>
                      {!!visitor.unit ? visitor.unit :""}
                    </td>
                    <td className="pt-3  xl:table-cell text-gray-600 ml-10">{!!visitor.time ? visitor.time : ""}</td>
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

export default VisitorLogs;
