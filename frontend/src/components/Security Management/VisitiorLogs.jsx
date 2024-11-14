import React, { useState } from 'react';
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
  const navigate = useNavigate(); // Initialize the navigate function

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

  // Function to handle profile click and navigate to the EditProfile page
  const handleProfileClick = () => {
    navigate('/edit-profile'); // This will navigate to the EditProfile page
  };


  return (
    <div className="flex bg-gray-100 w-full h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between lg:ml-[290px] items-center lg:px-5 bg-white h-[60px] shadow-md"style={{padding:"35px 10px"}}>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-gray-600">
            <Link to="/dashboard" className="text-[#A7A7A7] no-underline ms-4 font-semibold">
              Home
            </Link>
            <span className="text-gray-400"> &gt; </span>
            <span className="font-semibold text-[#5678E9]">Visitor Logs</span>
          </div>

{/*          
          <div className="flex items-center justify-end me-5 space-x-4 sm:space-x-6">
      
        <button
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border ml-3 border-gray-300"
          onClick={() => setIsModalOpen(true)} 
        >
          <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
         
          <img
            src={AvatarImage}
            alt="Moni Roy"
            width="40"
            height="40"
            className="rounded-full"
          />
          
          
          <div className="hidden sm:block flex-col items-start mt-2">
            <span className="font-medium text-sm">Moni Roy</span>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>

    
      {isNoNotifications ? (
        <NoNotification
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          notifications={notifications}
          onClearAll={handleClearAll}
        />
      ) : (
        <NotificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          notifications={notifications}
          onClearAll={handleClearAll} 
        />
      )} */}
          <HeaderBaner/>
        </header>

        <div className="ps-6 pe-6 w-full">
          {/* Visitor Table */}
          <div className="rounded-lg lg:ml-[300px] shadow-md lg:w-[1560px] bg-white">
            <h1 className="p-3 text-3xl font-semibold text-gray-800 mt-10">Visitor Logs</h1>
            <div />
            <div className="overflow-x-auto h-[700px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="min-w-full  border border-gray-200 rounded-lg " >
              <thead className=" relative lg:w-[1560px]" style={{ backgroundColor:"rgba(86, 120, 233, 0.1)" }} >
                <tr className="text-left text-sm  font-semibold ">
                  <th className="p-3 text-[#202224]">Visitor Name</th>
                  <th className="p-3 hidden sm:table-cell">Phone Number</th>
                  <th className="p-3 hidden md:table-cell">Date</th>
                  <th className="p-3 hidden lg:table-cell">Unit Number</th>
                  <th className="p-1 hidden xl:table-cell">Time</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-3 pt-3 pb-2 flex items-center">
                      <img
                        src={AvatarImage} // Dynamically display the visitor's image
                        alt="visitor avatar"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span className="text-gray-700 font-medium">{visitor.name}</span>
                    </td>
                    <td className="pt-3 hidden sm:table-cell text-gray-600">{visitor.phone}</td>
                    <td className="pt-3 hidden md:table-cell text-gray-600">{visitor.date}</td>
                    <td className="pt-3 hidden lg:table-cell text-gray-600 d-flex ml-10" >  {unitImages[visitor.unit]?.map((img, idx) => (
                        <img key={idx} src={img} alt={`Unit ${visitor.unit}`} className="w-6 h-6 mr-2" />
                      ))}{visitor.unit}</td>
                    <td className="pt-3 hidden xl:table-cell text-gray-600 ml-10">{visitor.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default VisitorLogs;
