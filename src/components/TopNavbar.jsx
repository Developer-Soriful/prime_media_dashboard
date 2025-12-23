
import React from 'react';
import { Bell, Menu } from 'lucide-react';

const TopNavbar = ({ onMenuClick, userName = "Md. Sabbir Hossain Evan" }) => {
  return (
    <div className="h-16 md:mt-10  m-3 md:mr-10 mb-6 bg-white border border-purple-400 rounded-xl flex items-center justify-between px-6 sticky top-0 z-30 font-nunito shadow-sm">
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Welcome Text */}
        <h2 className="text-purple-600 font-bold text-lg md:text-xl tracking-tight">
          Welcome, {userName}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        
        <button className="relative p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-all">
          <Bell size={24} fill="currentColor" className="text-purple-600" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile Avatar */}
        <div className="cursor-pointer transition-transform hover:scale-105">
          <div className="w-10 h-10 rounded-full border-2 border-purple-400 overflow-hidden shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopNavbar;