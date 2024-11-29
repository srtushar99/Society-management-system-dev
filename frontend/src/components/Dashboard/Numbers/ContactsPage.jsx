import React, { useState } from "react";
import plus from "../../assets/add-square.png";
import AddNumber from "./AddNumber";
import EditNumber from "./EditNumber";
import DeleteNumber from "./DeleteNumber";
import '../Maintenance/scrollbar.css';
import '../../Sidebar/sidebar.css';

const ContactsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [contacts, setContacts] = useState([
    { fullName: 'John Doe', phoneNumber: '1234567890', work: 'Manager' },
    { fullName: 'Jane Smith', phoneNumber: '0987654321', work: 'Engineer' },
    { fullName: 'Bob Johnson', phoneNumber: '1122334455', work: 'Designer' },
    { fullName: 'Alice Williams', phoneNumber: '2233445566', work: 'Developer' },
  ]);

  // Open the modal to add a contact
  const handleAddContact = () => {
    setEditMode(false);
    setContactToEdit(null);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditContact = (contact) => {
    setEditMode(true);
    setContactToEdit(contact);
    setIsModalOpen(true);
  };

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
  };

  const handleConfirmDelete = (contact) => {
    setContacts(contacts.filter((c) => c !== contact)); // Remove contact from list
    setContactToDelete(null);
  };

  const handleCancelDelete = () => {
    setContactToDelete(null);
  };

  return (
    <div
      className="rounded-lg shadow-md  2xl:ml-2 2xl:mt-1 mt-[170px] sm:w-[390px] bg-white 2xl:w-[380px] 2xl:h-[400px]"

    >
      <div className="flex justify-between items-center mb-4 px-3 pt-3">
        <h2 className="text-xl font-semibold">Important Numbers</h2>
        <button
          onClick={handleAddContact}
          className="flex items-center bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-md px-2 py-2"
        >
          <img src={plus} alt="Add" className="mr-2 h-4 w-4" />
          Add
        </button>
      </div>

      <div className="overflow-y-auto h-[320px] px-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {contacts.map((contact, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <div className="flex flex-col">
              <div className="font-medium">Name: {contact.fullName}</div>
              <div className="text-gray-600">Ph Number: <span>{contact.phoneNumber}</span></div>
              <div className="text-gray-500">Work: {contact.work}</div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDeleteContact(contact)} // Trigger delete modal
                className="text-red-600 hover:text-red-800 bg-[#F6F8FB] p-2 rounded"
              >
                <i className="fa-solid fa-trash h-6 w-6 lg:h-5 lg:w-5"></i>
              </button>
              <button
                onClick={() => handleEditContact(contact)} // Trigger edit modal
                className="text-green-600 hover:text-green-800 p-2 rounded"
              >
                <i className="fa-solid fa-pen-to-square h-6 w-6 lg:h-5 lg:w-5"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40">
          <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg z-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-[#202224]">
                {editMode ? "Edit Number" : "Add Number"}
              </span>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>

            {editMode ? (
              <EditNumber
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                contactData={contactToEdit}
                setContacts={setContacts} // Pass setContacts to allow adding/editing contacts
              />
            ) : (
              <AddNumber
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                setContacts={setContacts} // Pass setContacts to allow adding new contacts
              />
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteNumber
        isOpen={!!contactToDelete}
        contact={contactToDelete}
        onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ContactsPage;
