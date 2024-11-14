import React from 'react';
import { X, FileText, Download } from 'lucide-react';

function ViewExpense({ isOpen, onClose, expense }) {
  if (!isOpen || !expense) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">View Expense Details</h2>
          <button className="text-gray-600 hover:text-gray-900" onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="border-b border-gray-200 mb-4"></div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Title</p>
            <p className="font-medium">{expense.title}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Description</p>
            <p>{expense.description}</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <p>{expense.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Amount</p>
              <p className="bg-gray-100 px-3 py-1 rounded-full">₹{expense.Amount}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Bill</p>
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-medium mb-2 ">Adharcard Front Side.JPG</p>
                  <p className="text-sm text-gray-500">3.5 MB</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-600">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewExpense;