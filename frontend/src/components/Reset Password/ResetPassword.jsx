import React, { useState } from 'react';
import LeftSection2 from '../Leftside/LeftSection2';
import Group1000005849 from '../assets/Group 1000005849.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const validatePasswords = () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Both fields are required.");
      return false;
    }
    if (newPassword.length < 8 && !passwordValidationRegex.test(newPassword)) {
      setErrorMessage("Password must be at least 8 characters, including at least one letter, one number, and one special character.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      console.log('Resetting password to:', newPassword);
      // Add password reset logic here
    }
  };

  const isFormValid = newPassword && confirmPassword;

  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row">
      <LeftSection2 />
      <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ position: 'relative', zIndex: 1 }}>
        <img src={Group1000005849} alt="Background" className="img-fluid" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="card p-4 border-0 rounded shadow" style={{ width: '90%', maxWidth: '400px' }}>
          <h2 className="mb-4 poppins-semibold">Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <div className="form-group mb-3 position-relative">
              <label style={{ color: "#202224" }}>New Password<span style={{ color: "#FE512E" }}>*</span></label>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control" 
                placeholder="Enter New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                style={{ borderColor: newPassword ? '#202224' : '#D3D3D3' }} 
              />
              <span className="position-absolute" style={{ right: '10px', top: '30px', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} style={{ color: newPassword ? '#202224' : '#A7A7A7' }}></i>
              </span>
            </div>

            <div className="form-group mb-3 position-relative">
              <label style={{ color: "#202224" }}>Confirm Password<span style={{ color: "#FE512E" }}>*</span></label>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control" 
                placeholder="Enter Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                style={{ borderColor: confirmPassword ? '#202224' : '#D3D3D3' }} 
              />
              <span className="position-absolute" style={{ right: '10px', top: '30px', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} style={{ color: confirmPassword ? '#202224' : '#A7A7A7' }}></i>
              </span>
            </div>

            {errorMessage && <div className="mb-1" style={{ color: "#E74C3C", fontSize: '14px' }}>{errorMessage}</div>}
            <button 
              type="submit" 
              className="btn w-100" 
              style={{ background: isFormValid ? 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)' : '#F6F8FB', color: isFormValid ? '#fff' : '#A7A7A7', fontWeight: "600" }} 
              disabled={!isFormValid}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
