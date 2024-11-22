import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Group1000005849 from '../assets/Group 1000005849.png';
import LeftSection2 from '../Leftside/LeftSection2';

const GetOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { emailOrPhone } = location.state || {}; // Extract email or phone from location state
  const [otp, setOtp] = useState(Array(6).fill('')); // OTP input state, default to 6 empty strings
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages
  const [timer, setTimer] = useState(30); // Timer for OTP countdown
  const [otpSent, setOtpSent] = useState(false); // To ensure OTP is only sent once
  const [isOtpWrong, setIsOtpWrong] = useState(false); // To track if OTP is incorrect

  useEffect(() => {
    // Start the timer when OTP is sent or email/phone is provided
    if (emailOrPhone && !otpSent) {
      console.log('Sending OTP to', emailOrPhone); // Debugging: ensure emailOrPhone is correct
      setOtpSent(true); // Set OTP as sent
      startTimer(); // Start the timer for OTP expiry
    }
    return () => {
      // Cleanup timer interval on component unmount
      clearInterval(intervalRef.current);
    };
  }, [emailOrPhone, otpSent]);

  const intervalRef = React.useRef(null); // Create a reference for the interval

  // Start countdown timer
  const startTimer = () => {
    setTimer(30); // Reset the timer to 30 seconds
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current); // Clear the interval when timer reaches 0
          return 0; // Stop the countdown
        }
        return prev - 1; // Decrease timer by 1 every second
      });
    }, 1000);
  };

  // Handle OTP input change
  const handleChangeOtp = (index, value) => {
    if (/^\d?$/.test(value)) { // Only allow single digits
      const newOtp = [...otp];
      newOtp[index] = value; // Update OTP state at specific index
      setOtp(newOtp);

      // Automatically focus next input if current input is filled, or previous if cleared
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      } else if (!value && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
      
      setIsOtpWrong(false); // Reset error state
      setErrorMessage(''); // Reset error message
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join(''); // Join OTP digits into a single string

    // Debugging: Log emailOrPhone and OTP before sending
    console.log('Email/Phone:', emailOrPhone);
    console.log('Entered OTP:', enteredOtp);

    // Validate if email/phone and OTP are provided
    if (!emailOrPhone || !enteredOtp) {
      setErrorMessage('Missing email or OTP.');
      return;
    }

    try {
      // Send OTP verification request to the backend
      const response = await fetch('http://localhost:5000/api/v1/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ EmailOrPhone: emailOrPhone, otp: enteredOtp }), // Send email/phone and OTP
      });

      // Debugging: log response status and data
      console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);

      // Handle response
      if (response.ok) {
        console.log('OTP verified successfully');
        // navigate('/resetpassword'); // Navigate to reset password page
        navigate('/resetpassword', { state: { email: emailOrPhone } });
      } else {
        const errorData = await response.json(); // Parse error message from response
        console.log('Error Response:', errorData);
        setIsOtpWrong(true); // Set OTP as incorrect
        setErrorMessage(errorData.message || 'Invalid OTP.');
      }
    } catch (error) {
      // Handle fetch errors
      setIsOtpWrong(true);
      setErrorMessage('Error verifying OTP: ' + error.message);
    }
  };

  // Check if OTP input is completely filled
  const isOtpFilled = otp.every((value) => value !== '');

  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row p-0">
      {/* Left Section */}
      <LeftSection2 />
      
      {/* Right Section */}
      <div className="col-md-6 d-flex justify-content-center align-items-center p-4" 
           style={{ backgroundImage: `url(${Group1000005849})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="card p-4 border-0 rounded" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          {/* Enter OTP */}
          <h2 className="mb-4 poppins-semibold text-center">Enter OTP</h2>
          <p className="poppins-regular" style={{ height: "21px", fontSize: "11px", lineHeight: "15px" }}>
            Please enter the 6-digit code sent to your email.
          </p>
          
          {/* OTP Inputs */}
          <div className="d-flex justify-content-between mb-2 flex-wrap">
            {otp.map((value, index) => (
              <input 
                key={index} 
                id={`otp-input-${index}`} 
                type="text" 
                value={value} 
                onChange={(e) => handleChangeOtp(index, e.target.value)} 
                style={{
                  width: '40px',
                  height: '40px',
                  textAlign: 'center',
                  fontSize: '15px',
                  border: `1px solid ${isOtpWrong ? '#E11D29' : value ? '#202224' : '#D3D3D3'}`,
                  borderRadius: "5px",
                  backgroundColor: '#FFF',
                  color: isOtpWrong ? '#E11D29' : '#000'
                }} 
                maxLength="1" 
              />
            ))}
          </div>
          
          {/* Error message */}
          {errorMessage && <div className="mb-1 text-danger" style={{ fontSize: '14px' }}>{errorMessage}</div>}

          {/* Timer */}
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex align-items-center">
              <i className="fa-regular fa-clock me-2"></i>
              <span style={{ color: '#202224', fontSize: '14px' }}>00:{timer < 10 ? `0${timer}` : timer} sec</span>
            </div>

            {/* Resend OTP */}
            <Link to="/forgetpassword" className="btn btn-link" style={{ color: '#E74C3C', textDecoration: "none" }} onClick={() => startTimer()}>
              Resend OTP
            </Link>
          </div>
          
          {/* Verify Button */}
          <button 
            onClick={handleVerifyOtp} 
            className="btn w-100" 
            style={{
              background: isOtpFilled ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)' : '#F6F8FB', 
              color: isOtpFilled ? '#FFFFFF' : '#A7A7A7'
            }} 
            disabled={!isOtpFilled}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetOtp;
