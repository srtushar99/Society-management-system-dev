import React from 'react';
import Header from './Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './Card/Cards';
import Chart from './Chart/Chart';
import ContactsPage from './Numbers/ContactsPage';

import PendingMaintenance from './Maintenance/PendingMaintenance';
import Complain from '../ComplainList/Complain';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Cards />
        <div className="flex "> {/* Flex container for Chart and ContactsPage */}
          <div className="d-flex"> {/* Chart container */}
            <Chart />
            <ContactsPage />
            <PendingMaintenance/>
          </div>
          <Complain/>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
