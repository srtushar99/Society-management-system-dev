import React from 'react';
import Header from './Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './Card/Cards';
import Chart from './Chart/Chart';
import ContactsPage from './Numbers/ContactsPage';
import PendingMaintenance from './Maintenance/PendingMaintenance';
import Complain from './ComplainList/Complain';
import Activity from './Activity/Activity';


const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex  flex-col">
        <Header  />
        <Cards />

        {/* Flex container for Chart, ContactsPage, and PendingMaintenance */}
        <div className="flex flex-col md:flex-row flex-1 space-x-0 md:space-x-4 p-2">
            <Chart />
          <div className="flex-1 mb-[180px] md:mb-0">
          </div>
            <ContactsPage />
          <div className="flex-1 mb-4 md:mb-0">
          </div>
            <PendingMaintenance />
          <div className="flex-1 mb-4 md:mb-0">
          </div>
        </div>

        {/* Flex container for Complain and Activity components */}
        <div className="flex flex-col md:flex-row mt-2 space-x-2 md:space-x-4 p-2">
            <Complain />
            <Activity />
          
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;