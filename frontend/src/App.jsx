import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage'; 
import ForgetPasswordPage from './components/Forget Password/ForgotPasswordPage'; 
import GetOtp from './components/GetOtp/GetOtp';
import ResetPassword from './components/Reset Password/ResetPassword';
import DashBoard from './components/DashBoard/DashBoard';

function App() {
  return (

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/getotp" element={<GetOtp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    
  );
}

export default App;
