import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage'; 
import ForgetPasswordPage from './components/Forget Password/ForgotPasswordPage'; 
import GetOtp from './components/GetOtp/GetOtp';
import ResetPassword from './components/Reset Password/ResetPassword';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/getotp" element={<GetOtp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
            </div>
        </Router>
    );
}

export default App;

