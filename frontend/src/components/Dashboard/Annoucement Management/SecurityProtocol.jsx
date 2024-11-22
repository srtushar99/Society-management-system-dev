import React from 'react';
import moment from 'moment';

function SecurityProtocol({ isOpen, onClose, noteData }) {
  if (!isOpen) return null;

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
        <h2 className="text-xl font-bold mb-2">View Security Protocol</h2>
        <div className="border-[1px] border-gray-300 mt-2"></div> {/* This is the horizontal line */}
        <div className="mt-4">
          <p className="text-[#A7A7A7]  mb-1">Title</p>
          <p>{!!noteData.Announcement_Title ? noteData.Announcement_Title : " "}</p>
        </div>
        <div className="mt-4">
          <p className=" text-[#A7A7A7]  mb-1">Description</p>
          <p>{!!noteData.Description ? noteData.Description : " "}</p>
        </div>
        <div className="mt-4  flex justify-start">
          <div>
            <p className="text-[#A7A7A7]  mb-1">Date</p>
            <p>{!!noteData.Announcement_Date ? moment(noteData.Announcement_Date).format('DD/MM/YYYY') : " "}</p>
          </div>
          <div>
            <p className="text-[#A7A7A7]  ml-10 mb-1">Time</p>
            <p className="  ml-10 ">{!!noteData.Announcement_Time ? noteData.Announcement_Time : " "}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SecurityProtocol;
