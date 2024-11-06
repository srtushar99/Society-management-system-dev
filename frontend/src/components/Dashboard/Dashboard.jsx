import React from 'react';
import Header from './Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './Card/Cards';
import Chart from './Chart/Chart';
import ContactsPage from './Numbers/ContactsPage';
import PendingMaintenance from './Maintenance/PendingMaintenance';
import Complain from '../ComplainList/Complain';
import Activity from '../Activity/Activity';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Cards />

        {/* Flex container for Chart, ContactsPage, and PendingMaintenance */}
        <div className="flex flex-1 space-x-4 p-3">
          <div className="flex-1">
            <Chart />
          </div>
          <div className="flex-1">
            <ContactsPage />
          </div>
          <div className="flex-1">
            <PendingMaintenance />
          </div>
        </div>

        {/* Flex container for Complain and Activity components */}
        <div className="flex space-x-4 p-3 ">
          <div className="flex-1">
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
