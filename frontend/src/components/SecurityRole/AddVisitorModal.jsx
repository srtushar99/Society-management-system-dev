import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Calendar, Clock } from 'lucide-react';
import './add-visitor-modal.css';
import DatePicker from "react-datepicker";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import timeIcon from "../../components/assets/Vector.png";
import moment from 'moment';
import axiosInstance from '../Common/axiosInstance';

const AddVisitorModal = ({ show, onHide,onVisitorAdded }) => {
  
  const [visitor_Name, setvisitor_Name] = useState("");
  const [number, setnumber] = useState("");
  const [date, setdate] = useState(null);
  const [time, settime] = useState("");
  const [wing, setwing] = useState("");
  const [unit, setunit] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);


  const ClearAllData = () => {
    setvisitor_Name("");
    setnumber("");
    setdate(null);
    settime("");
    setwing("");
    setunit("");
    setIsCalendarOpen(false);
  };

  const onCancel = () =>{
    onHide();
    ClearAllData();
  }

  const validateForm = () => {
    const newErrors = {};
    if (!visitor_Name.trim()) {
      newErrors.visitor_Name = 'Visitor name is required';
    }
    if (!wing.trim()) {
      newErrors.wing = 'Wing is required';
    }
    if (!unit.trim()) {
      newErrors.unit = 'Unit is required';
    }
    if (!date) {
      newErrors.date = 'Date is required';
    }
    if (!time) {
      newErrors.time = 'Time is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (date) => {
    setdate(date);
    setIsCalendarOpen(false);
  };

  const handleTimeChange = (value) => {
    const formattedDate = dayjs(value);
    const hour = formattedDate.hour();
    const ampm = hour < 12 ? "AM" : "PM"; 
    const timeString = formattedDate.format("HH:mm");
    settime(`${timeString} ${ampm}`);
  };


  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const AddData = {
        visitor_Name,
        number,
        wing,
        unit,
        date:moment(date).format("DD/MM/YYYY"),
        time,
      };
      try {
        // Send data to the backend API using axios
        const response = await axiosInstance.post(
          "/v2/Visitor/addvisitor",
          AddData
        );
        if (response.status===200) {
          console.log("Successfully saved:", response.data);
          onHide(); 
          ClearAllData();
          onVisitorAdded();
          setErrors({});
        } else {
          const errorData = await response.json();
          console.error("Error saving:", errorData.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error creating :", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
          setIsCalendarOpen(false);
        }
      }
    };
  
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [show]);
  
  useEffect(() => {
    const isValid = visitor_Name && wing && unit && date && time;
    setIsFormValid(isValid);
  }, [visitor_Name, wing, unit, date, time]);


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
              value={visitor_Name}
              // onChange={(e) => setFormData({ ...formData, visitor_Name: e.target.value })}
              onChange={(e) => {
                const value = e.target.value;
                // if (nameRegex.test(value) || value === "") {
                if (!!value) {
                  setvisitor_Name(value);
                }
              }}
              isInvalid={!!errors.visitor_Name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.visitor_Name}
            </Form.Control.Feedback>
          </div>

          {/* Phone MailOrPhone */}
          <div>
            <label className="block text-left font-medium text-[#202224] mb-1">
            MailOrPhone<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter MailOrPhone"
              value={number}
              //onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              // value={MailOrPhone}
              onChange={(e) => {
                const value = e.target.value;
                // if (nameRegex.test(value) || value === "") {
                if (!!value) {
                  setnumber(value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
            />
          </div>

          <div className="input-row mb-4">
            <div className="form-field">
              <Form.Label>
                Wing<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Wing"
                value={wing}
                // onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
                onChange={(e) => {
                  const value = e.target.value;
                  // if (nameRegex.test(value) || value === "") {
                  if (!!value) {
                    setwing(value);
                  }
                }}
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
                value={unit}
                // onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                onChange={(e) => {
                  const value = e.target.value;
                  // if (nameRegex.test(value) || value === "") {
                  if (!!value) {
                    setunit(value);
                  }
                }}
                isInvalid={!!errors.unit}
              />
              <Form.Control.Feedback type="invalid">
                {errors.unit}
              </Form.Control.Feedback>
            </div>
          </div>


          {/* Date and Time */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Shift Date<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center relative">
                <DatePicker
                  selected={date}
                  onChange={handleDateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
                  placeholderText="Select Date"
                  dateFormat="dd/MM/yyyy"
                  autoComplete="off"
                  open={isCalendarOpen}
                />
                <i
                  className="fa-solid fa-calendar-days absolute right-3 text-[#202224] cursor-pointer"
                  onClick={handleCalendarIconClick}
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block text-left font-medium text-[#202224] mb-1">
                Shift Time<span className="text-red-500">*</span>
              </label>
                <TimePicker
                value={time ? dayjs(time, "HH:mm") : null}
                onChange={handleTimeChange}
                format="HH:mm"
                suffixIcon={<img src={timeIcon} alt="Time Icon" />} // Custom time icon
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#202224]"
              />
            </div>
          </div>

          {/* <div className="input-row mb-4">
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
          </div> */}

          <div className="button-row py-2">
            <Button variant="light" onClick={onCancel} className="cancel-btn">
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
