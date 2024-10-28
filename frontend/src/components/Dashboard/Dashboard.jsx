import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { DollarSign, ArrowDownCircle, Archive } from 'lucide-react'; // Example icons
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardBox = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
      <div className="text-gray-500 mb-2">{icon}</div>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

const Dashboard = () => {
  const data = [
    { title: 'Total Balance', value: '₹2,22,520', icon: <DollarSign className="h-8 w-8 text-green-500" /> },
    // { title: 'Total Income', value: '₹55,000', icon: <MoneySign className="h-8 w-8 text-blue-500" /> },
    { title: 'Total Expense', value: '₹20,550', icon: <ArrowDownCircle className="h-8 w-8 text-red-500" /> },
    { title: 'Total Unit', value: '20,550', icon: <Archive className="h-8 w-8 text-yellow-500" /> },
  ];

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {data.map((item) => (
            <DashboardBox key={item.title} title={item.title} value={item.value} icon={item.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
