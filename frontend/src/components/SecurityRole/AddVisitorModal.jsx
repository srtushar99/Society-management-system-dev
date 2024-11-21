import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Calendar, Clock } from 'lucide-react';
import './add-visitor-modal.css';

const AddVisitorModal = ({ show, onHide, onSave }) => {
  const [formData, setFormData] = useState({
    visitorName: '',
    wing: '',
    unit: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  useEffect(() => {
    // Check if all fields are non-empty for enabling the Save button
    const isValid = formData.visitorName && formData.wing && formData.unit && formData.date && formData.time;
    setIsFormValid(isValid);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.visitorName.trim()) {
      newErrors.visitorName = 'Visitor name is required';
    }
    if (!formData.wing.trim()) {
      newErrors.wing = 'Wing is required';
    }
    if (!formData.unit.trim()) {
      newErrors.unit = 'Unit is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onHide();
      setFormData({
        visitorName: '',
        wing: '',
        unit: '',
        date: '',
        time: '',
      });
      setErrors({});
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" dialogClassName="visitor-modal mt-5 pt-5">
      <Modal.Body className="py-2">
        <h5 className="modal-title mb-4">Add Visitor Details.</h5>
        <Form noValidate>
          <div className="form-field mb-3">
            <Form.Label>
              Visitor Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={formData.visitorName}
              onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
              isInvalid={!!errors.visitorName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.visitorName}
            </Form.Control.Feedback>
          </div>

          <div className="input-row mb-4">
            <div className="form-field">
              <Form.Label>
                Wing<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Wing"
                value={formData.wing}
                onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
                isInvalid={!!errors.wing}
              />
              <Form.Control.Feedback type="invalid">
                {errors.wing}
              </Form.Control.Feedback>
            </div>
            <div className="form-field">
              <Form.Label>
                Unit<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                isInvalid={!!errors.unit}
              />
              <Form.Control.Feedback type="invalid">
                {errors.unit}
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="input-row mb-4">
            <div className="form-field">
              <Form.Label>
                Date<span className="text-danger">*</span>
              </Form.Label>
              <div className="input-with-icon">
                <Form.Control
                  type="text"
                  placeholder="Select Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  isInvalid={!!errors.date}
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                />
                <Calendar className="input-icon" size={20} style={{ fontWeight: '900', color: 'black' }} />
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.date}
              </Form.Control.Feedback>
            </div>
            <div className="form-field">
              <Form.Label>
                Time<span className="text-danger">*</span>
              </Form.Label>
              <div className="input-with-icon">
                <Form.Control
                  type="text"
                  placeholder="Select Time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  isInvalid={!!errors.time}
                  onFocus={(e) => (e.target.type = 'time')}
                  onBlur={(e) => (e.target.type = 'text')}
                />
                <Clock className="input-icon" size={20} style={{ fontWeight: '900', color: 'black' }} />
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.time}
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="button-row py-2">
            <Button variant="light" onClick={onHide} className="cancel-btn">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="save-btn text-black"
              disabled={!isFormValid} // Disable button if form is not valid
              style={{
                backgroundColor: isFormValid ? '#FE512E' : 'rgba(246, 248, 251, 1)', // Lighter color when disabled
                border: 'none',
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddVisitorModal;
