import { createBrowserRouter } from "react-router";
import SignIn from "../auth/LoginSection";
import ForgotPassword from "../auth/ForgotPassword";
import OTPVerification from "../auth/OTPVerification";
import ResetPassword from "../auth/ResetPassword";
import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "otp-verification",
    element: <OTPVerification />
  },
  {
    path: "reset-password",
    element: <ResetPassword />
  },
  {
    path: "dashboard",
    element: <DashboardLayout />
  }
]);

export default router;
