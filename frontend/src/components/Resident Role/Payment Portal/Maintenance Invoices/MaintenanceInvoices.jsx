
import React, { useEffect, useState } from 'react';
import ResidentSidebar from '../../Resident Sidebar/ResidentSidebar';
import Header from '../../../Dashboard/Header/HeaderBaner';
import { Link, useNavigate } from 'react-router-dom';
import './maintenence.css';
import PayNow from './Paynow';
import axiosInstance from '../../../Common/axiosInstance';
import moment from "moment";


const MaintenanceInvoices = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);
  const [isPayNowOpen, setIsPayNowOpen] = useState(false); // New PayNow modal state
  const [totalAmount, setTotalAmount] = useState(0); // Total amount state
  const [pendingMaintenance, setPendingMaintenance] = useState([]);
  const [dueMaintenance, setDueMaintenance] = useState([]);
  const [totalMaintenance_Amount, setTotalMaintenance_Amount] = useState(0);
  const [totalPenalty_Amount, setTotalPenalty_Amount] = useState(0);


  const navigate = useNavigate();

  const handleViewInvoiceClick = () => {
    navigate('/MaintenanceTable');
  };


  const handleOpenPayNowModal = (amount) => {
    setTotalAmount(amount);
    setIsPayNowOpen(true);
  };

  const handleClosePayNowModal = () => {
    setIsPayNowOpen(false);
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful!'); 
  };


  const fetchPendingMaintenance = async () => {
    const currentDate = new Date();
    try {
      const response = await axiosInstance.get(`/v2/maintenance/getuserandMaintance`);
      if (response.status === 200) {
        const allMaintenance = response.data.Maintenance;
        const futureData = allMaintenance.filter((item) => new Date(item.DueDate) >= currentDate);
        const dueData = allMaintenance.filter((item) => new Date(item.DueDate) <= currentDate);
        const totalMaintenance_Amount = futureData.reduce((sum, item) => sum + (item.Maintenance_Amount || 0), 0);
        const totalPenalty_Amount = futureData.reduce((sum, item) => sum + (item.Penalty_Amount || 0), 0);
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
    fetchPendingMaintenance();
  }, []);


  useEffect(() => {
    if (showPaymentModal || showCardDetailsModal || isPayNowOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto"); // Cleanup
  }, [showPaymentModal, showCardDetailsModal, isPayNowOpen]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
        <div className="d-flex align-items-center md:ml-[100px] lg:ml-[340px] text-muted d-none d-sm-flex 2xl:ml-80">
          <Link
            to="/ResidentDashboard"
            className="text-muted text-decoration-none font-weight-semibold text-sm sm:text-base"
          >
            Home
          </Link>
          <span className="text-muted mx-2 text-sm sm:text-base"> &gt; </span>
          <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
            Maintenance Invoices
          </span>
        </div>
        <Header />
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className='col-2'>
          <ResidentSidebar />
        </div>
        {/* Main Content */}
        <main className="lg:w-3/4">
          <div className="flex justify-between items-center h-40 lg:mt-7 mb-2 bg-white rounded-md" style={{ borderRadius: "15px" }}>
            <div>
              <h6 className="font-bold px-4 rounded-md">
                Show Maintenance Details
              </h6>
            </div>
            <div className="flex space-x-4 relative">
              {/* Maintenance Amount */}
              <div className="rounded-tr-sm p-3" style={{ maxHeight: "105px", width: "236px", borderRadius: "15px", borderRight: "2px solid green", borderTop: "2px solid green" }}>
                <p className="text-gray-500 text-sm">Maintenance Amount</p>
                <p className="font-bold text-[#39973D] text-lg">₹ {totalMaintenance_Amount}</p>
              </div>
              {/* Penalty Amount */}
              <div className="bg-[#FFFFFF] p-3 me-4" style={{ maxHeight: "105px", width: "236px", borderRadius: "15px", borderRight: "2px solid red", borderTop: "2px solid red" }}>
                <p className="text-gray-500 text-sm">Penalty Amount</p>
                <p className="font-bold text-lg text-red-500">₹ {totalPenalty_Amount}</p>
              </div>
            </div>
          </div>

          {/* Pending Maintenance Section */}
          <section className="mb-8 bg-white p-3" style={{ borderRadius: "15px" }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Pending Maintenance
              </h3>
              <button
                onClick={handleViewInvoiceClick}
                className="bt hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
              >
                View Invoice
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* {[...Array(3)].map((_, index) => (
                <MaintenanceCard
                  handlePayNowClick={() => handleOpenPayNowModal(1250)} // Pass total amount dynamically
                  key={index}
                />
              ))} */}
          {pendingMaintenance?.map((card) => (
              <div key={card._id} className="bg-white shadow-lg rounded-lg p-4   ">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-blue-600">Maintenance</span>
                <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs">
                  Pending
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div className='flex justify-between items-center'>
                  <span className="font-semibold">Bill Date:</span> {!!card.createdAt ? moment(card.createdAt).format("DD/MM/YYYY") : ""}
                </div>
                <div className='flex justify-between items-center'>
                  <span className="font-semibold">Pending Date:</span> {!!card.DueDate ? moment(card.DueDate).format("DD/MM/YYYY") : ""}
                </div>
                <div className='flex justify-between items-center'>
                  <span className="font-semibold">Maintenance Amount:</span>  {!!card.Maintenance_Amount ? `₹${card.Maintenance_Amount}` : ""}
                </div>
                <div className='flex justify-between items-center'>
                  <span className="font-semibold">Maintenance Penalty Amount:</span>  {!!card.Penalty_Amount ? `₹${card.Penalty_Amount}` : ""}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center font-semibold text-lg">
                <span>Grand Total:</span>
                <span className="text-green-600">{!!card.Maintenance_Amount ? `₹${card.Maintenance_Amount + card.Penalty_Amount}` : ""}</span>
              </div>
              <button onClick={() => handleOpenPayNowModal(!!card.Maintenance_Amount ? card.Maintenance_Amount + card.Penalty_Amount : "")} className="w-full mt-4 py-2 bg-gradient-to-r bt text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Pay Now
              </button>
            </div>
          ))}

            </div>
          </section>

          {/* Due Maintenance Section */}
          <section className="mb-3 bg-white p-3" style={{ borderRadius: "15px" }}>
            <h2 className="text-lg font-semibold mb-4">Due Maintenance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* {[...Array(2)].map((_, index) => (
                <MaintenanceCard
                  handlePayNowClick={() => handleOpenPayNowModal(1500)} // Pass total amount dynamically
                  key={index}
                />
              ))} */}
            {dueMaintenance?.map((card) => (
              <div key={card._id} className="bg-white shadow-lg rounded-lg p-4   ">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-blue-600">Maintenance</span>
                <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs">
                  Pending
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div className='flex justify-between items-center'>
                  <span className="font-semibold">Bill Date:</span> {!!card.createdAt ? moment(card.createdAt).format("DD/MM/YYYY") : ""}
                </div>
                <div className='flex justify-between items-center'>
                  <span className="font-semibold">Pending Date:</span> {!!card.DueDate ? moment(card.DueDate).format("DD/MM/YYYY") : ""}
                </div>
                <div className='flex justify-between items-center'>
                  <span className="font-semibold">Maintenance Amount:</span> {!!card.Maintenance_Amount ? `₹${card.Maintenance_Amount}` : ""}
                </div>
                <div className='flex justify-between items-center'>
                  <span className="font-semibold">Maintenance Penalty Amount:</span> {!!card.Penalty_Amount ? `₹${card.Penalty_Amount}` : ""}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center font-semibold text-lg">
                <span>Grand Total:</span>
                <span className="text-green-600">{!!card.Maintenance_Amount ? `₹${card.Maintenance_Amount + card.Penalty_Amount}` : ""}</span>
              </div>
              <button onClick={() => handleOpenPayNowModal(!!card.Maintenance_Amount ? card.Maintenance_Amount + card.Penalty_Amount : "")} className="w-full mt-4 py-2 bg-gradient-to-r bt text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Pay Now
              </button>
            </div>
          ))}

            </div>
          </section>
        </main>
      </div>

      {/* PayNow Modal */}
      {isPayNowOpen && (
        <PayNow
          totalAmount={totalAmount}
          onClose={handleClosePayNowModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

// Reusable Maintenance Card Component
// const MaintenanceCard = ({ handlePayNowClick }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4   ">
//       <div className="flex justify-between items-center mb-4">
//         <span className="font-semibold text-blue-600">Maintenance</span>
//         <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs">
//           Pending
//         </span>
//       </div>
//       <div className="text-sm text-gray-600 space-y-1">
//         <div className='flex justify-between items-center'>
//           <span className="font-semibold">Bill Date:</span> 11/01/2024
//         </div>
//         <div className='flex justify-between items-center'>
//           <span className="font-semibold">Pending Date:</span> 11/01/2024
//         </div>
//         <div className='flex justify-between items-center'>
//           <span className="font-semibold">Maintenance Amount:</span> ₹1000.00
//         </div>
//         <div className='flex justify-between items-center'>
//           <span className="font-semibold">Maintenance Penalty Amount:</span> ₹250.00
//         </div>
//       </div>
//       <div className="mt-4 flex justify-between items-center font-semibold text-lg">
//         <span>Grand Total:</span>
//         <span className="text-green-600">₹ 1,250</span>
//       </div>
//       <button onClick={handlePayNowClick} className="w-full mt-4 py-2 bg-gradient-to-r bt text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow">
//         Pay Now
//       </button>
//     </div>
//   );
// };

export default MaintenanceInvoices;
