import React from "react";

import AvatarImage from "../assets/Avatar.png";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import gallary from '../assets/gallery.png';
import document from '../assets/document.png';
import view from '../assets/eye.png'

const ViewTenant =({ isOpen, onClose, tenant }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    // Trigger the onClose function passed as a prop
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-end items-start">
      <div className="bg-white shadow-md rounded-md p-3 w-96">
        {/* <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm"> */}
        <div className="flex items-center gap-4">
          <Link to="/Resident-Manegement" className="text-gray-700" onClick={handleClose}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold">View Tenant Details</h1>
        </div>
        {/* </div> */}

        <div className="  items-center gap-4 mb-8">
          <img
            src={AvatarImage || "/fallback-avatar.png"}
            alt={tenant.Name || "Unknown"}
            className="w-16 ml-[150px] h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold ml-[120px] text-lg text-gray-900">
              {tenant.Name || "Unknown"}
            </h2>

            <p className="text-gray-600 ml-[100px]">RogerLubin@gmail.com</p>
          </div>
        </div>

        <div className="mx-2 rounded-lg bg-white p-2 shadow-sm">
          <div className="grid  ">
            <div className="flex ">
              <p className=" text-bold  text-black">Wing</p>
              <span className=" ml-[280px]  font-medium">A</span>
            </div>
            <div className="flex">
              <p className="text-bold  text-black">Unit</p>
              <p className="  ml-[280px] font-medium">101</p>
            </div>
            <div className="flex">
              <p className="text-bold  text-black">Age</p>
              <p className="  ml-[280px] font-medium">20</p>
            </div>
            <div className="flex">
              <p className="text-bold  text-black">Gender</p>
              <p className="  ml-[240px] font-medium">Male</p>
            </div>
          </div>
        </div>
        <div className="mx-2 mt-3">
        <h3 className="mb-2 text-lg font-semibold">Document</h3>
        <div className="">
          <div className="flex items-center justify-between rounded-lg bg-white  shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <img src={gallary} alt="JPG icon" width={20} height={20} />
              </div>
              <div>
                <p className="font-medium">Adharcard Front Side.JPG</p>
                <p className="text-sm text-gray-500">3.5 MB</p>
              </div>
            </div>
            <img src={view} className="h-5 w-5 text-gray-400" />

          </div>
          <div className="flex items-center justify-between rounded-lg bg-white  shadow-sm">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-red-50 p-2">
                <img src={document} alt="PDF icon" width={20} height={20} />
              </div>
              <div>
                <p className="font-medium">Address Proof Front Side.PDF</p>
                <p className="text-sm text-gray-500">3.5 MB</p>
              </div>
            </div>
            <img src={view} className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>    
      <div className="mx-2 mt-4 ">
        <div className="flex items-center justify-between rounded-top  bg-[#5678E9]">
          <h3 className="text-lg font-semibold  pt-2 ps-3">Owner Counting</h3>
    
        </div>
        <div className=" ">
            <div  className="rounded-lg bg-white p-2 shadow-sm">
              <div className="">
                <div className="flex">
                  <p className="text-sm text-[#202224]"> Name</p>
                  <p className="ml-[210px] font-medium" style={{fontSize:"11px"}}>Roger Lubin</p>
                </div>
                <div className="flex">
                  <p className="text-sm text-[#202224]">Phone No</p>
                  <p className=" ml-[180px] font-medium" style={{fontSize:"11px"}}>9123455555</p>
                </div>
                <div className="flex">
                  <p className="text-sm text-[#202224]">Address
                  </p>
                  <p className=" ml-[70px] " style={{fontSize:"11px"}}>2972 Westheimer Rd. Santa Ana...</p>
                </div>
            
              </div>
            </div>
       
        </div>
            </div>
            <div className="mx-2 mt-4 ">
        <div className="flex items-center justify-between rounded-top  bg-[#5678E9]">
          <h3 className="text-lg font-semibold  pt-2 2 ps-3">Member  Counting</h3>
          <span className="rounded-full bg-[#5678E9] p-1 pe-2 text-sm text-white">02</span>
        </div>
        <div className=" ">
            <div  className="rounded-lg bg-white p-2 shadow-sm">
              <div className="">
                <div className="flex">
                  <p className="text-sm text-[#202224]">First Name</p>
                  <p className="ml-[170px] font-medium" style={{fontSize:"11px"}}>Roger Lubin</p>
                </div>
                <div className="flex">
                  <p className="text-sm text-[#202224]">Phone No</p>
                  <p className=" ml-[180px] font-medium" style={{fontSize:"11px"}}>9123455555</p>
                </div>
                
            
              </div>
            </div>
       
        </div>
            </div>

      </div>
      
    </div>
    
  );
}

export default ViewTenant;
