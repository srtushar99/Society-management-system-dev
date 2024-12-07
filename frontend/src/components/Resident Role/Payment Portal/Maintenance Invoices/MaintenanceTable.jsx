import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderBaner from "../../../Dashboard/Header/HeaderBaner";
import ResidentSidebar from "../../Resident Sidebar/ResidentSidebar";
import { Modal, Button } from "react-bootstrap";

// Sample data
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
    ownerName: "Terry Rhiel Madsen",
    billDate: "10/02/2024",
    paymentDate: "10/02/2024",
    phoneNumber: "9754616457",
    email: "FrancesHarris@rhyta.com",
    maintenanceAmount: 1500,
    pendingAmount: 2500,
  },
  // Add more data as needed...
];

export function MaintenanceTable() {
  const [showModal, setShowModal] = useState(false);

  const handleViewInvoiceClick = () => {
    setShowModal(true); // Open modal
  };
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  // Effect to disable scrolling on modal open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

  return (
    <div className="flex bg-gray-100 w-full h-full">
      <ResidentSidebar />
      <div className="flex-1 flex flex-col">
        <header className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">
          {/* Breadcrumb Navigation */}
          <div className="d-flex align-items-center md:ml-[100px]  text-muted d-none d-sm-flex ">
            <Link
              to="/dashboard"
              className="text-[#A7A7A7] text-decoration-none font-weight-semibold text-sm sm:text-base"
            >
              Home
            </Link>
            <span className="text-[#202224] fs-5 mx-2 text-sm sm:text-base">
              {" "}
              &gt;{" "}
            </span>
            <span className="font-weight-semibold text-[#5678E9] text-sm sm:text-base">
              Maintenance Invoices
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
        <div className="ps-3 pt-4 pe-6 mt-3 w-full">
          <div className="rounded-lg lg:ml-[300px] shadow-md lg:w-[1590px] bg-[#FFFFFF]">
            <div className="p-3 flex justify-between items-center">
              <p className="2xl:text-2xl text-lg whitespace-nowrap text-gray-800">
                Maintenance Invoices
              </p>
              {/* <div className=""> */}
              <select className="border-gray-300 p-2 ml-6 pb-3 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
                <option>Months</option>
                <option>Current Month</option>
                <option>Previous Month</option>
                <option>All Time</option>
              </select>
            </div>
            {/* </div> */}

            <div className="overflow-x-auto h-[700px] ml-5 mr-3 rounded-2xl scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="Content">
                <table className=" 2xl:w-[1550px] ">
                  <thead
                    className=""
                    style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}
                  >
                    <tr>
                      <th className="p-3 text-left whitespace-nowrap text-gray-600">
                        Invoice ID
                      </th>
                      <th className="p-3 text-left whitespace-nowrap text-gray-600">
                        Due Date
                      </th>
                      <th className="p-3 text-left whitespace-nowrap text-gray-600">
                        Payment Date
                      </th>
                      <th className="p-3 text-left whitespace-nowrap text-gray-600">
                        Maintenance Amount
                      </th>
                      <th className="p-3 text-left whitespace-nowrap  text-gray-600">
                        Pending Amount
                      </th>
                      <th className="p-3 text-center text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <tr key={index} className="border-b text-left">
                        <td className="p-3">{invoice.id}</td>
                        <td className="p-3">{invoice.billDate}</td>
                        <td className="p-3">{invoice.paymentDate}</td>
                        <td className="p-3 text-green-600">
                          ₹ {invoice.maintenanceAmount}
                        </td>
                        <td className="p-3 text-red-600">
                          ₹ {invoice.pendingAmount}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={handleViewInvoiceClick}
                          >
                            <Eye size={20} />
                          </button>
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
      style={{ position: "fixed", top: "5%" }}
    >
      <Modal.Header className="d-flex justify-content-between align-items-center ">
        <Modal.Title className="fw-bold text-gray-800">
          Maintenance Invoices{" "}
        </Modal.Title>
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
              <strong style={{ color: "#A7A7A7" }}>Invoice ID:</strong>
              <p className="text-muted pt-1">125465</p>
            </div>
            <div>
              <strong style={{ color: "#A7A7A7" }}>Owner Name:</strong>
              <p className="text-black pt-1">Terry Rhiel Madsen</p>
            </div>
          </div>
          <div className="d-flex bg-light px-2 justify-content-between  ">
            <div>
              <strong style={{ color: "#A7A7A7" }}>Bill Date:</strong>
              <p className="text-black pt-1">10/02/2024</p>
            </div>
            <div>
              <strong style={{ color: "#A7A7A7" }}>Payment Date:</strong>
              <p className="text-black pt-1">10/02/2024</p>
            </div>
          </div>
          <div className="d-flex bg-light justify-content-between px-2 ">
            <div>
              <strong style={{ color: "#A7A7A7" }}>Phone Number:</strong>
              <p className="text-black pt-1">6549873521</p>
            </div>
          </div>
          <div className=" px-2 bg-light">
            <strong style={{ color: "#A7A7A7" }}>Email:</strong>
            <p className="text-black pt-1">MaryDHurst@jourrapide.com</p>
          </div>

          <div className="mb-2 bg-light px-2">
            <strong style={{ color: "#A7A7A7" }}> Adress:</strong>
            <p className="text-black pt-1">
              2118 Thornridge Cir. Syracuse, Connecticu 35624
            </p>
          </div>
          <div className=" px-2 bg-light justify-content-between  mb-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Maintenance Amount:</span>{" "}
              <span className="text-success">₹1500.00</span>
            </div>
            <div className="flex justify-between py-2 items-center">
              <span className="font-semibold">Penalty:</span>{" "}
              <span className="text-danger">₹300.00</span>
            </div>
            <div
              className="flex justify-between py-2 items-center"
              style={{ borderTop: "2px solid black" }}
            >
              <span className="font-bold">Grand Total:</span>{" "}
              <span className="text-black font-bold">₹1800.00</span>
            </div>
          </div>
          <div className="text-black text-sm px-2  ">
            <p>
              <strong style={{ color: "#A7A7A7" }} className="pb-1">
                Note:
              </strong>{" "}
              A visual representation of your spending categories.
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
