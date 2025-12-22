import React, { useState } from 'react';
import loginIcon from '../assets/loginIcon.svg'; 
import { Link } from 'react-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-nunito">
      <div className="w-full max-w-md bg-[#EFE6FD33] rounded-3xl border-2 border-purple-400 p-8 md:p-12 shadow-sm">
        
        {/* Logo / Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img 
              src={loginIcon}  
              alt="Forgot Password Icon"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Forgot Password?</h1>
          <p className="text-sm text-gray-500 mt-2">
            Please enter your Email to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all bg-white text-gray-700"
              required
            />
          </div>

          {/* Submit Button (Get OTP) */}
          <Link to={"/otp-verification"}>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-700 to-purple-400 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg text-lg"
          >
            Get OTP
          </button>
          </Link>
        </form>

        {/* Back to Login Link (Optional) */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => window.history.back()} 
            className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;