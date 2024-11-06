import React from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ContactsPage = () => {
  const contacts = [
    {
      name: "Hanna Donin",
      phone: "+91 99587 33657",
      work: "Plumber"
    },
    {
      name: "Hanna Donin",
      phone: "+91 98765 43210",
      work: "Electrician"
    },
    {
      name: "Hanna Donin",
      phone: "+91 12345 67890",
      work: "Carpenter"
    },
    {
      name: "Hanna Donin",
      phone: "+91 99876 54321",
      work: "Painter"
    },
    {
      name: "Hanna Donin",
      phone: "+91 11223 44556",
      work: "Mechanic"
    },
    // You can add more contacts here
  ];

  const handleAddContact = () => {
    console.log("Add Contact");
  };

  const handleEditContact = (name) => {
    console.log("Edit Contact:", name);
  };

  const handleDeleteContact = (name) => {
    console.log("Delete Contact:", name);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 ml-9" style={{ width: "350px", height: "400px" }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Important Numbers</h2>
        <button
          onClick={handleAddContact}
          className="flex items-center bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-md px-2 py-2"
        >
          <FaPlus className="mr-2" />
          Add
        </button>
      </div>
      <div className="overflow-y-auto h-[320px]">
        {contacts.map((contact, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <div className="flex flex-col">
              <div className="font-medium">Name : {contact.name}</div>
              <div className="text-gray-600">Ph Number : <span>{contact.phone}</span></div>
              <div className="text-gray-500">Work : {contact.work}</div>
            </div>
            <div className="flex space-x-2">
            <button
                onClick={() => handleDeleteContact(contact.name)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
              <button
                onClick={() => handleEditContact(contact.name)}
                className="text-green-600 hover:text-green-800"
              >
                <FaEdit />
              </button>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
