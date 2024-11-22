import React from 'react';
import sendMoneyIcon from '../../assets/money-send.png'; // Update with actual path
import receiveMoneyIcon from '../../assets/money-recive.png'; // Update with actual path
import documentIcon from '../../assets/document.png'; // Update with actual path
import buildingIcon from '../../assets/building-4.png'; 
import '../../Sidebar/sidebar.css';

const Card = ({ title, amount, icon, color }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg h-[100px]   sm:ml-10 lg:ml-8 mb-4 mt-2 w-full sm:w-[340px] lg:w-[360px] flex">
      <div
        style={{
          width: '8px',
          height: '36px',
          backgroundColor: color,
          margin:"auto 0px",
          opacity: 0.5,
         
        }}
        className="rounded-r-lg lg:mt-3 pl-2 ml-2"
      ></div>
      <div className="flex-1 flex justify-between items-center pl-4 mx-2">
        <div className=''>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-base sm:text-xl  font-bold text-gray-700">{amount}</p>
        </div>
        <div className="bg-gray-100 mr-3 rounded">
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
    <div className="flex flex-wrap justify-center mt-4 me-3 sm:ml-4 md:ml-15 lg:ml-16 xl:ml-64 ">
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