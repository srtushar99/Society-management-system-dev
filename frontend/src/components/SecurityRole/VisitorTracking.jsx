import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Button, Table, Dropdown } from "react-bootstrap";
import { Bell, ChevronDown, Plus, LogOut } from "lucide-react";
import "./visitor-tracking.css";
import AvatarImage from "../assets/Avatar.png";
import AddVisitorModal from "./AddVisitorModal";
import NotificationIcon from '../assets/notification-bing.png';
import moment from 'moment';
import axiosInstance from '../Common/axiosInstance';

const visitors = [
  {
    id: 1,
    name: "Evelyn Harper",
    phone: "97852 12369",
    date: "10/01/2024",
    unit: { code: "A", number: "1001" },
    time: "3:45 PM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 2,
    name: "Wade Warren",
    phone: "97852 25893",
    date: "10/01/2024",
    unit: { code: "B", number: "1002" },
    time: "2:45 AM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 3,
    name: "Guy Hawkins",
    phone: "975869 55563",
    date: "10/01/2024",
    unit: { code: "C", number: "1003" },
    time: "3:00 PM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 4,
    name: "Robert Fox",
    phone: "97444 96323",
    date: "10/01/2024",
    unit: { code: "D", number: "1004" },
    time: "5:30AM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 5,
    name: "Jacob Jones",
    phone: "97123 12583",
    date: "10/01/2024",
    unit: { code: "E", number: "2001" },
    time: "12:45 PM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 6,
    name: "Ronald Richards",
    phone: "97259 12363",
    date: "10/01/2024",
    unit: { code: "F", number: "2002" },
    time: "3:45 PM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 7,
    name: "Annette Black",
    phone: "97569 77763",
    date: "10/01/2024",
    unit: { code: "G", number: "2003" },
    time: "6:00 AM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 8,
    name: "Jerome Bell",
    phone: "97123 25863",
    date: "10/01/2024",
    unit: { code: "H", number: "2004" },
    time: "3:45 PM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 9,
    name: "Theresa Webb",
    phone: "97258 36973",
    date: "10/01/2024",
    unit: { code: "I", number: "3001" },
    time: "7:00 PM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 10,
    name: "Kathryn Murphy",
    phone: "97577 66863",
    date: "10/01/2024",
    unit: { code: "A", number: "3002" },
    time: "6:00 AM",
    image: "/placeholder.svg?height=40&width=40"
  },
  {
    id: 11,
    name: "Eleanor Pena",
    phone: "97259 69963",
    date: "10/01/2024",
    unit: { code: "B", number: "3003" },
    time: "7:00 PM",
    image: "/placeholder.svg?height=40&width=40"
  }
];

const VisitorTracking = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [VisitorTrackings, setVisitorTrackings] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };


    // Fetch Visitor Tracking from the API
    const fetchVisitorTracking = async () => {
      try {
        console.log('Token in localStorage:', localStorage.getItem('authToken'));
          const response = await axiosInstance.get('/v2/Visitor/');
          console.log(response.data);
          if(response.status === 200){
           setVisitorTrackings(response.data.data); 
          }
         
      } catch (error) {
        if (error.response) {
          console.error('Error Response:', error.response.data);
        } else if (error.request) {
          console.error('No Response from Server:', error.request);
        } else {
          console.error('Unexpected Error:', error.message);
        }
      }
  };


  const handleVisitorAdded = () => {
    fetchVisitorTracking();
  };

  useEffect(() => {
    fetchVisitorTracking();
  }, []);


  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="sidebar bg-white border-end">
        <div className="p-4">
          <h3 className="logo mb-4">
            <span style={{ color: "#FE512E" }}>Dash</span>
            <span style={{ color: "#202224" }}>Stack</span>
          </h3>
        </div>

        {/* Navigation */}
        <Nav className="flex-column">
          <div className="px-3">
            <Button
              className="security-button w-100 text-start d-flex align-items-center bt justify-content-between"
              style={{
                border: "none",
                padding: "12px 16px",
                borderRadius: "8px",
                color: "white",
              }}
            >
              <span>Security</span>
              <ChevronDown size={20} />
            </Button>

            {/* Submenu */}
            <div className="submenu mt-2">
              <Nav.Link
                className="submenu-item active d-flex align-items-center"
                style={{
                  paddingLeft: "24px",
                  position: "relative",
                }}
              >
                <div
                  className="active-indicator"
                  style={{
                    position: "absolute",
                    left: "0",
                    width: "2px",
                    height: "100%",
                    backgroundColor: "#FE512E",
                  }}
                />
                Visitor Tracking
              </Nav.Link>
              <Nav.Link
                className="submenu-item d-flex align-items-center text-muted"
                style={{ paddingLeft: "24px" }}
                onClick={() => navigate("/emergency")}
              >
                Emergency Management
              </Nav.Link>
            </div>
          </div>
        </Nav>

        <div className="mt-auto p-4">
          <Button
            variant="link"
            className="logout-button d-flex align-items-center gap-2 text-decoration-none"
            style={{ color: "#FE512E", padding: "0" }}
            onClick={handleLogout} // Add onClick for logout
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        {/* Header */}
        <div className="bg-white border-bottom p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Visitor Tracking</h4>
            <div className="d-flex align-items-center gap-3">
              <button
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border ml-3 border-gray-300"
                onClick={() => setIsModalOpen(true)} // Open the modal
              >
                <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
              </button>

              <div className="d-flex align-items-center">
                <img
                  src={AvatarImage}
                  alt="Profile"
                  className="rounded-circle"
                  width={40}
                  height={40}
                />
                <div className="ms-2">
                  <div className="fw-bold">Moni Roy</div>
                  <div className="text-muted small">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-3">
          <div className="bg-white rounded shadow-sm">
            <div className="d-flex justify-content-end p-3 mx-2">
              <Dropdown>
                <Dropdown.Toggle variant="light" className="border mx-2">
                  Week
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>This Week</Dropdown.Item>
                  <Dropdown.Item>Last Week</Dropdown.Item>
                  <Dropdown.Item>Custom Range</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button
                variant="primary"
                className="d-flex align-items-center gap-2 bt me-2"
                style={{ border: "none" }}
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={18} />
                Add Visitor Details
              </Button>
              <AddVisitorModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onVisitorAdded={handleVisitorAdded}
              />
            </div>
            <Table hover className="mb-0 mx-3" style={{ width: "97%" }}>
              <thead>
                <tr>
                  <th className="border-0 py-3" style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}>Visitor Name</th>
                  <th className="border-0 py-3" style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}>Phone Number</th>
                  <th className="border-0 py-3" style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}>Date</th>
                  <th className="border-0 py-3" style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}>Unit Number</th>
                  <th className="border-0 py-3" style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {VisitorTrackings.map((visitor) => (
                  <tr key={visitor._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        {/* <img
                          src={AvatarImage}
                          alt={visitor.name}
                          className="rounded-circle me-2"
                          width={40}
                          height={40}
                        /> */}
                        {!!visitor.visitor_Name ? visitor.visitor_Name : ""}
                      </div>
                    </td>
                    <td>{!!visitor.number ? visitor.number : ""}</td>
                    <td>{!!visitor.date ? moment(visitor.date).format("DD/MM/YYYY") : ""}</td>
                    <td>
                      <span className={`unit-badge unit-${visitor.wing.toLowerCase()}`}>
                        {!!visitor.wing ? visitor.wing : ""}
                      </span>
                      {!!visitor.unit ? visitor.unit :""}
                    </td>
                    <td>{!!visitor.time ? visitor.time : ""}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorTracking;
