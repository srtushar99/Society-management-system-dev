import React from 'react';

function ViewExpense({ isOpen, onClose,expense }) {
  if (!isOpen || !expense) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-md p-3 w-96">
        <div className="flex justify-end">
          <button className="text-gray-600 hover:text-gray-900" onClick={onClose}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h2 className="text-xl font-bold mb-2">View Expenses Details</h2>
        <div className="border-[1px] border-gray-300 mt-2"></div> {/* This is the horizontal line */}
        <div className="mt-4">
          <p className="text-[#A7A7A7]  mb-1">Title</p>
          <p>{expense.title}</p>
        </div>
        <div className="mt-4">
          <p className=" text-[#A7A7A7]  mb-1">Description</p>
          <p>{expense.description}</p>
      
        </div>
        <div className="mt-4  flex justify-start">
          <div>
            <p className="text-[#A7A7A7]  mb-1">Date</p>
            <p>{expense.date}</p>
          </div>
          <div>
            <p className="text-[#A7A7A7]  ml-10 mb-1">Amount</p>
            <p className=" ml-10 ps-3 pe-3 rounded-3xl bg-gray-200 p-1 ">₹{expense.Amount}</p>
          </div>
        </div>

        {/* Horizontal Line */}
      
      </div>
    </div>
  );
}

export default ViewExpense;
