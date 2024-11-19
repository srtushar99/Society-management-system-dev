import React, { useEffect, useState } from 'react';
import { X, FileText, Download } from 'lucide-react';
import moment from 'moment';
import axios from 'axios';

function ViewExpense({ isOpen, onClose, expense }) {
  const [file_Name, setFileName] = useState("");
  const [file_Size, setFileSize] = useState("");

  const processUploadBill = async (url) => {
    const fileName = url.substring(url.lastIndexOf('/') + 1);

    try {
      const response = await axios.head(url);
      const fileSizeBytes = response.headers['content-length'];
      const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);

      setFileName(fileName);
      setFileSize(fileSizeMB);
    } catch (error) {
      console.error("Error fetching file metadata:", error.message);
      setFileName(fileName);
      setFileSize("Unknown");
    }
  };

  useEffect(() => {
    if (expense && expense.Upload_Bill) {
      processUploadBill(expense.Upload_Bill);
    }
  }, [expense]);

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
            <p className="font-medium">{expense.Title}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Description</p>
            <p>{expense.Description}</p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <p>{moment(expense.Date).format("DD/MM/YYYY")}</p>
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
                  <p className="font-medium mb-2">{file_Name}</p>
                  <p className="text-sm text-gray-500">{file_Size} MB</p>
                </div>
              </div>
              <a href={expense.Upload_Bill} download className="text-blue-500 hover:text-blue-600">
                <Download className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewExpense;
