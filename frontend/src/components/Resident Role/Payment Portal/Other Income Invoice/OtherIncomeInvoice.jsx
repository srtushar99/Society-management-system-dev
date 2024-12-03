import React, { useState, useEffect } from "react";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";
import Header from "../../../Dashboard/Header/HeaderBaner";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./otherincome.css";
import PayNow from "../Maintenance Invoices/Paynow";
import moment from "moment";
import axiosInstance from '../../../Common/axiosInstance';

const OtherIncomeInvoice = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);
  const [isPayNowOpen, setIsPayNowOpen] = useState(false); 
  const [OtherIncome, setOtherIncome] = useState([]);


  const handleViewInvoiceClick = () => {
    setShowInvoiceModal(true);
  };

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
  };


  const handleOpenPayNow = () => {
    setIsPayNowOpen(true); 
  };

  const handleClosePayNow = () => {
    setIsPayNowOpen(false); 
  };


   // Fetch Other Income
   const fetchOtherIncome = async () => {
    try {
      const response = await axiosInstance.get("/v2/income/");
      console.log(response.data.Income);
      if (response.status === 200) {
        setOtherIncome(response.data.Income);
      }
    } catch (error) {
      console.error("Error fetching Other Income:", error);
    }
  };


  useEffect(() => {
    fetchOtherIncome();
  }, []);


  // Disable background scrolling when a modal is open
  useEffect(() => {
    if (showInvoiceModal || showPaymentModal || showCardDetailsModal || isPayNowOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto"); // Cleanup
  }, [showInvoiceModal, showPaymentModal, showCardDetailsModal, isPayNowOpen]);

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

      <div className="d-flex">
        {/* Sidebar */}
        <div className="col-2">
          <ResidentSidebar />
        </div>
        {/* Main Content */}
        <main className="lg:w-3/4 py-2">
          {/* Pending Maintenance Section */}
          <section className="mb-8 bg-white p-3" style={{ borderRadius: "15px" }}>
            <div className="d-flex justify-content-between align-items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Due Event Payment
              </h3>
              {/* View Invoice Button */}
              <button
                onClick={handleViewInvoiceClick}
                className="btn bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                View Invoice
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {OtherIncome.map((card, index) => (
              <div  key={card._id} className="bg-white shadow-lg rounded-lg p-4">
                <div className="d-flex justify-content-between items-center mb-4">
                  <span className="font-semibold text-blue-600">Due Event Payment</span>
                  <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs">
                    Pending
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="d-flex justify-content-between items-center">
                    <span className="font-semibold">Event Name:</span>  {!!card.title ? card.title : ""}
                  </div>
                  <div className="d-flex justify-content-between items-center">
                    <span className="font-semibold">Event Due Date:</span> {!!card.dueDate ? moment(card.dueDate).format("DD/MM/YYYY"): " "}
                  </div>
                  <div className="d-flex justify-content-between items-center">
                    <span className="font-semibold">Amount:</span>
                    <span style={{ color: "red" }}> ₹{!!card.amount ? card.amount : " "}</span>
                  </div>
                </div>

                <button
                  onClick={handleOpenPayNow}
                  className="w-full mt-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  Pay Now
                </button>
              </div>
            ))}

            </div>
          </section>
        </main>
      </div>

      {/* Modals */}
      <InvoiceModal show={showInvoiceModal} handleClose={handleCloseInvoiceModal} />
      
      {/* PayNow Modal */}
      {isPayNowOpen && (
        <PayNow
          totalAmount={1000} // Replace with actual total amount
          onClose={handleClosePayNow}
          onPaymentSuccess={() => {}}
        />
      )}
    </div>
  );
};

// const MaintenanceCard = ({ handlePayNowClick }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg p-4">
//       <div className="d-flex justify-content-between items-center mb-4">
//         <span className="font-semibold text-blue-600">Due Event Payment</span>
//         <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs">
//           Pending
//         </span>
//       </div>
//       <div className="text-sm text-gray-600 space-y-1">
//         <div className="d-flex justify-content-between items-center">
//           <span className="font-semibold">Event Name:</span> Navratri
//         </div>
//         <div className="d-flex justify-content-between items-center">
//           <span className="font-semibold">Event Due Date:</span> 11/01/2024
//         </div>
//         <div className="d-flex justify-content-between items-center">
//           <span className="font-semibold">Amount:</span>
//           <span style={{ color: "red" }}>₹1000.00</span>
//         </div>
//       </div>

//       <button
//         onClick={handlePayNowClick}
//         className="w-full mt-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// };

const InvoiceModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static" // Disable clicks outside
      centered
      className="custom-modal"
      style={{ position: "fixed", top: "5%" }}
    >
      <Modal.Header className="d-flex justify-content-between align-items-center border-0">
        <Modal.Title className="fw-bold text-gray-800">Event Invoices List</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className="  rounded-lg">
          {/* Invoice Details */}
          <div className="d-flex bg-light px-2 justify-content-between ">
            <div>
              <strong style={{color:"#A7A7A7"}}>Invoice ID:</strong>
              <p className="text-muted pt-1">125465</p>
            </div>
            <div>
              <strong style={{color:"#A7A7A7"}}>Owner Name:</strong>
              <p className="text-black pt-1">Terry Rhiel Madsen</p>
            </div>
          </div>
          <div className="d-flex bg-light px-2 justify-content-between  ">
            <div>
              <strong style={{color:"#A7A7A7"}}>Bill Date:</strong>
              <p className="text-black pt-1">10/02/2024</p>
            </div>
            <div>
              <strong style={{color:"#A7A7A7"}}>Payment Date:</strong>
              <p className="text-black pt-1">10/02/2024</p>
            </div>
          </div>
          <div className="d-flex bg-light justify-content-between px-2 ">
            <div>
              <strong style={{color:"#A7A7A7"}}>Event Date:</strong>
              <p className="text-black pt-1">11/01/2024</p>
            </div>
            <div>
              <strong style={{color:"#A7A7A7"}}>Phone Number:</strong>
              <p className="text-black pt-1">6549873521</p>
            </div>
          </div>
          <div className=" px-2 bg-light">
            <strong style={{color:"#A7A7A7"}}>Email:</strong>
            <p className="text-black pt-1">MaryDHurst@jourrapide.com</p>
          </div>
          <div className=" px-2 bg-light">
            <strong style={{color:"#A7A7A7"}}>Event Name:</strong>
            <p className="text-black pt-1">Ganesh Chaturthi</p>
          </div>
          <div className="mb-2 bg-light px-2">
            <strong style={{color:"#A7A7A7"}}> Description:</strong>
            <p className="text-black pt-1">
              The celebration of Ganesh Chaturthi involves the installation of
              clay idols of Lord Ganesa in our resident.
            </p>
          </div>
          <div className="d-flex px-2 bg-light justify-content-between  mb-3">
            <div className="">
              <h6 style={{fontSize:"14px"}}>Maintenance Amount:</h6>
              <p className="text-success fw-bold pt-1">₹1500.00</p>
           
            
              <strong >Grand Total:</strong>
              <p className="text-success fw-bold pt-1">₹1850.00</p>
            </div>
          </div>
          <div className="text-black text-sm px-2  ">
            <p>
              <strong style={{color:"#A7A7A7",}} className="pb-1">Note:</strong> A visual representation of your spending
              categories.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          variant="primary"
          className="w-100 px-2 d-flex align-items-center justify-content-center bg-gradient-to-r from-orange-500 to-red-500 text-white fw-bold"
        >
          Download Invoice
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OtherIncomeInvoice;
