import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'; 
import DashboardIcon from './icons/dashboardIcon.svg';
import FinacialIcon from './icons/Finacial.svg';
import FacilitiesIcon from './icons/domain.svg';
import ComplaintsTrackingIcon from './icons/sms-tracking.png'; // Adjust the path accordingly

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('dashboard');

  const sidebarStyle = {
    width: '265px',
    height: '100vh',
    background: '#F8F9FA',
    position: 'fixed',
    top: '0',
    left: '0',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
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
  };

  const getLinkStyle = (link) => ({
    ...navLinkStyle,
    background: activeLink === link ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)' : 'transparent',
    color: activeLink === link ? '#FFFFFF' : '#4F4F4F',
  });

  const getDashboardStyle = () => ({
    ...getLinkStyle('dashboard'),
    fontWeight: 'bold',
    fontSize: '18px',
  });

  const getIndicatorStyle = (link) => ({
    marginRight: "10px",
    position: 'absolute',
    left: '0',
    width: '7px',
    height: '52px',
    borderRadius: '0 5px 5px 0',
    background: activeLink === link ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)' : 'transparent',
  });

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ color: '#4F4F4F', fontSize: '24px', fontWeight: 'bold' }}>DashStack</p>
      </div>
      <Nav className="flex-column">
        <Nav.Link 
          href="" 
          style={getDashboardStyle()} 
          onClick={() => handleLinkClick('dashboard')}
        >
          <img src={DashboardIcon} alt="Dashboard" style={{ marginRight: '10px', width: '24px', height: '24px' }} />
          Dashboard
        </Nav.Link>
        
        <Nav.Link 
          href="" 
          style={getLinkStyle('residents')} 
          onClick={() => handleLinkClick('residents')}
        >
          <div style={getIndicatorStyle('residents')}></div>
          <i className="fa-solid fa-money-bill" style={{ marginRight: '10px' }}></i> 
          Residents
        </Nav.Link>

        <Nav.Link 
          href="" 
          style={getLinkStyle('financial-management')} 
          onClick={() => handleLinkClick('financial-management')}
        >
          <div style={getIndicatorStyle('financial-management')}></div>
          <img src={FinacialIcon} alt="Financial Management" style={{ marginRight: '10px', width: '24px', height: '24px' }} />
          Financial Management
        </Nav.Link>

        <Nav.Link 
          href="" 
          style={getLinkStyle('facilities')} 
          onClick={() => handleLinkClick('facilities')}
        >
          <div style={getIndicatorStyle('facilities')}></div>
          <img src={FacilitiesIcon} alt="Facilities" style={{ marginRight: '10px', width: '24px', height: '24px' }} />
          Facilities
        </Nav.Link>

        <Nav.Link 
          href="" 
          style={getLinkStyle('complaints')} 
          onClick={() => handleLinkClick('complaints')}
        >
          <div style={getIndicatorStyle('complaints')}></div>
          <img src={ComplaintsTrackingIcon} alt="Complaints Tracking" style={{ marginRight: '10px', width: '24px', height: '24px' }} />
          Complaints Tracking
        </Nav.Link>

        {['security', 'announcements'].map((link) => (
          <Nav.Link 
            key={link} 
            href={`/${link}`} 
            style={getLinkStyle(link)} 
            onClick={() => handleLinkClick(link)}
          >
            <div style={getIndicatorStyle(link)}></div>
            {link.charAt(0).toUpperCase() + link.slice(1).replace(/_/g, ' ')}
          </Nav.Link>
        ))}
      </Nav>
      <div style={{ marginTop: 'auto' }}>
        <Nav.Link 
          href="/logout" 
          style={{ color: "#E74C3C", padding: '0 10px', height: '52px' }} 
          onClick={() => handleLinkClick('logout')}
        >
          <i className="fa fa-sign-out" style={{ marginRight: '8px' }}></i> Logout
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
