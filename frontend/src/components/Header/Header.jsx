import { Search } from 'lucide-react';
import NotificationIcon from '../assets/notification-bing.png';
import AvatarImage from '../assets/Avatar.png';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="relative" style={{ marginLeft: "350px" }}>
        <Search className="absolute left-3 rounded  top-1/2 transform -translate-y-1/2  h-5 w-5" />
        <input
          type="text"
          placeholder="Search Here"
          className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded border border-gray-300">
          <img src={NotificationIcon} alt="Notifications" className="h-6 w-6" />
         
        </button>
        <div className="flex items-center space-x-3">
          <img
            src={AvatarImage}
            alt="Moni Roy"
            width="40"
            height="40"
            className="rounded-full"
          />
          <div className="flex flex-col items-start">
            <span className="font-medium text-sm">Moni Roy</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
