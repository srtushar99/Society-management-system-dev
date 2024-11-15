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
import Income from './components/Finacial Management/Income/Income';
import OtherIncome from './components/Finacial Management/Income/OtherIncome';
import Expance from './components/Finacial Management/Expanse/Expanse';
import MemberList from './components/Finacial Management/Income/MemberList';
import Password from 'antd/es/input/Password';
import Facilities from './components/Facilities Management/Facilities';
import NotificationModal from './components/Facilities Management/Notification';
import CreateComplaint from './components/Complaint Tracking/Create Complaint/CreateComplaint';
import RequestTracking from './components/Complaint Tracking/Request Tracking/RequestTracking';
import SecurityGuard from './components/Security Guard/SecurityGuard';
import Resident from './components/Resident Management/Resident';
import Owner from './components/Resident Management/Owner';
import Tenant from './components/Resident Management/Tenant';

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
            <Route path="/income" element={<Income />} />
            <Route path="/otherincome" element={<OtherIncome />} />
            <Route path="/expense" element={<Expance />} />
            <Route path="/memberlist" element={<MemberList />} />
            <Route path="/announcements" element={<Annoucements />} />
            <Route path="/visitorlogs" element={<VisitorLogs />} />
            <Route path="/password" element={<Password />} />
            <Route path="/Facility-Management" element={<Facilities />} />
            <Route path="/createcomplaint" element={<CreateComplaint />} />
            <Route path="/requesttracking" element={<RequestTracking />} />
            <Route path="/notifications" element={<NotificationModal />} />
            <Route path="/securityprotocol" element={<SecurityProtocol />} />
            <Route path="/security-guard" element={<SecurityGuard/>} />
            <Route path="/Resident-Manegement" element={<Resident/>} />
            <Route path="/Owner" element={<Owner/>} />
            <Route path="/tenant" element={<Tenant/>} />
            {/* // <Routes path="/securitygaurd" element={<SecurityGuardTable />} />  */}
        </Routes>
    );
}

export default App;


