import React, { useState, useRef, useEffect } from "react";
import loginIcon from "../assets/loginIcon.svg";
import { Link } from "react-router";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);

  // Timer logic for "Resend code"
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    console.log("Verifying OTP:", finalOtp);
    // Add your verification logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-nunito">
      <div className="w-full max-w-md bg-[#EFE6FD33] rounded-3xl border-2 border-purple-400 p-8 md:p-12 shadow-sm text-center">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src={loginIcon}
            alt="OTP Icon"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Header Section */}
        <div className="mb-8 text-left">
          <h1 className="text-2xl font-bold text-gray-700">OTP Verification</h1>
          <p className="text-sm text-gray-500 mt-1">
            Check your email to see the verification code
          </p>
        </div>

        {/* OTP Input Fields */}
        <form onSubmit={handleVerify}>
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-12 md:w-12 md:h-14 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white transition-all shadow-sm"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Link to={"/reset-password"}>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-700 to-purple-400 text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg text-lg mb-6"
            >
              Verify
            </button>
          </Link>
        </form>

        {/* Resend Code Timer */}
        <div className="text-sm text-gray-600">
          {timer > 0 ? (
            <p>
              Resend code in{" "}
              <span className="font-medium text-gray-800">
                00:{timer < 10 ? `0${timer}` : timer}
              </span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(59)}
              className="text-purple-600 font-semibold hover:underline"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
