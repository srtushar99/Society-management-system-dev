// MaintenanceInvoices.jsx

import React, { useEffect, useState } from 'react';
import ResidentSidebar from '../../Resident Sidebar/ResidentSidebar';
import Header from '../../../Dashboard/Header/HeaderBaner';
import { Link, useNavigate } from 'react-router-dom';
import './maintenence.css';
import { Modal } from 'react-bootstrap';

const MaintenanceInvoices = () => {

 
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);

  

  

  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handleOpenCardDetailsModal = () => {
    setShowPaymentModal(false); // Close payment modal
    setShowCardDetailsModal(true); // Open card details modal
  };

  const handleCloseCardDetailsModal = () => {
    setShowCardDetailsModal(false);
  };
  const navigate = useNavigate(); // Initialize navigate function

  const handleViewInvoiceClick = () => {
    navigate('/MaintenanceTable'); // Navigate to Maintenance Table page
  };

  useEffect(() => {
    if ( showPaymentModal || showCardDetailsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto"); // Cleanup
  }, [ showPaymentModal, showCardDetailsModal]);

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
                <MaintenanceCard handlePayNowClick={handleOpenPaymentModal} key={index} type="pending" />
              ))}
            </div>
          </section>

          {/* Due Maintenance Section */}
          <section className="mb-3 bg-white  p-3" style={{borderRadius:"15px"}}>
            <h2 className="text-lg font-semibold mb-4">Due Maintenance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(2)].map((_, index) => (
                <MaintenanceCard  handlePayNowClick={handleOpenPaymentModal} key={index} type="due" />
              ))}
            </div>
          </section>
        </main>
      </div>
      <PaymentModal
        show={showPaymentModal}
        handleClose={handleClosePaymentModal}
        handleNext={handleOpenCardDetailsModal}
      />
      <CardDetailsModal
        show={showCardDetailsModal}
        handleClose={handleCloseCardDetailsModal}
      />

    </div>
  );
};

// Reusable Maintenance Card Component
const MaintenanceCard = ({ handlePayNowClick}) => {
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
      <button  onClick={handlePayNowClick} className="w-full mt-4 py-2 bg-gradient-to-r bt  text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow">
        Pay Now
      </button>
    </div>
  );
};


const PaymentModal = ({ show, handleClose ,handleNext}) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const paymentMethods = [
    { id: "mastercard", name: "Master Card", icon: "bi-credit-card-2-front" },
    { id: "visa", name: "Visa Card", icon: "bi-credit-card" },
    { id: "cash", name: "Cash Payment", icon: "bi-cash" },
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      className="payment-method-modal"
      style={{position:"fixed",top:"0%"}}
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-semibold">Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-2">
        <div className="d-flex flex-column gap-2">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-option p-3 rounded-3 border ${
                selectedMethod === method.id ? "border-success" : "border-gray-200"
              }`}
              onClick={() => setSelectedMethod(method.id)}
              role="button"
            >
              <div className="d-flex align-items-center gap-3">
                <div className="payment-icon">
                  <i className={`bi ${method.icon} fs-4`}></i>
                </div>
                <span className="flex-grow-1">{method.name}</span>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      
        {/* <Button variant="light" onClick={handleClose} className="col-6 py-2">
          Cancel
        </Button>
        <Button
          variant="primary"
          className="col-6 py-2"
          disabled={!selectedMethod}
        >
          Pay Now
          </Button> */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              className="w-full sm:w-[43%] ms-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={handleClose} 
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleNext}
              className={`w-full sm:w-[43%]  py-2 rounded-lg ${selectedMethod
                ? "bg-gradient-to-r from-[#FE512E] to-[#F09619]" // Apply gradient if form is valid
                : "bg-[#F6F8FB] text-[#202224]" // Default color if form is not valid
                }`}
              disabled={!selectedMethod}
            >
              Pay Now
            </button>
          </div>

      
    </Modal>  
  );
};


const CardDetailsModal = ({ show, handleClose }) => {
  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Card Details Submitted:", cardDetails);
    handleClose(); // Close modal on submit
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      className="card-details-modal"
      style={{position:"fixed",top:"0%"}}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold">Card Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Cardholder Name*</label>
            <input
              type="text"
              name="cardName"
              value={cardDetails.cardName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Card Number*</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="row ">
            <div className="col">
              <label>Expiry Date*</label>
              <input
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleChange}
                className="form-control"
                required
                style={{width:"153px ",margin:"0 0 0 -10px"}}
                
              />
            </div>
            <div className="col ">
              <label>CVV*</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleChange}
                className="form-control"
                required
                style={{width:"155px ",margin:"0 -20px 0 0"}}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between gap-3 mt-4">
            <button
              type="button"
              className="btn btn-light w-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-50"
            >
              Pay Now
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};  

export default MaintenanceInvoices;
