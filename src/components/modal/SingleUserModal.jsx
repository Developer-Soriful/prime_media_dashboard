
import React from 'react';
import { X, Send } from 'lucide-react';

const SingleUserModal = ({ user, onClose }) => {
  if (!user) return null;


  const isBlocked = user.role === "Blocked";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center px-8 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-700 mx-auto">User Details</h2>
          <button 
            onClick={onClose} 
            className="absolute right-6 top-4 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: User Info */}
          <div className="space-y-4">
            <div>
              <label className="text-gray-500 text-sm">Name</label>
              <input readOnly value={user.name} className="w-full p-3 border-2 border-purple-100 rounded-xl bg-gray-50 outline-none" />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Email</label>
              <input readOnly value={user.email} className="w-full p-3 border-2 border-purple-100 rounded-xl bg-gray-50 outline-none" />
            </div>
            <div>
              <label className="text-gray-500 text-sm">Phone</label>
              <input readOnly value={user.phone} className="w-full p-3 border-2 border-purple-100 rounded-xl bg-gray-50 outline-none" />
            </div>

            {/* Dynamic Block/Unblock Button */}
            <button 
              className={`w-full py-4 text-white font-bold rounded-2xl shadow-lg mt-4 transition-all ${
                isBlocked 
                  ? "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800" 
                  : "bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
              }`}
            >
              {isBlocked ? "Unblock User" : "Block User"}
            </button>
          </div>

          {/* Right Side: Message Input */}
          <div className="space-y-4 flex flex-col">
            <label className="font-bold text-gray-700">Write Message</label>
            <textarea 
              placeholder="Type your message..." 
              className="flex-1 p-4 border-2 border-purple-100 rounded-2xl min-h-[180px] focus:border-purple-500 outline-none transition-all"
            ></textarea>
            <div className="flex gap-2">
               <input placeholder="Push Notification" className="flex-1 p-3 border-2 border-purple-100 rounded-xl outline-none" />
               <button className="p-3 bg-purple-50 text-purple-600 border-2 border-purple-100 rounded-xl hover:bg-purple-600 hover:text-white transition-all">
                <Send size={24} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserModal;