import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Group1000005849 from "../assets/Group 1000005849.png";
import LeftSection2 from '../Leftside/LeftSection2';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (input) => input.endsWith('@gmail.com');

  const handleGetOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your Gmail address.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid Gmail address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ EmailOrPhone: email }),
      });

      if (response.ok) {
        console.log('OTP sent successfully to', email);
        setErrorMessage('');
        // navigate('/getotp', { state: { email } });
         navigate('/getotp', { state: { emailOrPhone: email } });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to send OTP.');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const isEmailValid = validateEmail(email);
  const buttonStyle = isEmailValid 
    ? { background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)', color: '#fff' }
    : { backgroundColor: '#F6F8FB', color: '#A7A7A7' };

  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row">
      {/* Left Section */}
      <LeftSection2 />

      {/* Right Section */}
      <div className="col-md-6 position-relative" style={{ minHeight: '100vh' }}>
        <img
          src={Group1000005849}
          alt="Background"
          className="img-fluid"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ position: 'relative' }}>
          <div className="card p-4 border-0 rounded shadow" style={{ maxWidth: '400px', zIndex: 1 }}>
            <h2 className="mb-4 poppins-semibold text-center">Forgot Password</h2>
            <p className="poppins-regular" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Enter your Gmail address, and we’ll send you an OTP to reset your password.
            </p>
            {/* Email */}
            <form className="m-3" onSubmit={handleGetOtp}>
              <div className="form-group mb-3">
                <label style={{ color: '#202224' }}>
                  Email or Phone<span style={{ color: '#FE512E' }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Gmail address"
                  style={{
                    fontSize: '14px',
                    borderColor: email ? '#202224' : '#D3D3D3',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderRadius: '4px',
                  }}
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* Error Message */}
              {errorMessage && <div className="mb-1" style={{ color: '#E11D29', fontSize: '14px' }}>{errorMessage}</div>}
              {/* Get OTP */}
              <button
                type="submit"
                className="btn w-100"
                style={{ ...buttonStyle, fontWeight: '600' }}
                disabled={!isEmailValid}
              >
                Get OTP
              </button>
            </form>
            {/* Login Page */}
            <div className="text-center mt-3">
              <p>
                Back to{' '}
                <Link to="/" style={{ color: '#FE512E' }} className="text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
