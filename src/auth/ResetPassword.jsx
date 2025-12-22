import React, { useState } from "react";
import loginIcon from "../assets/loginIcon.svg";
import { Link } from "react-router";

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword === passwords.confirmPassword) {
      console.log("Password Reset Successful");
      // Add your API call here
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-nunito">
      {/* Main Card */}
      <div className="w-full max-w-md bg-[#EFE6FD33] rounded-3xl border-2 border-purple-400 p-8 md:p-12 shadow-sm">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={loginIcon}
              alt="Reset Password Icon"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>

        {/* Header Text */}
        <div className="mb-8 text-left">
          <h1 className="text-2xl font-bold text-gray-700">Reset Password</h1>
          <p className="text-sm text-gray-500 mt-2">
            Your password must be 8-10 character long.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all bg-white text-gray-700"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all bg-white text-gray-700"
              required
            />
          </div>

          {/* Reset Password Button */}
          <Link to={"/dashboard"}>
            <button
              type="submit"
              className="w-full py-4 mt-4 bg-gradient-to-r from-purple-700 to-purple-400 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg text-lg"
            >
              Reset Password
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
