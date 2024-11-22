import React from 'react';
import Header from './Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './Card/Cards';
import Chart from './Chart/Chart';
import ContactsPage from './Numbers/ContactsPage';
import PendingMaintenance from './Maintenance/PendingMaintenance';
import Complain from './ComplainList/Complain';
import '../Sidebar/sidebar.css';
import Activity from './Activity/Activity';

const Dashboard = () => {
  return (
    <div className="d-flex flex-column flex-md-row h-100 bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 d-flex flex-column">
        <Header />
        <Cards />

        {/* Content Grid: Chart, ContactsPage, and Pending Maintenance */}
        <div className="d-flex flex-column flex-md-row flex-1 px-2">
          <div className="flex-1 mb-3 mb-md-0">
            <Chart />
          </div>
          <div className="flex-1 mb-3 mx-1 mb-md-0">
            <ContactsPage />
          </div>
          <div className="flex-1">
            <PendingMaintenance />
          </div>
        </div>

        {/* Content Grid: Complain List and Activity */}
        <div className="d-flex flex-column flex-md-row flex-1 p-2">
          <div className="flex-1 mb-3 mb-md-0">
            <Complain />
          </div>
          <div className="flex-1">
            <Activity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
