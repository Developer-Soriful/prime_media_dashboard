import React, { useState, useRef, useEffect } from "react";
import { Bell, Menu, UserCircle, Key, LogOut, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import images from "../assets/images";
import NotificationDetailModal from "./modal/NotificationDetailModal";
import api from "../services/api";

const TopNavbar = ({ onMenuClick, userName = "Md. Sabbir Hossain Evan" }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const NOTIFICATIONS_PER_PAGE = 10;

  // Fetch notifications from API
  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  const fetchNotifications = async (page) => {
    setIsLoadingNotifications(true);
    try {
      const response = await api.get(`/provider/notifications?page=${page}&limit=${NOTIFICATIONS_PER_PAGE}`);
      const apiData = response.data.data || [];
      const pagination = response.data.pagination || {};

      setNotifications(apiData);
      setTotalPages(Math.ceil(pagination.total / NOTIFICATIONS_PER_PAGE));
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  // Format timestamp to relative time
  const formatTime = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return past.toLocaleDateString();
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setShowNotifications(false);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowNotifications(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
                {isLoadingNotifications ? (
                  <div className="p-8 flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-purple-200 border-t-[#6200EE] rounded-full animate-spin"></div>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`p-4 border-b border-gray-50 flex gap-3 hover:bg-purple-100 cursor-pointer transition-colors ${!notif.isRead ? "bg-purple-50/50" : "opacity-70"
                        }`}
                    >
                      <div
                        className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.isRead ? "bg-[#6200EE]" : "bg-transparent"
                          }`}
                      ></div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-800">
                          {notif.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {notif.message}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {formatTime(notif.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Pagination Controls */}
              {!isLoadingNotifications && notifications.length > 0 && totalPages > 1 && (
                <div className="p-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={18} className="text-[#6200EE]" />
                  </button>
                  <span className="text-xs font-medium text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={18} className="text-[#6200EE]" />
                  </button>
                </div>
              )}
              <button
                className="w-full p-3 text-xs font-bold text-white bg-[#6200EE] hover:bg-[#7722FF] transition-colors"
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

      {/* Notification Detail Modal */}
      <NotificationDetailModal
        isOpen={selectedNotification !== null}
        onClose={() => setSelectedNotification(null)}
        notification={selectedNotification}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default TopNavbar;
