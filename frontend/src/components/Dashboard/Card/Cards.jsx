import React from 'react';

import sendMoneyIcon from '../../assets/money-send.png'; // Update with actual path
import receiveMoneyIcon from '../../assets/money-recive.png'; // Update with actual path
import documentIcon from '../../assets/document.png'; // Update with actual path
import buildingIcon from '../../assets/building-4.png'; // Update with actual path

const Card = ({ title, amount, icon, color }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg h-[100px] p-6 ms-5  mb-1 mt-2 w-[350px] flex">
      <div
        style={{
          width: '8px',
          height: '36px',
          backgroundColor: color,
          marginTop: "10px",
          opacity: 0.7, // Adjust opacity here
        }}
        className="rounded-r-lg"
      ></div>
      <div className="flex-1 flex justify-between items-center pl-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-xl font-bold text-gray-700">{amount}</p>
        </div>
        {/* Icon with background */}
        <div className="bg-gray-100 p-2 rounded">
          <img src={icon} alt={title} className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

const Cards = () => {
  const data = [
    { title: 'Total Balance', amount: '₹2,22,520', icon: documentIcon, color: '#FF6A00' },
    { title: 'Total Income', amount: '₹55,000', icon: receiveMoneyIcon, color: '#39973D' },
    { title: 'Total Expense', amount: '₹20,550', icon: sendMoneyIcon, color: '#869FF3' },
    { title: 'Total Unit', amount: '20,550', icon: buildingIcon, color: '#EB37C3' },
  ];

  return (
    <div className="flex flex-wrap justify-center mt-1 ml-64"> 
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
