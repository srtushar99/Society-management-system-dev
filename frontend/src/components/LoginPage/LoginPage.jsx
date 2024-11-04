import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Group1000005849 from '../assets/Group 1000005849.png';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import LeftSection from '../Leftside/LeftSection';
import './LoginPage.css';
// import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const validateEmail = (email) => email.endsWith('@gmail.com');
  const validatePassword = (password) => password.length >= 8;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter a valid email and password.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid Gmail address.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', {
        email,
        password,
      });

      if (response.data.token) {
        setErrorMessage('');
        if (rememberMe) {
          localStorage.setItem('savedEmail', email);
        }
        navigate('/dashboard');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Failed to log in. Please try again.');
      } else if (error.request) {
        setErrorMessage('No response from server. Please check your connection.');
      } else {
        setErrorMessage('Failed to log in. Please try again.');
      }
    }
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const buttonStyle = isEmailValid && isPasswordValid
    ? { background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)', color: '#fff' }
    : { backgroundColor: '#F6F8FB', color: '#A7A7A7' };

  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row">
      {/* Left Section */}
      <LeftSection />
      <div className="col-md-6 d-flex justify-content-center align-items-center position-relative">
        <img src={Group1000005849} alt="Background" className="img-fluid" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        {/* Login */}
        <div className="card p-4 border-0 rounded shadow" style={{ width: '90%', maxWidth: '400px', zIndex: 1 }}>
          <h2 className="mb-4 poppins-semibold text-center">Login</h2>
          <form className='m-3' onSubmit={handleLogin}>
            {/* Email */}
            <div className="form-group mb-3">
              <label style={{ color: "#202224" }}>Email<span style={{ color: "#FE512E" }}>*</span></label>
              <input type="text" className="form-control" placeholder="Enter your email" style={{ fontSize: "14px" }}  value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            {/* Password */}
            <div className="form-group mb-1 position-relative">
              <label style={{ color: "#202224" }}>Password<span style={{ color: "#FE512E" }}>*</span></label>
              <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Enter your password"  style={{ fontSize: "14px" }}  value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span className="position-absolute" style={{ right: '10px', top: '30px', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}><i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
              {/* Error Message */}
            {errorMessage && <div className="mb-1" style={{ color: "#E74C3C", fontSize: '14px' }}>{errorMessage}</div>}
            {/* Remember Me */}
            <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
              <div className="form-check mb-0">
                <input className="form-check-input" type="checkbox" id="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                <label className="form-check-label" style={{ color: "#A7A7A7" }} htmlFor="rememberMe">Remember me</label>
              </div>
              {/* Forget Password */}
              <Link to='/forgetpassword' style={{ color: "#FE512E", fontSize: "14px", textDecoration: "none" }}>Forgot Password?</Link>
            </div>
            
            {/* Sign In Button */}
            <button type="submit" className="btn w-100" style={{ ...buttonStyle, fontWeight: "600" }} disabled={!isEmailValid || !isPasswordValid}>Sign In</button>
          </form> 

          {/* Register Button */}
          <div className="text-center mt-3">
            <p>Don’t have an account?{' '}<Link style={{ color: "#FE512E", textDecoration: "none" }} to="/register">Registration</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;