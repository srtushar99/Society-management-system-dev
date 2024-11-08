import React, { useState } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
  };

  const getIconStyle = (link) => ({
    marginRight: '10px',
    width: '20px',
    height: '20px',
    filter: activeLink === link ? 'brightness(0) invert(1)' : 'none',
  });

  const handleFinancialClick = (item) => {
    setFinancialActive(item);
    setActiveLink(item);
  };

  const dropdownItemStyle = (item) => ({
    color: financialActive === item ? 'rgba(32, 34, 36, 1)' : '#4F4F4F',
    backgroundColor: financialActive === item ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px', // Add padding for better spacing
  });

  const dropdownIndicatorStyle = {
    background: 'rgba(32, 34, 36, 1)',
    width: '2px',
    height: '26px',
    borderRadius: '10px 0px 0px 0px',
    opacity: '0.5',
    marginRight: '20px',
  };

  return (
    <div>
      <div className="sidebar-toggle-btn block lg:hidden md:hidden" onClick={toggleSidebar}>
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
          {['dashboard', 'Resident-Manegement', 'Facilities-Management', 'complaints-Tracking', 'security-Management', 'security-guard', 'announcements'].map((link) => (
            <div key={link} style={{ position: 'relative' }}>
              <div style={getIndicatorStyle(link)}></div>
              <Link to={`/${link}`} style={getLinkStyle(link)} onClick={() => handleLinkClick(link)}>
                {link === 'dashboard' && <img src={DashboardIcon} style={getIconStyle(link)} alt="Dashboard" />}
                {link === 'Resident-Manegement' && (
                  <i className="fa-solid fa-money-bill" style={{ marginRight: '10px', color: activeLink === link ? '#FFFFFF' : '#4F4F4F' }}></i>
                )}
                {link === 'Facilities-Management' && <img src={FacilitiesIcon} style={getIconStyle(link)} alt="Facilities" />}
                {link === 'complaints-Tracking' && <img src={ComplaintsTrackingIcon} style={getIconStyle(link)} alt="Complaints Tracking" />}
                {link === 'security-Management' && <img src={SecurityIcon} style={getIconStyle(link)} alt="Security Management" />}
                {link === 'security-guard' && <img src={SecurityGuardIcon} style={getIconStyle(link)} alt="Security Guard" />}
                {link === 'announcements' && <img src={AnnouncementIcon} style={getIconStyle(link)} alt="Announcements" />}
                {link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, ' ')}
              </Link>
            </div>
          ))}

          {/* Financial Management Dropdown moved to the bottom */}
          <div style={{ position: 'relative' }}>
            <div style={getIndicatorStyle('Financial-Manegement')}></div>
            <Dropdown onClick={() => handleLinkClick('Financial-Manegement')}>
              <Dropdown.Toggle variant="link" style={{ ...getLinkStyle('Financial-Manegement'), fontSize: '14px' }}>
                <img src={FinancialIcon} style={getIconStyle('Financial-Manegement')} alt="Financial Management" />
                Financial Management
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-[225px] border-0">
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle('Income')}
                  onClick={() => handleFinancialClick('Income')}
                >
                  <div className="text-[#4F4F4F]" style={{ display: 'flex', alignItems: 'center' }}>
                    {financialActive === 'Income' && <div style={dropdownIndicatorStyle}></div>} 
                    Income
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle('Expense')}
                  onClick={() => handleFinancialClick('Expense')}
                >
                  <div className="text-[#4F4F4F]" style={{ display: 'flex', alignItems: 'center' }}>
                    {financialActive === 'Expense' && <div style={dropdownIndicatorStyle}></div>}
                    Expense
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  style={dropdownItemStyle('Notes')}
                  onClick={() => handleFinancialClick('Notes')}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {financialActive === 'Notes' && <div style={dropdownIndicatorStyle}></div>}
                    <Link to="/notes" className="no-underline text-[#4F4F4F]">Note</Link>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Nav>

        <div style={{ marginTop: 'auto' }}>
          <Link to="/logout" style={{ color: '#E74C3C', padding: '0 10px', height: '52px' }} onClick={() => handleLinkClick('logout')}>
            <i className="fa fa-sign-out" style={{ marginRight: '8px', color: '#E74C3C' }}></i> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
