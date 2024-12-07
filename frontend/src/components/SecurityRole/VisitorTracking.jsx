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

const VisitorTracking = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [VisitorTrackings, setVisitorTrackings] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("This Week");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Fetch Visitor Tracking from the API
  const fetchVisitorTracking = async () => {
    try {
      console.log('Token in localStorage:', localStorage.getItem('Society-Management'));
      const response = await axiosInstance.get('/v2/Visitor/');
      console.log(response.data);
      if (response.status === 200) {
        setVisitorTrackings(response.data.data);
        filterVisitors("This Week", response.data.data);
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

  const filterVisitors = (filter, visitors) => {
    const now = moment();
    let filteredData = [];

    if (filter === "This Week") {
      filteredData = visitors.filter((visitor) => {
        const visitorDate = moment(visitor.date, "YYYY-MM-DD");
        return visitorDate.isSame(now, "week");
      });
    } else if (filter === "Last Week") {
      filteredData = visitors.filter((visitor) => {
        const visitorDate = moment(visitor.date, "YYYY-MM-DD");
        return visitorDate.isSame(now.clone().subtract(1, "week"), "week");
      });
    } else if (filter === "Custom Range") {
      // Custom logic for filtering can be added here
      filteredData = visitors; // Default to all visitors for now
    }

    setFilteredVisitors(filteredData);
  };

  const handleDropdownSelect = (filter) => {
    setSelectedFilter(filter);
    filterVisitors(filter, VisitorTrackings);
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
            onClick={handleLogout}
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
                onClick={() => setIsModalOpen(true)}
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
                  {selectedFilter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDropdownSelect("This Week")}>
                    This Week
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDropdownSelect("Last Week")}>
                    Last Week
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDropdownSelect("Custom Range")}>
                    Custom Range
                  </Dropdown.Item>
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
                {filteredVisitors.map((visitor) => (
                  <tr key={visitor._id}>
                    <td>{visitor.visitor_Name || ""}</td>
                    <td>{visitor.number || ""}</td>
                    <td>{visitor.date ? moment(visitor.date).format("DD/MM/YYYY") : ""}</td>
                    <td>
                      <span className={`unit-badge unit-${visitor.wing?.toLowerCase()}`}>
                        {visitor.wing || ""}
                      </span>
                      {visitor.unit || ""}
                    </td>
                    <td>{visitor.time || ""}</td>
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
