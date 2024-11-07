import { Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import React from 'react';
import LoginPage from './components/LoginPage/LoginPage'; 
import ForgetPasswordPage from './components/Forget Password/ForgotPasswordPage'; 
import GetOtp from './components/GetOtp/GetOtp';
import ResetPassword from './components/Reset Password/ResetPassword';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard/Dashboard';
import AddNumber from './components/Dashboard/Numbers/AddNumber';
import NoNotification from './components/Dashboard/Notification/NoNotification';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registerForm" element={<RegisterForm />} />
            <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
            <Route path="/getotp" element={<GetOtp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
          
          

          

        </Routes>
    );
}

export default App;


