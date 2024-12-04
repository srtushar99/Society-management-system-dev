  import React, { useEffect, useState } from 'react';
  import { Table, Dropdown } from 'react-bootstrap';
  import { Eye } from 'lucide-react';
  import { Link } from 'react-router-dom';
  import Header from '../../../Dashboard/Header/HeaderBaner';
  import ResidentSidebar from '../../Resident Sidebar/ResidentSidebar';
  import { Modal, Button } from "react-bootstrap";

  // Sample data - in a real app this would come from an API
  const invoices = [
    {
      id: "152563",
      ownerName: "Terry Rhiel Madsen",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "9754616457",
      email: "FrancesHarris@rhyta.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    {
      id: "152563",
      ownerName: "Marcus Vaccaro",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "9601765987",
      email: "DavidRSkley@dayrep.com",
      maintenanceAmount: 1500,
      pendingAmount: 6500,
    },
    {
      id: "152563",
      ownerName: "Marcus Schleifer",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "3216565498",
      email: "Thomas@jourrapide.com",
      maintenanceAmount: 1500,
      pendingAmount: 7500,
    },
    {
      id: "152563",
      ownerName: "Cristofer Lipshutz",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "4216545987",
      email: "MaryDHurst@jourrapide.com",
      maintenanceAmount: 1500,
      pendingAmount: 8500,
    },
    {
      id: "152563",
      ownerName: "James Donin",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "6549873215",
      email: "Dummymail@gmail.Com",
      maintenanceAmount: 1500,
      pendingAmount: 3500,
    },
    {
      id: "152563",
      ownerName: "Cristofer Vetrovs",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "8745698556",
      email: "Edward.Lee@dayrep.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    
    {
      id: "152563",
      ownerName: "Marcus Schleifer",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "3216565498",
      email: "Thomas@jourrapide.com",
      maintenanceAmount: 1500,
      pendingAmount: 7500,
    },
    {
      id: "152563",
      ownerName: "Cristofer Lipshutz",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "4216545987",
      email: "MaryDHurst@jourrapide.com",
      maintenanceAmount: 1500,
      pendingAmount: 8500,
    },
    {
      id: "152563",
      ownerName: "James Donin",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "6549873215",
      email: "Dummymail@gmail.Com",
      maintenanceAmount: 1500,
      pendingAmount: 3500,
    },
    {
      id: "152563",
      ownerName: "Cristofer Vetrovs",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "8745698556",
      email: "Edward.Lee@dayrep.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    {
      id: "152563",
      ownerName: "Marcus Schleifer",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "3216565498",
      email: "Thomas@jourrapide.com",
      maintenanceAmount: 1500,
      pendingAmount: 7500,
    },
    {
      id: "152563",
      ownerName: "Cristofer Lipshutz",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "4216545987",
      email: "MaryDHurst@jourrapide.com",
      maintenanceAmount: 1500,
      pendingAmount: 8500,
    },
    {
      id: "152563",
      ownerName: "James Donin",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "6549873215",
      email: "Dummymail@gmail.Com",
      maintenanceAmount: 1500,
      pendingAmount: 3500,
    },
    {
      id: "152563",
      ownerName: "Cristofer Vetrovs",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "8745698556",
      email: "Edward.Lee@dayrep.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
    
    {
      id: "152563",
      ownerName: "Marcus Schleifer",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "3216565498",
      email: "Thomas@jourrapide.com",
      maintenanceAmount: 1500,
      pendingAmount: 7500,
    },
    {
      id: "152563",
      ownerName: "Cristofer Lipshutz",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "4216545987",
      email: "MaryDHurst@jourrapide.com",
      maintenanceAmount: 1500,
      pendingAmount: 8500,
    },
    
    {
      id: "152563",
      ownerName: "Cristofer Vetrovs",
      billDate: "10/02/2024",
      paymentDate: "10/02/2024",
      phoneNumber: "8745698556",
      email: "Edward.Lee@dayrep.com",
      maintenanceAmount: 1500,
      pendingAmount: 2500,
    },
  ];

  export function MaintenanceTable() {
    const [showModal, setShowModal] = useState(false);

    const handleViewInvoiceClick = () => {
      setShowModal(true); // Open modal
    };  

    const handleCloseModal = () => {
      setShowModal(false); // Close modal
    };

    // Effect to disable scrolling on modal open
    useEffect(() => {
      if (showModal) {
        document.body.style.overflow = "hidden"; // Disable background scrolling
      } else {
        document.body.style.overflow = "auto"; // Re-enable scrolling
      }
      return () => (document.body.style.overflow = "auto"); // Cleanup on unmount
    }, [showModal]);
    return (
      <div className="container-fluid">
          <header className="sticky top-0  flex justify-between items-center bg-white shadow-sm p-3">
          <div className="flex items-center md:ml-[100px] lg:ml-[340px] text-muted-foreground hidden sm:flex 2xl:ml-80">
            <Link
              to="/ResidentDashboard"
              className="text-[#A7A7A7] no-underline font-semibold text-sm sm:text-base hover:text-primary"
            >
              Home
            </Link>
            <span className="fs-5 mx-2 text-sm sm:text-base"> &gt; </span>
            <span className="font-semibold text-[#5678E9] text-sm sm:text-base">
              Maintenance Invoices
            </span>
          </div>
          <Header />
        </header>
        <div className=' flex'>
        <div className="col-2 ">
          <ResidentSidebar />
        </div>
      <div className='col-9 shadow-md py-4 px-3 me-3  my-3' style={{borderRadius:"15px"}}>
        <div className="d-flex justify-content-between align-items-center  mb-4">
          <h1 className="h2">Maintenance Invoices</h1>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-month">
              Select Month
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/current-month">Current Month</Dropdown.Item>
              <Dropdown.Item href="#/previous-month">Previous Month</Dropdown.Item>
              <Dropdown.Item href="#/all-time">All Time</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="table-responsive  rounded-2xl">
          <Table  >
            <thead >
              <tr >
                <th style={{backgroundColor:"rgba(86, 120, 233, 0.1"}}>Invoice ID</th>
                <th style={{backgroundColor:"rgba(86, 120, 233, 0.1"}}>Owner Name</th>
                <th style={{backgroundColor:"rgba(86, 120, 233, 0.1"}}>Bill Date</th>
                <th style={{backgroundColor:"rgba(86, 120, 233, 0.1"}}>Payment Date</th>
                <th style={{backgroundColor:"rgba(86, 120, 233, 0.1"}}>Phone Number</th>
                <th style={{backgroundColor:"rgba(86, 120, 233, 0.1"}}>Email</th>
                <th style={{backgroundColor:"rgba(86, 120, 233, 0.1"}}>Maintenance Amount</th>
                <th style={{backgroundColor:"rgba(86, 120, 233, 0.1"}}>Pending Amount</th>
                <th style={{backgroundColor:"rgba(86, 120, 233, 0.1"}} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index}>
                  <td>{invoice.id}</td>
                  <td>{invoice.ownerName}</td>
                  <td>{invoice.billDate}</td>
                  <td>{invoice.paymentDate}</td>
                  <td>{invoice.phoneNumber}</td>
                  <td className="text-truncate" style={{maxWidth: '200px'}}>{invoice.email}</td>
                  <td className="text-success">₹ {invoice.maintenanceAmount}</td>
                  <td className="text-danger">{invoice.pendingAmount}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-link p-0"   onClick={handleViewInvoiceClick}>
                    
                        <Eye className="text-primary" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        </div>
        </div>
        <InvoiceModal show={showModal} handleClose={handleCloseModal} />
      </div>
    );
  }
  const InvoiceModal = ({ show, handleClose }) => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static" // Disable clicks outside
        centered
        className="custom-modal"
        style={{position:"fixed",top:"5%"}}
      >
        <Modal.Header className="d-flex justify-content-between align-items-center ">
          <Modal.Title className="fw-bold text-gray-800">Maintenance Invoices </Modal.Title>
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
                <strong style={{color:"#A7A7A7"}}>Phone Number:</strong>
                <p className="text-black pt-1">6549873521</p>
              </div>
            </div>
            <div className=" px-2 bg-light">
              <strong style={{color:"#A7A7A7"}}>Email:</strong>
              <p className="text-black pt-1">MaryDHurst@jourrapide.com</p>
            </div>
          
            <div className="mb-2 bg-light px-2">
              <strong style={{color:"#A7A7A7"}}> Adress:</strong>
              <p className="text-black pt-1">
              2118 Thornridge Cir. Syracuse, Connecticu 35624
              </p>
            </div>
            <div className=" px-2 bg-light justify-content-between  mb-3">
                <div className='flex justify-between items-center'>
                    <span className="font-semibold">Maintenance Amount:</span> <span className='text-success'>₹1500.00</span>
                </div>
                <div className='flex justify-between py-2 items-center'>
                    <span className="font-semibold">Penalty:</span> <span className='text-danger'>₹300.00</span>
                </div>
                <div className='flex justify-between py-2 items-center'style={{borderTop:"2px solid black"}}>
                <span className="font-bold">Grand Total:</span> <span className='text-black font-bold'>₹1800.00</span>
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
