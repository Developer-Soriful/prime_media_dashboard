import React from "react";

const UserTable = () => {
  const tableData = [
    {
      id: "01",
      name: "Arnold Aldridge",
      email: "Curtis.Weaver@Example.Com",
      phone: "(+33)7 35 55 84 97",
      event: "Hiking 01",
      date: "24 May, 2020",
    },
    {
      id: "02",
      name: "James Phillips",
      email: "Debbie.Baker@Example.Com",
      phone: "(+33)6 55 52 17 33",
      event: "Hiking 02",
      date: "17 Oct, 2020",
    },
    {
      id: "03",
      name: "Juan Attwood",
      email: "Nathan.Roberts@Example.Com",
      phone: "(+33)7 00 55 56 79",
      event: "Dinner",
      date: "1 Feb, 2020",
    },
    {
      id: "04",
      name: "Robbie Fleming",
      email: "Debra.Holt@Example.Com",
      phone: "(+33)6 55 51 05 09",
      event: "Pickleball 01",
      date: "22 Oct, 2020",
    },
    {
      id: "05",
      name: "David Goodman",
      email: "Bill.Sanders@Example.Com",
      phone: "(+33)7 00 55 54 79",
      event: "Pickleball 02",
      date: "8 Sep, 2020",
    },
  ];

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
                Event Request
              </th>
              <th className="px-3 py-6 font-bold text-[#6200EE] text-sm text-right">
                Date & Time
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-purple-100">
            {tableData.map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-purple-50 transition-colors ${
                  index % 2 !== 0 ? "bg-purple-50" : "bg-white"
                }`}
              >
                <td className="px-3 py-6 text-gray-600 text-sm">{row.id}</td>
                <td className="px-3 py-6 text-gray-700 font-medium text-sm">
                  {row.name}
                </td>
                <td className="px-3 py-6 text-gray-600 text-sm">{row.email}</td>
                <td className="px-3 py-6 text-gray-600 text-sm">{row.phone}</td>
                <td className="px-3 py-6 text-gray-600 text-sm">{row.event}</td>
                <td className="px-3 py-6 text-gray-600 text-sm text-right">
                  {row.date}
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
