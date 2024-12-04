import React, { useState, useEffect } from "react";
import sendMoneyIcon from "../../assets/money-send.png"; // Update with actual path
import receiveMoneyIcon from "../../assets/money-recive.png"; // Update with actual path
import documentIcon from "../../assets/document.png"; // Update with actual path
import buildingIcon from "../../assets/building-4.png";
import "../../Sidebar/sidebar.css";
import axiosInstance from '../../Common/axiosInstance';

const Card = ({ title, amount, icon, color }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg h-[100px] w-full ml-3  2xl:ml-4 sm:mb-4 mb-2 2xl:mt-4 2xl:w-[380px]  flex">
      <div
        style={{
          width: "8px",
          height: "36px",
          backgroundColor: color,
          margin: "auto 0px",
          opacity: 0.5,
        }}
        className="rounded-r-lg  pl-2 ml-2"
      ></div>
      <div className="flex-1 flex justify-between items-center pl-4 mx-2">
        <div className="">
          <div className=" rounded sm: mt-3  2xl:hidden ">
            <img src={icon} alt={title} className="w-8 h-8" />
          </div>
          <span className="text-sm sm:text-lg 2xl:font-semibold  text-gray-800 fs-[10px] sm:mt-2 whitespace-nowrap ">
            {title}
          </span>
          <p className="text-base sm:text-xl font-bold text-gray-700">
            {amount}
          </p>
        </div>
        <div className="bg-gray-100 mr-3 rounded sm:block hidden">
          <img src={icon} alt={title} className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

const Cards = () => {
  const [totalUnit, setTotalUnit] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  
        const fetchTotalUnit = async () => {
          try {
              const response = await axiosInstance.get('/v2/resident/unit/total-residents-count');
              if(response.status === 200){
                setTotalUnit(response.data.TotalResidents);
              }
          } catch (error) {
              console.error('Error fetching fetchTotalUnit:', error);
          }
      };

      const fetchTotalExpense = async () => {
        try {
            const response = await axiosInstance.get('/v2/expenses/expenses/total-amount');
            if(response.status === 200){
              setTotalExpense(response.data.totalAmount);
            }
        } catch (error) {
            console.error('Error fetching fetchTotalExpense:', error);
        }
      };

      const fetchTotalIncome = async () => {
        try {
            const response = await axiosInstance.get('/v2/income/income/total-amount');
            if(response.status === 200){
              setTotalIncome(response.data.totalAmount);
            }
        } catch (error) {
            console.error('Error fetching fetchTotalIncome:', error);
        }
      };



    useEffect(() => {
      fetchTotalUnit();
      fetchTotalExpense();
      fetchTotalIncome();
    }, []);

  return (
    <div className="2xl:flex flex-wrap justify-start mt-4 me-3   2xl:ml-[310px]">
      {/* Total Balance Card */}
      <div className="flex 2xl:flex sm:flex ">
        <Card 
          className=""
          title="Total Balance"
          amount={totalIncome-totalExpense}
          icon={documentIcon}
          color="#FF6A00"
        />

        {/* Total Income Card */}
        <Card
          className=""
          title="Total Income"
          amount={totalIncome}
          icon={receiveMoneyIcon}
          color="#39973D"
        />
      </div>

      {/* Total Expense Card */}
      <div className="flex 2xl:flex sm:flex">
        <Card
          className=""
          title="Total Expense"
          amount={totalExpense}
          icon={sendMoneyIcon}
          color="#869FF3"
        />

        {/* Total Unit Card */}
        <Card
          className="w-[300px]" // Adding specific width for this card
          title="Total Unit"
          amount={totalUnit}
          icon={buildingIcon}
          color="#EB37C3"
        />
      </div>
    </div>
  );
};

export default Cards;
