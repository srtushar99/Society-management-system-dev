import React, { useState, useEffect } from 'react';
import Group1000005849 from '../assets/Group 1000005849.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import LeftSection from '../Leftside/LeftSection';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const validateEmail = (email) => email.endsWith('@gmail.com');
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleLogin = (e) => {
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
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    if (password !== 'correctPassword') {
      setErrorMessage('Incorrect password');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('savedEmail', email);
    } else {
      localStorage.removeItem('savedEmail');
    }

    setErrorMessage('');
    console.log('Logging in with', { email, password, rememberMe });
  };

  const buttonStyle = email && password 
    ? { background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)', color: '#fff' } 
    : { backgroundColor: '#F4F4F4', color: '#A7A7A7' };

  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row">
      {/* Left Section */}
        <LeftSection />

        {/* Right Section */}
      <div className="col-md-6 d-flex justify-content-center align-items-center position-relative">
        <img src={Group1000005849} alt="Background" className="img-fluid" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="card p-4 border-0 rounded shadow" style={{ width: '90%', maxWidth: '400px', zIndex: 1 }}>

          {/* Login Page */}
          <h2 className="mb-4 poppins-semibold text-center">Login</h2>
          <form className='m-3' onSubmit={handleLogin}>
            {/* Email */}
            <div className="form-group mb-3">
              <label style={{ color: "#202224" }}>Email<span style={{ color: "#FE512E" }}>*</span></label>
              <input type="text" className="form-control" placeholder="Enter your email" style={{ fontSize: "14px" }}  value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            {/* Password  */}
            <div className="form-group mb-1 position-relative">
              <label style={{ color: "#202224" }}>Password<span style={{ color: "#FE512E" }}>*</span></label>
              <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Enter your password"  style={{ fontSize: "14px" }}  value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span className="position-absolute" style={{ right: '10px', top: '30px', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)} ><i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i></span>
            </div>

            {errorMessage && <div className="mb-1" style={{ color: "#E74C3C", fontSize:'14px' }}>{errorMessage}</div>}
            
            <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
              {/* Remember Me */}
              <div className="form-check mb-0">
                <input className="form-check-input" type="checkbox" id="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                <label className="form-check-label" style={{ color: "#A7A7A7" }} htmlFor="rememberMe">Remember me</label>
              </div>
              {/* Forgot Password */}
              <Link to='/forgetpassword' style={{ color: "#FE512E", fontSize: "14px",textDecoration:"none" }}>Forgot Password?</Link>
            </div>
              {/* Sign In */}
            <button type="submit" className="btn w-100" style={{ ...buttonStyle, fontWeight: "600" }}>Sign In</button>
          </form>
            {/* Register */}
          <div className="text-center mt-3">
             <p>Don’t have an account?{' '}<Link style={{ color: "#FE512E",textDecoration:"none" }} href="/register">Registration</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
