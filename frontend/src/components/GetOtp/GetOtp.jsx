// GetOtp.js

import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Group1000005849 from '../assets/Group 1000005849.png';
import LeftSection2 from '../Leftside/LeftSection2';

const GetOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { emailOrPhone } = location.state || {};
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpWrong, setIsOtpWrong] = useState(false);

  useEffect(() => {
    if (emailOrPhone && !otpSent) {
      console.log('Sending OTP to', emailOrPhone);
      setOtpSent(true);
      startTimer();
    }
  }, [emailOrPhone, otpSent]);

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0; 
        }
        return prev - 1; 
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleChangeOtp = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      } else if (!value && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
      
      setIsOtpWrong(false);
      setErrorMessage('');
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');

    if (!emailOrPhone || !enteredOtp) {
      setErrorMessage('Missing email or OTP.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ EmailOrPhone: emailOrPhone, otp: enteredOtp }),
      });

      if (response.ok) {
        console.log('OTP verified successfully');
        navigate('/resetpassword'); // Navigate to reset password page
      } else {
        const errorData = await response.json();
        setIsOtpWrong(true);
        setErrorMessage(errorData.message || 'Invalid OTP.');
      }
    } catch (error) {
      setIsOtpWrong(true);
      setErrorMessage('Error verifying OTP: ' + error.message);
    }
  };

  const isOtpFilled = otp.every((value) => value !== '');

  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row p-0">
      {/* Left Section */}
      <LeftSection2 />
      
      {/* Right Section */}
      <div className="col-md-6 d-flex justify-content-center align-items-center p-4" style={{ backgroundImage: `url(${Group1000005849})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="card p-4 border-0 rounded" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          {/* Enter OTP */}
          <h2 className="mb-4 poppins-semibold text-center">Enter OTP</h2>
          <p className="poppins-regular" style={{ height: "21px", fontSize: "11px", lineHeight: "15px" }}>
            Please enter the 6-digit code sent to your email.
          </p>
          
          {/* OTP Inputs */}
          <div className="d-flex justify-content-between mb-2 flex-wrap">
            {otp.map((value, index) => (
              <input key={index} id={`otp-input-${index}`} type="text" value={value} onChange={(e) => handleChangeOtp(index, e.target.value)} style={{ width: '40px', height: '40px', textAlign: 'center', fontSize: '15px', border: `1px solid ${isOtpWrong ? '#E11D29' : value ? '#202224' : '#D3D3D3'}`, borderRadius: "5px", backgroundColor: '#FFF', color: isOtpWrong ? '#E11D29' : '#000'}} maxLength="1" />
            ))}
          </div>
          {errorMessage && <div className="mb-1 text-danger" style={{ fontSize: '14px' }}>{errorMessage}</div>}
          
          {/* Timer */}
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center">
              <i className="fa-regular fa-clock me-2"></i>
              <span style={{ color: '#202224', fontSize: '14px' }}>00:{timer < 10 ? `0${timer}` : timer} sec</span>
            </div>

            {/* Resend OTP */}
            <Link to="/forgetpassword" className="btn btn-link" style={{ color: '#E74C3C', textDecoration: "none" }}>
              Resend OTP
            </Link>
          </div>
          
          {/* Verify Button */}
          <button onClick={handleVerifyOtp} className="btn w-100" style={{ background: isOtpFilled ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)' : '#F6F8FB', color: isOtpFilled ? '#FFFFFF' : '#A7A7A7' }} disabled={!isOtpFilled}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetOtp;
