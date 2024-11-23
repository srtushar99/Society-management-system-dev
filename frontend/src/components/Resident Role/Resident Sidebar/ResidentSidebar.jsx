import React, { useState, useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import DashboardIcon from "./icons/Widget 5.png";
import FinancialIcon from "./icons/dollar-square.png";
import FacilitiesIcon from "./icons/domain.svg";
import ComplaintsTrackingIcon from "./icons/sms-tracking.png";
import SecurityGuardIcon from "./icons/security-user.png";
import AnnouncementIcon from "./icons/Announcement.png";
import "../../Sidebar/sidebar.css";

const ResidentSidebar = () => {
  const [activeLink, setActiveLink] = useState("ResidentDashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [communityActive, setCommunityActive] = useState("");
  const [paymentActive, setPaymentActive] = useState("");
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    const path = location.pathname.split('/')[1];
    setActiveLink(path || 'ResidentDashboard');
     if (location.pathname === '/residentsidebar') {
      navigate('/ResidentDashboard');
      return;
    }

    else if (['AccessForums', 'Polls', 'CommunitiesDiscussion'].includes(path)) {
      setActiveLink('Community');
      setCommunityActive(path);
      setShowCommunityDropdown(true);
    } else if (['MaintenanceInvoices', 'OtherIncomeInvoice'].includes(path)) {
      setActiveLink('PaymentPortal');
      setPaymentActive(path);
      setShowPaymentDropdown(true);
    }
  }, [location,navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    closeSidebar();
    navigate(path);
  };

  const handleCommunityClick = (item, path) => {
    if (!showCommunityDropdown) {
      setShowCommunityDropdown(true);
      setCommunityActive("AccessForums");
      setActiveLink("Community");
      navigate("/AccessForums");
    } else {
      setCommunityActive(item);
      setActiveLink("Community");
      navigate(path);
    }
  };

  const handlePaymentClick = (item, path) => {
    if (!showPaymentDropdown) {
      setShowPaymentDropdown(true);
      setPaymentActive("MaintenanceInvoices");
      setActiveLink("PaymentPortal");
      navigate("/MaintenanceInvoices");
    } else {
      setPaymentActive(item);
      setActiveLink("PaymentPortal");
      navigate(path);
    }
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing session, etc.)
    navigate("/");
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

  const getIconStyle = (link) => ({
    marginRight: "10px",
    width: "20px",
    height: "20px",
    filter: activeLink === link ? "brightness(0) invert(1)" : "none",
  });

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
            <div style={getIndicatorStyle("ResidentDashboard")}></div>
            <Link
              to="/ResidentDashboard"
              style={getLinkStyle("ResidentDashboard")}
              onClick={() => handleLinkClick("ResidentDashboard", "/ResidentDashboard")}
            >
              <img
                src={DashboardIcon}
                style={getIconStyle("ResidentDashboard")}
                alt="ResidentDashboard"
              />
              Dashboard
            </Link>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("PersonalDetail")}></div>
            <Link
              to="/PersonalDetail"
              style={getLinkStyle("PersonalDetail")}
              onClick={() => handleLinkClick("PersonalDetail", "/PersonalDetail")}
            >
              <i
                className="fa-solid fa-user"
                style={{
                  marginRight: "10px",
                  color:
                    activeLink === "PersonalDetail"
                      ? "#FFFFFF"
                      : "#4F4F4F",
                }}
              ></i>
             Personal Detail
            </Link>
          </div>

          <div style={{ position: "relative", zIndex: "9898988" }}>
            <div style={getIndicatorStyle("Community")}></div>
            <Dropdown
              show={showCommunityDropdown}
              onToggle={(isOpen) => setShowCommunityDropdown(isOpen)}
            >
              <Dropdown.Toggle
                variant="link"
                style={{
                  ...getLinkStyle("Community"),
                  fontSize: "14px",
                }}
                onClick={() => handleCommunityClick("AccessForums", "/AccessForums")}
              >
                <img
                  src={FinancialIcon}
                  style={getIconStyle("Community")}
                  alt="Community"
                />
                Community
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-[225px] border-0 bg-white shadow-lg rounded-md mt-2">
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("AccessForums", communityActive)}
                  onClick={() => handleCommunityClick("AccessForums", "/AccessForums")}
                >
                  {communityActive === "AccessForums" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Access Forums
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("Polls", communityActive)}
                  onClick={() => handleCommunityClick("Polls", "/Polls")}
                >
                  {communityActive === "Polls" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Polls
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("CommunitiesDiscussion", communityActive)}
                  onClick={() => handleCommunityClick("CommunitiesDiscussion", "/CommunitiesDiscussion")}
                >
                  {communityActive === "CommunitiesDiscussion" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Communities Discuss
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("ServiceAndComplaint")}></div>
            <Link
              to="/complain"
              style={getLinkStyle("complain")}
              onClick={() => handleLinkClick("complain", "/complain")}
            >
              <img
                src={FacilitiesIcon}
                style={getIconStyle("complain")}
                alt="complain"
              />
             Service And Complaint
            </Link>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("PaymentPortal")}></div>
            <Dropdown
              show={showPaymentDropdown}
              onToggle={(isOpen) => setShowPaymentDropdown(isOpen)}
            >
              <Dropdown.Toggle
                variant="link"
                style={{
                  ...getLinkStyle("PaymentPortal"),
                  fontSize: "14px",
                }}
                onClick={() => handlePaymentClick("MaintenanceInvoices", "/MaintenanceInvoices")}
              >
                <img
                  src={ComplaintsTrackingIcon}
                  style={getIconStyle("PaymentPortal")}
                  alt="PaymentPortal"
                />
               Payment Portal
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-[225px] border-0 bg-white shadow-lg rounded-md mt-2">
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("MaintenanceInvoices", paymentActive)}
                  onClick={() => handlePaymentClick("MaintenanceInvoices", "/MaintenanceInvoices")}
                >
                  {paymentActive === "MaintenanceInvoices" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                  Maintenance Invoices
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle("OtherIncomeInvoice", paymentActive)}
                  onClick={() => handlePaymentClick("OtherIncomeInvoice", "/OtherIncomeInvoice")}
                >
                  {paymentActive === "OtherIncomeInvoice" && (
                    <div style={dropdownIndicatorStyle}></div>
                  )}
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                   Other Income Invoice
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("SecurityProtocols")}></div>
            <Link
              to="/SecurityProtocols"
              style={getLinkStyle("SecurityProtocols")}
              onClick={() => handleLinkClick("SecurityProtocols", "/SecurityProtocols")}
            >
              <img
                src={SecurityGuardIcon}
                style={getIconStyle("SecurityProtocols")}
                alt="SecurityProtocols"
              />
              Security Protocols
            </Link>
          </div>

          <div style={{ position: "relative" }}>
            <div style={getIndicatorStyle("EventsParticipation",)}></div>
            <Link
              to="/EventsParticipation"
              style={getLinkStyle("EventsParticipation")}
              onClick={() => handleLinkClick("EventsParticipation", "/EventsParticipation")}
            >
              <img
                src={AnnouncementIcon}
                style={getIconStyle("EventsParticipation")}
                alt="EventsParticipation"
              />
             Events Participation
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

export default ResidentSidebar;