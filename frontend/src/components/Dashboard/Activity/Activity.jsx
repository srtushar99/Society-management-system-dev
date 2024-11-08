import React from "react";
import '../Maintenance/scrollbar.css'; // Ensure this path is correct

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
        className="inline-block w-4 h-4 rounded-full mr-2 border border-white"
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
    <div className="border bg-white border-gray-300 rounded-lg mt-0 h-[300px] p-3 sm:mt-5 lg:w-[360px] sm:ml-4">
      <div className="flex justify-between items-center mb-3">
        <h5 className="text-xl font-semibold text-gray-900">Upcoming Activity</h5>
        <Select defaultValue="month" onChange={handleRangeChange}>
          <CustomOption value="last-week" gradient="#FF9F00, #FF3D00" label="Last Week" />
          <CustomOption value="last-month" gradient="#F09619, #FE512E" label="Last Month" />
          <CustomOption value="last-year" gradient="#007BFF, #00C853" label="Last Year" />
          <CustomOption value="month" gradient="#007BFF, #00C853" label="Month" />
        </Select>
      </div>

      <div className="overflow-y-auto h-[200px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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