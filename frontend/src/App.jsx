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
import EditProfile from './components/Dashboard/EditProfile/EditProfile';
import UpdateProfile from './components/Dashboard/EditProfile/UpdateProfile';
import Note from './components/Finacial Management/Note/Note';
import Annoucements from './components/Dashboard/Annoucement Management/Announcements';

import VisitorLogs from './components/Security Management/VisitiorLogs';
import SecurityProtocol from './components/Security Management/SecurityProtocol';

// import SecurityGuardTable from './components/SecurityGaurd/SecurityGuardTable';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/registerForm" element={<RegisterForm />} />
            <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
            <Route path="/getotp" element={<GetOtp />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/notes" element={<Note />} />
            <Route path="/announcements" element={<Annoucements />} />
            <Route path="/visitorlogs" element={<VisitorLogs />} />
            <Route path="/securityprotocol" element={<SecurityProtocol />} />
            {/* <Route path="/securitygaurd" element={<SecurityGuardTable />} /> */}

          
          

          

        </Routes>
    );
}

export default App;


