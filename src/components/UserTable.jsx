import { useEffect, useState } from "react";
import adminService from "../services/adminService";
import Loader from "./common/Loader";

const UserTable = () => {
  const [data, setData] = useState([]);
  // TABLE DATA LOADING 
  useEffect(() => {
    const tableData = async () => {
      try {
        const response = await adminService.getAllUsers({ page: 1, limit: 5 });
        if (response.success && response.data?.data) {
          setData(response.data.data);
        } else if (response.data) {
          setData(Array.isArray(response.data) ? response.data : (response.data.data || []));
        }
      } catch (error) {
        console.error("Failed to fetch table data:", error);
      }
    };
    tableData();
  }, []);
  if (!data) return <Loader />
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#6200EE] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-purple-50">
              <th className="px-3 py-6 font-bold text-[#6200EE] text-sm">
                #ID
              </th>
              <th className="px-3 py-6 font-bold text-[#6200EE] text-sm">
                User Name
              </th>
              <th className="px-3 py-6 font-bold text-[#6200EE] text-sm">
                Email
              </th>
              <th className="px-3 py-6 font-bold text-[#6200EE] text-sm">
                Phone Number
              </th>
              <th className="px-3 py-6 font-bold text-[#6200EE] text-sm">
                Role
              </th>
              <th className="px-3 py-6 font-bold text-[#6200EE] text-sm text-right">
                Date & Time
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-purple-100">
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-purple-50 transition-colors ${index % 2 !== 0 ? "bg-purple-50" : "bg-white"
                  }`}
              >
                <td className="px-3 py-6 text-gray-600 text-sm">{index + 1}</td>
                <td className="px-3 py-6 text-gray-700 font-medium text-sm">
                  {row.userName || "N/A"}
                </td>
                <td className="px-3 py-6 text-gray-600 text-sm">{row.email}</td>
                <td className="px-3 py-6 text-gray-600 text-sm">{row.phoneNumber || "N/A"}</td>
                <td className="px-3 py-6 text-gray-600 text-sm">{row.role}</td>
                <td className="px-3 py-6 text-gray-600 text-sm text-right">
                  {new Date(row.dateTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-xl text-end p-5 font-bold text-[#6200EE]">Resent users</h2>
      </div>
    </div>
  );
};

export default UserTable;
