import React, { useState } from 'react';
import Edit from '../../assets/edit.png';
import Delete from '../../assets/trash.png';
import View from '../../assets/eye.png';
import AvatarImage from '../../assets/Avatar.png';
import DeleteComplain from './DeleteComplain'; // Import DeleteComplain component
import EditComplain from './EditComplain'; // Import EditComplain modal
import ViewComplain from './ViewComplain'; // Import ViewComplain modal

// Initial mock complaints data
const initialComplaints = [
  {
    id: '1',
    complainer: { name: 'Evelyn Harper', avatar: AvatarImage },
    complaintName: 'Unethical Behavior',
    date: '01/02/2024',
    priority: 'Medium',
    status: 'Open',
    description: 'A detailed complaint about unethical behavior in the workplace.',
  },
  {
    id: '2',
    complainer: { name: 'John Doe', avatar: AvatarImage },
    complaintName: 'Harassment',
    date: '02/02/2024',
    priority: 'Low',
    status: 'Pending',
    description: 'Complaint regarding verbal harassment from a colleague.',
  },
  {
    id: '3',
    complainer: { name: 'Jane Smith', avatar: AvatarImage },
    complaintName: 'Unresolved Issue',
    date: '03/02/2024',
    priority: 'High',
    status: 'Solve',
    description: 'An unresolved issue that has caused significant disruption.',
  },
];

const Badge = ({ children, className }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
    {children}
  </span>
);

const Complain = () => {
  const [complaints, setComplaints] = useState(initialComplaints); // Store complaints in state
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComplaintForDelete, setSelectedComplaintForDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedComplaintForEdit, setSelectedComplaintForEdit] = useState(null);

  const openComplaintModal = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeComplaintModal = () => {
    setSelectedComplaint(null);
  };

  const openDeleteModal = (complaint) => {
    setSelectedComplaintForDelete(complaint);
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete modal
    setSelectedComplaintForDelete(null); // Clear the selected complaint
  };

  const openEditModal = (complaint) => {
    setSelectedComplaintForEdit(complaint);
    setIsEditModalOpen(true); // Open the edit modal
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the edit modal
    setSelectedComplaintForEdit(null); // Clear the selected complaint
  };

  const handleDelete = () => {
    // Remove the deleted complaint from the list immutably
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint.id !== selectedComplaintForDelete.id)
    );
    closeDeleteModal(); // Close the delete modal
  };

  const Select = ({ children, defaultValue, onChange }) => {
    return (
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        className="border rounded-md p-2"
      >
        {children}
      </select>
    );
  };

  // Custom Option Component with Circle
  const CustomOption = ({ value, gradient, label }) => (
    <option value={value} className="flex items-center">
      <span
        className="inline-block w-4 mt-2 h-4 rounded-full mr-2 border border-white"
        style={{ background: `linear-gradient(90deg, ${gradient})` }}
      ></span>
      {label}
    </option>
  );

  const handleRangeChange = (event) => {
    const selectedRange = event.target.value;
    console.log(selectedRange);
  };

  return (
    <div className="lg:w-[1160px] md:w-[1150px] lg:ms-[320px] h-[305px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-3 flex justify-between items-center border-b">
        <h2 className="text-2xl font-bold text-gray-800">Complaint List</h2>
        <Select defaultValue="month" onChange={handleRangeChange}>
          <CustomOption value="last-week" gradient="#FF9F00, #FF3D00" label="Last Week" />
          <CustomOption value="last-month" gradient="#F09619, #FE512E" label="Last Month" />
          <CustomOption value="last-year" gradient="#007BFF, #00C853" label="Last Year" />
          <CustomOption value="month" gradient="#007BFF, #00C853" label="Month" />
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
              <th className="p-3">Complainer Name</th>
              <th className="p-3">Complaint Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="ps-10">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm ">
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="border hover:bg-gray-50">
                <td className="p-2">
                  <div className="flex items-center space-x-2 ps-3">
                    <img
                      src={complaint.complainer.avatar}
                      alt={complaint.complainer.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span>{complaint.complainer.name}</span>
                  </div>
                </td>
                <td className="p-2">{complaint.complaintName}</td>
                <td className="p-2">{complaint.date}</td>
                <td className="p-2">
                  <Badge
                    className={
                      complaint.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : complaint.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }
                  >
                    {complaint.priority}
                  </Badge>
                </td>
                <td className="p-2">
                  <Badge
                    className={
                      complaint.status === 'Open'
                        ? 'bg-blue-100 text-blue-800'
                        : complaint.status === 'Pending'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                    }
                  >
                    {complaint.status}
                  </Badge>
                </td>
                <td className="p-2 ">
                  <div className="flex flex-wrap sm:space-x-2 space-y-2 sm:space-y-0">
                    <button
                      className="bg-blue-50 text-blue-600 rounded-2 p-2"
                      onClick={() => openEditModal(complaint)} // Open Edit modal
                    >
                      <img src={Edit} alt="Edit" className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button
                      className="bg-blue-50 text-green-600 rounded-2 p-2"
                      onClick={() => openComplaintModal(complaint)} // Open View modal
                    >
                      <img src={View} alt="View" className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </button>
                    <button
                      className="bg-blue-50 text-red-600 rounded-2 p-2"
                      onClick={() => openDeleteModal(complaint)} // Open Delete modal
                    >
                      <img src={Delete} alt="Delete" className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Complaint Modal */}
      {selectedComplaint && (
        <ViewComplain
          complaint={selectedComplaint}
          onClose={closeComplaintModal} // Close modal
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteComplain
        isOpen={isDeleteModalOpen}
        contact={selectedComplaintForDelete}
        onDelete={handleDelete}
        onCancel={closeDeleteModal}
      />

      {/* Edit Complaint Modal */}
      <EditComplain
        isOpen={isEditModalOpen}
        complaint={selectedComplaintForEdit}
        onClose={closeEditModal}
      />
    </div>
  );
};

export default Complain;
