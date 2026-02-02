

import React, { useState, useRef, useEffect } from "react";
import { Bell, Menu, UserCircle, Key, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import images from "../assets/images";

const TopNavbar = ({ onMenuClick, userName = "Md. Sabbir Hossain Evan" }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Mock Notification State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New service 'Spa' added successfully",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      text: "Promotion 'Summer Sale' is now active",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      text: "System update scheduled for tonight",
      time: "5 hours ago",
      read: true,
    },
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setShowNotifications(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="h-16 md:mt-10 md:mr-10 mb-6 bg-[#EFE6FD] border border-[#6200EE] rounded-xl flex items-center justify-between px-6 sticky top-0 z-30 font-nunito shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 text-[#6200EE] hover:bg-purple-50 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-[#6200EE] font-bold text-lg md:text-xl tracking-tight">
          Welcome, {userName}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Section */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className={`relative p-2 rounded-full transition-all ${showNotifications
              ? "bg-purple-200"
              : "text-[#6200EE] hover:bg-purple-50"
              }`}
          >
            <Bell
              size={24}
              fill={showNotifications ? "#6200EE" : "none"}
              className="text-[#6200EE]"
            />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#EFE6FD] animate-pulse"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-80 bg-white border border-purple-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-4 border-b border-gray-50 bg-[#FBF9FF] flex justify-between items-center">
                <h3 className="font-bold text-[#6200EE]">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-[#6200EE] text-white px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-gray-50 flex gap-3 hover:bg-purple-50 cursor-pointer ${!notif.read ? "bg-purple-50/50" : "opacity-70"
                      }`}
                  >
                    <div
                      className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? "bg-[#6200EE]" : "bg-transparent"
                        }`}
                    ></div>
                    <div className="flex-1 text-sm font-medium text-gray-700">
                      {notif.text}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-full p-3 text-xs font-bold text-white bg-[#6200EE]"
                onClick={handleMarkAllAsRead}
              >
                Clear & Close
              </button>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#6200EE] overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <img
                src={images.avatar}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown
              size={20}
              className={`text-[#6200EE] transition-transform duration-300 ${showProfileMenu ? "rotate-180" : ""
                }`}
            />
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 top-14 w-64 bg-white border border-purple-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="bg-gradient-to-r from-[#6200EE] to-[#8B5CF6] p-4 text-white">
                <p className="text-xs opacity-80">Logged in as</p>
                <p className="text-sm font-bold truncate">{userName}</p>
              </div>

              <div className="p-2">
                <Link to={"/dashboard/profile"}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 rounded-xl transition-colors group">
                    <div className="p-2 bg-purple-100 text-[#6200EE] rounded-lg group-hover:bg-[#6200EE] group-hover:text-white transition-colors">
                      <UserCircle size={18} />
                    </div>
                    <span className="font-semibold">
                      Edit Personal Information
                    </span>
                  </button>
                </Link>

                <Link to={"/dashboard/password"}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 rounded-xl transition-colors group">
                    <div className="p-2 bg-purple-100 text-[#6200EE] rounded-lg group-hover:bg-[#6200EE] group-hover:text-white transition-colors">
                      <Key size={18} />
                    </div>
                    <span className="font-semibold">Change Password</span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
