import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AvatarImage from "../assets/Avatar.png";
import { Link } from "react-router-dom";
import leftarrow from '../assets/LeftArrow.png'
import gallary from '../assets/gallery.png';
import document from '../assets/document.png';
import view from '../assets/eye.png'
import { EyeIcon } from 'lucide-react';

const  ViewOwner =({ isOpen, onClose, owner })=> {

  const [Adhar_front, setAdhar_front] = useState("");
  const [Adhar_frontSize, setAdhar_frontSize] = useState("");
  const [Adhar_back, setAdhar_back] = useState("");
  const [Adhar_backSize, setAdhar_backSize] = useState("");
  const [Address_proof, setAddress_proof] = useState("");
  const [Address_proofSize, setAddress_proofSize] = useState("");
  const [Rent_Agreement, setRent_Agreement] = useState("");
  const [Rent_AgreementSize, setRent_AgreementSize] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    // Trigger the onClose function passed as a prop
    onClose();
  };


  const processAdhar_front = async (url) => {
    try {
        const extractedFileName = url.substring(url.lastIndexOf("/") + 1);
        const response = await axios.head(url);
        const fileSizeBytes = response.headers["content-length"];
        const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
        setAdhar_front(extractedFileName);
        setAdhar_frontSize(fileSizeMB);
    } catch (error) {
      console.error("Error fetching file metadata:", error.message);
      setAdhar_frontSize("Unknown");
      setAdhar_front("Unknown");
    }
  };

  const processAdhar_back = async (url) => {
    try {
        const extractedFileName = url.substring(url.lastIndexOf("/") + 1);
        const response = await axios.head(url);
        const fileSizeBytes = response.headers["content-length"];
        const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
        setAdhar_back(extractedFileName);
        setAdhar_backSize(fileSizeMB);
    } catch (error) {
      console.error("Error fetching file metadata:", error.message);
      setAdhar_backSize("Unknown");
      setAdhar_back("Unknown");
    }
  };

  const processAddress_proof = async (url) => {
    try {
        const extractedFileName = url.substring(url.lastIndexOf("/") + 1);
        const response = await axios.head(url);
        const fileSizeBytes = response.headers["content-length"];
        const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
        setAddress_proof(extractedFileName);
        setAddress_proofSize(fileSizeMB);
    } catch (error) {
      console.error("Error fetching file metadata:", error.message);
      setAddress_proofSize("Unknown");
      setAddress_proof("Unknown");
    }
  };

  const processRent_Agreement = async (url) => {
    try {
        const extractedFileName = url.substring(url.lastIndexOf("/") + 1);
        const response = await axios.head(url);
        const fileSizeBytes = response.headers["content-length"];
        const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);
        setRent_Agreement(extractedFileName);
        setRent_AgreementSize(fileSizeMB);
    } catch (error) {
      console.error("Error fetching file metadata:", error.message);
      setRent_AgreementSize("Unknown");
      setRent_Agreement("Unknown");
    }
  };


  useEffect(() => {
    if (owner && owner.Adhar_front) {
      processAdhar_front(owner.Adhar_front);
    }
    if (owner && owner.Adhar_back) {
      processAdhar_back(owner.Adhar_back);
    }
    if (owner && owner.Address_proof) {
      processAddress_proof(owner.Address_proof);
    }
    if (owner && owner.Rent_Agreement) {
      processRent_Agreement(owner.Rent_Agreement);
    }
  }, [owner]);

  return (
    <div className="fixed inset-0 bg-black z-50 bg-opacity-50  h-screen flex justify-end items-start">
      <div className="bg-white shadow-md rounded-md p-3 w-96">
        {/* <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm"> */}
        <div className="flex items-center gap-4">
          <Link to="/Resident-Manegement" className="text-gray-700" onClick={handleClose}>
            <img src={leftarrow} className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold">View Owner Details</h1>
        </div>
        {/* </div> */}

        <div className="  items-center gap-4 mb-8">
          <img
            // src={AvatarImage || "/fallback-avatar.png"}
            src={!!owner.profileImage ? owner.profileImage : AvatarImage}
            className="w-16 ml-[150px] h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold ml-[120px] text-lg text-gray-900">
              {!!owner.Full_name ? owner.Full_name : "Unknown"}
            </h2>

            <p className="text-gray-600 ml-[100px]">{!!owner.Email_address ? owner.Email_address : "Unknown"}</p>
          </div>
        </div>

        <div className="mx-2 rounded-lg bg-white p-2 shadow-sm">
          <div className="grid  ">
            <div className="flex ">
              <p className=" text-bold  text-black">Wing</p>
              <span className=" ml-[280px]  font-medium">{!!owner.Wing ? owner.Wing : "Unknown"}</span>
            </div>
            <div className="flex">
              <p className="text-bold  text-black">Unit</p>
              <p className="  ml-[280px] font-medium">{!!owner.Unit ? owner.Unit : "Unknown"}</p>
            </div>
            <div className="flex">
              <p className="text-bold  text-black">Age</p>
              <p className="  ml-[280px] font-medium">{!!owner.Age ? owner.Age : "Unknown"}</p>
            </div>
            <div className="flex">
              <p className="text-bold  text-black">Gender</p>
              <p className="  ml-[240px] font-medium">{!!owner.Gender ? owner.Gender : "Unknown"}</p>
            </div>
          </div>
        </div>
        
        <div className="mx-2 mt-3">
        <h3 className="mb-2 text-lg font-semibold">Document</h3>
        <div className="">

          <div className="flex items-center justify-between rounded-lg bg-white  shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <img src={!!owner.Adhar_front ? owner.Adhar_front : ""} alt="JPG icon" width={20} height={20} />
              </div>
              <div>
                <p className="font-medium">{!!Adhar_front ? Adhar_front : ""}</p>
                <p className="text-sm text-gray-500">{!!Adhar_frontSize ? Adhar_frontSize  : ""}</p>
              </div>
            </div>
            <a href={!!owner.Adhar_front ? owner.Adhar_front : ""} target="_blank" download className="text-blue-500 hover:text-blue-600">
                <EyeIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white  shadow-sm">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-red-50 p-2">
                {/* <img src={document} alt="PDF icon" width={20} height={20} /> */}
                <img src={!!owner.Adhar_back ? owner.Adhar_back : ""} alt="JPG icon" width={20} height={20} />
              </div>
              <div>
              <p className="font-medium">{!!Adhar_back ? Adhar_back : ""}</p>
              <p className="text-sm text-gray-500">{!!Adhar_backSize ? Adhar_backSize  : ""}</p>
              </div>
            </div>
            <a href={!!owner.Adhar_back ? owner.Adhar_back : ""} target="_blank" download className="text-blue-500 hover:text-blue-600">
                <EyeIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white  shadow-sm">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-red-50 p-2">
                <img src={!!owner.Address_proof ? owner.Address_proof : ""} alt="JPG icon" width={20} height={20} />
              </div>
              <div>
              <p className="font-medium">{!!Address_proof ? Address_proof : ""}</p>
              <p className="text-sm text-gray-500">{!!Address_proofSize ? Address_proofSize  : ""}</p>
              </div>
            </div>
            <a href={!!owner.Address_proof ? owner.Address_proof : ""} target="_blank" download className="text-blue-500 hover:text-blue-600">
                <EyeIcon className="w-5 h-5" />
            </a>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white  shadow-sm">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-red-50 p-2">
                <img src={!!owner.Rent_Agreement ? owner.Rent_Agreement : ""} alt="JPG icon" width={20} height={20} />
              </div>
              <div>
              <p className="font-medium">{!!Rent_Agreement ? Rent_Agreement : ""}</p>
              <p className="text-sm text-gray-500">{!!Rent_AgreementSize ? Rent_AgreementSize  : ""}</p>
              </div>
            </div>
            <a href={!!owner.Rent_Agreement ? owner.Rent_Agreement : ""} target="_blank" download className="text-blue-500 hover:text-blue-600">
                <EyeIcon className="w-5 h-5" />
            </a>
          </div>


        </div>
      </div>   

      <div className="mx-2 mt-4 ">
        <div className="flex items-center justify-between rounded-top  bg-[#5678E9]">
          <h3 className="text-lg font-semibold  ps-2 pt-2">Member Counting</h3>
          <span className="rounded-full bg-[#5678E9] p-1 pe-3 text-sm text-white">{!!owner.Member_Counting_Total ? owner.Member_Counting_Total : 0}</span>
        </div>
        <div className=" ">
          {owner.Member_Counting?.map((member) => (
            <div key={member._id} className="rounded-lg bg-white p-3 shadow-sm">
              <div className="pt-2">
                <div className="flex">
                  <p className="text-sm text-[#202224]">First Name</p>
                  <p className="lg:ml-[150px] font-medium" style={{fontSize:"12px"}}>{!!member.Full_name ? member.Full_name : ""}</p>
                </div>
                <div className="flex">
                  <p className="text-sm text-[#202224]">Phone No</p>
                  <p className=" lg:ml-[160px] font-medium" style={{fontSize:"12px"}}>{!!member.Phone_number ? member.Phone_number : ""}</p>
                </div>
                <div className="flex">
                  <p className="text-sm text-[#202224]">Age</p>
                  <p className=" lg:ml-[260px] font-medium" style={{fontSize:"12px"}}>{!!member.Age ? member.Age : ""}</p>
                </div>
                <div className="flex">
                  <p className="text-sm text-[#202224]">Gender</p>
                  <p className="lg:ml-[220px] font-medium" style={{fontSize:"12px"}}>{!!member.Gender ? member.Gender : ""}</p>
                </div>
                <div className="flex">
                  <p className="text-sm text-[#202224] ">Relation</p>
                  <p className="lg:ml-[200px] font-medium" style={{fontSize:"12px"}}>{!!member.Relation ? member.Relation : ""}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-2 mt-4 ">
        <div className="flex items-center justify-between rounded-top  bg-[#5678E9]">
          <h3 className="text-lg font-semibold  ps-2 pt-2">Vehicle Counting</h3>
          <span className="rounded-full bg-[#5678E9] p-1 pe-3 text-sm text-white">{!!owner.Vehicle_Counting_Total ? owner.Vehicle_Counting_Total : 0}</span>
        </div>
        <div className=" ">
          {owner.Vehicle_Counting?.map((member) => (
            <div key={member._id} className="rounded-lg bg-white p-3 shadow-sm">
              <div className="pt-2">
                <div className="flex">
                  <p className="text-sm text-[#202224]">Name</p>
                  <p className="lg:ml-[150px] font-medium" style={{fontSize:"12px"}}>{!!member.vehicle_name ? member.vehicle_name : ""}</p>
                </div>
                <div className="flex">
                  <p className="text-sm text-[#202224]">Type</p>
                  <p className=" lg:ml-[160px] font-medium" style={{fontSize:"12px"}}>{!!member.vehicle_type ? member.vehicle_type : ""}</p>
                </div>
                <div className="flex">
                  <p className="text-sm text-[#202224]">Number</p>
                  <p className=" lg:ml-[260px] font-medium" style={{fontSize:"12px"}}>{!!member.vehicle_number ? member.vehicle_number : ""}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      </div>
    </div>
    
  );
}

export default ViewOwner;
