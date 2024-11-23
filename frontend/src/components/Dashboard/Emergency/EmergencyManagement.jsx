import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { Bell, ChevronDown, LogOut, ChevronRight } from 'lucide-react';
import './emergency-management.css';
import AvatarImage from '../../assets/Avatar.png';
import axiosInstance from '../../Common/axiosInstance';
import { useNavigate } from 'react-router-dom';
import NotificationIcon from '../../assets/notification-bing.png';

const EmergencyManagement = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [formData, setFormData] = useState({
  //   alert_type: '',
  //   description: '',
  // });
  const [alert_type, setalert_type] = useState("");
  const [description, setdescription] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);


  const ClearAllData = () => {
    setalert_type("");
    setdescription("");
  };

  // // Check form validity whenever formData changes
  // const handleInputChange = (field, value) => {
  //   setFormData((prevData) => {
  //    // const updatedData = { ...prevData, [field]: value };
  //     const isValid = alert_type && description.trim();
  //     setIsFormValid(isValid);
  //     return updatedData;
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (isFormValid) {
    //   // Submit form data here
    //   console.log("Form submitted", formData);
    // }
    const AddData = {
      alert_type,
      description,
    };
    try {
      // Send data to the backend API using axios
      const response = await axiosInstance.post(
        "/v2/alert/addalert",
        AddData
      );
      if (response.status===201) {
        ClearAllData();
        setIsFormValid(false);
      } else {
        const errorData = await response.json();
        console.error("Error saving:", errorData.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error creating :", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="sidebar bg-white border-end">
        <div className="p-4">
          <h3 className="logo mb-4">
            <span style={{ color: '#FE512E' }}>Dash</span>
            <span style={{ color: '#202224' }}>Stack</span>
          </h3>
        </div>

        {/* Navigation */}
        <Nav className="flex-column">
          <div className="px-3">
            <Button
              className="security-button w-100 bt text-start d-flex align-items-center justify-content-between"
              style={{
                backgroundColor: '#FE512E',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '8px',
                color: 'white'
              }}
            >
              <span>Security</span>
              <ChevronDown size={20} />
            </Button>

            {/* Submenu */}
            <div className="submenu mt-2">
              <Nav.Link
                className="submenu-item d-flex align-items-center text-muted"
                style={{ paddingLeft: "24px" }}
                onClick={() => navigate("/visitorTracking")}
              >
                Visitor Tracking
              </Nav.Link>
              <Nav.Link
                className="submenu-item active d-flex align-items-center"
                style={{
                  paddingLeft: '24px',
                  position: 'relative'
                }}
              >
                <div
                  className="active-indicator"
                  style={{
                    position: 'absolute',
                    left: '0',
                    width: '2px',
                    height: '100%',
                    backgroundColor: '#FE512E'
                  }}
                />
                Emergency Management
              </Nav.Link>
            </div>
          </div>
        </Nav>

        <div className="mt-auto p-4">
          <Button
            variant="link"
            className="logout-button d-flex align-items-center gap-2 text-decoration-none"
            style={{ color: '#FE512E', padding: '0' }}
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
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted">Home</span>
              <ChevronRight size={16} className="text-muted" />
              <span>Emergency Management</span>
            </div>
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

        {/* Alert Form */}
        <Container className="py-5" style={{ alignItems: "center", marginTop: "110px" }}>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="bg-white rounded-3 shadow-sm p-4">
                <h4 className="mb-4">Alert</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Alert Type<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      className="form-control"
                      value={alert_type}
                      // onChange={(e) => handleInputChange('alert_type', e.target.value)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!!value) {
                          setalert_type(value);
                        }
                      }}
                      required
                    >
                      <option value="">Select Alert</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Warning">Warning</option>
                      <option value="Fire Alarm">Fire Alarm</option>
                      <option value="Earth Quack">Earth Quack</option>
                      <option value="High Winds">High Winds</option>
                      <option value="Thunder">Thunder</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      Description<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="An emergency description typically refers to a detailed account or explanation of an emergency situation."
                      value={description}
                      // onChange={(e) => handleInputChange('description', e.target.value)}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!!value) {
                          setdescription(value);
                        }
                      }}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-center">
                    <Button
                      className=""
                      type="submit"
                      disabled={!isFormValid} // Disable button if form is not valid
                      style={{
                        border: 'none',
                        padding: '10px 48px',
                        color:"black",
                        backgroundColor: isFormValid ? '#FE512E' : 'rgba(246, 248, 251, 1)' // Lighter color when disabled
                      }}
                    >
                      Send
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default EmergencyManagement;
