import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import loginIcon from '../assets/loginIcon.svg';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  // Menu items list
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
    },
    { 
      name: 'User List', 
      path: '/users', 
      iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
    },
    { 
      name: 'Services', 
      path: '/services', 
      iconPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
    },
  ];

  const handleSignOut = () => {
    if (onLogout) {
      onLogout(); 
      navigate('/'); 
    }
  };

  return (
    <div className="fixed top-0 h-[92%] left-0 w-64 bg-white  border rounded-2xl border-purple-400 font-nunito p-5 shadow-lg flex flex-col z-50 mx-10 my-10 ">
      
      {/* Logo Section */}
      <div className="flex justify-center mb-10 pt-4">
        <img 
          src={loginIcon} 
          alt="Logo" 
          className="w-20 h-20 object-contain transition-transform hover:scale-110" 
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              w-full flex items-center p-4 rounded-2xl transition-all duration-300 font-bold
              ${isActive 
                ? 'bg-[#EFE6FD] text-purple-700 border-2 border-purple-500 shadow-[0px_4px_0px_0px_rgba(168,85,247,1)]' 
                : 'text-purple-300 hover:bg-gray-50 border-2 border-transparent'}
            `}
          >
            <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.iconPath} />
            </svg>
            <span className="truncate">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto border-t border-gray-100 pt-4">
        <Link to={"/"}>
                <button 
          onClick={handleSignOut}
          className="w-full flex items-center p-4 text-purple-400 font-bold hover:text-purple-700 hover:bg-[#EFE6FD] rounded-2xl transition-all  group"
        >
          <svg className="w-6 h-6 mr-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;