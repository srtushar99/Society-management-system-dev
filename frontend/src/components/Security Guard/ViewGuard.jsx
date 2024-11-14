import React from 'react';
import { X } from 'lucide-react'; // Assuming you're using lucide-react for the X icon
import { useNavigate } from 'react-router-dom';

const ViewGuard = ({ isOpen, onClose, Guard }) => {
  const navigate = useNavigate(); // Correctly define navigate using useNavigate hook

  // Handle close and navigate immediately
  const handleClose = () => {
    // Close the modal
    if (onClose) {
      onClose(); // This will trigger any parent close handling if needed
    }
    // Redirect to the /security-guard page
    navigate('/security-guard'); 
  };

  if (!isOpen || !Guard) return null;

  // Badge component
  const Badge1 = ({ children, className }) => (
    <span
      className={`px-2 py-2 pe-10 text-xs font-semibold ${className}`}
      style={{
        borderRadius: "15px",
        minWidth: "80px",
        textAlign: "center",
        marginLeft:"50px"
      }}
    >
      {children}
    </span>
  );
  const Badge = ({ children, className }) => (
    <span
      className={`px-2 py-2 pe-10 text-xs font-semibold ${className}`}
      style={{
        borderRadius: "15px",
        minWidth: "80px",
        textAlign: "center",
        marginLeft:"10px"
      }}
    >
      {children}
    </span>
  );

  // You can either import images or define fallback values
  const AvatarImage = Guard.Photo || 'default-avatar.jpg'; // Use the Guard's photo if available, or a default image

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[450px] max-w-3xl mx-auto p-6 rounded-lg shadow-lg overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h6 className="text-2xl font-bold text-gray-900">View Security Guard Details</h6>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={handleClose} // Immediately close and navigate when clicked
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={AvatarImage}
            alt={Guard.GuardName} // Use GuardName for alt text
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg text-gray-900">{Guard.GaurdName}</h2>
            <p className="text-gray-500 text-sm">Aug 5, 2024</p> {/* You can dynamically change the date */}
          </div>
        </div>

        {/* Details Section */}
        <div className="">
          <div className="grid grid-cols-3 gap-x-1 gap-y-1">
            <div>
              <h3 className="text-gray-500 text-sm mb-1">Select Shift</h3>
              <Badge
                className={
                  Guard.Shift === 'Day'
                    ? 'bg-[#F4F4F4] text-[#FF9300]'
                    : Guard.Shift === 'Night'
                    ? 'bg-[#4F4F4F] text-[#FFFFFF]' 
                    : 'bg-[#39973D] text-white'
                }
              >
                <i className="fa-solid fa-user"></i>  {Guard.Shift}
              </Badge>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm ml-12 mb-1">Time</h3>
              <p className="font-medium bg-[#F6F8FB] text-[#4F4F4F] rounded-lg w-20 ml-8  ps-3">{Guard.Time || 'N/A'}</p>
            </div>

            <div className='right-3' >
              <h3 className="text-gray-500 text-sm mb-1 ml-[50px] ">Gender</h3>
              <Badge1
                className={
                  Guard.Gender === 'Male'
                    ? 'bg-[#21A8E41A] text-[#5678E9]'
                    : Guard.Gender === 'Female'
                    ? 'bg-[#FE76A81A] text-[#FE76A8]' 
                    : 'bg-[#39973D] text-white'
                }
              >
                <i className="fa-solid fa-user"></i> {Guard.Gender}
              </Badge1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGuard;
