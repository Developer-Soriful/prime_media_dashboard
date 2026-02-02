import loginIcon from "../assets/loginIcon.svg";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import StatusModal from "../components/modal/StatusModal";
import { useState } from "react";

const LoginSection = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    actionLabel: "",
    onAction: null,
  });

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      setModal({
        isOpen: true,
        type: "success",
        title: "Login Successful",
        message: "Welcome back! You have successfully logged in.",
        actionLabel: "Go to Dashboard",
        onAction: () => navigate("/"),
      });

    } catch (error) {
      console.error("Login failed:", error);
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || `Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "Network error. Please check your internet connection.";
      }

      setModal({
        isOpen: true,
        type: "error",
        title: "Login Failed",
        message: errorMessage,
        actionLabel: "Try Again",
        onAction: () => { },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StatusModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        actionLabel={modal.actionLabel}
        onAction={modal.onAction}
      />

      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-[##EFE6FD33] rounded-3xl border-2 border-[#6200EE] p-8 md:p-12 shadow-sm">
          {/* Logo / Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={loginIcon}
                alt="Login Icon"
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>

          {/* Header Text */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-700">Welcome Back</h1>
            <p className="text-sm text-gray-400 mt-1">
              Please Enter Your Details Below to Continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                required
              />
            </div>

            {/* Helpers */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="mr-2 w-4 h-4 accent-[#6200EE]"
                />
                Remember me
              </label>
              <Link
                to={"forgot-password"}
                className="text-gray-500 hover:text-[#6200EE] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full cursor-pointer py-4 mt-4 bg-gradient-to-r from-[#6200EE] to-purple-500 text-white font-medium rounded-2xl hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSection;
