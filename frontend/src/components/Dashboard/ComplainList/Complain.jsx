import React, { useState, useEffect } from "react";
import AvatarImage from "../../assets/Avatar.png";
import DeleteComplain from "./DeleteComplain";
import EditComplain from "./EditComplain";
import ViewComplain from "./ViewComplain";
import "../../Sidebar/sidebar.css";
import axiosInstance from "../../Common/axiosInstance";
import moment from "moment";
// import '../Maintenance/scrollbar.css'; // Ensure this path is correct

const initialComplaints = [
  {
    id: "1",
    complainer: { name: "Evelyn Harper", avatar: AvatarImage },
    complaintName: "Unethical Behavior",
    date: "01/02/2024",
    priority: "Medium",
    status: "Open",
    description:
      "A detailed complaint about unethical behavior in the workplace.",
  },
  {
    id: "2",
    complainer: { name: "John Doe", avatar: AvatarImage },
    complaintName: "Harassment",
    date: "02/02/2024",
    priority: "Low",
    status: "Pending",
    description: "Complaint regarding verbal harassment from a colleague.",
  },
  {
    id: "3",
    complainer: { name: "Jane Smith", avatar: AvatarImage },
    complaintName: "Unresolved Issue",
    date: "03/02/2024",
    priority: "High",
    status: "Solve",
    description: "An unresolved issue that has caused significant disruption.",
  },
  {
    id: "4",
    complainer: { name: "Jane Smith", avatar: AvatarImage },
    complaintName: "Unresolved Issue",
    date: "03/02/2024",
    priority: "High",
    status: "Solve",
    description: "An unresolved issue that has caused significant disruption.",
  },
];

const Badge = ({ children, className }) => (
  <span
    className={`px-4 py-2 p-3   text-xs font-semibold ${className}`}
    style={{ borderRadius: "15px" }}
  >
    {children}
  </span>
);

const Complain = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComplaintForDelete, setSelectedComplaintForDelete] =
    useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedComplaintForEdit, setSelectedComplaintForEdit] =
    useState(null);
  const [complaint, setComplaint] = useState([]);

  const openComplaintModal = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeComplaintModal = () => {
    setSelectedComplaint(null);
  };

  const openDeleteModal = (complaint) => {
    setSelectedComplaintForDelete(complaint);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedComplaintForDelete(null);
  };

  const openEditModal = (complaint) => {
    setSelectedComplaintForEdit(complaint);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedComplaintForEdit(null);
  };

  const handleDelete = () => {
    setComplaint((prevComplaints) =>
      prevComplaints.filter(
        (complaints) => complaints._id !== selectedComplaintForDelete.id
      )
    );
    closeDeleteModal();
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

  const CustomOption = ({ value, gradient, label }) => (
    <option value={value} className="flex items-center">
      <span
        className="inline-block  w-4 h-4 mr-2 border "
        style={{ background: `linear-gradient(90deg, ${gradient})` }}
      ></span>
      {label}
    </option>
  );

  const handleRangeChange = (event) => {
    const selectedRange = event.target.value;
    console.log(selectedRange);
  };

  // Fetch fetchComplaint from the API
  const fetchComplaint = async () => {
    try {
      const response = await axiosInstance.get("/v2/complaint/");
      console.log(response.data);
      if (response.status === 200) {
        setComplaint(response.data.complaints);
      }
    } catch (error) {
      console.error("Error fetching Important Numbers:", error);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  return (
    <div className="2xl:w-[1175px]  2xl:ms-[320px] lg:w-[520px] mt-1  h-[350px] xl:ml-[300px] md:ml-[300px] md:w-[540px] xl:w-[640px] sm:h-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-3 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Complaint List</h2>
        <Select defaultValue="month" onChange={handleRangeChange}>
          <CustomOption
            value="last-week"
            gradient="#FF9F00, #FF3D00"
            label="Last Week"
          />
          <CustomOption
            value="last-month"
            gradient="#F09619, #FE512E"
            label="Last Month"
          />
          <CustomOption
            value="last-year"
            gradient="#007BFF, #00C853"
            label="Last Year"
          />
          <CustomOption
            value="month"
            gradient="#007BFF, #00C853"
            label="Month"
          />
        </Select>
      </div>

      <div className="h-[200px] overflow-y-auto ml-4 mr-3 rounded-2xl scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className="   w-[1140px]">
          <thead style={{ backgroundColor: "rgba(86, 120, 233, 0.1)" }} className="">
            <tr className=" text-left text-xs font-semibold text-gray-600 ">
              <th className="whitespace-nowrap ps-4 text-[#202224]">Complainer Name</th>
              <th className="whitespace-nowrap ps-4 text-[#202224]">Complaint Name</th>
              <th className="whitespace-nowrap text-center text-[#202224]">Date</th>
              <th className="whitespace-nowrap text-center text-[#202224]">Priority</th>
              <th className="whitespace-nowrap text-center p-3 text-[#202224]">Status</th>
              <th className="whitespace-nowrap text-center text-[#202224]">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm ">
            {complaint.map((complaints) => (
              <tr key={complaints._id} className="border-b ">
                <td className="">
                  <div className="flex items-center space-x-2 ps-4">
                    <img
                      src={complaints.Complainer_name}
                      alt={complaints.Complainer_name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span>
                      {!!complaints.Complainer_name
                        ? complaints.Complainer_name
                        : " "}
                    </span>
                  </div>
                </td>
                <td className="p-2 ps-4">
                  {!!complaints.Complaint_name
                    ? complaints.Complaint_name
                    : " "}
                </td>
                <td className="p-2 text-center">
                  {!!complaints.createdAt
                    ? moment(complaints.createdAt).format("DD/MM/YYYY")
                    : " "}
                </td>
                <td className="p-1 text-center">
                  <Badge
                    className={`
                   inline-block w-24 px-4 py-1 rounded-md text-center 
                   ${
                     complaints.Priority === "High"
                       ? "bg-[#E74C3C] text-[#FFFFFF]"
                       : complaints.Priority === "Medium"
                       ? "bg-[#5678E9] text-[#FFFFFF]"
                       : "bg-[#39973D] text-[#FFFFFF]"
                   }
                  `}
                  >
                    {complaints.Priority}
                  </Badge>
                </td>

                <td className="p-2 text-center">
                  <Badge
                    className={`
                   inline-block w-24 px-4 py-1 rounded-md text-center
                   ${
                     complaints.Status === "Open"
                       ? "bg-[#5678E91A] text-[#5678E9]"
                       : complaints.Status === "Pending"
                       ? "bg-[#FFC3131A] text-[#FFC313]"
                       : "bg-[#39973D1A] text-[#39973D]"
                   }`}
                  >
                    {complaints.Status}
                  </Badge>
                </td>

                <td className="p-2 ">
                  <div className="flex  justify-center space-x-2  sm:space-y-0">
                    <button
                      className="bg-blue-50 text-[#39973D] rounded-2 p-2 sm:w-10 sm:h-10"
                      onClick={() => openEditModal(complaints)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="bg-blue-50 text-[#5678E9] rounded-2 p-2 sm:w-10 sm:h-10"
                      onClick={() => openComplaintModal(complaints)}
                    >
                      <i className="fa-solid fa-eye "></i>
                    </button>
                    <button
                      className="bg-blue-50 text-red-600 rounded-2 p-2 sm:w-10 sm:h-10"
                      onClick={() => openDeleteModal(complaints)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedComplaint && (
        <ViewComplain
          complaint={selectedComplaint}
          onClose={closeComplaintModal}
        />
      )}

      <DeleteComplain
        isOpen={isDeleteModalOpen}
        contact={selectedComplaintForDelete}
        onDelete={handleDelete}
        onCancel={closeDeleteModal}
        fetchComplaint={fetchComplaint}
      />

      <EditComplain
        isOpen={isEditModalOpen}
        complaint={selectedComplaintForEdit}
        onClose={closeEditModal}
        fetchComplaint={fetchComplaint}
      />
    </div>
  );
};

export default Complain;
