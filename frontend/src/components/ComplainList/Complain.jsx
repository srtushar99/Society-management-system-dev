import React, { useState } from 'react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import avatarimage1 from '../assets/Avatar.png';

// Button component
const Button = ({ children, className }) => (
  <div className={`rounded-full overflow-hidden ${className} flex items-center justify-center`}>
    {children}
  </div>
);

// Select Components
const Select = ({ children, value, onChange }) => {
  return (
    <select
      value={value}
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
      className="inline-block w-4 mt-2  h-4 rounded-full mr-2 border border-white"
      style={{ background: `linear-gradient(90deg, ${gradient})` }}
    ></span>
    {label}
  </option>
);

// Badge component for priority & status
const Badge = ({ children, className }) => (
  <div className={`px-3 py-1 rounded-full text-sm font-medium ${className}`}>
    {children}
  </div>
);

// Avatar Components
const Avatar = ({ children, className }) => (
  <div className={`rounded-full overflow-hidden ${className} flex items-center justify-center`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  // Use the public path to load the image correctly, or import an image
  <img src={src || '/fallback-avatar.png'} alt={alt} className="h-full w-full object-cover" />
);



// Mock complaints data
const complaints = [
  {
    id: '1',
    complainer: { name: 'Evelyn Harper', avatar: avatarimage1 }, 
    complaintName: 'Unethical Behavior',
    date: '01/02/2024',
    priority: 'Medium',
    status: 'Open',
  },
  {
    id: '2',
    complainer: { name: 'Evelyn Harper', avatar: avatarimage1 }, 
    complaintName: 'Unethical Behavior',
    date: '01/02/2024',
    priority: 'Low',
    status: 'Pending',
  },
  {
    id: '3',
    complainer: { name: 'Evelyn Harper', avatar: avatarimage1 }, 
    complaintName: 'Unethical Behavior',
    date: '01/02/2024',
    priority: 'High',
    status: 'Solve',
  },
];

const Complain = () => {
  // Declare states
  const [selectedFilter, setSelectedFilter] = useState('month');
  const [isOpen, setIsOpen] = useState(false);

  // Handle filter change
  const handleRangeChange = (e) => {
    setSelectedFilter(e.target.value);
    setIsOpen(false); // Close the dropdown when an item is selected
  };

  return (
    <div
      className="absolute border border-gray-300 rounded-lg shadow-lg"
      style={{
        width: '1150px',
        height: '320px',
        top: '620px',
        left: '330px',
      }}
    >
      <div className="flex justify-between items-center mb-1 p-2">
        <h1 className="text-2xl font-semibold mt-4">Complaint List</h1>

        {/* Dropdown to select filter */}
        <div className="relative">
          <Select value={selectedFilter} onChange={handleRangeChange}>
            <CustomOption value="last-week" gradient="#FF9F00, #FF3D00" label="Last Week" />
            <CustomOption value="last-month" gradient="#F09619, #FE512E" label="Last Month" />
            <CustomOption value="last-year" gradient="#007BFF, #00C853" label="Last Year" />
            <CustomOption value="month" gradient="#007BFF, #00C853" label="Month" />
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border-t ms-3 w-[1120px]">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-2 bg-gray-100 text-sm font-medium p-2 border-b">
          <div>Complainer Name</div>
          <div>Complaint Name</div>
          <div>Date</div>
          <div>Priority</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* Complaints List with Scrollable Table */}
        <div className="overflow-y-auto h-[190px] border-t">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="grid grid-cols-6 gap-4 p-3 border-t items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={complaint.complainer.avatar} alt={complaint.complainer.name} />
                
                </Avatar>
                <span>{complaint.complainer.name}</span>
              </div>
              <div>{complaint.complaintName}</div>
              <div>{complaint.date}</div>
              <div>
                <Badge
                  className={`${
                    complaint.priority === 'High' ? 'bg-red-100 text-red-700' : ''
                  } ${complaint.priority === 'Medium' ? 'bg-blue-100 text-blue-700' : ''} ${
                    complaint.priority === 'Low' ? 'bg-green-100 text-green-700' : ''
                  }`}
                >
                  {complaint.priority}
                </Badge>
              </div>
              <div>
                <Badge
                  className={`${
                    complaint.status === 'Open' ? 'bg-blue-50 text-blue-700' : ''
                  } ${complaint.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : ''} ${
                    complaint.status === 'Solve' ? 'bg-green-50 text-green-700' : ''
                  }`}
                >
                  {complaint.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button className="text-green-600 hover:text-green-700 border p-2 rounded-md">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button className="text-blue-600 hover:text-blue-700 border p-2 rounded-md">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button className="text-red-600 hover:text-red-700 border p-2 rounded-md">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complain;
