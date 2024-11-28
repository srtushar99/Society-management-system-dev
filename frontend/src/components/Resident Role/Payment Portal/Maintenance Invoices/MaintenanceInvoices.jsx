// MaintenanceInvoices.jsx

import React from 'react';
import ResidentSidebar from '../../Resident Sidebar/ResidentSidebar';
import Header from '../../../Dashboard/Header/HeaderBaner';
import { Link, useNavigate } from 'react-router-dom';
import './maintenence.css';

const MaintenanceInvoices = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleViewInvoiceClick = () => {
    navigate('/MaintenanceTable'); // Navigate to Maintenance Table page
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
        {/* Breadcrumb Navigation */}
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
        </div >
        {/* Main Content */}
        <main className="  lg:w-3/4 ">

        <div className="flex justify-between items-center  h-40 lg:mt-7  mb-2 bg-white rounded-md" style={{borderRadius:"15px"}}>
          <div className=''>
        <h6 className=" font-bold  px-4 rounded-md" >     
          Show Maintenance Details
         </h6>
         </div>
          <div className="flex space-x-4  relative">
            
            <div 
              style={{
                width: "5px",
                height: "46px",
                backgroundColor: "rgba(57, 151, 61, 0.5)",
                bottom:"50%",
                left:"15px",
                position:"absolute",
                top:"50%",

              }}
              className="rounded-r-lg lg:mt-3  my-auto"
            ></div>
            <div className=" rounded-tr-sm   p-3 " style={{maxHeight:"105px",width:"236px",borderRadius:"15px",borderRight:"2px solid green",borderTop:"2px solid green",}}>
              <p className="text-gray-500 text-sm">Maintenance Amount</p>
              <p className="font-bold text-[#39973D] text-lg">₹ 1500</p>
            </div>
            <div className="bg-[#FFFFFF] p-3 me-4" style={{maxHeight:"105px",width:"236px",borderRadius:"15px" ,borderRight:"2px solid red",borderTop:"2px solid red",position:"relative"}}>
            <div 
              style={{
                width: "5px",
                height: "46px",
                backgroundColor: "rgba(231, 76, 60, 0.5)",
                bottom:"50%",
                left:"0px",
                position:"absolute",
                top:"50%",

              }}
              className="rounded-r-lg lg:mt-3   my-auto"
            ></div>
              <p className="text-gray-500 text-sm">Penalty Amount</p>
              <p className="font-bold text-lg text-red-500">₹ 500</p>
            </div>
          </div>
          
        </div>


          {/* Pending Maintenance Section */}
          <section className="mb-8 bg-white  p-3" style={{borderRadius:"15px"}}>
          
         
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
              Pending Maintanance
              </h3>
              {/* Create Facility Button */}
              <button
                 onClick={handleViewInvoiceClick}
                className="bt hover:bg-orange-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center"
              >
                View Invoice
              </button>
            </div>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <MaintenanceCard key={index} type="pending" />
              ))}
            </div>
          </section>

          {/* Due Maintenance Section */}
          <section className="mb-3 bg-white  p-3" style={{borderRadius:"15px"}}>
            <h2 className="text-lg font-semibold mb-4">Due Maintenance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(2)].map((_, index) => (
                <MaintenanceCard key={index} type="due" />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

// Reusable Maintenance Card Component
const MaintenanceCard = ({ type }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-blue-600">Maintenance</span>
        <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs">
          Pending
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <div className='flex justify-between items-center'>
          <span className="font-semibold">Bill Date:</span> 11/01/2024
        </div>
        <div className='flex justify-between items-center'> 
          <span className="font-semibold">Pending Date:</span> 11/01/2024
        </div>
        <div className='flex justify-between items-center'>
          <span className="font-semibold">Maintenance Amount:</span> ₹1000.00
        </div>
        <div className='flex justify-between items-center'>
          <span className="font-semibold">Maintenance Penalty Amount:</span> ₹250.00
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center font-semibold text-lg">
        <span>Grand Total:</span>
        <span className="text-green-600">₹ 1,250</span>
      </div>
      <button className="w-full mt-4 py-2 bg-gradient-to-r bt  text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow">
        Pay Now
      </button>
    </div>
  );
};

export default MaintenanceInvoices;
