import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import '../Sidebar/sidebar.css';
import Complain from '../../Dashboard/ComplainList/Complain';

import Activity from '../../Dashboard/Activity/Activity';
import ResidentSidebar from '../Resident Sidebar/ResidentSidebar';
import Header from '../../Dashboard/Header/Header';
import Cards from '../../Dashboard/Card/Cards';
import Chart from '../../Dashboard/Chart/Chart';
import ContactsPage from '../../Dashboard/Numbers/ContactsPage';
import PendingMaintenance from '../../Dashboard/Maintenance/PendingMaintenance';

const ResidentDashboard = () => {
  return (
    <div className="d-flex flex-column flex-md-row h-100 bg-light">
      {/* Sidebar */}
      <ResidentSidebar />

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

export default ResidentDashboard;
