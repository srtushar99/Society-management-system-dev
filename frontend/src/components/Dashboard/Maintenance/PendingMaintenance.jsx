import React from 'react';
import Ellipse1091 from '../../assets/Ellipse 1091.png';
import Ellipse1093 from '../../assets/Ellipse 1093.png';
import Ellipse1094 from '../../assets/Ellipse 1094.png';
import Ellipse1095 from '../../assets/Ellipse 1095.png';
import Ellipse1096 from '../../assets/Ellipse 1096.png';
import './scrollbar.css'

const Avatar = ({ children, className }) => (
  <div className={`rounded-full overflow-hidden ${className} flex items-center justify-center`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img src={src || '/fallback-avatar.png'} alt={alt} className="h-full w-full object-cover" />
);

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
    <div className="sm:w-full bg-white rounded lg:h-[405px] lg:w-[360px] sm:ml-2">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Pending Maintenances</CardTitle>
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
                <Avatar className="h-30 w-10 lg:w-10">
                  <AvatarImage className="sm:h-28" src={item.avatar} alt={item.name} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm sm:text-base">{item.name}</span>
                  <span className="text-xs sm:text-sm text-gray-600">{item.pendingDuration}</span>
                </div>
              </div>
              <span className="font-medium text-red-500 text-sm sm:text-base">
                ₹ {item.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingMaintenance;