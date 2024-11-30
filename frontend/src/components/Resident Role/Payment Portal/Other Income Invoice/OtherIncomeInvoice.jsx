import React, { useState, useEffect } from "react";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";
import Header from "../../../Dashboard/Header/HeaderBaner";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./otherincome.css";

const OtherIncomeInvoice = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCardDetailsModal, setShowCardDetailsModal] = useState(false);

  const handleViewInvoiceClick = () => {
    setShowInvoiceModal(true);
  };

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
  };

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

  // Disable background scrolling when a modal is open
  useEffect(() => {
    if (showInvoiceModal || showPaymentModal || showCardDetailsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto"); // Cleanup
  }, [showInvoiceModal, showPaymentModal, showCardDetailsModal]);

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
              {[...Array(4)].map((_, index) => (
                <MaintenanceCard
                  key={index}
                  handlePayNowClick={handleOpenPaymentModal}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Modals */}
      <InvoiceModal show={showInvoiceModal} handleClose={handleCloseInvoiceModal} />
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

const MaintenanceCard = ({ handlePayNowClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="d-flex justify-content-between items-center mb-4">
        <span className="font-semibold text-blue-600">Due Event Payment</span>
        <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs">
          Pending
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <div className="d-flex justify-content-between items-center">
          <span className="font-semibold">Event Name:</span> Navratri
        </div>
        <div className="d-flex justify-content-between items-center">
          <span className="font-semibold">Event Due Date:</span> 11/01/2024
        </div>
        <div className="d-flex justify-content-between items-center">
          <span className="font-semibold">Amount:</span>
          <span style={{ color: "red" }}>₹1000.00</span>
        </div>
      </div>

      <button
        onClick={handlePayNowClick}
        className="w-full mt-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        Pay Now
      </button>
    </div>
  );
};

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

export default OtherIncomeInvoice;
