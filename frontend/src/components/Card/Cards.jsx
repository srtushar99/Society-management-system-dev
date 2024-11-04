import React from 'react';

const Card = ({ title, amount, icon, color }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-64 flex">
      <div className={`w-2 rounded-l-lg ${color}`}></div>
      <div className="flex-1 flex justify-between items-center pl-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-xl font-bold text-gray-700">{amount}</p>
        </div>
        <i className={`fas ${icon} text-4xl text-blue-600`}></i>
      </div>
    </div>
  );
};

const Cards = () => {
  const data = [
    { title: 'Total Balance', amount: '₹2,22,520', icon: 'fa-wallet', color: '#' },
    { title: 'Total Income', amount: '₹55,000', icon: 'fa-money-bill-wave', color: 'bg-blue-500' },
    { title: 'Total Expense', amount: '₹20,550', icon: 'fa-credit-card', color: 'bg-red-500' },
    { title: 'Total Unit', amount: '20,550', icon: 'fa-box', color: 'bg-yellow-500' },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((item, index) => (
        <Card 
          key={index} 
          title={item.title} 
          amount={item.amount} 
          icon={item.icon} 
          color={item.color} 
        />
      ))}
    </div>
  );
};

export default Cards;
