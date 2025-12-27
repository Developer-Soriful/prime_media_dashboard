import React, { useState, useMemo } from "react";
import {
  Megaphone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import GlobalAnnouncementModal from "./modal/GlobalAnnouncementModal";
import SingleUserModal from "./modal/SingleUserModal";
import { ChevronDown } from "lucide-react";

const UserList = () => {
  const [filter, setFilter] = useState("All User");
  const [currentPage, setCurrentPage] = useState(1);
  const [isGlobalModalOpen, setGlobalModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const allUsers = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: (i + 1).toString().padStart(2, "0"),
        name: i % 2 === 0 ? "Christopher Brown" : "Charles Cook",
        email: `user${i}@gmail.com`,
        phone: "+7 (903) 941-02-27",
        date: "15 May 2020 9:00 Am",

        role:
          i % 4 === 0
            ? "Only Users"
            : i % 4 === 1
            ? "Providers"
            : i % 4 === 2
            ? "Reported"
            : "Blocked",
      })),
    []
  );

  const filteredData = useMemo(() => {
    if (filter === "All User") return allUsers;
    return allUsers.filter((user) => user.role === filter);
  }, [filter, allUsers]);

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="mr-7 font-nunito min-h-screen">


      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-fit">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="appearance-none px-4 py-3 pr-10 border border-[#6200EE] rounded-xl bg-purple-50 text-[#6200EE] font-bold focus:outline-none cursor-pointer"
          >
            <option value="All User">All User</option>
            <option value="Only Users">Only Users</option>
            <option value="Providers">Providers</option>
            <option value="Reported">Reported</option>
            <option value="Blocked">Blocked</option>
          </select>

          {/* Chevron Icon */}
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6200EE] w-5 h-5" />
        </div>

        <button
          onClick={() => setGlobalModalOpen(true)}
          className="flex gap-1 p-3 border border-[#6200EE] rounded-xl bg-purple-50 text-[#6200EE] font-bold focus:outline-none cursor-pointer"
        >
          <Megaphone size={20} />
          Announcement
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#6200EE]">
        <table className="w-full text-left">
          <thead className="bg-[#6200EE] text-white font-bold">
            <tr>
              <th className="px-6 py-4">#ID</th>
              <th className="px-6 py-4">User Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone Number</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4 text-center">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6200EE]">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-purple-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">{user.id}</td>
                  <td className="px-6 py-4 flex items-center gap-3 text-sm font-medium">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`https://i.pravatar.cc/150?u=${user.id}`}
                      alt="avatar"
                    />
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setUserModalOpen(true);
                      }}
                      className="p-2 text-[#6200EE] hover:bg-purple-100 rounded-full transition-all"
                    >
                      <MessageSquare size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  No data found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-500 font-bold text-xs uppercase">
          Showing {indexOfFirstUser + 1}-
          {Math.min(indexOfLastUser, filteredData.length)} of{" "}
          {filteredData.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-1 text-gray-400 hover:text-purple-600 disabled:opacity-30"
          >
            <ChevronLeft />
          </button>

          {[...Array(totalPages)].slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded font-bold ${
                currentPage === i + 1
                  ? "bg-[#6200EE] text-white"
                  : "text-gray-400 hover:bg-purple-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          {totalPages > 5 && <span className="text-gray-400">...</span>}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 text-gray-400 hover:text-purple-600 disabled:opacity-30"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {isGlobalModalOpen && (
        <GlobalAnnouncementModal onClose={() => setGlobalModalOpen(false)} />
      )}
      {isUserModalOpen && (
        <SingleUserModal
          user={selectedUser}
          onClose={() => setUserModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserList;
