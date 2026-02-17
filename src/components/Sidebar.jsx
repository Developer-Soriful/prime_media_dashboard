import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { X, ShieldCheck, Settings, LogOut, AlertCircle } from 'lucide-react';
import loginIcon from '../assets/sidebarLogo.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import images from '../assets/images';

const Sidebar = ({ onLogout, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user } = useAuth();
  const userData = {
    name: user?.name,
    role: user?.role,
    avatar: user?.avatar
  };

  const menuItems = [
    { name: 'Dashboard', path: '/', iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: 'User List', path: '/users', iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { name: 'Services & Category', path: '/services', iconPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { name: 'Promotion', path: '/promotion', iconPath: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A2.457 2.457 0 013 11.235c0-1.355 1.09-2.454 2.436-2.454H13l5 5H5.436z" },
    { name: 'Verification', path: '/verification', icon: <ShieldCheck size={24} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={24} /> },
  ];

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    if (onLogout) {
      onLogout();
      navigate('/login');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <div className={`
        fixed top-0 left-0 z-50 h-[92%] w-64 bg-[#EFE6FD] border rounded-2xl border-[#6200EE] font-nunito p-5 shadow-lg flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:mx-10 lg:my-10 
        ${isOpen ? 'translate-x-5 my-10 mx-5' : '-translate-x-full'}
      `}>
        <button className="lg:hidden absolute top-4 right-4 text-purple-600" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        <div className="flex justify-center mb-10 pt-4">
          <img src={loginIcon} alt="Logo" className="w-25 h-25 object-contain" />
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                w-full flex items-center p-3 rounded-2xl transition-all duration-300 font-bold
                ${isActive
                  ? 'bg-[#EFE6FD] text-[#6200EE] border-2 border-[#6200EE] shadow-[0px_4px_0px_0px_rgba(98,0,238,1)]'
                  : 'text-[#6200EE] hover:bg-white/50 border-2 border-transparent'}
              `}
            >
              <div className="mr-3 flex-shrink-0">
                {item.iconPath ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.iconPath} />
                  </svg>
                ) : (item.icon)}
              </div>
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 space-y-2 border-t border-[#d8c5f7]">
          <Link to={"/profile"} className="block">
            <div className="flex items-center p-2 gap-3 bg-white/40 rounded-2xl border border-transparent hover:border-[#6200EE] transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-full border-2 border-[#6200EE] overflow-hidden">
                <img src={images.avatar} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-[#6200EE] truncate">{userData.name}</span>
                <span className="text-[10px] font-medium text-purple-500 uppercase tracking-wider">{userData.role}</span>
              </div>
            </div>
          </Link>

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center mt-2 p-3 cursor-pointer text-[#6200EE] font-bold hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
          >
            <LogOut className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </div>

      {/* --- Logout Confirmation Modal --- */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl scale-in-center border border-purple-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Do you want to exit?</h3>
              <p className="text-gray-500 text-sm mb-8">Confirming will log you out from your current session.</p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 py-3 px-6 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all cursor-pointer"
                >
                  No
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 py-3 px-6 bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-200 cursor-pointer hover:bg-red-600 active:translate-y-1 transition-all"
                >
                  Yes, Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;