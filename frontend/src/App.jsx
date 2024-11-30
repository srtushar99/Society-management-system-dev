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
import OwnerPage from './components/Resident Management/OwnerPage';
import TenantPage from './components/Resident Management/TenantPage';
import VacatePage from './components/Resident Management/VacatePage';
 import EditOwner from './components/Resident Management/EditOwner';
 import EditTenant from './components/Resident Management/EditTenant';
import VisitorTracking from './components/SecurityRole/VisitorTracking';
import AddVisitorModal from './components/SecurityRole/AddVisitorModal';
import EmergencyManagement from './components/Dashboard/Emergency/EmergencyManagement';
import ResidentSidebar from './components/Resident Role/Resident Sidebar/ResidentSidebar';
import ResidentHeader from './components/Resident Role/Resident Header/ResidentHeader';
import ResidentDashboard from './components/Resident Role/Dashboard/residentDashboard';
import PersonalDetail from './components/Resident Role/Personal Detail/PersonalOwner';
import AccessForums from './components/Resident Role/Comunity/Access Forums/AccessForums';
import Polls from './components/Resident Role/Comunity/Polls/Polls';
import CommunitiesDiscussion from './components/Resident Role/Comunity/Communities Discussion/CommunitiesDiscussion';
// import ServiceAndComplaint from './components/Resident Role/Service And Complaint/ServiceAndComplaint';
import MaintenanceInvoices from './components/Resident Role/Payment Portal/Maintenance Invoices/MaintenanceInvoices';
import OtherIncomeInvoice from './components/Resident Role/Payment Portal/Other Income Invoice/OtherIncomeInvoice';
import SecurityProtocols from './components/Resident Role/Security Protocols/SecurityProtocols';
import EventsParticipation from './components/Resident Role/Events Participation/Event Participate/EventsParticipation';
import Complain from './components/Dashboard/ComplainList/Complain';
import ComplainSubmission from './components/Resident Role/Service And Complaint/Complaint Submission/ComplainSubmission';
import RequestSubmission from './components/Resident Role/Service And Complaint/Request Submission/RequestSubmission';
import Activity from './components/Resident Role/Events Participation/Activity Participate/Activity';
import Viewmaintenence from './components/Resident Role/Payment Portal/Maintenance Invoices/Viewmaintenence';
import { MaintenanceTable } from './components/Resident Role/Payment Portal/Maintenance Invoices/MaintenanceTable';
import PersonalTenant from './components/Resident Role/Personal Detail/PersonalTenant';
// import UpdateMaintenance from './components/Resident Role/Dashboard/Notification Panel/UpdateMaintenance';




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
            <Route path="/ownerpage" element={<OwnerPage/>} />
            <Route path="/vacate" element={<VacatePage />} />
            <Route path="/tenantpage" element={<TenantPage/>} />
           <Route path="/editowner" element={<EditOwner/>} /> 
           <Route path="/edittenant" element={<EditTenant/>} /> 
       
      
         
           
            <Route path="/visitorTracking" element={<VisitorTracking/>} />
            <Route path="/addvisitor" element={<AddVisitorModal/>} />
            <Route path="/emergency" element={<EmergencyManagement/>} />
            

            <Route path="/residentsidebar" element={<ResidentSidebar/>} />
            <Route path="/residentheader" element={<ResidentHeader/>} />
            <Route path="ResidentDashboard" element={<ResidentDashboard/>} />
            <Route path="PersonalDetail" element={<PersonalDetail/>} />
            <Route path="TenantDetail" element={<PersonalTenant/>} />
            <Route path="AccessForums" element={<AccessForums/>} />
            <Route path="Polls" element={<Polls/>} />
            <Route path="CommunitiesDiscussion" element={<CommunitiesDiscussion/>} />
            <Route path="/complain" element={<ComplainSubmission/>} />
            
            <Route path="/Request" element={<RequestSubmission/>} />
    

            <Route path="MaintenanceInvoices" element={<MaintenanceInvoices/>} />
            <Route path="OtherIncomeInvoice" element={<OtherIncomeInvoice/>} />
            <Route path="SecurityProtocols" element={<SecurityProtocols/>} />
            <Route path="/EventsParticipation" element={<EventsParticipation/>} />
            <Route path="/activity" element={<Activity/>} />
            <Route path="/MaintenanceTable" element={<MaintenanceTable/>} />
            
        </Routes>
    );
}

export default App;


