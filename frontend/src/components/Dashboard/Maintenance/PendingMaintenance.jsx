import React from "react";
import Ellipse1091 from '../../assets/Ellipse 1091.png';
import Ellipse1093 from '../../assets/Ellipse 1093.png';
import Ellipse1094 from '../../assets/Ellipse 1094.png';
import Ellipse1095 from '../../assets/Ellipse 1095.png';
import Ellipse1096 from '../../assets/Ellipse 1096.png';

// Placeholder Avatar components
const Avatar = ({ children, className }) => (
  <div className={`rounded-full overflow-hidden ${className} flex items-center justify-center`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img src={src || '/fallback-avatar.png'} alt={alt} className="h-full w-full object-cover" />
);

const AvatarFallback = ({ children }) => (
  <div className="flex items-center justify-center h-full w-full bg-gray-200">
    {children}
  </div>
);

// Placeholder Card components
const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`flex items-center justify-between ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
);

const CardContent = ({ children, className }) => (
  <div className={`mt-4 ${className}`}>{children}</div>
);

const maintenanceItems = [
  {
    id: 1,
    name: "Roger Lubin",
    avatar: Ellipse1091,  
    pendingDuration: "2 Month Pending",
    amount: 5000,
  },
  {
    id: 2,
    name: "Roger Lubin",
    avatar: Ellipse1093,  
    pendingDuration: "1 Month Pending",
    amount: 3000,
  },
  {
    id: 3,
    name: "Roger Lubin",
    avatar: Ellipse1094,  
    pendingDuration: "3 Weeks Pending",
    amount: 4500,
  },
  {
    id: 4,
    name: "Roger Lubin",
    avatar: Ellipse1095,  
    pendingDuration: "1 Month Pending",
    amount: 6000,
  },
  {
    id: 5,
    name: "Roger Lubin",
    avatar: Ellipse1096,  
    pendingDuration: "2 Month Pending",
    amount: 5500,
  },
  {
    id: 6,
    name: "Roger Lubin",
    avatar: Ellipse1091,  
    pendingDuration: "2 Month Pending",
    amount: 5500,
  },
];

const PendingMaintenance = () => {
  return (
    <Card 
      className="ml-7 w-[350px] h-[400px]"  
      style={{ position: 'absolute', top: '255px', left: '1510px' }} // Absolute position
    >
      <CardHeader>
        <CardTitle>Pending Maintenances</CardTitle>
        <button 
          onClick={() => window.location.href = '/all-maintenance'} 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          View all
        </button>
      </CardHeader>
      <CardContent className="h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-rounded-md">
        {maintenanceItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={item.avatar} alt={item.name} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-600">{item.pendingDuration}</span>
              </div>
            </div>
            <span className="font-medium text-red-500">
              ₹ {item.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingMaintenance;
