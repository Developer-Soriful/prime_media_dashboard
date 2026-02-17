import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';
import adminService from '../services/adminService';

const ChangePassword = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleToggleShow = (field) => {
    setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Map to expected API fields: currentPassword, newPassword, confirmPassword
      // Our state uses 'oldPassword', so we map it.
      await adminService.changePassword({
        currentPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword
      });

      alert("Password changed successfully!");
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setIsEditing(false);
    } catch (error) {
      console.error("Password change failed:", error);
      alert(error.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-6 mr-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
          <ShieldCheck size={22} /> Security Settings
        </h2>

        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${isEditing
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
        >
          {isEditing ? <><KeyRound size={18} /> Update Password</> : 'Change Password'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Old Password */}
        <div className="md:col-span-2">
          <label className="block text-gray-600 mb-2 font-medium">Current Password</label>
          <div className="relative">
            <input
              type={showPass.old ? "text" : "password"}
              name="oldPassword"
              placeholder="••••••••"
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full p-3 pr-12 rounded-lg border transition-all ${isEditing ? 'border-indigo-400 bg-white' : 'border-gray-200 bg-gray-50'
                } outline-none`}
            />
            <button
              onClick={() => handleToggleShow('old')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
            >
              {showPass.old ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">New Password</label>
          <div className="relative">
            <input
              type={showPass.new ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full p-3 pr-12 rounded-lg border transition-all ${isEditing ? 'border-indigo-400 bg-white' : 'border-gray-200 bg-gray-50'
                } outline-none`}
            />
            <button
              onClick={() => handleToggleShow('new')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
            >
              {showPass.new ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-600 mb-2 font-medium">Confirm New Password</label>
          <div className="relative">
            <input
              type={showPass.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Repeat new password"
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full p-3 pr-12 rounded-lg border transition-all ${isEditing ? 'border-indigo-400 bg-white' : 'border-gray-200 bg-gray-50'
                } outline-none`}
            />
            <button
              onClick={() => handleToggleShow('confirm')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
            >
              {showPass.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      {isEditing && (
        <p className="mt-4 text-sm text-gray-500 italic">
          * Password must be at least 8 characters long and include a symbol.
        </p>
      )}
    </div>
  );
};

export default ChangePassword;