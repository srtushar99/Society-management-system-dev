import React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Sample data
const data = [
  { month: "Jan", balance: 10000 },
  { month: "Feb", balance: 15000 },
  { month: "Mar", balance: 14000 },
  { month: "Apr", balance: 25000 },
  { month: "May", balance: 18000 },
  { month: "Jun", balance: 22000 },
  { month: "Jul", balance: 20000 },
  { month: "Aug", balance: 30000 },
  { month: "Sep", balance: 28000 },
  { month: "Oct", balance: 27000 },
  { month: "Nov", balance: 40000 },
  { month: "Dec", balance: 38000 },
];

// Card components
const Card = ({ children }) => {
  return <div className="bg-white shadow rounded-lg p-4">{children}</div>;
};

const CardContent = ({ children }) => {
  return <div>{children}</div>;
};

const CardHeader = ({ children }) => {
  return <div className="flex justify-between items-center">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h2 className="text-xl font-medium">{children}</h2>;
};

// Select components
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
      className="inline-block w-4 mt-2  h-4 rounded-full mr-2 border border-white"
      style={{ background: `linear-gradient(90deg, ${gradient})` }}
    ></span>
    {label}
  </option>
);

// Chart container and tooltip
const ChartContainer = ({ children, className }) => {
  return <div className={`my-4 ${className}`}>{children}</div>;
};

// Custom tick for XAxis
const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <text
      x={x}
      y={y + 10} // Adjust vertical positioning if needed
      textAnchor="middle" // Center the text
      className="text-sm"
    >
      {payload.value}
    </text>
  );
};

// Main Chart Component
const Chart = () => {
  const handleRangeChange = (event) => {
    const selectedRange = event.target.value;
    console.log(selectedRange);
  };

  return (
    <div className="h-[240px] sm:h-[240px]  pe-1  sm:w-[730px] md:h-[240px] lg:w-[760px] md:ms-[880px] sm:ml-[310px] lg:ml-[0px] xl:ml-[290px] 2xl:ml-[320px]"style={{zIndex:"-99999"}}>
      <Card className="me-2">
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
          <Select defaultValue="month" onChange={handleRangeChange}>
            <CustomOption value="last-week" gradient="#FF9F00, #FF3D00" label="Last Week" />
            <CustomOption value="last-month" gradient="#F09619, #FE512E" label="Last Month" />
            <CustomOption value="last-year" gradient="#007BFF, #00C853" label="Last Year" />
            <CustomOption value="month" gradient="#007BFF, #00C853" label="Month" />
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[270px] "style={{zIndex:"-99999999"}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 30, right: 40, bottom: 20, left: 10 }}>
                <CartesianGrid style={{zIndex:"-99989898"}} vertical={false} horizontal={true} strokeDasharray="3 4" />
                <XAxis
                  dataKey="month"
                  className="text-sm mr-4"
                  tickLine={false}
                  axisLine={true}
                  tick={<CustomXAxisTick />}
                />
                <YAxis
                  className="text-sm w-52"
                  tickLine={false}
                  axisLine={true}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Line
                  dataKey="balance"
                  type="monotone"
                  stroke="#00B5D9"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;