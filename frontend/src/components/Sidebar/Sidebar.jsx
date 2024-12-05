import React, { useState, useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import DashboardIcon from "./icons/Widget 5.png";
import FinancialIcon from "./icons/dollar-square.png";
import FacilitiesIcon from "./icons/domain.svg";
import ComplaintsTrackingIcon from "./icons/sms-tracking.png";
import SecurityIcon from "./icons/encrypted.svg";
import SecurityGuardIcon from "./icons/security-user.png";
import AnnouncementIcon from "./icons/Announcement.png";
import "./sidebar.css";
import axiosInstance from '../Common/axiosInstance';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [financialActive, setFinancialActive] = useState("");
  const [securityActive, setSecurityActive] = useState("");
  const [showSecurityDropdown, setShowSecurityDropdown] = useState(false);
  const [showFinancialDropdown, setShowFinancialDropdown] = useState(false);
  const [showComplaintsDropdown, setShowComplaintsDropdown] = useState(false);
  const [complaintsActive, setComplaintsActive] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path === 'visitorlogs' || path === 'securityprotocol') {
      setActiveLink('security-Management');
      setSecurityActive(path);
      setShowSecurityDropdown(true);
    } 
    else if (path === 'edit-profile') {
      setActiveLink('dashboard');
    }
    else if (path === 'otherincome') {
      setActiveLink('Financial-Manegement');
    }
    
    else if (path === 'edittenant') {
      setActiveLink('Resident-Manegement');
    }

    else if (path === 'editowner') {
      setActiveLink('Resident-Manegement');
    }

    else if (path === 'createcomplaint' || path === 'requesttracking') {
      setActiveLink('Complaint-Tracking');
      setComplaintsActive(path);
      setShowComplaintsDropdown(true);
    } else if (path === 'income' || path === 'expense' || path === 'notes') {
      setActiveLink('Financial-Manegement');
      setFinancialActive(path);
      setShowFinancialDropdown(true);
    } else {
      setActiveLink(path || 'dashboard');
    }
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navLinkStyle = {
    color: "#4F4F4F",
    textDecoration: "none",
    padding: "0 10px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    height: "52px",
    borderRadius: "5px",
    marginBottom: "10px",
    transition: "background 0.3s, color 0.3s",
    width: "90%",
  };

  const getLinkStyle = (link) => ({
    ...navLinkStyle,
    background: activeLink === link
      ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)"
      : "transparent",
    color: activeLink === link ? "#FFFFFF" : "#4F4F4F",
  });

  const getIndicatorStyle = (link) => ({
    position: "absolute",
    left: "-15px",
    width: "7px",
    height: "52px",
    borderRadius: "0 5px 5px 0",
    background: activeLink === link
      ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)"
      : "transparent",
  });

  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    closeSidebar();
    navigate(path);
  };

  const getIconStyle = (link) => ({
    marginRight: "10px",
    width: "20px",
    height: "20px",
    filter: activeLink === link ? "brightness(0) invert(1)" : "none",
  });

  const handleFinancialClick = (item, path) => {
    setFinancialActive(item);
    setActiveLink("Financial-Manegement");
    navigate(path);
    setShowFinancialDropdown(true);
  };

  const handleSecurityClick = (item, path) => {
    setSecurityActive(item);
    setActiveLink("security-Management");
    navigate(path);
  };

  const handleComplaintsClick = (item, path) => {
    if (!showComplaintsDropdown) {
      setShowComplaintsDropdown(true);
      setComplaintsActive("createcomplaint");
      setActiveLink("Complaint-Tracking");
      navigate("/createcomplaint");
    } else {
      setComplaintsActive(item);
      setActiveLink("Complaint-Tracking");
      navigate(path);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/v1/logout");
      if (response.data.success) {
        localStorage.removeItem("Society-Management");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const dropdownItemStyle = (item, activeItem) => ({
    color: activeItem === item ? "#FE512E" : "#4F4F4F",
    backgroundColor: activeItem === item ? "rgba(254, 81, 46, 0.1)" : "transparent",
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: "5px",
  });

  const dropdownIndicatorStyle = {
    background: "rgba(254, 81, 46, 1)",
    width: "2px",
    height: "26px",
    borderRadius: "10px 0px 0px 0px",
  };

  return (
    <div>
      <div
        className="sidebar-toggle-btn block lg:hidden"
        style={{ zIndex: "9999" }}
        onClick={toggleSidebar}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          height: "100vh",
          background: "#F8F9FA",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          width: "290px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h1
            className="nunito-sans"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "30px",
              color: "rgba(254, 81, 46, 1)",
            }}
            onClick={() => closeSidebar()}
          >
            Dash<span style={{ color: "#202224" }}>Stack</span>
          </h1>
        </div>

        <Nav className="flex-column">
          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("dashboard")}></div>
            <Link
              to="/dashboard"
              style={getLinkStyle("dashboard")}
              onClick={() => handleLinkClick("dashboard", "/dashboard")}
            >
              <img
                src={DashboardIcon}
                style={getIconStyle("dashboard")}
                alt="Dashboard"
              />
              Dashboard
            </Link>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("Resident-Manegement")}></div>
            <Link
              to="/Resident-Manegement"
              style={getLinkStyle("Resident-Manegement")}
              onClick={() => handleLinkClick("Resident-Manegement", "/Resident-Manegement")}
            >
              <i
                className="fa-solid fa-money-bill"
                style={{
                  marginRight: "10px",
                  color:
                    activeLink === "Resident-Manegement"
                      ? "#FFFFFF"
                      : "#4F4F4F",
                }}
              ></i>
              Resident Management
            </Link>
          </div>

          <div style={{ position: "relative", zIndex: "9898988" }}>
            <div style={getIndicatorStyle("Financial-Manegement")}></div>
            <Dropdown
              show={showFinancialDropdown}
              onToggle={(isOpen) => setShowFinancialDropdown(isOpen)}
            >
              <Dropdown.Toggle
                variant="link"
                style={{
                  ...getLinkStyle("Financial-Manegement"),
                  fontSize: "14px",
                }}
                onClick={() => handleFinancialClick("income", "/income")}
              >
                <img
                  src={FinancialIcon}
                  style={getIconStyle("Financial-Manegement")}
                  alt="Financial Management"
                />
                Financial Management
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-[225px] border-0 bg-white shadow-lg rounded-md mt-2">
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("income", financialActive)}
                  onClick={() => handleFinancialClick("income", "/income")}
                >
                  {financialActive === "income" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Income
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("expense", financialActive)}
                  onClick={() => handleFinancialClick("expense", "/expense")}
                >
                  {financialActive === "expense" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Expense
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("notes", financialActive)}
                  onClick={() => handleFinancialClick("notes", "/notes")}
                >
                  {financialActive === "notes" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Note
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("Facility-Management")}></div>
            <Link
              to="/Facility-Management"
              style={getLinkStyle("Facility-Management")}
              onClick={() => handleLinkClick("Facility-Management", "/Facility-Management")}
            >
              <img
                src={FacilitiesIcon}
                style={getIconStyle("Facility-Management")}
                alt="Facilities"
              />
              Facilities Management
            </Link>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("Complaint-Tracking")}></div>
            <Dropdown
              show={showComplaintsDropdown}
              onToggle={(isOpen) => setShowComplaintsDropdown(isOpen)}
            >
              <Dropdown.Toggle
                variant="link"
                style={{
                  ...getLinkStyle("Complaint-Tracking"),
                  fontSize: "14px",
                }}
                onClick={() => handleComplaintsClick("createcomplaint", "/createcomplaint")}
              >
                <img
                  src={ComplaintsTrackingIcon}
                  style={getIconStyle("Complaint-Tracking")}
                  alt="Complaint Tracking"
                />
                Complaint Tracking
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-[225px] border-0 bg-white shadow-lg rounded-md mt-2">
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("createcomplaint", complaintsActive)}
                  onClick={() => handleComplaintsClick("createcomplaint", "/createcomplaint")}
                >
                  {complaintsActive === "createcomplaint" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Create Complaint
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("requesttracking", complaintsActive)}
                  onClick={() => handleComplaintsClick("requesttracking", "/requesttracking")}
                >
                  {complaintsActive === "requesttracking" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Request Tracking
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ position: "relative", }}>
            <div style={getIndicatorStyle("security-Management")}></div>
            <Dropdown
              show={showSecurityDropdown}
              onToggle={(isOpen) => setShowSecurityDropdown(isOpen)}
            >
              <Dropdown.Toggle
                variant="link"
                style={{
                  ...getLinkStyle("security-Management"),
                  fontSize: "14px",
                }}
                onClick={() => handleSecurityClick("visitorlogs", "/visitorlogs")}
              >
                <img
                  src={SecurityIcon}
                  style={getIconStyle("security-Management")}
                  alt="Security Management"
                />
                Security Management
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-[225px] border-0 bg-white shadow-lg rounded-md mt-2">
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("visitorlogs", securityActive)}
                  onClick={() => handleSecurityClick("visitorlogs", "/visitorlogs")}
                >
                  {securityActive === "visitorlogs" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Visitor Logs
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("securityprotocol", securityActive)}
                  onClick={() => handleSecurityClick("securityprotocol", "/securityprotocol")}
                >
                  {securityActive === "securityprotocol" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Security Protocol
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("security-guard")}></div>
            <Link
              to="/security-guard"
              style={getLinkStyle("security-guard")}
              onClick={() => handleLinkClick("security-guard", "/security-guard")}
            >
              <img
                src={SecurityGuardIcon}
                style={getIconStyle("security-guard")}
                alt="Security Guard"
              />
              Security Guard
            </Link>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("announcements")}></div>
            <Link
              to="/announcements"
              style={getLinkStyle("announcements")}
              onClick={() => handleLinkClick("announcements", "/announcements")}
            >
              <img
                src={AnnouncementIcon}
                style={getIconStyle("announcements")}
                alt="Announcements"
              />
              Announcements
            </Link>
          </div>
        </Nav>

        <div style={{ marginTop: "auto" }}>
          <Link
            to="/"
            className="no-underline"
            style={{ color: "#E74C3C", padding: "0 10px", height: "52px" }}
            onClick={handleLogout}
          >
            <i
              className="fa fa-sign-out"
              style={{ marginRight: "8px", color: "#E74C3C" }}
            ></i>{" "}
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;