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
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 ">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
     < div className="flex-1 flex flex-col w-full">
    <Header />
    <Cards />

    <div className="flex flex-col md:flex-row flex-1 md:space-x-2 p-2  w-full">
      <div className="flex-1 mb-[120px] md:mb-2">
        <Chart />
      </div>
      <div className="flex-1 mb-2 sm:mb-4">
        <ContactsPage />
      </div>
      <div className="flex-1 md:mb-0">
        <PendingMaintenance />
      </div>
    </div>

    <div className="flex flex-col md:flex-row flex-1 lg:ml-[0]  md:ml-[400px] md:space-x-4  p-2">
      <div className="flex-1 mb-3 md:mb-0 ">
        <Complain />
      </div>
      <div className="flex-1 md:mb-0">
        <Activity />
      </div>
    </div>
  </div>
</div>
  
  );
};

export default Dashboard;
