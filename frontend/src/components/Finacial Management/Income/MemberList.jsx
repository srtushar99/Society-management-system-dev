import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import NotificationIcon from '../../assets/notification-bing.png';
import AvatarImage from '../../assets/Avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import UserIcon from '../../assets/User.png';
import TimerIcon from '../../assets/timer.png';
import VerifiedIcon from '../../assets/verified.png';
import WalletIcon from '../../assets/wallet.png';
import MoneysIcon from '../../assets/moneys.png';
import AIcon from "../../assets/A.png"; 
import BIcon from "../../assets/B.png"; 
import CIcon from "../../assets/C.png"; 
import DIcon from "../../assets/D.png"; 
import EIcon from "../../assets/E.png"; 
import FIcon from "../../assets/F.png"; 
import GIcon from "../../assets/G.png"; 
import HIcon from "../../assets/H.png"; 
import IIcon from "../../assets/I.png"; 
import AddMaintenance from './AddMaintenance';
import ViewMaintenance from './ViewMaintenance';
import HeaderBaner from "../../Dashboard/Header/HeaderBaner";

const MemberList = ({ color }) => {
    const [activeButton, setActiveButton] = useState('maintenance');
    const [isAddMaintenanceOpen, setIsAddMaintenanceOpen] = useState(false);
    const [isViewMaintenanceOpen, setIsViewMaintenanceOpen] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] = useState(null); // To hold the selected maintenance data
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const toggleSearchVisibility = () => {
      setIsSearchVisible(!isSearchVisible);
    };
    const data = [
        {  unit: '1001', date: '10/02/2024', role: 'Owner', phone: '92524 34522', amount: '₹ 1000', payment: 'Cash' },
        {  unit: '1002', date: '11/02/2024', role: 'Tenant', phone: '92524 12365', amount: '₹ 1000', payment: 'Online' },
        {  unit: '1003', date: '12/02/2024', role: 'Owner', phone: '92589 34522', amount: '₹ 1000', payment: 'Cash' },
        {  unit: '1004', date: '13/02/2024', role: 'Tenant', phone: '92524 12369', amount: '₹ 1000', payment: 'Online' },
        {  unit: '2001', date: '14/02/2024', role: 'Owner', phone: '92333 34522', amount: '₹ 1000' ,  payment: 'Cash' },
        {  unit: '2002', date: '15/02/2024', role: 'Tenant', phone: '92524 34522', amount: '₹ 1000', payment: 'Online' },
        {  unit: '2003', date: '16/02/2024', role: 'Owner', phone: '92258 34522', amount: '₹ 1000' , payment: 'Cash' },
        {  unit: '2004', date: '17/02/2024', role: 'Tenant', phone: '92589 34522', amount: '₹ 1000', payment: 'Online' },
        {  unit: '3001', date: '18/02/2024', role: 'Owner', phone: '92589 34522', amount: '₹ 1000',  payment: 'Cash' },
        {  unit: '3002', date: '19/02/2024', role: 'Tenant', phone: '92589 34522', amount: '₹ 1000', payment: 'Online' },
        {  unit: '3003', date: '20/02/2024', role: 'Owner', phone: '92589 34522', amount: '₹ 1000',  payment: 'Cash' },
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

   

   

    const closeAddMaintenanceModal = () => {
        setIsAddMaintenanceOpen(false);
    };

    const closeViewMaintenanceModal = () => {
        setIsViewMaintenanceOpen(false); // Close the ViewMaintenance modal
    };

 
    return (
        <div className="flex w-full h-screen bg-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-0 lg:ml-[290px]">
            <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px] 2xl:ml-[30px]  text-muted d-none d-sm-flex ">
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
          
            <span className=" text-[#5678E9]  font-weight-semibold text-sm sm:text-base">
            Maintenance Details
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

                <div className="bg-gray-100 ps-4 pb-5 2xl:mt-10">
                    <div className="bg-white shadow-lg p-4 lg:w-[1590px] rounded-lg border-gray-300">
                        <div className="2xl:text-2xl font-bold  text-gray-800 mb-4">Ganesh Chaturthi Participator Member List</div>
                        <div className='overflow-x-auto  h-[700px]  2xl:ml-2 ml-2 mr-2  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-2xl'>
                            <div className='Content'>    
                            <table className="2xl:w-[1520px]   text-sm text-left text-gray-600 rounded-top">
                                <thead style={{ backgroundColor:"rgba(86, 120, 233, 0.1)", }}>
                                    <tr className=" text-gray-600 uppercase text-xs font-semibold">
                                        <th className="px-5 whitespace-nowrap py-3">Unit Number</th>
                                        <th className="px-5 whitespace-nowrap py-3">Payment Date</th>
                                        <th className="px-5 whitespace-nowrap py-3">Tnant/Owner Status</th>
                                        <th className="px-5 whitespace-nowrap py-3">Phone Number</th>
                                        <th className="px-5 whitespace-nowrap py-3">Amount</th>
                                        <th className="px-5 whitespace-nowrap py-3">Payment</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                                           
                                            <td className="pt-3 d-flex  lg:table-cell text-gray-600 ml-10">
                                                {unitImages[row.unit]?.map((img, idx) => (
                                                    <img key={idx} src={img} alt={`Unit ${row.unit}`} className="w-6 h-6 mr-2" />
                                                ))}{row.unit}
                                            </td>
                                            <td className="px-5 py-3">{row.date}</td>
                                            <td className="px-5 py-3 ">
                                                <span className={`px-4 py-1 rounded-full text-xs lg:w-[100px] font-semibold flex ${row.role === 'Tenant' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                                                    {row.role === 'Tenant' ? (
                                                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                                                    ) : (
                                                        <img src={UserIcon} className="mr-2" />
                                                    )}
                                                    {row.role}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3">{row.phone}</td>
                                            <td className="px-5 py-3 text-green-600">{row.amount}</td>
                                            <td className="px-5 py-3">
                                                <span style={{ width: '80px', height: '20px' }} className={`px-2 py-1 rounded-full text-xs flex font-semibold ${row.payment === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                                    {row.payment === 'Online' ? (
                                                        <img src={WalletIcon} className="mr-2 text-[#5678E9]" />
                                                    ) : (
                                                        <img src={MoneysIcon} className="mr-2 text-[#202224]" />
                                                    )}
                                                    {row.payment}
                                                </span>
                                            </td>
                                           
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
                <AddMaintenance isOpen={isAddMaintenanceOpen} onClose={closeAddMaintenanceModal} />
                {isViewMaintenanceOpen && <ViewMaintenance isOpen={isViewMaintenanceOpen} onClose={closeViewMaintenanceModal} maintenance={selectedMaintenance} />}
            </div>
        </div>
    );
};

export default MemberList;
