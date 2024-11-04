import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from '../Card/Cards';



const Dashboard = () => {


  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1">
        <Header />
          <Cards/>
      </div>
    </div>
  );
};

export default Dashboard;
