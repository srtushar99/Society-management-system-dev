import React from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaBell } from 'react-icons/fa';

const Header = () => {
  const headerStyle = {
    width: '1640px',
    padding: '10px 25px',
    background: '#FFFFFF',
    position: 'fixed',
    left: '280px',
    top: '0',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const userNameStyle = {
    marginLeft: '10px', // Space between icon and name
    fontWeight: 'bold',
    color: '#202224',
  };

  const notificationIconStyle = {
    width: '26px',
    height: '26px',
    color: '#202224', // Font color
  };

  const notificationWrapperStyle = {
    width: '42px',
    height: '42px',
    padding: '8px 0 0 0',
    borderRadius: '10px',
    border: '1px solid #D3D3D3', // Border color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Container fluid style={headerStyle}>
      <Row style={{ width: '60%', alignItems: 'center' }}>
        <Col md={6} xs={12}>
          <InputGroup style={{ background: "#F6F8FB", borderRadius: '10px' }}>
            <InputGroup.Text style={{ background: "#F6F8FB", border: 'none', borderRadius: '10px 0 0 10px' }}>
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              style={{
                background: "#F6F8FB",
                width: "335px",
                border: 'none',
                borderRadius: '0 10px 10px 0',
              }}
              placeholder="Search Here"
              aria-label="Search"
            />
          </InputGroup>
        </Col>
        <Col md={6} xs={12} className="d-flex justify-content-end align-items-center">
          <div style={notificationWrapperStyle}>
            <FaBell size={24} style={notificationIconStyle} />
          </div>
          <span style={userNameStyle}>Moni Roy</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
