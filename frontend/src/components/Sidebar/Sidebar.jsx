import React, { useState } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import DashboardIcon from './icons/Widget 5.png';
import FinancialIcon from './icons/dollar-square.png';
import FacilitiesIcon from './icons/domain.svg';
import ComplaintsTrackingIcon from './icons/sms-tracking.png';
import SecurityIcon from './icons/encrypted.svg';
import SecurityGuardIcon from './icons/security-user.png';
import AnnouncementIcon from './icons/Announcement.png';
import './sidebar.css';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
  const [financialActive, setFinancialActive] = useState(''); // Track which financial item is active
  const [securityActive, setSecurityActive] = useState(''); // Track which security item is active
  const [showSecurityDropdown, setShowSecurityDropdown] = useState(false);
  const [showFinancialDropdown, setShowFinancialDropdown] = useState(false);

  const navigate = useNavigate(); // Hook to navigate programmatically

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navLinkStyle = {
    color: '#4F4F4F',
    textDecoration: 'none',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: '52px',
    borderRadius: '5px',
    marginBottom: '10px',
    transition: 'background 0.3s, color 0.3s',
    width: '90%',
    
  };
  const getLinkStyle = (link) => ({
    ...navLinkStyle,
    background: activeLink === link ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)' : 'transparent',
    color: activeLink === link ? '#FFFFFF' : '#4F4F4F',
  });

  const getIndicatorStyle = (link) => ({
    position: 'absolute',
    left: '-15px',
    width: '7px',
    height: '52px',
    borderRadius: '0 5px 5px 0',
    background: activeLink === link ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)' : 'transparent',
  });

  const handleLinkClick = (link) => {
    setActiveLink(link);
    closeSidebar();
    if (link === 'announcements') {
      navigate('/announcements'); // Redirect to the announcements page
    }
   
    
  };

  const getIconStyle = (link) => ({
    marginRight: '10px',
    width: '20px',
    height: '20px',
    filter: activeLink === link ? 'brightness(0) invert(1)' : 'none',
  });

  const handleFinancialClick = (item, path) => {
    setFinancialActive(item);
    setActiveLink(item);
    navigate(path); // Navigate to the page when item is clicked
    setShowFinancialDropdown(false); 
   
  };

  const handleSecurityClick = (item, path) => {
    setSecurityActive(item);
    setActiveLink('security-Management');// Update active state for the dropdown items
    navigate(path); // Navigate to the page when item is clicked
    setShowSecurityDropdown(false); // Close the dropdown
  };

  const dropdownItemStyle = (item) => ({
    color: securityActive === item ? 'rgba(32, 34, 36, 1)' : '#4F4F4F',
    backgroundColor: securityActive === item ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
  });

  const dropdownIndicatorStyle = {
    background: 'rgba(32, 34, 36, 1)',
    width: '2px',
    height: '26px',
    borderRadius: '10px 0px 0px 0px',
  };

  return (
    <div>
    <div className="sidebar-toggle-btn block lg:hidden" style={{ zIndex: "9999" }} onClick={toggleSidebar}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>

    <div
      className={`sidebar ${sidebarOpen ? 'open' : ''}`}
      style={{
        position: 'fixed',
        height: '100vh',
        background: '#F8F9FA',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        width: '290px',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h1
          className="nunito-sans"
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '30px',
            color: 'rgba(254, 81, 46, 1)',
          }}
          onClick={() => closeSidebar()}
        >
          Dash<span style={{ color: '#202224' }}>Stack</span>
        </h1>
      </div>

      <Nav className="flex-column">
      <div style={{ position: 'relative' }}>
            <div style={getIndicatorStyle('dashboard')}></div>
            <Link to="/dashboard" style={getLinkStyle('dashboard')} onClick={() => handleLinkClick('dashboard')}>
              <img src={DashboardIcon} style={getIconStyle('dashboard')} alt="Dashboard" />
              Dashboard
            </Link>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={getIndicatorStyle('Resident-Manegement')}></div>
            <Link
              to="/Resident-Manegement"
              style={getLinkStyle('Resident-Manegement')}
              onClick={() => handleLinkClick('Resident-Manegement')}
            >
              <i className="fa-solid fa-money-bill" style={{ marginRight: '10px', color: activeLink === 'Resident-Manegement' ? '#FFFFFF' : '#4F4F4F' }}></i>
              Resident Management
            </Link>
          </div>
           {/* Financial Management Dropdown */}
        <div style={{ position: 'relative', zIndex: "9898988" }}>
          <div style={getIndicatorStyle('Financial-Manegement')}></div>
          <Dropdown onClick={() => handleLinkClick('Financial-Manegement')} show={showFinancialDropdown}>
            <Dropdown.Toggle variant="link" style={{ ...getLinkStyle('Financial-Manegement'), fontSize: '14px' }} onClick={() => setShowFinancialDropdown(!showFinancialDropdown)}>
              <img src={FinancialIcon} style={getIconStyle('Financial-Manegement')} alt="Financial Management" />
              Financial Management
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-[225px] border-0">
              <Dropdown.Item
                href="#"
                style={dropdownItemStyle('Income')}
                onClick={() => handleFinancialClick('Income', '/income')}
              >
                {financialActive === 'Income' && <div style={dropdownIndicatorStyle}></div>}
                <div className="text-[#4F4F4F]" style={{ marginLeft: "20px", display: 'flex', alignItems: 'center' }}>
                  Income
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                style={dropdownItemStyle('Expense')}
                onClick={() => handleFinancialClick('Expense', '/expense')}
              >
                {financialActive === 'Expense' && <div style={dropdownIndicatorStyle}></div>}
                <div style={{ marginLeft: "20px", display: 'flex', alignItems: 'center' }}>
                  Expense
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                style={dropdownItemStyle('Notes')}
                onClick={() => handleFinancialClick('Notes', '/notes')}
              >
                {financialActive === 'Notes' && <div style={dropdownIndicatorStyle}></div>}
                <div style={{ marginLeft: "20px", display: 'flex', alignItems: 'center' }}>
                  Note
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
          <div style={{ position: 'relative' }}>
            <div style={getIndicatorStyle('Facilities-Management')}></div>
            <Link
              to="/Facilities-Management"
              style={getLinkStyle('Facilities-Management')}
              onClick={() => handleLinkClick('Facilities-Management')}
            >
              <img src={FacilitiesIcon} style={getIconStyle('Facilities-Management')} alt="Facilities" />
              Facilities Management
            </Link>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={getIndicatorStyle('complaints-Tracking')}></div>
            <Link
              to="/complaints-Tracking"
              style={getLinkStyle('complaints-Tracking')}
              onClick={() => handleLinkClick('complaints-Tracking')}
            >
              <img src={ComplaintsTrackingIcon} style={getIconStyle('complaints-Tracking')} alt="Complaints Tracking" />
              Complaints Tracking
            </Link>
          </div>
        {/* Security Management Dropdown */}
<div style={{ position: 'relative', zIndex: "9898989" }}>
  <div style={getIndicatorStyle('security-Management')}></div>
  <Dropdown onClick={() => handleLinkClick('security-Management')} show={showSecurityDropdown}>
    <Dropdown.Toggle
      variant="link"
      style={{ ...getLinkStyle('security-Management'), fontSize: '14px' }}
      onClick={() => setShowSecurityDropdown(!showSecurityDropdown)}
    >
      <img src={SecurityIcon} style={getIconStyle('security-Management')} alt="Security Management" />
      Security Management
    </Dropdown.Toggle>
    <Dropdown.Menu className="w-[225px] border-0">
      <Dropdown.Item
        href="#"
        style={dropdownItemStyle('VisitorLogs')}
        onClick={() => handleSecurityClick('VisitorLogs', '/visitorlogs')}
      >
        {securityActive === 'VisitorLogs' && <div style={dropdownIndicatorStyle}></div>}
        <div className="text-[#4F4F4F]" style={{ marginLeft: "20px", display: 'flex', alignItems: 'center' }}>
          Visitor Logs
        </div>
      </Dropdown.Item>
      <Dropdown.Item
        href="#"
        style={dropdownItemStyle('Security Protocol')}
        onClick={() => handleSecurityClick('Security Protocol', '/securityprotocol')}
      >
        {securityActive === 'Security Protocol' && <div style={dropdownIndicatorStyle}></div>}
        <div style={{ marginLeft: "20px", display: 'flex', alignItems: 'center' }}>
          Security Protocol
        </div>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>

          <div style={{ position: 'relative' }}>
            <div style={getIndicatorStyle('security-guard')}></div>
            <Link
              to="/security-guard"
              style={getLinkStyle('security-guard')}
              onClick={() => handleLinkClick('security-guard')}
            >
              <img src={SecurityGuardIcon} style={getIconStyle('security-guard')} alt="Security Guard" />
              Security Guard
            </Link>
          </div>

                 
        <div style={{ position: 'relative' }}>
            <div style={getIndicatorStyle('announcements')}></div>
            <Link
              to="/announcements"
              style={getLinkStyle('announcements')}
              onClick={() => handleLinkClick('announcements')}
            >
              <img src={AnnouncementIcon} style={getIconStyle('announcements')} alt="Announcements" />
              Announcements
            </Link>
          </div>
      </Nav>

      <div style={{ marginTop: 'auto' }}>
        <Link to="/logout" className="no-underline" style={{ color: '#E74C3C', padding: '0 10px', height: '52px' }} onClick={() => handleLinkClick('logout')}>
          <i className="fa fa-sign-out" style={{ marginRight: '8px', color: '#E74C3C' }}></i> Logout
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Sidebar;
