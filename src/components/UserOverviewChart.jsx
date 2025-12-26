import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { name: "Jan", value: 38 },
  { name: "Feb", value: 94 },
  { name: "Mar", value: 52 },
  { name: "Apr", value: 88 },
  { name: "May", value: 65 },
  { name: "Jun", value: 68 },
  { name: "July", value: 88 },
  { name: "Aug", value: 28 },
  { name: "Sep", value: 68 },
  { name: "Oct", value: 42 },
  { name: "Nov", value: 98 },
  { name: "Dec", value: 92 },
];

const UserOverviewChart = () => {
  return (
    <div className="w-full bg-[#EFE6FD1A] p-6  rounded-2xl border border-[#6200EE] ">
      {/* Chart Container */}
      <div className="h-[300px] w-full mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              {/* This creates the purple gradient fill seen in your image */}
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6200EE" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6200EE" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            {/* Dotted Grid Lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#6200EE"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6200EE", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6200EE", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#6200EE"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              dot={{ r: 4, fill: "#6200EE", strokeWidth: 2, stroke: "#6200EE" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-13">
        <h2 className="text-xl font-bold text-[#6200EE]">User Overview</h2>
        <div className="relative inline-block">
          <select
            className="appearance-none flex items-center gap-2 px-4 py-1 pr-8
               border border-[#6200EE] rounded-lg text-[#6200EE]
               bg-purple-50 text-sm font-medium focus:outline-none cursor-pointer"
            defaultValue="2025"
          >
            <option value="2025">2025</option>
            <option value="2024">2026</option>
            <option value="2023">2027</option>
            <option value="2022">2028</option>
            <option value="2022">2029</option>
            <option value="2022">2030</option>
          </select>

          {/* Chevron */}
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6200EE]"
          />
        </div>
      </div>
    </div>
  );
};

export default UserOverviewChart;
