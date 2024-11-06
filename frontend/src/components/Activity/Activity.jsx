import { ChevronDown } from 'lucide-react';

const Activity = () => {
  const activities = [
    {
      letter: "S",
      title: "Society Meeting",
      time: "8:00 PM To 10:00 PM",
      date: "24-09-2024",
      bgColor: "bg-orange-100",
      textColor: "text-orange-500",
    },
    {
      letter: "H",
      title: "Holi Festival",
      time: "8:00 PM To 10:00 PM",
      date: "24-09-2024",
      bgColor: "bg-green-100",
      textColor: "text-green-500",
    },
    {
      letter: "G",
      title: "Ganesh Chaturthi",
      time: "8:00 PM To 10:00 PM",
      date: "24-09-2024",
      bgColor: "bg-blue-100",
      textColor: "text-blue-500",
    },
    {
      letter: "N",
      title: "Navratri Festival",
      time: "8:00 PM To 10:00 PM",
      date: "24-09-2024",
      bgColor: "bg-red-100",
      textColor: "text-red-500",
    },
    {
      letter: "S",
      title: "Society Meeting",
      time: "8:00 PM To 10:00 PM",
      date: "24-09-2024",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
  ];

  return (
    <div className="border border-gray-300 rounded-lg ms-[570px] w-[350px] h-[290px] p-3 mt-1">
      <div className="flex justify-between items-center mb-3">
        <h5 className="text-xl font-semibold text-gray-900">Upcoming Activity</h5>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-md flex items-center gap-2 text-sm text-gray-600">
          Month
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-y-auto h-[200px]">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-white rounded-lg shadow-sm p-1"
          >
            <div
              className={`w-10 h-10 rounded-full ${activity.bgColor} ${activity.textColor} flex items-center justify-center font-semibold`}
            >
              {activity.letter}
            </div>
            <div className="flex-1">
              <span className="text-gray-900 font-medium">{activity.title}</span>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
            <div className="text-sm text-gray-500">{activity.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
