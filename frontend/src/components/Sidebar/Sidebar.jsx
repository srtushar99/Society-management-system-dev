import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'; 
import DashboardIcon from './icons/Widget 5.png';
import FinacialIcon from './icons/Finacial.svg';
import FacilitiesIcon from './icons/domain.svg';
import ComplaintsTrackingIcon from './icons/sms-tracking.png';
import SecurityIcon from './icons/encrypted.svg';
import SecurityGuardIcon from './icons/security-user.png';
import AnnouncementIcon from './icons/Announcement.png';
import './sidebar.css';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

  // Toggle sidebar visibility on small screens
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
  };

  const getIconStyle = (link) => ({
    marginRight: '10px',
    width: '20px',
    height: '20px',
    filter: activeLink === link ? 'brightness(0) invert(1)' : 'none',
  });

  return (
    <div>
      {/* Hamburger menu button for small screens */}
      <div 
        className="sidebar-toggle-btn block lg:hidden md:hidden" 
        onClick={toggleSidebar}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Sidebar */}
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
          zIndex: 999
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h1 
            className="nunito-sans" 
            style={{
              textAlign: "center", 
              fontWeight: "bold", 
              fontSize: "30px", 
              color: "rgba(254, 81, 46, 1)"
            }}
          >
            Dash<span style={{ color: "#202224" }}>Stack</span>
          </h1>
        </div>

        <Nav className="flex-column">
          {['dashboard', 'Resident-Manegement', 'Financial-Management', 'Facilities-Management', 'complaints-Tracking', 'security-Management', 'security-guard', 'announcements'].map(link => (
            <div key={link} style={{ position: 'relative' }}>
              <div style={getIndicatorStyle(link)}></div>
              <Nav.Link href="" style={getLinkStyle(link)} onClick={() => handleLinkClick(link)}>
                {link === 'dashboard' && <img src={DashboardIcon} style={getIconStyle(link)} alt="Dashboard" />}
                {link === 'Resident-Manegement' && <i className="fa-solid fa-money-bill" style={{ marginRight: '10px', color: activeLink === link ? '#FFFFFF' : '#4F4F4F' }}></i>}
                {link === 'Financial-Management' && <img src={FinacialIcon} style={getIconStyle(link)} alt="Financial Management" />}
                {link === 'Facilities-Management' && <img src={FacilitiesIcon} style={getIconStyle(link)} alt="Facilities" />}
                {link === 'complaints-Tracking' && <img src={ComplaintsTrackingIcon} style={getIconStyle(link)} alt="Complaints Tracking" />}
                {link === 'security-Management' && <img src={SecurityIcon} style={getIconStyle(link)} alt="Security Management" />}
                {link === 'security-guard' && <img src={SecurityGuardIcon} style={getIconStyle(link)} alt="Security Guard" />}
                {link === 'announcements' && <img src={AnnouncementIcon} style={getIconStyle(link)} alt="Announcements" />}
                {link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, ' ')}
              </Nav.Link>
            </div>
          ))}
        </Nav>

        <div style={{ marginTop: 'auto' }}>
          <Nav.Link href="" style={{ color: "#E74C3C", padding: '0 10px', height: '52px' }} onClick={() => handleLinkClick('logout')}>
            <i className="fa fa-sign-out" style={{ marginRight: '8px', color: '#E74C3C' }}></i> Logout
          </Nav.Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
