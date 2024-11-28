import React from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../../Dashboard/Header/HeaderBaner';
import ResidentSidebar from '../../Resident Sidebar/ResidentSidebar';

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
  return (
    <div className="container-fluid">
        <header className="sticky top-0  flex justify-between items-center bg-white shadow-sm p-3">
        <div className="flex items-center md:ml-[100px] lg:ml-[340px] text-muted-foreground hidden sm:flex 2xl:ml-80">
          <Link
            to="/ResidentDashboard"
            className="text-muted-foreground no-underline font-semibold text-sm sm:text-base hover:text-primary"
          >
            Home
          </Link>
          <span className="mx-2 text-sm sm:text-base"> &gt; </span>
          <span className="font-semibold text-primary text-sm sm:text-base">
            Maintenance Invoices
          </span>
        </div>
        <Header />
      </header>
      <div className=' flex'>
      <div className="col-2 ">
        <ResidentSidebar />
       
      </div>
    <div className='col-9 border py-4 px-3 me-3 my-3' style={{borderRadius:"15px"}}>
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
      <div className="table-responsive">
        <Table  bordered hover>
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
                    <button className="btn btn-link p-0">
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
    </div>
  );
}

